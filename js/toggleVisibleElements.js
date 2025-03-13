'use strict';
// Файл для изменения отображения элементов на странице (либо же изменение их стилей) 

import {hiddenByDisplay} from "./base.js"
import {sectionContentBlock_viewContent, taskForm, taskTextAreas, taskNameInput, taskSettingsButtons, deadlineButton, deadlineMenu, priorityButton, priorityMenu, taskTypeMenu, taskTypeButton, buttonCloseMenuNewTask, buttonAddNewTask, buttonSaveTask, addNewTask, addTaskIconDefault, addTaskIconHover, currectEntryDate} from "./doomElements.js"
import {reloadFormAddTask, switchIsModal_block, reloadItemsAndCalendarDeadline, changeMyCalendar} from "./scripts.js"


let MyCalendarForm
const curHiddenCalendarContainerForm = document.querySelector(".form-from-add-new-task__hidden-menu-deadline-calendare")
const curHiddenCalendarForm = document.querySelector(".hidden-menu-deadline-calendare-input")



// Можно ли показывать доп. функции таска и подзадачи (изначально скрытые)
let disabledShowDopFuncTask = "false"
window.localStorage.setItem("disabledShowDopFuncTask", "false")

// Функция для изменения значения переменной для блокировки показа доп. ф. у задач/подзадач. Как в данном js коде (для сокращения записи в дальнейшем), так и в localStorage
export function switchDisabledShowDopFuncTask(status) {
    if (status == "false") {
        disabledShowDopFuncTask = "false"
        window.localStorage.setItem("disabledShowDopFuncTask", "false")
    } 
    else if (status == "true") {
        disabledShowDopFuncTask = "true"
        window.localStorage.setItem("disabledShowDopFuncTask", "true")
    }
}


// Отображение поля с доп функциями при наведении на поле с таском

let currentLi = null    // Элемент li под курсором в данный момент (если есть)
 
function setCurrentLi() {
    currentLi = null
    return window.localStorage.setItem("currentLi", null)
}
function getCurrentLi() {
    return window.localStorage.getItem("currentLi")
}


let currentLi_klick = null  // Удаляю отметку о текущей задаче 
window.localStorage.setItem("currentLi_klick", null)

function setCurrentLi_klick(val) {
    // Если передаётся число (id элемента. Это если функция вызывается из другого js файла)
    if (typeof Number(val) == "number") {
        currentLi_klick = document.getElementById(`${val}`)
        window.localStorage.setItem("currentLi_klick", currentLi_klick)
    }
    // Если передаётся null (либо в этом файле, либо из другого, а в таком случае он передаётся в виде строки)
    else if (val == null || val == "null") {
        currentLi_klick = null
        window.localStorage.setItem("currentLi_klick", null)
    }
    // Иначе, если передаётся значение из текущего файла (это будет сразу сам html элемент)
    else {
        currentLi_klick = val
        window.localStorage.setItem("currentLi_klick", val)
    }
}



let isNewDeadlineButtonClicked = ""           // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)
window.localStorage.setItem("isNewDeadlineButtonClicked", "")
function setIsNewDeadlineButtonClicked(val) {
    isNewDeadlineButtonClicked = val
    window.localStorage.setItem("isNewDeadlineButtonClicked", val)
}
function getIsNewDeadlineButtonClicked() {
    return window.localStorage.getItem("isNewDeadlineButtonClicked")
}



function statusIsModal() {
    const isModal = window.localStorage.getItem("isModal")
    if (isModal == "true") {
        return true
    }
    else if (isModal == "false") {
        return false
    }
}




sectionContentBlock_viewContent.addEventListener("mouseover", function(e) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentLi есть, то мы ещё не ушли с предыдущего <li>, это переход внутри - игнорируем такое событие
    if (currentLi) return
    let target = e.target.closest("li.task")

    if (!target) return;    // переход не на <li> - игнорировать
    if (!sectionContentBlock_viewContent.contains(target)) return    // переход на <li>, но вне .sectionContentBlock_viewContent (возможно при вложенных списках) - игнорировать

    // ура, мы зашли на новый <li>

    currentLi = target
    window.localStorage.setItem("currentLi", target.getAttribute("id"))

    show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))     // Показываем скрытое меню с доп func этого элемента
})

sectionContentBlock_viewContent.addEventListener("mouseout", function(e) {
    // если мы вне <li>, то игнорируем уход мыши. Это какой-то переход внутри .sectionContentBlock_viewContent, но вне <li>
    if (!currentLi) return
    
    // мы покидаем элемент – но куда? Возможно, на потомка?
    let relatedTarget = e.relatedTarget
    while (relatedTarget) {
        // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет. Если да, то это переход внутри элемента – игнорируем
        if (relatedTarget == currentLi) return
        relatedTarget = relatedTarget.parentNode
    }

    // мы действительно покинули элемент li


    hide_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))  // Скрываем меню с доп func этого элемента
    setCurrentLi()
})

// Функция показа доп функций элемента таска
function show_task_dopFuncs(thisDopFuncs) {

    // Если запрета на показ доп.ф. нету, ИЛИ мы навелись на тот таск, на который только что кликнули
    if (disabledShowDopFuncTask == "false" || (currentLi_klick == currentLi)) {
        thisDopFuncs.classList.remove("hide1")
        thisDopFuncs.querySelector(".task__btnEdit").classList.remove("hide1")
        thisDopFuncs.querySelector(".task__btnNewDeadline").classList.remove("hide1")
    } 
} 

function hide_task_dopFuncs(thisDopFuncs) {
    // Если сейчас не нажимается кнопка для назначения нового срока выполнения задаче, то скрываются все доп. функции
    if (!isNewDeadlineButtonClicked) {
        thisDopFuncs.classList.add("hide1")
        thisDopFuncs.querySelector(".task__btnEdit").classList.add("hide1")
        thisDopFuncs.querySelector(".task__btnNewDeadline").classList.add("hide1")
    } 
    // Иначе, если нажимается кнопка назначения нового срока выполнения задаче, то скрывается лишь кнопка редактирования задачи
    else if (isNewDeadlineButtonClicked = 1) {
        thisDopFuncs.querySelector(".task__btnEdit").classList.add("hide1")
    }
}




// Отображение галочки в кружке-конпке при наведении на кружок:

let currentBtnCheckbox = null   // Элемент task__button-task-checkbox под курсором в данный момент (если есть)
sectionContentBlock_viewContent.addEventListener("mouseover", function(e) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentBtnCheckbox есть, то мы ещё не ушли с предыдущего кружка, это переход внутри - игнорируем такое событие
    if (currentBtnCheckbox) return
    let target2 = e.target.closest(".task__button-task-checkbox")
    if (!target2) return

    // ура, мы зашли на новый кружок
    currentBtnCheckbox = target2
    show_mark_OK(currentBtnCheckbox.querySelector("img"))     // Показываем галочку внутри этого элемента   
})

sectionContentBlock_viewContent.addEventListener("mouseout", function(e) { 
     // если мы вне кружка, то игнорируем уход мыши. Это какой-то переход внутри .sectionContentBlock_viewContent, но вне кружка
    if (!currentBtnCheckbox) return

    // мы покидаем элемент – но куда? Возможно, на потомка?
    let relatedTarget = e.relatedTarget
    while (relatedTarget) {
        // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem2 или нет. Если да, то это переход внутри элемента – игнорируем
        if (relatedTarget == currentBtnCheckbox) return
        relatedTarget = relatedTarget.parentNode
    }

    // мы действительно покинули кружок
    show_mark_OK(currentBtnCheckbox.querySelector("img"))  // Скрываем галочку внутри этого элемента
    currentBtnCheckbox = null
})



// Функция показа/скрытия галочки внутри кружка
function show_mark_OK (thisMark) {
    hiddenByDisplay(thisMark, "toggle")  
}




// Замена иконок добавления таска, при наведении на это поле
addNewTask.addEventListener("mouseenter", function(e) {
    hiddenByDisplay(addTaskIconDefault, "hide")
    hiddenByDisplay(addTaskIconHover, "show")
    addNewTask.classList.add("add-new-task__text_hovered")
})
addNewTask.addEventListener("mouseleave", function(e) {
    hiddenByDisplay(addTaskIconDefault, "show")
    hiddenByDisplay(addTaskIconHover, "hide")
    addNewTask.classList.remove("add-new-task__text_hovered")
})




// Блокировка кнопки "Добавить задачу" и "Сохранить" (в меню добавления/редактирования таска)
taskNameInput.addEventListener("input", function(e) {
    if (e.target.value == "") {     // Если поле ввода имени стало пустым:
        buttonAddNewTask.setAttribute('aria-disabled', 'true')
        buttonSaveTask.setAttribute('aria-disabled', 'true')
    } else {    
        buttonAddNewTask.setAttribute('aria-disabled', 'false')
        buttonSaveTask.setAttribute('aria-disabled', 'false')
    }
})





// Регулировка высоты полей для ввода имени и описания нового добавляемого таска
for (let i = 0; i < taskTextAreas.length; i++) {
    // taskTextAreas[i].setAttribute("style", "height:" + 24 + "px;overflow-y:hidden;");      // Потом изменить/удалить строку эту
    taskTextAreas[i].setAttribute("style", "height:" + (taskTextAreas[i].scrollHeight + 24) + "px;overflow-y:hidden;");
    taskTextAreas[i].addEventListener("input", OnInput, false);
}
//TODO: Refactor
function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}

// Изменение стилей поля с выбором (срок выполнения и приоритет)
taskSettingsButtons.forEach(function(itemSettings) {
    itemSettings.querySelector("div:first-child").addEventListener("mouseenter", function(e) {
        itemSettings.querySelector(".form-from-add-new-task__icon-selected-setting").classList.add("darkned")
        itemSettings.querySelector(".form-from-add-new-task__text-settings").classList.add("darkned")
    })
    itemSettings.querySelector("div:first-child").addEventListener("mouseleave", function(e) {
        itemSettings.querySelector(".form-from-add-new-task__icon-selected-setting").classList.remove("darkned")
        itemSettings.querySelector(".form-from-add-new-task__text-settings").classList.remove("darkned")
    })
})

// Изменение стилей поля с выбором (тип таска)
taskTypeButton.addEventListener("mouseenter", function(e) {
    taskTypeButton.querySelector("span").classList.add("darkned")
    taskTypeButton.querySelector(".form-from-add-new-task__icon").classList.add("darkned")
})
taskTypeButton.addEventListener("mouseleave", function(e) {
    // Если скрытое меню выбора таска показано, то игнорировать
    if (taskTypeMenu.classList.contains("hide2") == false) return
    
    taskTypeButton.querySelector("span").classList.remove("darkned")
    taskTypeButton.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
})







// Отслеживание скрытых меню срока выполнения и приоритета
let observerHiddenMenus
let isObservHiddenMenus = true     // Разрешено ли что-то делать при изменении отслеживании объекта. 
window.localStorage.setItem("isObservHiddenMenus", true)

function setIsObservHiddenMenus(val) {
    isObservHiddenMenus = val
    window.localStorage.setItem("isObservHiddenMenus", val)
}

function observFunc(observObj) {
    observerHiddenMenus = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (isObservHiddenMenus == true) {
                observerHiddenMenus.disconnect();
                hiddenByDisplay(observObj.querySelector(".form-from-add-new-task__icon-cross"), "show")
            } else {
                observerHiddenMenus.disconnect();
            }
        })
    })
    if (isObservHiddenMenus == true) {
        observerHiddenMenus.observe(
            observObj,
            {
                childList: true,    // Отслеживается изменения в тегах
                attributes: false,
                subtree: true,
                characterData: false,
                attributeOldValue: false,
                characterDataOldValue: false,
            }
        )
    }

}





// Появление и скрытие поле с выбором типа таска в меню создания/редактирования новой задачи
let isSelectionMenuActive = ''
taskTypeButton.addEventListener("click", function(e) {      // При нажатии на кнопку 

    // Очищаю выделение срока выполнения в списке вариантов и в календаре
    reloadItemsAndCalendarDeadline()


    // Если скрытое меню показано (не скрыто)
    if (taskTypeMenu.classList.contains("hide2") == false) {       
        hiddenByDisplay(taskTypeMenu, "hide")    // Скрываю меню выбора типа таска
 
        // Убираю выделения кнопки
        taskTypeButton.classList.remove("active2")
        taskTypeButton.querySelector("span").classList.remove("darkned")
        taskTypeButton.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")

        // Убираю блокировку для открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
    // Иначе, если доп меню скрыто
    else
    {
        // Скрываю скрытые меню выбора срока выполнения таска и меню выбора приоритета, если они были открыты
        hiddenByDisplay(deadlineMenu, "hide")
        hiddenByDisplay(priorityMenu, "hide")


        hiddenByDisplay(taskTypeMenu, "show")     // Показываю меню выбора типа таска

        // Добавляю "active2" для постоянного выделения  
        taskTypeButton.classList.add("active2")


        isSelectionMenuActive = 1;  

        // Блокирую возможность открытия м.о.
        switchIsModal_block("true")  

        // Запрещается показ доп. функций тасков
        switchDisabledShowDopFuncTask("true")
    }
})

taskTypeMenu.addEventListener("click", function(e) {     // При нажатии на само поля выбора
    isSelectionMenuActive = 1;  

     // Убираю выделения кнопки
     taskTypeButton.classList.remove("active2")
     taskTypeButton.querySelector("span").classList.remove("darkned")
     taskTypeButton.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
})


document.addEventListener("click", function(e) {      // При нажатии вне поля выбора - скрывается

    // Если доп. меню типа таска - скрыто, то игнорируем
    if (taskTypeMenu.classList.contains("hide2") == true) return


    // Если М.О. открыто, то:
    if (statusIsModal()) {
        const targetLi_modal = e.target.closest(".subtask")     // Элемент  li для последующего определения нового типа подзадаче (одна из двух кнопок доп функций подзадачи)       


        // Если клик был вне поля выбора и вне элемента подзадачи (li)
        if (!isSelectionMenuActive && targetLi_modal == null) {
            // Скрываю меню выбора типа таска
            hiddenByDisplay(taskTypeMenu, "hide")
            // Убираю выделения кнопки
            taskTypeButton.classList.remove("active2")
            taskTypeButton.querySelector("span").classList.remove("darkned")
            taskTypeButton.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
    
            // Снимаю блокировку с открытия м.о.
            switchIsModal_block("false")  
            // Разрешаю показ доп. функций задач/подзадач
            switchDisabledShowDopFuncTask("false")
            
        } 
        // Иначе, если клик был вне поля выбора и на элемент подзадачи (li)
        else if (!isSelectionMenuActive && targetLi_modal != null) {
            // Скрываю меню выбора типа таска
            hiddenByDisplay(taskTypeMenu, "hide")
    
            // Убираю выделения кнопки
            taskTypeButton.classList.remove("active2")
            taskTypeButton.querySelector("span").classList.remove("darkned")
            taskTypeButton.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
    
            // Снимаю блокировку с открытия м.о.
            switchIsModal_block("false")  
            // Разрешаю показ доп. функций задач/подзадач
            switchDisabledShowDopFuncTask("false")
            
    
            // Показываю доп. функции у той подзадачи, на которую был совершён клик (которая была под курсором в момент клика)
            targetLi_modal.querySelector(".subtask__dopFuncs").querySelector(".subtask__btnEdit").classList.remove("hide1")
            targetLi_modal.querySelector(".subtask__dopFuncs").querySelector(".subtask__btnNewDeadline").classList.remove("hide1")
        }
    
        if (isSelectionMenuActive) { 
            setTimeout(() => isSelectionMenuActive='', 100)
        }  


        // Игнорируем дальнейший код, который должен работать лишь если модальное окно закрыто.
        return
    }  

    const targetLi = e.target.closest(".task")     // Элемент  li для последующего определения нового типа таску (одна из двух кнопок доп функций таска)


    // Если клик был вне поля выбора и вне элемента таска (li)
    if (!isSelectionMenuActive && targetLi == null) {
        hiddenByDisplay(taskTypeMenu, "hide")
        // Убираю выделения кнопки
        taskTypeButton.classList.remove("active2")
        taskTypeButton.querySelector("span").classList.remove("darkned")
        taskTypeButton.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    } 
    // Иначе, если клик был вне поля выбора и на элемент таска (li)
    else if (!isSelectionMenuActive && targetLi != null) {
        hiddenByDisplay(taskTypeMenu, "hide")

        // Убираю выделения кнопки
        taskTypeButton.classList.remove("active2")
        taskTypeButton.querySelector("span").classList.remove("darkned")
        taskTypeButton.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Показываю доп. функции у того таска, на который был совершён клик (который был под курсором в момент клика)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))
    }

    if (isSelectionMenuActive) { 
        setTimeout(() => isSelectionMenuActive='', 100)
    }  
})






// Появление и скрытие поля с выбором срока выполнения задачи в меню создания/редактирования задачи и при открытии его через "Назначить срок" (когда МО закрыто)

// 1) При нажатии на кнопку в форме для создания/редактирования таска
deadlineButton.addEventListener("click", function(e) {   
    if (statusIsModal()) return    // Если МО открыто, то игнор


    const btnCross = deadlineButton.querySelector(".form-from-add-new-task__icon-cross")


    // Если доп меню показано (не скрыто) и клик был на крестик и крестик показан (не скрыт)
    if (deadlineMenu.classList.contains("hide2") == false && e.target == btnCross.querySelector("img") && btnCross.classList.contains("hide2") == false) {
        hiddenByDisplay(btnCross, "hide") // ещё раз прописываю скрытие, ибо событие клика по крестику (отдельное) не скроет его (но изменит содержание тега с текстом)
    } 
    // Иначе, если доп меню показано (не скрыто) (и клик был не на крестик, соответственно)
    else if (deadlineMenu.classList.contains("hide2") == false) {
        // Скрываю само меню и удаляю календарь в нём 
        hiddenByDisplay(deadlineMenu, "hide")
        MyCalendarForm.destroy()    
        MyCalendarForm = null


        setIsObservHiddenMenus(false)
        observFunc(deadlineButton)

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline() 
    } 
    // Иначе, если доп меню скрыто и клик был на крестик:
    else if (deadlineMenu.classList.contains("hide2") == true && e.target == btnCross.querySelector("img")) {
        hiddenByDisplay(btnCross, "hide")
    }
    // Иначе, если доп меню скрыто (и клик был, соответственно, не на крестик)
    else if (deadlineMenu.classList.contains("hide2") == true)
    {
        // Скрываю скрытые меню выбора типа таска и приоритета, если они были открыты
        hiddenByDisplay(taskTypeMenu, "hide")
        hiddenByDisplay(priorityMenu, "hide")

        hiddenByDisplay(deadlineMenu, "show")    // Показываю скрытое меню срока выполнения


        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num")

        // Полная дата, которая была перевёрнута (стала: "год.месяц.число")
        const textAreaDeadlineHiddenNumReversed = textAreaDeadlineHiddenNum.innerText.split(".").reverse().join(".")

        MyCalendarForm = new AirDatepicker(curHiddenCalendarForm, {
            inline: false,  
            buttons: ["today", "clear"],
            minDate: currectEntryDate,
            container: curHiddenCalendarContainerForm,
            selectedDates: `${textAreaDeadlineHiddenNumReversed}`,
            autoClose: false,
            // isDestroyed: true
        })
        MyCalendarForm.show();

        isSelectionMenuActive = 1;  
        

        setIsObservHiddenMenus(true)    // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(deadlineButton)  // При первом открытии скрытого меню, начнётся отслеживание изменения окна "deadlineButton"


        // Блокирую возможность открытия м.о.
        switchIsModal_block("true")  

        // Запрещается показ доп. функций тасков
        switchDisabledShowDopFuncTask("true")
    }
})

// 2.1) При нажатии на само поля выбора (при создании/редактировании и с учётом наличия ранее нажатой  доп ф. "назначить срок")
deadlineMenu.addEventListener("click", function(e) { 
    if (statusIsModal()) return    // Если МО открыто, то игнор

    
    isSelectionMenuActive = 1;  

    setIsNewDeadlineButtonClicked(1)     // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)

    // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    // Этот код работает только если ранее на каком-то таске было открыто скрытое меню через "назначить срок", а сейчас клик происходит по открытому аналогичному меню, но вызванному у таска при его создании/редактировании
    if ((currentLi_klick != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
        const curHiddenMenuDeadlineNewDeadline = currentLi_klick.querySelector(".task__dopFunction__hidden-menu-deadline")


        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")
        changeMyCalendar("destroy")   
        changeMyCalendar(null)   

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        setIsNewDeadlineButtonClicked("")


        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi_klick.querySelector(".task__dopFuncs"))


        // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
        setCurrentLi_klick(null)
        setCurrentLi()


        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")   

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    } 
    // Если ранее ни на каком из тасков не была нажата кнопка "NewDeadline" (иконка)
    else if ((currentLi_klick == null)) {
        setIsNewDeadlineButtonClicked("")
    }

    if (isObservHiddenMenus == false) {
        setIsObservHiddenMenus(true)     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(deadlineButton)   // Начинается слежка за "deadlineButton", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
})

// 2.2) При нажатии на само поле выбора (при создании/редактировании задачи и нажатии доп ф. "назначить срок")
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    if (statusIsModal()) return    // Если МО открыто, то игнор

    const target_container_task = e.target.closest(".task__dopFunction__hidden-menu-deadline")   // Область скрытого меню выбора срока при нажатии на "Назначить срок"
    const target_container_formTask = e.target.closest(".form-from-add-new-task__hidden-menu-deadline")  // Область скрытого меню выбора срока при создании/редактировании задачи


    // Если клик был не по меню выбора срока выполнения в функции "назначить срок" и не по аналогичному меню при создании/редактировании задачи, то игнор
    if (!target_container_task && !target_container_formTask) return

    isSelectionMenuActive = 1;  
    setIsNewDeadlineButtonClicked(1)       // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)


    // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    // Этот код работает если клик был по меню выбора срока выполнения после нажатия на "Назначить срок" (только в этом случае нужно скрывать сразу меню выбора, ведь при создании/редактировании после выбора скрывать меню не нужно)
    if ((currentLi_klick != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        console.log("Хули еп");
        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
        const curHiddenMenuDeadlineNewDeadline = currentLi_klick.querySelector(".task__dopFunction__hidden-menu-deadline")


        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide") 

        // Удаляю календарь из task__dopFunction__hidden-menu-deadline, но с задержкой. Без задержки не сработает скрипт для изменения срока у таска (в файле scripts.js)
        setTimeout(() => changeMyCalendar("destroy"), 300);
        setTimeout(() => changeMyCalendar(null) , 300);
        
 

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        setIsNewDeadlineButtonClicked("")


        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi_klick.querySelector(".task__dopFuncs"))


        // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
        setCurrentLi_klick(null)
        setCurrentLi()


        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")   

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    } 
    // Если ранее ни на каком из тасков не была нажата кнопка "NewDeadline" (иконка)
    // Если скрытое меню выбора было открыто при создании/редактировании задачи
    else if ((currentLi_klick == null)) {
        setIsNewDeadlineButtonClicked("")
    }

    if (isObservHiddenMenus == false) {
        setIsObservHiddenMenus(true)     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(deadlineButton)   // Начинается слежка за "deadlineButton", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
})


// 3) При нажатии вне поля выбора (при открытии меню срока выполнения у таска при его редактировании/создании или при "Назначить срок" таска)
document.addEventListener("click", function(e) {     
    if (statusIsModal())  return  // Если МО открыто, то игнор

    // Если доп. меню срока выполнения (и у меню редактирования/создания задачи; и у доп. функции "назначить срок") - скрыто, то игнорируем
    if ((deadlineMenu.classList.contains("hide2") == true) && (!currentLi_klick)) return

    else if (currentLi_klick) {
        if (currentLi_klick.querySelector(".task__dopFunction__hidden-menu-deadline").classList.contains("hide2") == true) {
            console.log("Странно");
            return
        }
    }

    
    const targetLi = e.target.closest(".task")     // Элемент  li для последующего определения нового срока выполнения таску (одна из двух кнопок доп функций таска)

    const targetBtn = e.target.closest(".task__btnNewDeadline")   // Была ли нажата кнопка "NewDeadline" 


    // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
    let curHiddenMenuDeadlineNewDeadline = null
    // Если ранее была нажата кнопка "Назначить срок" у задачи, то переменной выше присваиваю нужное значение
    if (currentLi_klick != null) {
        curHiddenMenuDeadlineNewDeadline = currentLi_klick.querySelector(".task__dopFunction__hidden-menu-deadline")
    }


    

    // Если клик был вне поля выбора и вне элемента таска (li), и при этом ранее не был отмечен текущий таск по клику (перед этим кликом не нажалась кнопка ".task__btnNewDeadline" (иконка), после которой отображается меню выбора срока выполнения)
    if (!isSelectionMenuActive && targetLi == null && currentLi_klick == null) {     // Если клик был вне поля и не на кнопку ".task__btnNewDeadline" (на иконку) и ранее не был отмечен текущий таск по клику
        setIsObservHiddenMenus(false)
        observFunc(priorityButton)


        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(deadlineMenu, "hide")
        MyCalendarForm.destroy()    
        MyCalendarForm = null


        switchIsModal_block("false")       // Снимаю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline()

    } 
    
    // Если клик был вне поля выбора и вне элемента таска (li), и при этом уже был отмечен текущий таск по клику (ранее уже нажалась кнопка ".task__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
    else if (!isSelectionMenuActive && targetLi == null && currentLi_klick != null) {
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")
        changeMyCalendar("destroy")  
        changeMyCalendar(null)  
        
        
        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        setIsNewDeadlineButtonClicked("")

        // Скрываю доп функции таска
        hide_task_dopFuncs(currentLi_klick.querySelector(".task__dopFuncs"))

        setCurrentLi_klick(null)             // Удаляю отметку о текущем таске с отслеживателя по клику

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        switchIsModal_block("false")       // Снимаю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline()
    } 


    // Если клик был вне поля выбора, на элемент таска (li), но не на кнопку ".task__btnNewDeadline" и при этом ранее не был отмечен таск (ранее не нажималась кнопка ".task__btnNewDeadline", при нажатии на которую отображается меню выбора срока выполнения) 
    if (!isSelectionMenuActive && targetLi != null && !targetBtn && currentLi_klick == null) {
        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(deadlineMenu, "hide") 
        MyCalendarForm.destroy()    
        MyCalendarForm = null


        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Показываю доп. функции у того таска, на который был совершён клик (который был под курсором в момент клика)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        switchIsModal_block("false")   // Снимаю блокировку с открытия м.о.

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline()
    }


    // Если клик был вне поля выбора, на элемент таска (li), но не на кнопку ".task__btnNewDeadline" и при этом ранее уже был отмечен таск (ранее уже нажалась кнопка ".task__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
    else if (!isSelectionMenuActive && targetLi != null && !targetBtn && currentLi_klick != null) {
        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")
        changeMyCalendar("destroy")  
        changeMyCalendar(null)  

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        setIsNewDeadlineButtonClicked("")

        // Скрываю доп функции у текущего таска
        hide_task_dopFuncs(currentLi_klick.querySelector(".task__dopFuncs"))

        setCurrentLi_klick(null)           // Удаляю отметку о текущем таске с отслеживателя по клику

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        switchIsModal_block("true")        // Ставлю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Показываю доп. функции у того таска, на который был совершён клик (который был под курсором в момент клика)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline() 
    }

    
    if (isSelectionMenuActive) { 
        setTimeout(() => isSelectionMenuActive='', 100)
    }  
})








// Появление и скрытие поле с выбором приоритета задачи в меню создания/редактирования новой задачи

priorityButton.addEventListener("click", function(e) {      // При нажатии на кнопку
    // Очищаю выделение срока выполнения в списке вариантов и в календаре
    reloadItemsAndCalendarDeadline()

    const btnCross = priorityButton.querySelector(".form-from-add-new-task__icon-cross")

    // Если доп меню показано (не скрыто) и клик был на крестик и крестик показан (не скрыт)
    if (priorityMenu.classList.contains("hide2") == false && e.target == btnCross.querySelector("img") && btnCross.classList.contains("hide2") == false) {
        hiddenByDisplay(btnCross, "hide")  // ещё раз прописываю скрытие, ибо событие клика по крестику (отдельное) не скроет его (но изменит содержание тега с текстом)
    } 
    // Иначе, если доп меню показано (не скрыто) (и клик был не на крестик, соответственно, а лишь на кнопку выбора приоритета)
    else if (priorityMenu.classList.contains("hide2") == false) {
        hiddenByDisplay(priorityMenu, "hide") 
        setIsObservHiddenMenus(false)
        observFunc(priorityButton)

        // Убираю блокировку для открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
    // Иначе, если доп меню скрыто и клик был на крестик:
    else if (priorityMenu.classList.contains("hide2") == true && e.target == btnCross.querySelector("img")) {
        hiddenByDisplay(btnCross, "hide")
    }
    // Иначе, если доп меню скрыто (и клик был, соответственно, не на крестик)
    else if (priorityMenu.classList.contains("hide2") == true) {
        // Скрываю скрытые меню выбора типа таска и срока выполнения, если они были открыты
        hiddenByDisplay(taskTypeMenu, "hide")
        hiddenByDisplay(deadlineMenu, "hide")


        hiddenByDisplay(priorityMenu, "show")    // Отображаю скрытое меню выбора приоритета
        isSelectionMenuActive = 1;  

        setIsObservHiddenMenus(true)     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(priorityButton)  // При первом открытии скрытого меню, начнётся отслеживание изменения окна "priorityButton"

        // Переменная с названием приоритета, которое было выбрано (и уже прописано. Например, "p1")
        const selectedPriorityName = priorityButton.querySelector(".form-from-add-new-task__text-settings").innerText
        // Переменная с тем элементом приоритета из списка в скрытом меню, которое соответствует ранее выбранному приоритету
        const selectedPriority = priorityMenu.querySelector(`[aria-label="${selectedPriorityName}"]`).parentElement

        selectedPriority.classList.add("hovered_select_menu")    // Добавляю стиль выбранного элемента
        hiddenByDisplay(selectedPriority.querySelector(".form-from-add-new-task__priority-icon-selected"), "show")  // Показываю галочку у выбранного элемента



        // Блокирую возможность открытия м.о.
        switchIsModal_block("true")  

        // Запрещается показ доп. функций тасков
        switchDisabledShowDopFuncTask("true")
    }
})

priorityMenu.addEventListener("click", function(e) {     // При нажатии на само поля выбора
    isSelectionMenuActive = 1;
    
    if (isObservHiddenMenus == false && priorityButton.querySelector(".form-from-add-new-task__text-settings").innerText == "Приоритет") {
        setIsObservHiddenMenus(true)     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(priorityButton)   // Начинается слежка за "priorityButton", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
})

// При нажатии вне поля выбора - скрывается
document.addEventListener("click", function(e) {      

    // Если доп. меню приоритета - скрыто, то игнорируем
    if (priorityMenu.classList.contains("hide2") == true) return


    // Если М.О. открыто, то:
    if (statusIsModal()) {   
        // return
        const targetLi_modal = e.target.closest(".subtask")    // Элемент  li для последующего определения нового срока выполнения подзадаче (одна из двух кнопок доп функций подзадачи)       

        // Если клик был вне поля выбора и вне элемента подзадачи (li)
        if (!isSelectionMenuActive && targetLi_modal == null) {
            setIsObservHiddenMenus(false)
            observFunc(priorityButton)
            // Скрываю меню выбора приоритета
            hiddenByDisplay(priorityMenu, "hide")
            
            // Снимаю блокировку с открытия м.о.
            switchIsModal_block("false")  
    
            // Разрешаю показ доп. функций задач/подзадач
            switchDisabledShowDopFuncTask("false")
        }
        // Иначе, если клик был вне поля выбора и на элемент подзадачи (li)
        if (!isSelectionMenuActive && targetLi_modal != null) {
            setIsObservHiddenMenus(false)
            observFunc(priorityButton)
            // Скрываю меню выбора приоритета
            hiddenByDisplay(priorityMenu, "hide")


            // Снимаю блокировку с открытия м.о.
            switchIsModal_block("false")  

            // Разрешаю показ доп. функций задач/подзадач
            switchDisabledShowDopFuncTask("false")
    
            
            // Показываю доп. функции у той подзадачи, на которую был совершён клик (которая была под курсором в момент клика)
            targetLi_modal.querySelector(".subtask__dopFuncs").querySelector(".subtask__btnEdit").classList.remove("hide1")
            targetLi_modal.querySelector(".subtask__dopFuncs").querySelector(".subtask__btnNewDeadline").classList.remove("hide1")
        }
    
        if (isSelectionMenuActive) { 
            setTimeout(() => isSelectionMenuActive='', 100)
        }  


        // Игнорируем дальнейший код, который должен работать лишь если модальное окно закрыто.
        return
    }


    // Если МО закрыто, то выполняется следующий код:

    const targetLi = e.target.closest(".task")     // Элемент  li для последующего определения нового срока выполнения таску (одна из двух кнопок доп функций таска)


    // Если клик был вне поля выбора и вне элемента таска (li)
    if (!isSelectionMenuActive && targetLi == null) {
        setIsObservHiddenMenus(false)
        observFunc(priorityButton)
        hiddenByDisplay(priorityMenu, "hide")

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
    // Иначе, если клик был вне поля выбора и на элемент таска (li)
    if (!isSelectionMenuActive && targetLi != null) {
        setIsObservHiddenMenus(false)
        observFunc(priorityButton)
        hiddenByDisplay(priorityMenu, "hide")

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Показываю доп. функции у того таска, на который был совершён клик (который был под курсором в момент клика)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))
    }

    if (isSelectionMenuActive) { 
        setTimeout(() => isSelectionMenuActive='', 100)
    }  
})




// Скрытие меню добавления нового таска (/изменения выбранного) при нажатии на кнопку "Отмена" 
buttonCloseMenuNewTask.addEventListener("click", function(e) {
    if (!statusIsModal()) {
        hiddenByDisplay(taskForm, "hide")   // Скрывается Блок "taskForm"
        sectionContentBlock_viewContent.append(taskForm)  // Блок "taskForm" перемещается в конец

        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "taskForm"
        sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
            hiddenByDisplay(task, "show")
        })

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()


        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")


        
        // Если модальное окно для создания новой задачи открыто (которое открывается при клике на кнопку в sidebar главной страницы)
        const modalNewTaskElem = document.querySelector('.modalAddNewTask');
        if (modalNewTaskElem.classList.contains('active')) {
            // Функция для закрытия модального окна для создания новой задачи (которое открывается при клике на кнопку в sidebar главной страницы)
            closeModalNewTask()
        }



        if (!currentLi) return  // Если кнопка отмены была нажата вне поля редактирования таска, то игнорировать

        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Удаляю отметку о текущем таске с отслеживания при наведении
        setCurrentLi()
    }
})


// Скрытие меню добавления нового таска (/изменения выбранного) при нажатии "Enter", при фокусировке на этом поле
taskForm.addEventListener("keydown", function(e) {
    if (e.key == "Enter" && taskNameInput.value != "" && !statusIsModal()) {
        hiddenByDisplay(taskForm, "hide")   // Скрывается Блок "taskForm"
        sectionContentBlock_viewContent.append(taskForm)  // Блок "taskForm" перемещается в конец
        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "taskForm"
        sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
            hiddenByDisplay(task, "show")
        })

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
})


export {setCurrentLi, getCurrentLi, setCurrentLi_klick, setIsNewDeadlineButtonClicked, getIsNewDeadlineButtonClicked, setIsObservHiddenMenus, hide_task_dopFuncs, observFunc, show_task_dopFuncs}
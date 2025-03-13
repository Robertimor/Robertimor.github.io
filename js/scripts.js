'use strict';

import {hiddenByDisplay} from "./base.js"
import {countAllTasks, sectionContentBlock_viewContent, allCurrentTasksOuter, taskForm, taskNameInput, taskDescriptionInput, deadlineButton, deadlineOptions, deadlineCalendar, priorityButton, priorityMenu, priorityOptions, taskTypeMenu, taskTypeOptions, taskTypeButton,  buttonAddNewTask, buttonSaveTask, addNewTask, localLanguage, nowData, options1, options2, nowDay, nowMonth, currectEntryDate} from "./doomElements.js"
import {sortTasks, raspredTasks, reIndexTasks, setTasksId, getTasksId} from "./dataProcessing.js"
import {closeModalNewTask} from "./sidebar.js"
import {switchDisabledShowDopFuncTask, setCurrentLi, getCurrentLi, setCurrentLi_klick, setIsNewDeadlineButtonClicked, getIsNewDeadlineButtonClicked, setIsObservHiddenMenus, hide_task_dopFuncs, observFunc, show_task_dopFuncs} from "./toggleVisibleElements.js"



let MyCalendar
function changeMyCalendar(val) {
    if (val == null) {
        MyCalendar = null
    }
    else if (val == "destroy") {
        MyCalendar.destroy()
    }
    else if (val == "show") {
        MyCalendar.show()
    }
}



let isModal = "false"
window.localStorage.setItem("isModal", "false")

export function switchIsModal(status) {
    if (status == "false") {
        isModal = "false"
        window.localStorage.setItem("isModal", "false")
    }
    else if (status == "true") {
        isModal = "true"
        window.localStorage.setItem("isModal", "true")
    }
}


let isModal_block = "false"
window.localStorage.setItem("isModal_block", "false")

export function switchIsModal_block (status) {
    if (status == "false") {
        isModal_block = "false"
        window.localStorage.setItem("isModal_block", "false")
    }
    else if (status == "true") {
        isModal_block = "true"
        window.localStorage.setItem("isModal_block", "true")
    }
}









let all_tasks    // Массив из созданных тасков
if (window.localStorage.getItem("all_tasks")) {
    all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))
} 
else {
    all_tasks = []
    window.localStorage.setItem("all_tasks", JSON.stringify(all_tasks))
}



function addNewTaskMass(el) {
    all_tasks.push(el)
    window.localStorage.setItem("all_tasks", JSON.stringify(all_tasks))
}
export function removeTaskMass(idTask, num) {
    all_tasks.splice(idTask, num)
    window.localStorage.setItem("all_tasks", JSON.stringify(all_tasks))
}

// Функция для перезаписи массива тасков. Как в самом файле, так и в localStorage
export function reloadAllTasks(newVersion) {
    all_tasks = newVersion
    window.localStorage.setItem("all_tasks", JSON.stringify(newVersion))
}


countAllTasks.innerText = all_tasks.length   // Вписывание количество тасков в поле для их подсчёта




 


let isNewDeadlineButtonClicked = getIsNewDeadlineButtonClicked()           // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)









// Кнопка редактирования тасков
sectionContentBlock_viewContent.addEventListener("click", function(e) {

    let target = e.target.closest(".task__btnEdit")   // Нажатая кнопка "edit"
    // Если нажатие было не по кнопке редактирования, то игнор
    if (!target) return

    let targetLi = e.target.closest(".task")       // Задача, внутри которой был нажат "edit"

    // Блокирую возможность открытия м.о.
    switchIsModal_block("true") 

    


    // В область выбранного таска добавляется поле для внесение изменений (вместо самого li, который скрывается)
    targetLi.append(taskForm)   

    // Убирается скрытие li со всех элементов (если до этого какой-то скрылся, из-за незаконченного редактирования)
    sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {  
        hiddenByDisplay(task, "show")  
    })
    hiddenByDisplay(targetLi.querySelector(".task__wrapper"), "hide")        // Скрывается li
    hiddenByDisplay(taskForm, "show")  
    hiddenByDisplay(userMenu, "show")  // Убирает скрытие с формы изменения таска, которая перенеслась в место элемента li


    // Скрываю кнопку для создания таска. И показываю кнопку для сохранения изменений при редактированини таска
    hiddenByDisplay(buttonAddNewTask, "hide")
    hiddenByDisplay(buttonSaveTask, "show")


    let liFromArr   // Таск из массива
    // Перебираю массив тасков и сохраняю в "liFromArr" id того, что совпадает с id выбранного для редактирования таска (li)
    for (let i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].newTask_ID == targetLi.getAttribute("id")) {
            liFromArr = all_tasks[i]   
            break
        }
    }

    // Вставляю данные у выбранного таска в меню редактирования
    copyAndPushLabelsTask(liFromArr)

    // Блокирую показ доп. функций
    switchDisabledShowDopFuncTask("true")
})

// Функция для вставки полей у таска, в форму для редактирования этого выбранного таска
function copyAndPushLabelsTask(settingsTask) {
    taskNameInput.value = settingsTask.newTask_name   // Имя таска
    taskDescriptionInput.value = settingsTask.newTask_description    // Описание таска

    taskTypeButton.querySelector(".form-from-add-new-task__name-type-task").innerText = settingsTask.newTask_typeTask_name  // Имя типа таска
    taskTypeButton.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", settingsTask.newTask_typeTask_icon_src)  // Иконка типа таска
    deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerText = settingsTask.newTask_deadlineTask
    deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerText = settingsTask.newTask_deadlineFullDataTask
    priorityButton.querySelector(".form-from-add-new-task__text-settings").innerText = settingsTask.newTask_priority_name   // Имя приоритета
    priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", `./icon/priority_${settingsTask.newTask_priority_color}.png`)    // Цвет флага
}

// При нажатии на кнопку "сохранить" при редактировании таска
buttonSaveTask.addEventListener("click", function (e) {
    if (buttonSaveTask.getAttribute("aria-disabled") == "false" && (isModal == "false")) {
        let targetLi = e.target.closest(".task")

        let liFromArr   // Таск из массива
        // Перебираю массив тасков и сохраняю в "liFromArr" id того, что совпадает с id выбранного для редактирования таска (li)
        for (let i = 0; i < all_tasks.length; i++) {
            if (all_tasks[i].newTask_ID == targetLi.getAttribute("id")) {
                liFromArr = all_tasks[i]   
                break
            }
        }


        // Обновляю данные таска в массиве тасков и в html елементе таска
        updateDataTask_arr(targetLi, liFromArr)
        updateDataTask_element(targetLi, liFromArr)


        // Запускаю функцию для переноса задачи в раздел просроченных, если её дата выполнения меньше чем сегодняшний день
        raspredTasks()


        // Обновляю массив с тасками в js и в localStorage (перезаписываю с учётом изменений)
        reloadAllTasks(all_tasks)


        // Скрывается Блок "taskForm"
        hiddenByDisplay(taskForm, "hide")   
        // Блок "taskForm" перемещается в конец
        sectionContentBlock_viewContent.append(taskForm)  
        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "taskForm"
        sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
            hiddenByDisplay(task, "show")  
        })

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()



        const currentLi = document.getElementById(`${getCurrentLi()}`)
        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Удаляю отметку о текущем таске с отслеживания при наведении
        setCurrentLi()

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false") 
        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
})

// Функция для обновления данных таска внутри массива тасков
function updateDataTask_arr(curTargetLi, taskArr) {  
    // Создаём полную дату + с текущим временем (нужно для дальнейшей сортировки)
    let fullDateTask = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerText
    let nowTimeTask = new Date().toLocaleTimeString("ru-RU");

    let [year, month, day] = fullDateTask.split(".").reverse().map(Number)
    let [hours, minutes, seconds] = nowTimeTask.split(":").map(Number);

    // Создаём объект Date (месяцы в JS начинаются с 0, поэтому вычитаем 1)
    let fullDateCreated = new Date(year, month - 1, day, hours + 3, minutes, seconds);


    // Обновляю данные (в т.ч. срок выполнения) в массиве текущего таска
    taskArr.newTask_name = taskNameInput.value
    taskArr.newTask_description = taskDescriptionInput.value
    taskArr.newTask_typeTask_name = taskTypeButton.querySelector(".form-from-add-new-task__name-type-task").innerText   // Имя типа таска
    taskArr.newTask_typeTask_icon_src = taskTypeButton.querySelector(".form-from-add-new-task__icon_type").getAttribute("src") // Иконка типа таска
    taskArr.newTask_deadlineTask = deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerText
    taskArr.newTask_deadlineFullDataTask = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerText
    taskArr.newTask_dateCreated = fullDateCreated
    taskArr.newTask_priority_name = priorityButton.querySelector(".form-from-add-new-task__text-settings").innerText

    // Создаю переменную для выяснения названия цвета у приоритета. Беру содержание тега src у выбранного изображения и разбиваю его на массив.
    let arrColor = priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src").split("")
    arrColor.splice(-4)     // Удаляю последние 4 символа (".png")
    arrColor.splice(0, 16)  // Удаляю первые 16 символов, оставляя лишь название самого цвета

    taskArr.newTask_priority_color = arrColor.join("")      // Название цвета у приоритета выбранного пользователем таска



    // Обновляю текущий таск из массива с тасками (локально в массиве текущего файла)
    all_tasks[curTargetLi.getAttribute("id")-1] = taskArr
    
    // Обновляю массив с тасками в js и в localStorage (перезаписываю с учётом изменений)
    reloadAllTasks(all_tasks)

    let statusTask
    if (curTargetLi.parentElement.classList.contains("tasks__tasks-list")) {
        statusTask = "normal"
    } else if (curTargetLi.parentElement.classList.contains("overdue__tasks-list")) {
        statusTask = "overdue"
    }
    sortTasks(curTargetLi.parentElement, true, statusTask)
    
    // Запускаю функцию для переноса задачи в раздел просроченных, если её дата выполнения меньше чем сегодняшний день
    raspredTasks()
}
// Функция для обновления данных элемента таска
export function updateDataTask_element(taskEl, taskArr) {
        taskEl.querySelector(".task__name-task").innerText = taskArr.newTask_name      // Название таска
        taskEl.querySelector(".task__description-task-text").innerText = taskArr.newTask_description    // Описание таска
        

        taskEl.querySelector(".task__deadline__date_visible").innerText = taskArr.newTask_deadlineTask   // Поле с текстом со сроком выполнения данного таска (вне мо, на основной странице)
        taskEl.querySelector(".task__deadline__date_hidden").innerText = taskArr.newTask_deadlineFullDataTask    // Поле с полной числовой датой срока выполнения (вне мо, на основной странице)
    
        taskEl.querySelector(".task__typeTask span").innerText = taskArr.newTask_typeTask_name  // Имя типа таска

        taskEl.querySelector(".task__imgBlock-typeTask img").setAttribute("src", taskArr.newTask_typeTask_icon_src)  // Иконка типа таска
        
        taskEl.querySelector(".task__wrapper-button-task-checkbox button").className = "task__button-task-checkbox"  // Очищаю от текущеко класса, отвечающего за цвет. Оставляю лишь общий
        taskEl.querySelector(".task__wrapper-button-task-checkbox button").classList.add(`task__button-task-checkbox_${taskArr.newTask_priority_color}`)      // Цвет кружка  

        taskEl.querySelector(".task__wrapper-button-task-checkbox img").setAttribute("src", `./icon/MarkOk_${taskArr.newTask_priority_color}.png`)     // Цвет галочки внутри кружка
}




// Кнопка добавления нового срока выполнения таску (одна из 2 доп функций таска)
// (При нажатии на доп функцию "Назначить срок" у таска)
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    const targetBtn = e.target.closest(".task__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 
    const targetBtnIcon = e.target.closest(".task__dopFunction_iconWrap")
    isNewDeadlineButtonClicked = getIsNewDeadlineButtonClicked()

    
    // Если клик был вне контейнера с кнопкой "NewDeadline", то игнорируем
    if (!targetBtn) return

    // Если клик был вне контейнера с иконкой кнопки "NewDeadline" (даже если например, на календарь), то игнорируем
    if (!targetBtnIcon) return


    const targetTask = e.target.closest(".task")


    // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
    const curHiddenMenuDeadlineNewDeadline = targetBtn.querySelector(".task__dopFunction__hidden-menu-deadline")

    const curHiddenCalendarContainer = targetBtn.querySelector(".task__dopFunction__hidden-menu-deadline-calendare")
    const curHiddenCalendar = targetBtn.querySelector(".hidden-menu-deadline-calendare")



    


    // Если меню скрыто
    if (curHiddenMenuDeadlineNewDeadline.classList.contains("hide2") == true) {  
        // Показываю это меню выбора (удаляю скрытие) 
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "show")  


        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = targetTask.querySelector(".task__deadline__date_hidden")

        // Полная дата, которая была перевёрнута (стала: "год.месяц.число")
        const textAreaDeadlineHiddenNumReversed = textAreaDeadlineHiddenNum.innerText.split(".").reverse().join(".")

        
        MyCalendar = new AirDatepicker(curHiddenCalendar, {
            inline: false,  
            buttons: ["today", "clear"],
            minDate: currectEntryDate,
            container: curHiddenCalendarContainer,
            selectedDates: `${textAreaDeadlineHiddenNumReversed}`,
            autoClose: true,
            // isDestroyed: true
        })
        MyCalendar.show();


        // Отмечаю нажатие на кнопку назначения нового срока выполнения
        setIsNewDeadlineButtonClicked(1)

        // Отмечаю в глобальную переменную - таск, внутри которого был совершён клик по кнопке
        setCurrentLi_klick((e.target.closest("li")).getAttribute("id"))          


        const currentLi = document.getElementById(`${getCurrentLi()}`)
        hide_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        switchIsModal_block("true")

        // Запрещается показ доп. функций тасков
        switchDisabledShowDopFuncTask("true")
    }
    
    // Если меню отображено (не скрыто)
    else if (curHiddenMenuDeadlineNewDeadline.classList.contains("hide2") == false && isNewDeadlineButtonClicked) {  
        // Скрываю это меню выбора и уничтожаю созданный календарь
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")  
        MyCalendar.destroy()
        MyCalendar = null


        setTimeout(() => isNewDeadlineButtonClicked='', 100)
        setTimeout(() => setIsNewDeadlineButtonClicked(""), 100)

        // Удаляю отметку о текущем таске       
        setCurrentLi_klick(null)                 

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        const currentLi = document.querySelector(`#${getCurrentLi()}`)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        switchIsModal_block("false")
    }
})









// Функция удаления тасков при нажатии на кружок
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    let target = e.target.closest(".task__button-task-checkbox")   //Нажатый кружок
    let targetLi = e.target.closest(".task")       // Задача, внутри которой был нажат кружок
    if (!target) return

    removeTask(targetLi)
})

function removeTask(curTask) {
    curTask.remove()    // Удаляю задачу из html

    let liFromArr   // id таска в массиве
    // Перебираю массив тасков и id того, что совпадает с id  html-элементом таска, который собираются удалить
    for (let i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].newTask_ID == curTask.getAttribute("id")) {
            liFromArr = i   
            break
        }
    }


    // Удаляю этот таск из массива с тасками
    removeTaskMass(liFromArr, 1)

    reIndexTasks()
}







// При нажатии на кнопку добавления таска (открытие меню для внесения данных к новому создаваемогу таску)
addNewTask.addEventListener("click", function(e) {
    sectionContentBlock_viewContent.append(taskForm)
    // Убираю скрытие у элемента li, вместо которого ранее могло подставляться поле для редактирования
    sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
        hiddenByDisplay(task, "show") 
    })
    hiddenByDisplay(taskForm, "show") 
    
    // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
    reloadFormAddTask()
 

    // Блокирую возможность открытия м.о.
    switchIsModal_block("true")
    // Разрешаю показ доп. функций тасков
    switchDisabledShowDopFuncTask("true")
})






// Выбор типа таска в меню выбора при создании новой задачи
taskTypeOptions.forEach(function(type) {
    type.addEventListener("click", function(e) {
        taskTypeButton.querySelector(".form-from-add-new-task__name-type-task").innerText = type.querySelector(".wrapper-type-task__name").innerText
        const selectedIcon = type.querySelector(".wrapper-type-task__icon-type-project")
        taskTypeButton.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", selectedIcon.getAttribute("src"))

        
        // Разрешаю показ доп функций и скрываю меню выбора приоритета 
        switchDisabledShowDopFuncTask("false")

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        hiddenByDisplay(taskTypeMenu, "hide") 
    })
})




// Функция для очистки стиля "выбранного элемента" со всех deadlineOptions и у всех ячеек календаря, если он где-то был (удаляю со всех элементов класс "hovered_select_menu").
// Данная функция используется при редактировании срока у ТАСКОВ (кроме бокового меню в МО)
function reloadItemsAndCalendarDeadline() {
    // Очищаю выделение срока в списке вариантов (в форме для создания, редактирования задачи)
    deadlineOptions.forEach(function(itemDeadline) { 
        itemDeadline.classList.remove("hovered_select_menu")
    })

    // Очищаю выделение срока в календаре (в форме для создания, редактирования задачи)
    if (selectedDay && selectedDay != "") {
        selectedDay.classList.remove("-selected-")
    }
}


// Изменение полей выбора срока выполнения и приоритета, при нажатии на крестик
taskForm.querySelectorAll(".form-from-add-new-task__icon-cross").forEach(function(crossItem) {
    crossItem.addEventListener("click", function(e) {
        const parentEl = crossItem.closest("div")
        // Изменение у срока выполнения
        if (parentEl.classList.contains("form-from-add-new-task__select-deadline")) {       
            parentEl.querySelector(".form-from-add-new-task__text-settings").innerText = "Срок выполнения"
            // Очищаю выделение срока в списке вариантов
            deadlineOptions.forEach(function(itemDeadline) { 
                itemDeadline.classList.remove("hovered_select_menu")
            })
            // Очищаю выделение срока в календаре
            if (selectedDay && selectedDay != "") {
                selectedDay.classList.remove("-selected-")
            }

        // Изменение у приоритета
        } else if (parentEl.classList.contains        ("form-from-add-new-task__select-priority")) {    
            parentEl.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", "./icon/priority_0.png")
            parentEl.querySelector(".form-from-add-new-task__text-settings").innerText = "Приоритет"
            
            priorityOptions.forEach(function(itemPriority) { 
                // Удаляю стиль выбранного элемента у ранее выбранного элемента
                itemPriority.classList.remove("hovered_select_menu")    
                // Удаляю галочки у ранее выбранного элемента (если такой был)
                hiddenByDisplay(itemPriority.querySelector(".form-from-add-new-task__priority-icon-selected"), "hide")     
            })
        }
    })
})










//Функция для очистки стиля "выбранного элемента" со всех deadlineOptions, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик. 
// Данная функция используется при редактировании срока у ТАСКОВ (кроме бокового меню в МО)
function reloadItemsDeadline(currentItemDeadline) {
    // 1) Если передан целиков список

    // 1.1) Если в данный параметр был передан целиком список из "Назначить срок"
    if (currentItemDeadline.classList.contains("task__dopFunction__deadline-list")) {
        currentItemDeadline.querySelectorAll("li").forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
    }
    // 1.2) Иначе, Если в данный параметр был передан целиком список из меню создания/редактирования задачи
    else if (currentItemDeadline.classList.contains("form-from-add-new-task__deadline-list")) {
        currentItemDeadline.querySelectorAll("li").forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
    }


    // 2) Если был передан конкретный элемент списка

    // 2.1) Если элемент списка срока находится внутри "Назначить срок"
    else if (currentItemDeadline.classList.contains("task__dopFunction__deadline-item")) {
        const parentCurDeadlineItems = currentItemDeadline.closest("ul")
        parentCurDeadlineItems.querySelectorAll("li").forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
    } 

    // 2.2) Иначе, если элемент списка срока находится в меню при создании/редактировании задачи
    else if (currentItemDeadline.classList.contains("form-from-add-new-task__deadline-item")) {
        deadlineOptions.forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
        currentItemDeadline.classList.add("hovered_select_menu")
    }
}



// ВЫБОР СРОКА ВЫПОЛНЕНИЯ ТАСКА:

// 1) Выбор срока выполнения таска (при выборе из списка вариантов):

// 1.1) Если меню выбора срока было открыто через доп. функцию таска "Назначить срок", то ...
// (При клике на один из пунктов выбора срока выполнения задачи (из списка вариантов), при выборе через "Назначить срок")
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    const targetBtn = e.target.closest(".task__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 

    // Если клик был вне контейнера с кнопкой "NewDeadline" у ТАСКА, то игнорируем
    if (!targetBtn) return

    const targetLi = e.target.closest(".task")  // Задача, внутри которой была нажата кнопка "Назначить срок"
    const deadlineItemNewDeadline = targetLi.querySelectorAll(".task__dopFunction__deadline-item")  // Все элементы для выбора срока выполнения у данного таска


    // Запускаю функцию для создания одноразового обработчика события на каждом из элементов и сразу его вызова на элементе
    deadlineItemsClick(deadlineItemNewDeadline)
})
// Функция для создания обработчика событий на все элементы списка выбора срока выполнения. При нажатии на какой-то из них, сразу происходит работа.
function deadlineItemsClick(items) {
    items.forEach(function(item) {
        item.addEventListener("click", function(e) {
            // Элемент  li для последующего определения нового срока выполнения задаче (через доп. функцию "Назначить срок выполнения")
            const targetLi = e.target.closest(".task")



            // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
            if (selectedDay && selectedDay != "") {
                selectedDay.classList.remove("-selected-")
            }
    
    
            const nowData2 = new Date()
    
            let liFromArr   // Таск из массива
            // Перебираю массив тасков и сохраняю в "liFromArr" тот элемент, что совпадает с id выбранного для редактирования таска (li)
            for (let i = 0; i < all_tasks.length; i++) {
                if (all_tasks[i].newTask_ID == targetLi.getAttribute("id")) {
                    liFromArr = all_tasks[i]   
                    break
                }
            }

            // Название выбранного дня (из списка)
            const nameItemDeadline = item.querySelector(".task__dopFunction__deadline-name").innerText

            // Поле с текстом со сроком выполнения данного таска (нужно для доп функции "Назначить срок") (внизу слева у каждого таска)
            const deadlineThisTask = targetLi.querySelector(".task__deadline__date_visible")

            // Поле с полной датой в числовом формате у данного таска 
            const deadlineThisTaskFullNum = targetLi.querySelector(".task__deadline__date_hidden")


            if (nameItemDeadline == "Сегодня" && deadlineThisTask.innerText != `${nowDay} ${nowMonth}`) {
                deadlineThisTask.innerText = `${nowDay} ${nowMonth}`

                deadlineThisTaskFullNum.innerText = nowData2.toLocaleDateString()


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "Завтра" && deadlineThisTask.innerText != `${nowDay+1} ${nowMonth}`) {
                deadlineThisTask.innerText = `${nowDay+1} ${nowMonth}`

                nowData2.setDate(nowDay+1)
                deadlineThisTaskFullNum.innerText = nowData2.toLocaleDateString()


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "На выходных") {
                let dataWeekend = new Date()    // Создаю новый объект даты

                // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
                if (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend) != "суббота") {
                    dataWeekend.setDate(dataWeekend.getDate() + 1)
                }
                // Увеличиваю дату пока не достигну субботы
                while (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend) != "суббота") {
                    dataWeekend.setDate(dataWeekend.getDate() + 1)
                }
    
                // Если ближайшая суббота уже не была выбрана, то...
                if (deadlineThisTask.innerText != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend)}`) {
                    deadlineThisTask.innerText = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend)}`

                    deadlineThisTaskFullNum.innerText = dataWeekend.toLocaleDateString()
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadline(item)
                }
    
            } else if (nameItemDeadline == "След. неделя") {
                let dataNextWeek = new Date()   // Создаю новый объект даты
                dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)
    
                if (deadlineThisTask.innerText != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek)}`) {
                    deadlineThisTask.innerText = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek)}`

                    deadlineThisTaskFullNum.innerText = dataNextWeek.toLocaleDateString()
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadline(item)
                }
    
            } else if (nameItemDeadline == "Без срока" && deadlineThisTask.innerText != "Срок выполнения") {
                setIsObservHiddenMenus(false)
    
                deadlineThisTask.innerText = "Срок выполнения"
                deadlineThisTaskFullNum.innerText = "Срок выполнения"


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "Без срока" && deadlineThisTask.innerText == "Срок выполнения") {
                setIsObservHiddenMenus(false)
            }


            // Создаём полную дату + с текущим временем (нужно для дальнейшей сортировки)
            let fullDateTask = deadlineThisTaskFullNum.innerText
            let nowTimeTask = new Date().toLocaleTimeString("ru-RU");

            let [year, month, day] = fullDateTask.split(".").reverse().map(Number)
            let [hours, minutes, seconds] = nowTimeTask.split(":").map(Number);

            // Создаём объект Date (месяцы в JS начинаются с 0, поэтому вычитаем 1)
            let fullDateCreated = new Date(year, month - 1, day, hours + 3, minutes, seconds);


            // Обновляю срок выполнения в массиве текущего таска
            liFromArr.newTask_deadlineTask = deadlineThisTask.innerText
            liFromArr.newTask_deadlineFullDataTask = deadlineThisTaskFullNum.innerText
            liFromArr.newTask_dateCreated = fullDateCreated

            // Обновляю текущий таск из массива с тасками (локально в массиве текущего файла)
            all_tasks[targetLi.getAttribute("id")-1] = liFromArr
            
            // Обновляю массив с тасками в js и в localStorage (перезаписываю с учётом изменений)
            reloadAllTasks(all_tasks)

            let statusTask
            if (targetLi.parentElement.classList.contains("tasks__tasks-list")) {
                statusTask = "normal"
            } else if (targetLi.parentElement.classList.contains("overdue__tasks-list")) {
                statusTask = "overdue"
            }
            sortTasks(targetLi.parentElement, true, statusTask)
            
            // Запускаю функцию для переноса задачи в раздел просроченных, если её дата выполнения меньше чем сегодняшний день
            raspredTasks()

            
        }, { once: true })
    })
}   




// 1.2) Если меню выбора срока было открыто при создании/редактировании таска (т.е. не через доп. функцию "Назначить срок"), то ...
// (При клике на один из пунктов выбора срока выполнения задачи (из списка вариантов), при выборе из "form-from-add-new-task__hidden-menu-deadline") 
deadlineOptions.forEach(function(item) {
    item.addEventListener("click", function(e) {
        if (isModal != "false") return    // Если МО открыто, то игнор

        // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
        if (selectedDay && selectedDay != "") {
            selectedDay.classList.remove("-selected-")
        }


        const nowData2 = new Date()

        console.log("дырка");
        console.log("ЛАКИ ЛАКИ");

        // Название выбранного дня (из списка)
        const nameItemDeadline = item.querySelector(".form-from-add-new-task__deadline-name").innerText

        // Поле с текстом для выбранного срока
        const textAreaDeadline = deadlineButton.querySelector(".form-from-add-new-task__text-settings")

        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num")
        

        if (nameItemDeadline == "Сегодня" && textAreaDeadline.innerText != `${nowDay} ${nowMonth}`) {
            textAreaDeadline.innerText = `${nowDay} ${nowMonth}`

            textAreaDeadlineHiddenNum.innerText = nowData2.toLocaleDateString()

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline(item)

        } else if (nameItemDeadline == "Завтра" && textAreaDeadline.innerText != `${nowDay+1} ${nowMonth}`) {
            textAreaDeadline.innerText = `${nowDay+1} ${nowMonth}`
            
            nowData2.setDate(nowDay+1)
            textAreaDeadlineHiddenNum.innerText = nowData2.toLocaleDateString()

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline(item)

        } else if (nameItemDeadline == "На выходных") {
            let dataWeekend = new Date()    // Создаю новый объект даты
            // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
            if (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend) != "суббота") {
                dataWeekend.setDate(dataWeekend.getDate() + 1)
            }
            // Увеличиваю дату пока не достигну субботы
            while (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend) != "суббота") {
                dataWeekend.setDate(dataWeekend.getDate() + 1)
            }


            // Если ближайшая суббота уже не была выбрана, то...
            if (textAreaDeadline.innerText != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend)}`) {
                textAreaDeadline.innerText = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend)}`

                textAreaDeadlineHiddenNum.innerText = dataWeekend.toLocaleDateString()

                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
            }

        } else if (nameItemDeadline == "След. неделя") {
            let dataNextWeek = new Date()   // Создаю новый объект даты
            dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)

            if (textAreaDeadline.innerText != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek)}`) {
                textAreaDeadline.innerText = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek)}`

                textAreaDeadlineHiddenNum.innerText = dataNextWeek.toLocaleDateString()

                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
            }

        } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerText != "Срок выполнения") {
            setIsObservHiddenMenus(false)


            textAreaDeadline.innerText = "Срок выполнения"
            textAreaDeadlineHiddenNum.innerText = "Срок выполнения"

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline(item)

            hiddenByDisplay(deadlineButton.querySelector(".form-from-add-new-task__icon-cross"), "hide")
        } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerText == "Срок выполнения") {
            setIsObservHiddenMenus(false)
        }
    })
})



// 2) Выбор срока выполнения таска (при выборе в календаре):
let selectedDay = ""
function selectSelectedDay(val) {
    selectedDay = val
    window.localStorage.setItem("selectedDay", val)
}

// 2.1) Если меню выбора открыто через "Назначить срок", то...
// (При клике на день в календаре, при выборе из "task__dopFunction__hidden-menu-deadline") 
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    if (isModal != "false") return    // Если МО открыто, то игнор

    let target = e.target       // Где был совершён клик?

    const targetBtn = e.target.closest(".task__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 


    // Если клик был вне контейнера с кнопкой "NewDeadline" у ТАСКА, то игнорируем
    if (!targetBtn) return

    // Если клик был не на элементе с ячейкой даты, то клик игнорируется

    if (!target.classList.contains("air-datepicker-cell")) return  
    
    const targetLi = e.target.closest(".task")  // Задача, внутри которой была нажата кнопка "Назначить срок"


    // Целиком список сроков из списка вариантов (ul) (при открытии из "Назначить срок") 
    const deadlineItemNewDeadline = targetLi.querySelector(".task__dopFunction__deadline-list")  

    // Очищаю выделение срока со всех элементов из списка выбора вариантов
    reloadItemsDeadline(deadlineItemNewDeadline)


    // Поле с текстом со сроком выполнения данного таска (нужно для доп функции "Назначить срок") (внизу слева у каждого таска)
    const deadlineThisTask = targetLi.querySelector(".task__deadline__date_visible")

    // Поле с полной датой в числовом формате у данного таска 
    const deadlineThisTaskFullNum = targetLi.querySelector(".task__deadline__date_hidden")


    selectedDay = target


    const dateDay = selectedDay.getAttribute("data-date")   // Выбранный номер дня месяца
    const dateMonth = selectedDay.getAttribute("data-month")    // Выбранный месяц (числом)
    const dateYear = selectedDay.getAttribute("data-year") // Выбранный год

    // Создаю каллендарь на основании выбранного дня, месяца и года
    const selectDataCalendare = new Date(dateYear, dateMonth, dateDay)        
    const optionsSelection = {  
        month: "short"
    }
    // Создаю переменную с текстовым обозначением выбранного в календаре месяца
    const selectMonthDataCalendare = (Intl.DateTimeFormat(localLanguage, optionsSelection).format(selectDataCalendare))

    // Ввожу в поле с выбором срока выполнения - выбранную в календаре дату (число + месяц)
    setIsObservHiddenMenus(true)
    observFunc(deadlineButton)
    if (deadlineThisTask.innerText != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
        deadlineThisTask.innerText = dateDay + " " + selectMonthDataCalendare
    }

    deadlineThisTaskFullNum.innerText = selectDataCalendare.toLocaleDateString()


    let liFromArr   // Таск из массива
    // Перебираю массив тасков и сохраняю в "liFromArr"  тот таск, id которого совпадает с id выбранного для редактирования таска (li)
    for (let i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].newTask_ID == targetLi.getAttribute("id")) {
            liFromArr = all_tasks[i]   
            break
        }
    }



    // Создаём полную дату + с текущим временем (нужно для дальнейшей сортировки)
    let fullDateTask = deadlineThisTaskFullNum.innerText
    let nowTimeTask = new Date().toLocaleTimeString("ru-RU");

    let [year, month, day] = fullDateTask.split(".").reverse().map(Number)
    let [hours, minutes, seconds] = nowTimeTask.split(":").map(Number);

    // Создаём объект Date (месяцы в JS начинаются с 0, поэтому вычитаем 1)
    let fullDateCreated = new Date(year, month - 1, day, hours + 3, minutes, seconds);


    // Обновляю срок выполнения в массиве текущего таска
    liFromArr.newTask_deadlineTask = deadlineThisTask.innerText
    liFromArr.newTask_deadlineFullDataTask = deadlineThisTaskFullNum.innerText
    liFromArr.newTask_dateCreated = fullDateCreated

    // Обновляю текущий таск из массива с тасками (локально в массиве текущего файла)
    all_tasks[targetLi.getAttribute("id")-1] = liFromArr
    
    // Обновляю массив с тасками в js и в localStorage (перезаписываю с учётом изменений)
    reloadAllTasks(all_tasks)

    let statusTask
    if (targetLi.parentElement.classList.contains("tasks__tasks-list")) {
        statusTask = "normal"
    } else if (targetLi.parentElement.classList.contains("overdue__tasks-list")) {
        statusTask = "overdue"
    }
    sortTasks(targetLi.parentElement, true, statusTask)
    
    // Запускаю функцию для переноса задачи в раздел просроченных, если её дата выполнения меньше чем сегодняшний день
    raspredTasks()
})



// 2.2) Если меню выбора открыто создании/редактировании таска, то...
// (При клике на день в календаре, при выборе из "form-from-add-new-task__hidden-menu-deadline") 
deadlineCalendar.addEventListener("click", function(e) {
    if (isModal != "false") return    // Если МО открыто, то игнор

    let target = e.target       // Где был совершён клик?


    // Если клик был не на элементе с ячейкой даты, то клик игнорируется
    if (!target.classList.contains("air-datepicker-cell")) return       


    // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
    const deadlineHiddenList = target.closest(".form-from-add-new-task__hidden-menu-deadline").querySelector(".form-from-add-new-task__deadline-list")

    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
    reloadItemsDeadline(deadlineHiddenList)


    // Поле для вставки и отображения выбранной даты у таска (с текстовым отображением месяца)
    const textAreaDeadline = deadlineButton.querySelector(".form-from-add-new-task__text-settings")

    // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
    const textAreaDeadlineHiddenNum = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num")


    selectedDay = target
    

    const dateDay = selectedDay.getAttribute("data-date")   // Выбранный номер дня месяца
    const dateMonth = selectedDay.getAttribute("data-month")    // Выбранный месяц (числом)
    const dateYear = selectedDay.getAttribute("data-year") // Выбранный год


    // Создаю каллендарь на основании выбранного дня, месяца и года
    const selectDataCalendare = new Date(dateYear, dateMonth, dateDay)        

    const optionsSelection = {  
        month: "short"
    }


    // Создаю переменную с текстовым обозначением выбранного в календаре месяца
    const selectMonthDataCalendare = (Intl.DateTimeFormat(localLanguage, optionsSelection).format(selectDataCalendare))



    // Ввожу в поле с выбором срока выполнения - выбранную в календаре дату (число + месяц)
    setIsObservHiddenMenus(true)
    observFunc(deadlineButton)
    if (textAreaDeadline.innerText != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
        textAreaDeadline.innerText = dateDay + " " + selectMonthDataCalendare
    }
    textAreaDeadlineHiddenNum.innerText = selectDataCalendare.toLocaleDateString()
})






// Выбор приоритета таска:

function reloadItemsPriority(currentItemPriority) {
    priorityOptions.forEach(function(itemPriority) { 
        itemPriority.classList.remove("hovered_select_menu")    // Удаляю стиль выбранного элемента у ранее выбранного элемента
        hiddenByDisplay(itemPriority.querySelector(".form-from-add-new-task__priority-icon-selected"), "hide")    // Удаляю галочки у ранее выбранного элемента (если такой был)
    })
    // Добавляю стиль выбранного элемента
    currentItemPriority.classList.add("hovered_select_menu")    
    // Показываю галочку у выбранного элемента
    hiddenByDisplay(currentItemPriority.querySelector(".form-from-add-new-task__priority-icon-selected"), "show")  
}

priorityOptions.forEach(function(item) {
    item.addEventListener("click", function(e) {
        const selectedIcon = item.querySelector(".form-from-add-new-task__priority-icon")   // Создаю переменную - иконка выбранного приоритета

        if (item.querySelector(".form-from-add-new-task__priority-name").getAttribute("aria-label") == "Приоритет") {
            setIsObservHiddenMenus(false)
            hiddenByDisplay(priorityButton.querySelector(".form-from-add-new-task__icon-cross"), "hide") 
        }

        // Подставляю в поле выбранного приоритета - иконку и "aria-label" выбранного приоритета, если выбираемый приоритет не является уже выбранным
        if (priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") != selectedIcon.getAttribute("src")) {
            priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", selectedIcon.getAttribute("src"))
            priorityButton.querySelector(".form-from-add-new-task__text-settings").innerText = item.querySelector(".form-from-add-new-task__priority-name").getAttribute("aria-label")
    
            //Очищаю стиль "выбранного элемента" со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). А так же скрываю галочку справа (показывающую какой элемент пользователь выбрал) с элемента, у которого он показывался ранее (если был) и показываю на выбранном элементе
            reloadItemsPriority(item)
        }

        // Разрешаю показ доп функций и скрываю меню выбора приоритета 
        switchDisabledShowDopFuncTask("false")
        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  
        hiddenByDisplay(priorityMenu, "hide") 
    })
})







// При нажатии на кнопку добавления нового таска в меню создания
buttonAddNewTask.addEventListener("click", function(e) {
    if (buttonAddNewTask.getAttribute("aria-disabled") == "false" && isModal == "false") {
        let colorPriority
        if (priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_red.png") {
            colorPriority = "red"
        } else if (priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_orange.png") {
            colorPriority = "orange"
        } else if (priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_blue.png") {
            colorPriority = "blue"
        } else {colorPriority = "ser"}


        let tasksId = getTasksId()
        setTasksId(tasksId +1)          // Увеличение подсчёта id для создания нового таска. То-есть новый таск будет с повышенным на +1 id
        tasksId += 1



        // Создаём полную дату + с текущим временем (нужно для дальнейшей сортировки)
        let fullDateTask = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerText
        let nowTimeTask = new Date().toLocaleTimeString("ru-RU");

        let [year, month, day] = fullDateTask.split(".").reverse().map(Number)
        let [hours, minutes, seconds] = nowTimeTask.split(":").map(Number);

        // Создаём объект Date (месяцы в JS начинаются с 0, поэтому вычитаем 1)
        let fullDateCreated = new Date(year, month - 1, day, hours + 3, minutes, seconds);


        const contentNewTask = {    // Создаю объект из введённых данных
            newTask_name: taskNameInput.value, 
            newTask_description: taskDescriptionInput.value, 
            newTask_typeTask_name: taskTypeButton.querySelector(".form-from-add-new-task__name-type-task").innerText,
            newTask_typeTask_icon_src: taskTypeButton.querySelector(".form-from-add-new-task__icon_type").getAttribute("src"),
            newTask_deadlineTask: deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerText,
            newTask_deadlineFullDataTask: deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerText,
            newTask_priority_name: priorityButton.querySelector(".form-from-add-new-task__text-settings").innerText,
            newTask_priority_color: colorPriority,
            newTask_ID: tasksId,
            newTask_countSubtask: 0,
            newTask_Subtasks_arr: [],
            newTask_isOverdue: false,
            newTask_dateCreated: fullDateCreated
        }


        funcAddNewTask(contentNewTask, true)      // Запускаю функцию для добавления нового html элемента с новым таском
        addNewTaskMass(contentNewTask)      // Добавляю созданый объект в массив из списка всех тасков
        countAllTasks.innerText = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков


        // Запускаю функцию для переноса задачи в раздел просроченных, если её дата выполнения меньше чем сегодняшний день
        // raspredTasks()
        let tasks0 = [...document.querySelector(".tasks__tasks-list").children];
        console.log(tasks0);
        console.log(JSON.parse(window.localStorage.getItem("all_tasks")));
        

        // Сортирую таски (не просроченные) (и html и сам массив)
        sortTasks(document.querySelector(".tasks__tasks-list"), true, "normal")

        console.log(JSON.parse(window.localStorage.getItem("all_tasks")));

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask() 

        
        // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
        const deadlineHiddenList = e.target.closest(".form-from-add-new-task").querySelector(".form-from-add-new-task__deadline-list")

        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadline(deadlineHiddenList)

        

        sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
            hiddenByDisplay(task, "show") 
        })
        hiddenByDisplay(taskForm, "hide") 


        // Если модальное окно для создания новой задачи открыто (которое открывается при клике на кнопку в sidebar главной страницы)
        const modalNewTaskElem = document.querySelector('.modalAddNewTask');
        if (modalNewTaskElem.classList.contains('active')) {
            // Функция для закрытия модального окна для создания новой задачи (которое открывается при клике на кнопку в sidebar главной страницы)
            closeModalNewTask()
        }




        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  
        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
})

function funcAddNewTask(content, newCreated = false) {
    const template = document.createElement("template");
    template.innerHTML = `
    <li class="task" id="${content.newTask_ID}">
    <div class="task__wrapper">
        <div class="task__wrapper-button-task-checkbox">
            <button class="task__button-task-checkbox task__button-task-checkbox_${content.newTask_priority_color}"><img src="./icon/MarkOk_${content.newTask_priority_color}.png" alt="" class="hide2"></button>
        </div>
        <div class="task__task-list-itemsContent-wrapper">
            <div class="task__outerWrap-name-description">
                <div class="task__innerWrap-name-description">
                    <div class="task__name-task" aria-label="Название задачи">${content.newTask_name}</div>
                    <div class="task__description-task" aria-label="описание">
                        <span class="task__description-task-text">${content.newTask_description}</span>
                    </div>
                </div>
            </div>
            <div class="task__deadline">
                <div class="task__imgBlock-deadline"><img src="./icon/deadlineNewTask_0.png" alt=""></div>
                <span class="task__deadline__date_visible">${content.newTask_deadlineTask}</span>
                <span class="task__deadline__date_hidden hide1">${content.newTask_deadlineFullDataTask}</span>
            </div>
            <div class="task__typeTask">
                <span>${content.newTask_typeTask_name}</span>
                <div class="task__imgBlock-typeTask"><img src="${content.newTask_typeTask_icon_src}" alt=""></div>
                <img class="task__imgBlock-typeTask_grid" src="./icon/grid_0.png" alt="">
            </div>
        </div>
        <div class="task__dopFuncs hide1" aria-label="Дополнительные функции для управления задачей">
            <div class="task__dopFunction task__btnEdit hover-hint hide1" data-title="Редактировать задачу">
                <div class="task__dopFunction_iconWrap">
                    <img src="./icon/edit.png" alt="">
                </div>
            </div>
            <div class="task__dopFunction task__btnNewDeadline hover-hint hide1" data-title="Назначить срок">
                <div class="task__dopFunction_iconWrap">
                    <img src="./icon/deadline_task.png" alt="">
                </div>
                <div class="task__dopFunction__hidden-menu-deadline hide2">
                    <ul class="task__dopFunction__deadline-list">
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/sun.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">Сегодня</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/deadlineNewTask_3.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">Завтра</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/divan.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">На выходных</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/nextWeek.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">След. неделя</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/noDeadline.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">Без срока</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                    </ul>
                    <div class="task__dopFunction__hidden-menu-deadline-calendare">
                        <input type="text" class="hidden-menu-deadline-calendare hide2">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </li>
    `
    if (newCreated == true) {
        allCurrentTasksOuter.append(template.content.cloneNode(true))     // Добавляю новый template элемент таска в конец
    }
    else {
        allCurrentTasksOuter.prepend(template.content.cloneNode(true))     // Добавляю новый template элемент таска в начало
    }
}

function funcAddNewTask2(content) {
    const html = `
    <li class="task" id="${content.newTask_ID}">
    <div class="task__wrapper">
        <div class="task__wrapper-button-task-checkbox">
            <button class="task__button-task-checkbox task__button-task-checkbox_${content.newTask_priority_color}"><img src="./icon/MarkOk_${content.newTask_priority_color}.png" alt="" class="hide2"></button>
        </div>
        <div class="task__task-list-itemsContent-wrapper">
            <div class="task__outerWrap-name-description">
                <div class="task__innerWrap-name-description">
                    <div class="task__name-task" aria-label="Название задачи">${content.newTask_name}</div>
                    <div class="task__description-task" aria-label="описание">
                        <span class="task__description-task-text">${content.newTask_description}</span>
                    </div>
                </div>
            </div>
            <div class="task__deadline">
                <div class="task__imgBlock-deadline"><img src="./icon/deadlineNewTask_0.png" alt=""></div>
                <span class="task__deadline__date_visible">${content.newTask_deadlineTask}</span>
                <span class="task__deadline__date_hidden hide1">${content.newTask_deadlineFullDataTask}</span>
            </div>
            <div class="task__typeTask">
                <span>${content.newTask_typeTask_name}</span>
                <div class="task__imgBlock-typeTask"><img src="${content.newTask_typeTask_icon_src}" alt=""></div>
                <img class="task__imgBlock-typeTask_grid" src="./icon/grid_0.png" alt="">
            </div>
        </div>
        <div class="task__dopFuncs hide1" aria-label="Дополнительные функции для управления задачей">
            <div class="task__dopFunction task__btnEdit hover-hint hide1" data-title="Редактировать задачу">
                <div class="task__dopFunction_iconWrap">
                    <img src="./icon/edit.png" alt="">
                </div>
            </div>
            <div class="task__dopFunction task__btnNewDeadline hover-hint hide1" data-title="Назначить срок">
                <div class="task__dopFunction_iconWrap">
                    <img src="./icon/deadline_task.png" alt="">
                </div>
                <div class="task__dopFunction__hidden-menu-deadline hide2">
                    <ul class="task__dopFunction__deadline-list">
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/sun.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">Сегодня</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/deadlineNewTask_3.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">Завтра</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/divan.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">На выходных</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/nextWeek.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">След. неделя</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="task__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/noDeadline.png" alt="" class="task__dopFunction__deadline-icon">
                            <span class="task__dopFunction__deadline-name">Без срока</span>
                            <span class="task__dopFunction__deadline-info">#</span>
                        </li>
                    </ul>
                    <div class="task__dopFunction__hidden-menu-deadline-calendare">
                        <input type="text" class="hidden-menu-deadline-calendare hide2">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </li>
    `
    
    allCurrentTasksOuter.insertAdjacentHTML('beforeend', html)     // Добавляю новый template элемент таска в начало
    sortTasks(document.querySelector(".tasks__tasks-list"), true, "normal")
}


function reloadFormAddTask() {
    taskNameInput.value = ""  
    taskDescriptionInput.value = ""
    buttonAddNewTask.setAttribute('aria-disabled', 'true')
    setIsObservHiddenMenus(false)
    deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerText = "Срок выполнения"
    deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerText = "Срок выполнения"
    hiddenByDisplay(deadlineButton.querySelector(".form-from-add-new-task__icon-cross"), "hide")
    // Очищаю выделение выбранного срока выполнения из списка
    deadlineOptions.forEach(function(itemDeadline) { 
        itemDeadline.classList.remove("hovered_select_menu")
    })  
    // Очищаю выделение выбранного срока выполнения из календаря
    if (selectedDay && selectedDay != "") {
        selectedDay.classList.remove("-selected-")
    }
    // Записываю сегодняшнее число в окно выбора срока выполнения для новой создаваемой задачи
    deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerText = `${nowDay} ${nowMonth}`
    deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerText = nowData.toLocaleDateString()
    // Убираю скрытие с крестика в поле выбора срока выполнения
    hiddenByDisplay(deadlineButton.querySelector(".form-from-add-new-task__icon-cross"), "show")

    
    priorityButton.querySelector(".form-from-add-new-task__text-settings").innerText = "Приоритет"
    priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", "./icon/priority_ser.png")
    hiddenByDisplay(priorityButton.querySelector(".form-from-add-new-task__icon-cross"), "hide")
    // Очищаю выделение выбранного приоритета
    priorityOptions.forEach(function(itemPriority) { 
        itemPriority.classList.remove("hovered_select_menu")    // Удаляю стиль выбранного элемента у ранее выбранного элемента
        hiddenByDisplay(itemPriority.querySelector(".form-from-add-new-task__priority-icon-selected"), "hide")    // Удаляю галочки у ранее выбранного элемента (если такой был)
    })

    taskTypeButton.querySelector(".form-from-add-new-task__name-type-task").innerText = "Дом"  // Имя типа таска
    taskTypeButton.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", "./icon/home.png")  // Иконка типа таска


    // Показываю кнопку для создания таска. И скрываю кнопку для сохранения изменений при редактированини таска
    hiddenByDisplay(buttonAddNewTask, "show")
    hiddenByDisplay(buttonSaveTask, "hide")

}
export { reloadFormAddTask, reloadItemsAndCalendarDeadline, changeMyCalendar, funcAddNewTask}
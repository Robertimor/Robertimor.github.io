'use strict';

// Данный файл для изменения отображения элементов ПОДЗАДАЧ внутри МО (либо же изменение их стилей) 

import {hiddenByDisplay} from "./base.js"
import {deadlineButton, deadlineMenu, deadlineOptions, priorityButton, priorityMenu, taskTypeMenu, currectEntryDate } from "./doomElements.js"
import {reloadFormAddTask} from "./scripts.js"
import {switchDisabledShowDopFuncTask, setIsObservHiddenMenus, observFunc} from "./toggleVisibleElements.js"

import {statusIsModal} from "./modal.js"
import {setIsSelectionMenuActive_MO, getIsSelectionMenuActive_MO, setIsNewDeadlineButtonClicked_MO, getIsNewDeadlineButtonClicked_MO, setCurrentLi_modal, getCurrentLi_modal} from "./MO_dataUpdate.js"

import {getSelectedDay_MO_Subtask, reloadItemsDeadlineSubtask} from "./MO_selectElementsSubtask.js"



let MyCalendar
let MyCalendarForm

let curHiddenCalendarContainerForm
let curHiddenCalendarForm

let modalContent
let subtaskOuter_modal


// Удаляю отметку о текущей подзадаче
let currentLi_klick_MO = null   

// Функция для перезаписи значения currentLi_klick_MO из другого файла
function reloadCurrentLi_klick_MO(val) {
    currentLi_klick_MO = val
}


function getVarsMO_toggleVisElSubTasks() {
    curHiddenCalendarContainerForm = document.querySelector(".form-from-add-new-task__hidden-menu-deadline-calendare")
    curHiddenCalendarForm = document.querySelector(".hidden-menu-deadline-calendare-input")

    modalContent = document.querySelector(".itc-modal-body")
    subtaskOuter_modal = modalContent.querySelector(".itc-modal-body__subtask-outer-block")
}

let disabledShowDopFuncTask = window.localStorage.getItem("disabledShowDopFuncTask")



// Можно ли показывать доп. функции подзадачи (изначально скрытые)
switchDisabledShowDopFuncTask("false")


// Отображение поля с доп функциями при наведении на поле с подзадачей
function subtaskMouseover(e) {
    let currentLi_modal = getCurrentLi_modal()
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentLi_modal есть, то мы ещё не ушли с предыдущего <li>, это переход внутри - игнорируем такое событие
    if (currentLi_modal) return
    let target = e.target.closest("li.subtask")


    if (!target) return;    // переход не на <li> - игнорировать
    if (!subtaskOuter_modal.contains(target)) return    // переход на <li>, но вне .subtaskOuter_modal (возможно при вложенных списках) - игнорировать

    // ура, мы зашли на новый <li>
    setCurrentLi_modal(target)
    currentLi_modal = target

    show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))     // Показываем скрытое меню с доп func этого элемента
}

function subtaskMouseout(e) {
    const currentLi_modal = getCurrentLi_modal()

    // если мы вне <li>, то игнорируем уход мыши. Это какой-то переход внутри .subtaskOuter_modal, но вне <li>
    if (!currentLi_modal) return
    
    // мы покидаем элемент – но куда? Возможно, на потомка?
    let relatedTarget = e.relatedTarget
    while (relatedTarget) {
        // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет. Если да, то это переход внутри элемента – игнорируем
        if (relatedTarget == currentLi_modal) return
        relatedTarget = relatedTarget.parentNode
    }

    // мы действительно покинули элемент li

    hide_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"), currentLi_modal)  // Скрываем меню с доп func этого элемента
    setCurrentLi_modal(null)
}

// Функция показа доп функций элемента подзадачи
function show_subtask_dopFuncs_modal(thisDopFuncs) {
    const currentLi_modal = getCurrentLi_modal()
    
    // Если запрета на показ доп.ф. нету, ИЛИ мы навелись на ту подзадачу, на которую только что кликнули
    if (disabledShowDopFuncTask == "false" || (currentLi_klick_MO == currentLi_modal)) {
        thisDopFuncs.classList.remove("hide1")
        thisDopFuncs.querySelector(".subtask__btnEdit").classList.remove("hide1")
        thisDopFuncs.querySelector(".subtask__btnNewDeadline").classList.remove("hide1")
    }
}


// Функция скрытия доп функций элемента подзадачи
function hide_subtask_dopFuncs_modal(thisDopFuncs) {
    const isNewDeadlineButtonClicked_MO = getIsNewDeadlineButtonClicked_MO()

    // Если внутри подзадачи нету меню выбора срока выполнения, то все доп функции скрываются
    if (!isNewDeadlineButtonClicked_MO) {
        thisDopFuncs.classList.add("hide1")
        thisDopFuncs.querySelector(".subtask__btnEdit").classList.add("hide1")
        thisDopFuncs.querySelector(".subtask__btnNewDeadline").classList.add("hide1")
    } 
    // Иначе, если внутри подзадачи есть меню выбора срока выполнения, то скрываются все доп функции, кроме кнопки выбора срока выполнения
    else if (isNewDeadlineButtonClicked_MO == 1) {
        thisDopFuncs.querySelector(".subtask__btnEdit").classList.add("hide1")
    }
}






// Отображение галочки в кружке-конпке при наведении на кружок:

let currentBtnCheckbox = null   // Элемент subtask__button-subtask-checkbox под курсором в данный момент (если есть)
function subtaskCheckboxMouseover(e) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentBtnCheckbox есть, то мы ещё не ушли с предыдущего кружка, это переход внутри - игнорируем такое событие
    if (currentBtnCheckbox) return
    let target2 = e.target.closest(".subtask__button-subtask-checkbox")
    if (!target2) return

    // ура, мы зашли на новый кружок
    currentBtnCheckbox = target2
    show_mark_OK(currentBtnCheckbox.querySelector("img"))     // Показываем галочку внутри этого элемента   
}
function subtaskCheckboxMouseout(e) {
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
}




// Функция показа/скрытия галочки внутри кружка
function show_mark_OK (thisMark) {
    hiddenByDisplay(thisMark, "toggle")
}



//Функция для очистки стиля "выбранного элемента" со всех deadlineOptions и у всех ячеек календаря, если он где-то был (удаляю со всех элементов класс "hovered_select_menu").
// Данная функция используется при редактировании срока у ПОДЗАДАЧ 
function reloadItemsAndCalendarDeadlineSubtask() {
    // Очищаю выделение срока в списке вариантов (в форме для создания, редактирования подзадачи)
    deadlineOptions.forEach(function(itemDeadline) { 
        itemDeadline.classList.remove("hovered_select_menu")
    })


    // Очищаю выделение срока в календаре (в форме для создания, редактирования подзадачи)
    const selectedDay_MO_Subtask = getSelectedDay_MO_Subtask()
    if (selectedDay_MO_Subtask && selectedDay_MO_Subtask != "") {
        selectedDay_MO_Subtask.classList.remove("-selected-")
    }
}





// При нажатии на кнопку в форме для создания/редактирования подзадачи  
function selectDeadlineFunc(e) {
    if (!statusIsModal()) return    // Если МО отсутствует, то игнор


    const btnCross = deadlineButton.querySelector(".form-from-add-new-task__icon-cross")


    // Если доп меню показано (не скрыто) и клик был на крестик и крестик показан (не скрыт)
    if (deadlineMenu.classList.contains("hide2") == false && e.target == btnCross.querySelector("img") && btnCross.classList.contains("hide2") == false) {
        hiddenByDisplay(btnCross, "hide")       // ещё раз прописываю скрытие, ибо событие клика по крестику (отдельное) не скроет его (но изменит содержание тега с текстом)
    } 
    // Иначе, если доп меню показано (не скрыто) (и клик был не на крестик, соответственно)
    else if (deadlineMenu.classList.contains("hide2") == false) {
        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(deadlineMenu, "hide")
        MyCalendarForm.destroy()    
        MyCalendarForm = null


        setIsObservHiddenMenus(false)
        observFunc(deadlineButton)


        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Очищаю выделение срока в списке вариантов и в календаре (при создании/редактировании задачи)
        reloadItemsAndCalendarDeadlineSubtask() 
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
        hiddenByDisplay(deadlineMenu, "show")   // Показываю скрытое меню срока выполнения


        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num")

        // Полная дата, которая была перевёрнута (стала: "год.месяц.число")
        const textAreaDeadlineHiddenNumReversed = textAreaDeadlineHiddenNum.innerHTML.split(".").reverse().join(".")

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

        setIsSelectionMenuActive_MO(1)
        

        setIsObservHiddenMenus(true)     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(deadlineButton)  // При первом открытии скрытого меню, начнётся отслеживание изменения окна "deadlineButton"


        // Запрещается показ доп. функций подзадач
        switchDisabledShowDopFuncTask("true")
    }
}


// 1) При нажатии на доп функцию "Назначить срок" у подзадачи
function btnNewDeadlineSubtask(e) {
    const targetBtn = e.target.closest(".subtask__btnNewDeadline")      // Нажатая кнопка "NewDeadline" 
    const targetBtnIcon = e.target.closest(".subtask__dopFunction_iconWrap")

    // Если клик был вне контейнера с кнопкой "NewDeadline", то игнорируем
    if (!targetBtn) return

    // Если клик был вне контейнера с иконкой кнопки "NewDeadline" (даже если например, на календарь), то игнорируем
    if (!targetBtnIcon) return

    const targetSubtask = e.target.closest(".subtask")



    // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
    const curHiddenMenuDeadlineNewDeadline = targetBtn.querySelector(".subtask__dopFunction__hidden-menu-deadline")

    const curHiddenCalendarContainer = targetBtn.querySelector(".subtask__dopFunction__hidden-menu-deadline-calendare")
    const curHiddenCalendar = targetBtn.querySelector(".hidden-menu-deadline-calendare")

    const isNewDeadlineButtonClicked_MO = getIsNewDeadlineButtonClicked_MO()

    const currentLi_modal = getCurrentLi_modal()



    // Если меню скрыто
    if (curHiddenMenuDeadlineNewDeadline.classList.contains("hide2") == true) {   
        // Показываю это меню выбора (удаляю скрытие)
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "show")
        
        
        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = targetSubtask.querySelector(".subtask__deadline__date_hidden")

        // Полная дата, которая была перевёрнута (стала: "год.месяц.число")
        const textAreaDeadlineHiddenNumReversed = textAreaDeadlineHiddenNum.innerHTML.split(".").reverse().join(".")

        MyCalendar = new AirDatepicker(curHiddenCalendar, {
            inline: false,  
            buttons: ["today", "clear"],
            minDate: currectEntryDate,
            container: curHiddenCalendarContainer,
            selectedDates: textAreaDeadlineHiddenNumReversed,
            autoClose: true,
            // isDestroyed: true
        })
        MyCalendar.show();

        
        // Отмечаю нажатие на кнопку назначения нового срока выполнения
        setIsNewDeadlineButtonClicked_MO(1)

        // Отмечаю в глобальную переменную - подзадачу, внутри которой был совершён клик по кнопке
        currentLi_klick_MO = e.target.closest("li")            

        hide_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))

        // Запрещается показ доп. функций подзадач
        switchDisabledShowDopFuncTask("true")
    }

    // Если меню отображено (не скрыто)
    else if (curHiddenMenuDeadlineNewDeadline.classList.contains("hide2") == false && isNewDeadlineButtonClicked_MO) {     
        // Скрываю это меню выбора и уничтожаю созданный календарь
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")
        MyCalendar.destroy()
        MyCalendar = null


    
        setTimeout(() => setIsNewDeadlineButtonClicked_MO(""), 100)
        
        // Удаляю отметку о текущей подзадаче
        currentLi_klick_MO = null                                  

        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")

        show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()
    }
}


// 2.1) При нажатии на само поля выбора (при создании/редактировании и с учётом наличия ранее нажатой  доп ф. "назначить срок")
function clickMenudeadline(e) { 
    if (!statusIsModal()) return    // Если МО отсутствует, то игнор

    setIsSelectionMenuActive_MO(1)
    setIsNewDeadlineButtonClicked_MO(1)      // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)


    // Если ранее на каком-то из подзадач была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    // Этот код работает только если ранее на какой-то подзадачае было открыто скрытое меню через "назначить срок", а сейчас клик происходит по открытому аналогичному меню, но вызванному у подзадачи при её создании/редактировании
    if ((currentLi_klick_MO != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
        const curHiddenMenuDeadlineNewDeadline = currentLi_klick_MO.querySelector(".subtask__dopFunction__hidden-menu-deadline")


        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")  
        MyCalendar.destroy()    
        MyCalendar = null

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        setIsNewDeadlineButtonClicked_MO("") 


        // Скрываю все доп функции подзадачи
        hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))


        // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
        currentLi_klick_MO = null 
        setCurrentLi_modal(null)


        // Обнуляю элементы поля .taskForm (поле для добавление новой подзадачи) и скрываю его
        reloadFormAddTask()


        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")
    } 
    // Если ранее ни на какой из подзадач не была нажата кнопка "NewDeadline" (иконка)
    else if ((currentLi_klick_MO == null)) {
        setIsNewDeadlineButtonClicked_MO("")
    }
    const isObservHiddenMenus = JSON.parse(window.localStorage.getItem("isObservHiddenMenus"))
    if (isObservHiddenMenus == false) {
        setIsObservHiddenMenus(true)   // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(deadlineButton)   // Начинается слежка за "deadlineButton", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
}

// 2.2) При нажатии на само поле выбора (при создании/редактировании подзадачи и нажатии доп ф. "назначить срок")
function clickFieldMenuDeadlineSubtask(e) {
    if (!statusIsModal()) return    // Если МО отсутствует, то игнор

    const target_container_subtask = e.target.closest(".subtask__dopFunction__hidden-menu-deadline")   // Область скрытого меню выбора срока при нажатии на "Назначить срок"
    const target_container_formSubtask = e.target.closest(".form-from-add-new-task__hidden-menu-deadline")  // Область скрытого меню выбора срока при создании/редактировании задачи

    // Если клик был не по меню выбора срока выполнения в функции "назначить срок" и не по аналогичному меню при создании/редактировании подзадачи, то игнор
    if (!target_container_subtask && !target_container_formSubtask) return


    setIsSelectionMenuActive_MO(1)
    setIsNewDeadlineButtonClicked_MO(1)      // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)

    // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    // Этот код работает если клик был по меню выбора срока выполнения после нажатия на "Назначить срок" (только в этом случае нужно скрывать сразу меню выбора, ведь при создании/редактировании после выбора скрывать меню не нужно)
    if ((currentLi_klick_MO != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
        const curHiddenMenuDeadlineNewDeadline = currentLi_klick_MO.querySelector(".subtask__dopFunction__hidden-menu-deadline")


        // Скрываю само меню и удаляю календарь в нём 
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")
        MyCalendar.destroy()    
        MyCalendar = null

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        setIsNewDeadlineButtonClicked_MO("")


        // Скрываю все доп функции подзадачи
        hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))


        // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
        currentLi_klick_MO = null 
        setCurrentLi_modal(null)


        // Обнуляю элементы поля .taskForm (поле для добавление новой подзадачи) и скрываю его
        reloadFormAddTask()


        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")
    } 
    // Если ранее ни на какой из подзадач не была нажата кнопка "NewDeadline" (иконка)
    else if ((currentLi_klick_MO == null)) {
        setIsNewDeadlineButtonClicked_MO("") 
    }

    const isObservHiddenMenus = JSON.parse(window.localStorage.getItem("isObservHiddenMenus"))
    if (isObservHiddenMenus == false) {
        setIsObservHiddenMenus(true)    // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(deadlineButton)   // Начинается слежка за "deadlineButton", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
}



// 3) При нажатии вне поля выбора (при открытии меню срока выполнения у подзадачи при её редактировании/создании или при "Назначить срок" подзадачи)
function clickOuterModal_deadlineSubtask(e) {
    // Если доп. меню срока выполнения (и у меню редактирования/создания подзадачи; и у доп. функции "назначить срок") - скрыто, то игнорируем
    if ((deadlineMenu.classList.contains("hide2") == true) && (!currentLi_klick_MO)) return

    else if (currentLi_klick_MO) {
        if (currentLi_klick_MO.querySelector(".subtask__dopFunction__hidden-menu-deadline").classList.contains("hide2") == true) {
            console.log("Странно");
            return
        }
    }

    const targetLi_modal = e.target.closest(".subtask")     // Элемент  li для последующего определения нового срока выполнения подзадаче (одна из двух кнопок доп функций подзадачи)       
    const targetBtn = e.target.closest(".subtask__btnNewDeadline")   // Была ли нажата кнопка "NewDeadline" 

    // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
    let curHiddenMenuDeadlineNewDeadline = null
    // Если ранее была нажата кнопка "Назначить срок" у задачи, то переменной выше присваиваю нужное значение
    if (currentLi_klick_MO != null) {
        curHiddenMenuDeadlineNewDeadline = currentLi_klick_MO.querySelector(".subtask__dopFunction__hidden-menu-deadline")
    }


    const isSelectionMenuActive_MO = getIsSelectionMenuActive_MO()

    const currentLi_modal = getCurrentLi_modal()

    // Если клик был вне поля выбора и вне элемента подзадачи (li), и при этом ранее не была отмечена текущая ПОДЗАДАЧА по клику (перед этим кликом не нажалась кнопка ".subtask__btnNewDeadline" (иконка), после которой отображается меню выбора срока выполнения)
    if (!isSelectionMenuActive_MO && targetLi_modal == null && currentLi_klick_MO == null) {     // Если клик был вне поля и не на кнопку ".subtask__btnNewDeadline" (на иконку) и ранее не был отмечена текущая подзадача по клику
        setIsObservHiddenMenus(false)
        observFunc(priorityButton)

        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(deadlineMenu, "hide")
        MyCalendarForm.destroy()    
        MyCalendarForm = null

        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")

        // Очищаю выделение срока в списке вариантов и в календаре (при создании/редактировании задачи)
        reloadItemsAndCalendarDeadlineSubtask()
    } 

    // Если клик был вне поля выбора и вне элемента подзадачи (li), и при этом уже была отмечена текущая ПОДЗАДАЧА по клику (ранее уже нажалась кнопка ".subtask__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
    else if (!isSelectionMenuActive_MO && targetLi_modal == null && currentLi_klick_MO != null) {
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")
        MyCalendar.destroy()
        MyCalendar = null
        
        
        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        setIsNewDeadlineButtonClicked_MO("")

        // Скрываю доп функции подзадачи
        hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))

        currentLi_klick_MO = null              // Удаляю отметку о текущей подзадаче с отслеживателя по клику

        // Обнуляю элементы поля .taskForm (поле для добавление новой подзадачи) и скрываю его
        reloadFormAddTask()

        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")

        // Целиком список сроков из списка вариантов (ul) (в "Назначить срок") 
        const deadlineHiddenList = curHiddenMenuDeadlineNewDeadline.querySelector(".subtask__dopFunction__deadline-list")
        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadlineSubtask(deadlineHiddenList)
    } 

    // Если клик был вне поля выбора, на элемент подзадачи (li), но не на кнопку ".subtask__btnNewDeadline" и при этом ранее не была отмечена подзадача (ранее не нажималась кнопка ".subtask__btnNewDeadline", при нажатии на которую отображается меню выбора срока выполнения) 
    if (!isSelectionMenuActive_MO && targetLi_modal != null && !targetBtn && currentLi_klick_MO == null) {
        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(deadlineMenu, "hide")
        MyCalendarForm.destroy()    
        MyCalendarForm = null


        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")

        // Показываю доп. функции у той подзадачи, на которую был совершён клик (которая была под курсором в момент клика)
        show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))


        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadlineSubtask()
    }

    // Если клик был вне поля выбора, на элемент подзадачи (li), но не на кнопку ".subtask__btnNewDeadline" и при этом ранее уже была отмечена подзадача (ранее уже нажалась кнопка ".subtask__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
    else if (!isSelectionMenuActive_MO && targetLi_modal != null && !targetBtn && currentLi_klick_MO != null) {
        // Скрываю само меню и удаляю календарь в нём
        hiddenByDisplay(curHiddenMenuDeadlineNewDeadline, "hide")
        MyCalendar.destroy()
        MyCalendar = null

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        setIsNewDeadlineButtonClicked_MO("")

        // Скрываю доп функции у текущей подзадачи
        hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))

        currentLi_klick_MO = null              // Удаляю отметку о текущей подзадачи с отслеживателя по клику

        // Обнуляю элементы поля .taskForm (поле для добавление новой подзадачи) и скрываю его
        reloadFormAddTask()



        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")


        // Показываю доп. функции у той подзадачи, на которую был совершён клик (которая была под курсором в момент клика)
        show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))



        // Целиком список сроков из списка вариантов (ul) (в "Назначить срок") 
        const deadlineHiddenList = curHiddenMenuDeadlineNewDeadline.querySelector(".subtask__dopFunction__deadline-list")
        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadlineSubtask(deadlineHiddenList)
    }

    if (isSelectionMenuActive_MO) { 
        setTimeout(() => setIsSelectionMenuActive_MO(""), 100)
    }  

}



export {reloadCurrentLi_klick_MO, getVarsMO_toggleVisElSubTasks, subtaskMouseover, subtaskMouseout, subtaskCheckboxMouseover, subtaskCheckboxMouseout, selectDeadlineFunc, btnNewDeadlineSubtask, clickMenudeadline, clickFieldMenuDeadlineSubtask, clickOuterModal_deadlineSubtask, hide_subtask_dopFuncs_modal}
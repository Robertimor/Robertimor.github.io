'use strict';
// Данный файл для изменения отображения элементов ТАСКА внутри МО (либо же изменение их стилей) 

import {hiddenByDisplay} from "./base.js" 
import {currectEntryDate} from "./dateElements.js"
import {statusIsModal} from "./modal.js"
import {switchDisabledShowDopFuncTask} from "./toggleVisibleElements.js"
import {setIsSelectionMenuActive_MO, getIsSelectionMenuActive_MO, setIsNewDeadlineButtonClicked_MO, getCurrentLi_modal, getTargetLi_subtask} from "./MO_dataUpdate.js"


let modalWindow             // Само модальное окно
let modalTitle = document.querySelector(".itc-modal-title")
let modalContent = document.querySelector(".itc-modal-body")
let modalAside = document.querySelector(".itc-modal-body__aside")


let buttonCloseEdit         // Кнопка закрытия редактирования ТАСКА (не подзадачи) в м.о.
let buttonSaveEdit          // Кнопка сохранения редактирования ТАСКА в м.о.


let div_name_task               // div с именем таска 
let div_description_task        // div с описанием таска 

let el_textarea_name            // Поле для заполнения имени таска
let el_textarea_description     // Поле для заполнения описания таска

let count_lenght_name_description_task    // Поле с указанимем длины строки имени и описания таска



let modalBtn_GroupTypeTask                          // Кнопка в м.о. для изменения типа таска
let conteinerFromHiddenMenuTypesTasks_modal         // Скрытое меню выбора типа таска в м.о. 

let modalBtn_GroupPriorityTask                      // Поле для выбора приоритета таска в м.о.
let conteinerFromHiddenMenuPriorityTasks_modal      // Скрытое меню выбора приоритета таска в м.о.    
let priorityItem_modal                              // Элементы li с вариантами приоритета

let modal_wrapper_name_description                  // Контейнер с именем и описанием таска

let conteinerFromHiddenMenuDeadlineTasks_modal      // Скрытое меню выбора срока выполнения таска в м.о. 


let modalBtn_GroupDeadlineTask      // Поле для выбора срока выполнения таска в м.о.


let checkbox_modal              // Сам кнопка-кружок возле имени таска в м.о.
let checkbox_modal_icon         // Галочка в кружочке

let MyCalendar

function getVarsMO_toggleVisElTask() {
    modalWindow = document.querySelector(".itc-modal-content")      // Само модальное окно
    buttonCloseEdit = modalWindow.querySelector(".buttuns-closeSave-task .btn-close")     // Кнопка закрытия редактирования ТАСКА (не подзадачи) в м.о.
    buttonSaveEdit = modalWindow.querySelector(".buttuns-closeSave-task .btn-save")       // Кнопка сохранения редактирования ТАСКА в м.о.

    modalTitle = document.querySelector(".itc-modal-title")
    modalContent = document.querySelector(".itc-modal-body")
    modalAside = document.querySelector(".itc-modal-body__aside")

    modalBtn_GroupTypeTask = document.querySelector('.itc-modal-body__select-setting[data-title="Перенести в..."]')  
    conteinerFromHiddenMenuTypesTasks_modal = document.querySelector(".itc-modal-body__hidden-menuTypesTask")      

    modalBtn_GroupPriorityTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить приоритет..."]') 
    conteinerFromHiddenMenuPriorityTasks_modal = document.querySelector(".itc-modal-body__hidden-menu-priority")
    priorityItem_modal = document.querySelectorAll(".itc-modal-body__priority-item")

    modal_wrapper_name_description = modalWindow.querySelector(".task__innerWrap-name-description") 

    conteinerFromHiddenMenuDeadlineTasks_modal = document.querySelector(".itc-modal-body__hidden-menu-deadline")  

    modalBtn_GroupDeadlineTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить новой крайний срок..."]')


    checkbox_modal = document.querySelector(".itc-modal-body__main-content .task__button-task-checkbox") 
    checkbox_modal_icon = checkbox_modal.querySelector("img")         
}

function getEl_textarea_name() {
    return el_textarea_name
}



// Функция, которая вызывается при клике на поле с именем/описанием таска
function clickNameDescriptionModal(event) {
    if (!event.target.closest(".task__innerWrap-name-description div") || event.target.closest(".task__maxLenght_name_description")) return      // Если клик был не по div-ам с именем/описанием таска, но по их контейнеру - игнорируем

    // Создаю и даю значение новой переменной, нужной для обозначения того, на какой именно из элементов div был совершён клик (на имя или на описание таска)
    let focusTextarea = ""      
    if (event.target.closest(".task__name-task")) {
        focusTextarea = "name"
    } else if (event.target.closest(".task__description-task")) {
        focusTextarea = "description"
    }


    

    div_name_task = modal_wrapper_name_description.querySelector(".task__name-task")    // div с именем таска 
    div_description_task = modal_wrapper_name_description.querySelector(".task__description-task")  // div с описанием таска 
    // Скрываю div-ы с именем и описанием таска     
    hiddenByDisplay(div_name_task, "hide")
    hiddenByDisplay(div_description_task, "hide")

    // Добавляю их контейнеру класс "ramka", для выделения двух полей textarea
    modal_wrapper_name_description.classList.add("ramka")


    // Переменная с двумя textarea, которые затем будут вставлены в html код
    const modal_newTextarea = `
    <textarea class="itc-modal-content__textarea-name-task" name="name-task" placeholder="Название задачи" maxlength="500"></textarea>
    <textarea class="itc-modal-content__textarea-description-task" name="description-task" placeholder="Описание задачи" maxlength="10000"></textarea>
    <div class="task__maxLenght_name_description">
        <div class="task__maxLenght_name">Лимит названия задачи: <span class="num_lenght_name">${div_name_task.innerText.length}</span> / 500</div>
        <div class="task__maxLenght_description">Лимит описания задачи: <span class="num_lenght_description">${div_description_task.querySelector('.task__description-task-text').innerText.length}</span> / 10000</div>
    </div>
    `
    // Вставляю поля textarea в контейнер, где были ранее отображены div-ы с именем/описанием таска
    modal_wrapper_name_description.insertAdjacentHTML("afterbegin", modal_newTextarea)

    // Создаю переменные, присвоим им html элементы созданных и добавленных textarea (2шт)
    el_textarea_name = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-name-task")
    el_textarea_description = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-description-task")

    // Создаю переменную контейнера для строк с указанием лимитов строк имени и описания таска
    count_lenght_name_description_task = modalContent.querySelector(".task__maxLenght_name_description")




    // Вставляю в эти textarea значения имени/описания текущего таска (которые были внутри ранее отображаемого div-а)
    el_textarea_name.value = div_name_task.innerText 
    el_textarea_description.value = div_description_task.querySelector("span").innerText 

    // Создаю для этих двух textarea обработчик события, который запускает функцию "resizeTextarea" каждый раз, когда что-то вводится в поле textarea
    el_textarea_name.addEventListener("input", resizeTextarea)
    el_textarea_description.addEventListener("input", resizeTextarea)

    // Создаю для этих двух textarea обработчик события, который запускает функцию "changValueLenght" каждый раз, когда что-то вводится в поле textarea
    el_textarea_name.addEventListener("input", changValueLenght)
    el_textarea_description.addEventListener("input", changValueLenght)


    // Делаю фокус на одном из textarea, в зависимости от того, на какой элемент div был совершён клик (на имя или на описание)
    if (focusTextarea == "name") {
        el_textarea_name.focus()
    }
    if (focusTextarea == "description") {
        el_textarea_description.focus()
    }

    // Убираю скрытие с кнопок "Отмена" и "Сохранить"
    hiddenByDisplay(buttonCloseEdit, "show")
    hiddenByDisplay(buttonSaveEdit, "show")


    // Выставляю сразу необходимую высоту полю с именем таска
    el_textarea_name.style.height = "auto";
    el_textarea_name.style.height = Math.max(el_textarea_name.scrollHeight, el_textarea_name.offsetHeight)+"px"      

    // Выставляю сразу необходимую высоту полю с описанием таска
    el_textarea_description.style.height = "auto";
    el_textarea_description.style.height = Math.max(el_textarea_description.scrollHeight, el_textarea_description.offsetHeight)+"px"   


    // Запрещаю показ доп. функций подзадач
    switchDisabledShowDopFuncTask("true")

}

// Функция для настройки изменяемой (растягивающейся) высоты поля - textarea, по мере его заполнения
function resizeTextarea(_e) {     
    let event = _e || event || window.event
    let getElement = event.target || event.srcElement
    getElement.style.height = "auto"; 

    getElement.style.height = Math.max(getElement.scrollHeight, getElement.offsetHeight)+"px"        
}

// Функция для отслеживания длины полей имени и описания таска (Для отображения лимитов)
function changValueLenght(_e) {
    let event = _e || event || window.event
    let getElement = event.target || event.srcElement

    let maxLenght_name_description = modal_wrapper_name_description.querySelector(".task__maxLenght_name_description")  // Поле с лимитами длины имени и описания таска
    let maxLenght_name = maxLenght_name_description.querySelector(".task__maxLenght_name")  // Поле с текстом для лимита имени таска
    let maxLenght_description = maxLenght_name_description.querySelector(".task__maxLenght_description")    // Поле с текстом для лимита описания таска
    let length_name = maxLenght_name_description.querySelector(".num_lenght_name")  // Поле для вставки текущей длины имени таска
    let length_description = maxLenght_name_description.querySelector(".num_lenght_description")    // Поле для вставки текущей длины описания таска




    // Если изменено поле имени таска
    if (getElement.classList.contains('itc-modal-content__textarea-name-task') && getElement.value.length <= 500) {
        maxLenght_name.style.color = '#ADADAD'
        length_name.innerText = getElement.value.length
    } 

    // Если изменено поле имени таска и оно достигло лимита
    if (getElement.classList.contains('itc-modal-content__textarea-name-task') && getElement.value.length == 500) {
        maxLenght_name.style.color = 'red'
    }

    // Если изменено поле описания таска
    if (getElement.classList.contains('itc-modal-content__textarea-description-task') && getElement.value.length <= 10000) {
        maxLenght_description.style.color = '#ADADAD'
        length_description.innerText = getElement.value.length
    }

    // Если изменено поле описания таска и оно достигло лимита
    if (getElement.classList.contains('itc-modal-content__textarea-description-task') && getElement.value.length == 10000) {
        maxLenght_description.style.color = 'red'
    } 
} 






// Отображение галочки в кружке-конпке при наведении на кружок:
function checkboxModalMouseover() {
    hiddenByDisplay(checkbox_modal_icon, "show")
}
function checkboxModalMouseout() {
    hiddenByDisplay(checkbox_modal_icon, "show")
}










 // При наведении на один из пунктов выбора в modalAside

// При наведении
 function modalAisdeElementMouseover(e) {
    const curbtn = e.target.closest(".itc-modal-body__select-setting")
    hiddenByDisplay(curbtn.querySelector(".itc-modal-body__icon-down_wrapper"), "show")
 }

// При уходе мыши с объекта
 function modalAisdeElementMouseout(e) {
    const curbtn = e.target.closest(".itc-modal-body__select-setting")
    hiddenByDisplay(curbtn.querySelector(".itc-modal-body__icon-down_wrapper"), "hide")
 }










// ИЗМЕНЕНИЕ ТИПА ТАСКА:


// При клике на кнопку выбора типа таска в м.о.
function clickButTypeTask() {
    // Если скрытое меню выбора типа таска показано (не скрыто)
    if (conteinerFromHiddenMenuTypesTasks_modal.classList.contains("hide2") == false) {     // Если скрытое меню показано (не скрыто)
        // Скрываю меню выбора типа таска
        hiddenByDisplay(conteinerFromHiddenMenuTypesTasks_modal, "hide")      

        // Изменяю класс с active на hover-hint
        modalBtn_GroupTypeTask.classList.replace("active", "hover-hint")
    }
    // Если скрытое меню выбора типа таска скрыто
    else {
        // Скрываю скрытое меню выбора приоритета, если оно было открыто
        hiddenByDisplay(conteinerFromHiddenMenuPriorityTasks_modal, "hide")


        // Показываю меню выбора типа таска
        hiddenByDisplay(conteinerFromHiddenMenuTypesTasks_modal, "show")   

        // Удаляю класс для стилизации подсказки при наведении и добавляю "active" для постоянного выделения
        modalBtn_GroupTypeTask.classList.replace("hover-hint", "active")
        setIsSelectionMenuActive_MO(1)
    }
}


// При нажатии на само поля выбора
function clickFieldTypeTask() {
    setIsSelectionMenuActive_MO(1)
}


// При нажатии вне поля выбора
function clickOuterFieldTypeTask(e) {
    // Если скрытое меню типа таска (в sidebar) скрыто, а клик был не по одной из кнопке изменения параметра задачи (в sidebar), то игнор
    if ((conteinerFromHiddenMenuTypesTasks_modal.classList.contains("hide2")) && (!e.target.closest(".itc-modal-body__select-setting"))) return


    const isSelectionMenuActive_MO = getIsSelectionMenuActive_MO()

    // Если клик был вне поля выбора типа таска, ИЛИ же клик был по одной из кнопке изменения параметра задачи (в sidebar), кроме текущей (изменения типа)
    if (!isSelectionMenuActive_MO || (e.target.closest(".itc-modal-body__select-setting") && !e.target.closest(".itc-modal-body__select-setting[data-title='Перенести в...']"))) {
        // Скрываю меню выбора типа таска
        hiddenByDisplay(conteinerFromHiddenMenuTypesTasks_modal, "hide")  

        // Изменяю класс с active на hover-hint
        modalBtn_GroupTypeTask.classList.replace("active", "hover-hint")
    }

    if (isSelectionMenuActive_MO) {
        setTimeout(() => setIsSelectionMenuActive_MO(""), 100)
    }
}














// ИЗМЕНЕНИЕ СРОКА ВЫПОЛНЕНИЯ ТАСКА (не у подзадачи) :

// 1) Появление и скрытие поля с выбором срока выполнения задачи:

// 1.1) При клике на кнопку выбора срока выполнения таска в м.о.
function clickButDeadline(e) {
    const curBtnDeadline = e.target.closest(".itc-modal-body__group")
    const curHiddenCalendarContainer = curBtnDeadline.querySelector(".itc-modal-body__hidden-menu-deadline-calendare")
    const curHiddenCalendar = curBtnDeadline.querySelector(".hidden-menu-deadline-calendare")

    
    // Если доп меню скрыто
    if (conteinerFromHiddenMenuDeadlineTasks_modal.classList.contains("hide2") == true) {
        // Скрываю скрытые меню выбора типа таска и приоритета, если они были открыты
        hiddenByDisplay(conteinerFromHiddenMenuTypesTasks_modal, "hide")  
        hiddenByDisplay(conteinerFromHiddenMenuPriorityTasks_modal, "hide")  


        // Показываю скрытое меню срока выполнения
        hiddenByDisplay(conteinerFromHiddenMenuDeadlineTasks_modal, "show")  


        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = modalAside.querySelector(".itc-modal-body__text-settings_hidden-num")

        // Полная дата, которая была перевёрнута (стала: "год.месяц.число")
        const textAreaDeadlineHiddenNumReversed = textAreaDeadlineHiddenNum.innerText.split(".").reverse().join(".")

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


        
        // Удаляю класс для стилизации подсказки при наведении и добавляю "active" для постоянного выделения
        modalBtn_GroupDeadlineTask.classList.replace("hover-hint", "active")


        setIsSelectionMenuActive_MO(1)  

        
        // Запрещаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("true")
    }

    // Если доп меню показано (не скрыто)
    else if (conteinerFromHiddenMenuDeadlineTasks_modal.classList.contains("hide2") == false) {
        // Скрываю меню выбора срока выполнения таска и уничтожаю созданный календарь
        hiddenByDisplay(conteinerFromHiddenMenuDeadlineTasks_modal, "hide")  
        MyCalendar.destroy()
        MyCalendar = null

        // Изменяю класс с active на hover-hint
        modalBtn_GroupDeadlineTask.classList.replace("active", "hover-hint")

        
        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")
    }
}

// 1.2) При нажатии на само поля выбора в скрытом меню "sidebar")
function clickFieldDeadline(e) {
    setIsSelectionMenuActive_MO(1)
    setIsNewDeadlineButtonClicked_MO(1)     // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)


    // Если клик был после открытия окна срока в sidebar (в разделе изменения срока выполнения ТАСКА)
    // Если клик произошёл на дату из списка ul, или на день в каллендаре;
    if (e.target.closest(".itc-modal-body__deadline-item") || e.target.closest(".-day-")) {
        // Скрываю меню выбора срока выполнения таска и удаляю календарь в нём
        hiddenByDisplay(conteinerFromHiddenMenuDeadlineTasks_modal, "hide")  
        MyCalendar.destroy()    
        MyCalendar = null

        // Изменяю класс с active на hover-hint
        modalBtn_GroupDeadlineTask.classList.replace("active", "hover-hint")

        
        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")

        setIsNewDeadlineButtonClicked_MO("")
    }
}

// 1.3) При нажатии вне поля выбора (для скрытого меню срока у sidebar)
function clickOuterFieldDeadline(e) {
    if (!statusIsModal()) return    // Если МО отсутствует, то игнор

    // Если доп. меню срока выполнения ТАСКА - скрыто, то игнорируем
    if (conteinerFromHiddenMenuDeadlineTasks_modal.classList.contains("hide2") == true) return

    
    const isSelectionMenuActive_MO = getIsSelectionMenuActive_MO()
    
    
    // Если клик был после открытия окна срока в sidebar (в разделе изменения срока выполнения ТАСКА)
    // Если клик был вне поля выбора ИЛИ на кнопку изменения типа/приоритета таска
    if (!isSelectionMenuActive_MO || (e.target.closest(".itc-modal-body__select-setting") && !e.target.closest(".itc-modal-body__select-setting[data-title='Назначить новой крайний срок...']"))) {
        // Если клик был по доп функции подзадачи "Назначить срок", то игнорировать
        if (e.target.closest(".subtask__btnNewDeadline")) return


        // Скрываю меню выбора срока выполнения таска и удаляю календарь в нём
        hiddenByDisplay(conteinerFromHiddenMenuDeadlineTasks_modal, "hide")  
        MyCalendar.destroy()    
        MyCalendar = null
        

        // Изменяю класс с active на hover-hint
        modalBtn_GroupDeadlineTask.classList.replace("active", "hover-hint")

        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")

        const currentLi_modal = getCurrentLi_modal()
        const targetLi_subtask = getTargetLi_subtask()

        if (targetLi_subtask != null) {
            show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))
        } 
    }


    if (isSelectionMenuActive_MO) { 
        setTimeout(() => setIsSelectionMenuActive_MO(""), 100)
    }  
}






// 1) Появление и скрытие поле с выбором ПРИОРИТЕТА задачи в sidebar в МО

// 1.1) При нажатии на кнопку
function clickButPriority() {
    // Если меню выбора приоритета показано (не скрыто) 
    if (conteinerFromHiddenMenuPriorityTasks_modal.classList.contains("hide2") == false) {
        // Скрываю меню выбора приоритета таска
        hiddenByDisplay(conteinerFromHiddenMenuPriorityTasks_modal, "hide")  
        // Изменяю класс с active на hover-hint
        modalBtn_GroupPriorityTask.classList.replace("active", "hover-hint")
    }
    // Если меню выбора приоритета скрыто
    else if (conteinerFromHiddenMenuPriorityTasks_modal.classList.contains("hide2") == true) {
        // Скрываю скрытое меню выбора типа таска, если оно было открыты
        hiddenByDisplay(conteinerFromHiddenMenuTypesTasks_modal, "hide")  

        // Показываю скрытое меню выбора приоритета
        hiddenByDisplay(conteinerFromHiddenMenuPriorityTasks_modal, "show")  

        // Удаляю класс для стилизации подсказки при наведении и добавляю "active" для постоянного выделения
        modalBtn_GroupPriorityTask.classList.replace("hover-hint", "active")
        setIsSelectionMenuActive_MO(1)
    }
}


// 1.2) При нажатии на само поля выбора
function clickFieldPriority() {
    setIsSelectionMenuActive_MO(1)
}


// 1.3) При нажатии вне поля выбора - скрывается
function clickOuterFieldPriority(e) {
    // Если скрытое меню приоритета таска (в sidebar) скрыто, а клик был не по одной из кнопке изменения параметра задачи (в sidebar), то игнор
    if ((conteinerFromHiddenMenuPriorityTasks_modal.classList.contains("hide2")) && (!e.target.closest(".itc-modal-body__select-setting"))) return

    const isSelectionMenuActive_MO = getIsSelectionMenuActive_MO()

    if (!isSelectionMenuActive_MO || (e.target.closest(".itc-modal-body__select-setting") && !e.target.closest(".itc-modal-body__select-setting[data-title='Назначить приоритет...']"))) {
        // Скрываю меню выбора приоритета таска
        hiddenByDisplay(conteinerFromHiddenMenuPriorityTasks_modal, "hide")  

        // Изменяю класс с active на hover-hint
        modalBtn_GroupPriorityTask.classList.replace("active", "hover-hint")
    }

    if (isSelectionMenuActive_MO) {
        setTimeout(() => setIsSelectionMenuActive_MO(""), 100)
    }
}

// Функция для изменения стиля "выбранного приоритета" из списка ul
function reloadItemsPriority_modal(currentItemPriority) {
    priorityItem_modal.forEach(function(itemPriority) { 
        // Удаляю стиль выбранного элемента у ранее выбранного элемента 
        itemPriority.classList.remove("hovered_select_menu")  
        // Удаляю галочки у ранее выбранного элемента (если такой был)  
        hiddenByDisplay(itemPriority.querySelector(".itc-modal-body__priority-icon-selected"), "hide")      
    })
    // Добавляю стиль выбранного элемента
    currentItemPriority.classList.add("hovered_select_menu")   
    // Показываю галочку у выбранного элемента  
    hiddenByDisplay(currentItemPriority.querySelector(".itc-modal-body__priority-icon-selected"), "show") 
}


export {getVarsMO_toggleVisElTask, getEl_textarea_name, checkboxModalMouseover, checkboxModalMouseout, modalAisdeElementMouseover, modalAisdeElementMouseout, clickNameDescriptionModal, clickButTypeTask, clickFieldTypeTask, clickOuterFieldTypeTask, clickButDeadline, clickFieldDeadline, clickOuterFieldDeadline, clickButPriority, clickFieldPriority, clickOuterFieldPriority, reloadItemsPriority_modal}
'use strict';
// Данный файл для обновления данных таска в МО. В основном это всё связано с кнопками "prev" и "next"

import {hiddenByDisplay} from "./base.js"
import {getVarsMO_allFiles} from "./modal.js"
import {clickCloseEditModal} from "./MO_selectElementsTask.js"
import {funcAddNewSubtask} from "./MO_reloadSubtasks.js"



let targetLi                // Текущий таск (мо которого открыто)
let all_tasks = []          // Все задачи
let currentIdTask           // id у html элемента таска
let currentTask_arr         // Текущий объект таска в массиве
let currentIdTask_arr       // id таска у выбранного элемента массива
let all_subtasks = []       // Массив из всех подзадач текущего таска

let modalTitle
let modalContent 
let modalAside 


let priorityItem_modal      // Элементы li с вариантами приоритета таска


let deadlineItem_modal      // Элементы li с вариантами срока выполнения


let modalContent_main
let wrapCountSubtask_and_Subtask
let countSubtasks


let subtaskOuter_modal

let selectedDay_modal


function getVarsMO_dataUpdate(curTask) {
    targetLi = curTask
    all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))

    currentIdTask = Number(targetLi.getAttribute("id"))                                   

    currentTask_arr = all_tasks.find(function(el) {       // Присваиваю переменной тот таск, который имеет тот же id, что и выбранный html элемент таска
        return el.newTask_ID == currentIdTask
    })

    currentIdTask_arr = currentTask_arr.newTask_ID     
    
    all_subtasks = currentTask_arr.newTask_Subtasks_arr 

    modalTitle = document.querySelector(".itc-modal-title")
    modalContent = document.querySelector(".itc-modal-body")
    modalAside = document.querySelector(".itc-modal-body__aside")

    priorityItem_modal = document.querySelectorAll(".itc-modal-body__priority-item")

    deadlineItem_modal = document.querySelectorAll(".itc-modal-body__deadline-item")  

    modalContent_main = modalContent.querySelector(".itc-modal-body__main-content")
    wrapCountSubtask_and_Subtask = modalContent_main.querySelector(".itc-modal-body__subtask-content")
    countSubtasks = wrapCountSubtask_and_Subtask.querySelector(".itc-modal-body__subtask-count .itc-modal-body__subtasks-count")

    subtaskOuter_modal = modalContent.querySelector(".itc-modal-body__subtask-outer-block")
}


// Функция проверки и изменения состояния кнопок навигации (prev/next) в м.о.
function checkNavArrow_modal(curId, parentCurrentTask) {
    let isVisibleTasksTop 
    let isVisibleTasksBottom
    
    let tasks = [...parentCurrentTask.children];
    tasks.forEach((el) => {
        // Если id у проверяемого таска меньше чем у текущего И при этом проверяемый таск скрыт (имеет класс hiddenFiltered), то isVisibleTasksTop = true. Иначе = false
        // (Так же сперва проверяется присвоилось ли на прошлых итерациях переменной isVisibleTasksTop значение "true". Если данная переменная пустая (если это первая итерация) или же имеет значение "false", то тогда можно проводить итерацию и проверку для дальнейшего изменения этой переменной)
        if (isVisibleTasksTop != true && el.getAttribute("id") < curId && el.classList.contains("hiddenFiltered") == false) {
            isVisibleTasksTop = true
        }
        // Иначе проверяется присвоилось ли на прошлых итерациях переменной isVisibleTasksTop какое-либо значение. Если данная переменная пустая (если это первая итерация), то ей присваивается значение false. В дальнейшем данная переменная либо не изменится, либо изменится на true
        else if (!isVisibleTasksTop) {
            isVisibleTasksTop = false
        }
        // Если id у проверяемого таска больше чем у текущего И при этом проверяемый таск скрыт (имеет класс hiddenFiltered), то isVisibleTasksTop = true. Иначе = false
        // (Так же сперва проверяется присвоилось ли на прошлых итерациях переменной isVisibleTasksBottom значение "true". Если данная переменная пустая (если это первая итерация) или же имеет значение "false", то тогда можно проводить итерацию и проверку для дальнейшего изменения этой переменной)
        if (isVisibleTasksBottom != true && el.getAttribute("id") > curId && el.classList.contains("hiddenFiltered") == false) {
            isVisibleTasksBottom = true
        }
        // Иначе проверяется присвоилось ли на прошлых итерациях переменной isVisibleTasksBottom какое-либо значение. Если данная переменная пустая (если это первая итерация), то ей присваивается значение false. В дальнейшем данная переменная либо не изменится, либо изменится на true
        else if (!isVisibleTasksBottom) {
            isVisibleTasksBottom = false
        }
    })



    // Если выбраный таск является первым (самым верхним) (id самого верхнего совпадает с выбранным), то стрелочка "prev" диактивируется. В ином случае, - активируется
    if (parentCurrentTask.firstElementChild.getAttribute("id") == curId || isVisibleTasksTop == false) {
        document.querySelector(".itc-modal-header__btn-prev-task").classList.add("disabled")
        document.querySelector(".itc-modal-header__btn-prev-task").setAttribute("aria-disabled", "true");
        document.querySelector(".itc-modal-header__btn-prev-task").classList.remove("hover-hint_black");
    } else if (parentCurrentTask.firstElementChild.getAttribute("id") != curId || isVisibleTasksTop == true) {
        document.querySelector(".itc-modal-header__btn-prev-task").classList.remove("disabled")
        document.querySelector(".itc-modal-header__btn-prev-task").setAttribute("aria-disabled", "false");
        document.querySelector(".itc-modal-header__btn-prev-task").classList.add("hover-hint_black");
    }


    // Если выбраный таск является последним (самым нижним), то стрелочка "next" диактивируется. В ином случае, - активируется
    if (parentCurrentTask.lastElementChild.getAttribute("id") == curId || isVisibleTasksBottom == false) {
        document.querySelector(".itc-modal-header__btn-next-task").classList.add("disabled")
        document.querySelector(".itc-modal-header__btn-next-task").setAttribute("aria-disabled", "true");
        document.querySelector(".itc-modal-header__btn-next-task").classList.remove("hover-hint_black");
    } else if (parentCurrentTask.lastElementChild.getAttribute("id") != curId || isVisibleTasksBottom == true) {     // Иначе, если наоборот, то:
        document.querySelector(".itc-modal-header__btn-next-task").classList.remove("disabled")
        document.querySelector(".itc-modal-header__btn-next-task").setAttribute("aria-disabled", "false");
        document.querySelector(".itc-modal-header__btn-next-task").classList.add("hover-hint_black");
    }
}



function prevTask() {
    // Если стрелка "prev" имеет аттрибут "aira-disabled = false" (кнопка не деактивирована)
    if (document.querySelector(".itc-modal-header__btn-prev-task").getAttribute("aria-disabled") == "false") {
        let prevEl       // Соседний предыдущий таск (ДОСТУПНЫЙ (не скрытый))
        let parentCurrentTask = targetLi.parentElement
        let tasks = [...parentCurrentTask.children];        // Массив из всех html элементов тасков
        
        // Перебираем все таски и находим самый ближайший доступный к текущему (из предыдущих тасков). Цикл заканчивается как только такой таск находится.
        for (let i = parentCurrentTask.lastElementChild.getAttribute("id") - tasks.length; !prevEl; i++) {      // Изначально i = id последнего таска - длине массива из тасков у текущего родителя (обычных тасков, либо просроченных). Затем i увеличивается на 1 с каждой итерацией, пока  переменная prevEl не приймет какое-либо значение
            if (tasks[currentIdTask_arr - 1 - i].previousElementSibling.classList.contains("hiddenFiltered") == false) {
                prevEl = tasks[currentIdTask_arr - 1 - i].previousElementSibling
            }
        }


        currentIdTask_arr = prevEl.getAttribute("id")      // Меняю id таска, что бы он соответствовал тому таску в массиве, на который нужно перейти
        // Текущий выбранный (новый, после нажатия на стрелочку) таск меняется на тот, что соответствует новому id (предыдущему в списке) 

        
        currentTask_arr = all_tasks[prevEl.getAttribute("id") - 1]  

        targetLi = prevEl

        all_subtasks = currentTask_arr.newTask_Subtasks_arr

        // Обновляю глобальную переменную, указывающую какой сейчас таск открыт в МО
        window.localStorage.setItem("openMoTargetLiId", currentIdTask_arr)


        // Вызываю функцию для отслеживания и изменения состояния стрелок навигации.
        checkNavArrow_modal(currentIdTask_arr, targetLi.parentElement)

        // Вызываю функцию для обновления содержания модального окна
        updateModal(currentTask_arr)


        // Удаляю оба textarea, возвращаю видимость div-ов, скрываю кнопки "Отмена" и "Ошибка"
        clickCloseEditModal()


        const checkbox_modal = document.querySelector(".itc-modal-body__main-content .task__button-task-checkbox")      // Сам кнопка-кружок возле имени таска в м.о.
        const checkbox_modal_icon = checkbox_modal.querySelector("img")         // Галочка в кружочке

        // Отображение галочки в кружке-конпке при наведении на кружок:
        checkbox_modal.addEventListener("mouseover", function() {
            hiddenByDisplay(checkbox_modal_icon, "show")
        })
        checkbox_modal.addEventListener("mouseout", function() {
            hiddenByDisplay(checkbox_modal_icon, "hide")
        })
    }
}

function nextTask() {
     // Если стрелка "next" имеет аттрибут "aira-disabled = false" (кнопка не деактивирована)
     if (document.querySelector(".itc-modal-header__btn-next-task").getAttribute("aria-disabled") == "false") {
        let nextEl       // Соседний следующий таск (ДОСТУПНЫЙ (не скрытый))
        let parentCurrentTask = targetLi.parentElement
        let tasks = [...parentCurrentTask.children];        // Массив из всех html элементов тасков
        
        // Перебираем все таски и находим самый ближайший доступный к текущему (из следующий тасков). Цикл заканчивается как только такой таск находится.
        for (let i = parentCurrentTask.lastElementChild.getAttribute("id") - tasks.length; !nextEl; i--) {      // Изначально i = id последнего таска - длине массива из тасков у текущего родителя (обычных тасков, либо просроченных). Затем i увеличивается на 1 с каждой итерацией, пока  переменная nextEl не приймет какое-либо значение
            if (tasks[currentIdTask_arr - 1 - i].nextElementSibling.classList.contains("hiddenFiltered") == false) {
                nextEl = tasks[currentIdTask_arr - 1 - i].nextElementSibling
            }
        }


        currentIdTask_arr = nextEl.getAttribute("id")     // Меняю id таска, что бы он соответствовал тому таску в массиве, на который нужно перейти
        // Текущий выбранный (новый, после нажатия на стрелочку) таск меняется на тот, что соответствует новому id (следующему в списке)  
        currentTask_arr = all_tasks[nextEl.getAttribute("id") - 1]

        targetLi = nextEl
        
        all_subtasks = currentTask_arr.newTask_Subtasks_arr

        // Обновляю глобальную переменную, указывающую какой сейчас таск открыт в МО
        window.localStorage.setItem("openMoTargetLiId", currentIdTask_arr)

        // Вызываю функцию для отслеживания и изменения состояния стрелок навигации.
        checkNavArrow_modal(currentIdTask_arr, targetLi.parentElement)

        // Вызываю функцию для обновления содержания модального окна
        updateModal(currentTask_arr)

        // Удаляю оба textarea, возвращаю видимость div-ов, скрываю кнопки "Отмена" и "Ошибка"
        clickCloseEditModal()



        const checkbox_modal = document.querySelector(".itc-modal-body__main-content .task__button-task-checkbox")      // Сам кнопка-кружок возле имени таска в м.о.
        const checkbox_modal_icon = checkbox_modal.querySelector("img")         // Галочка в кружочке

        // Отображение галочки в кружке-конпке при наведении на кружок:
        checkbox_modal.addEventListener("mouseover", function() {
            hiddenByDisplay(checkbox_modal_icon, "show")
        })
        checkbox_modal.addEventListener("mouseout", function() {
            hiddenByDisplay(checkbox_modal_icon, "hide")
        })
    }
}




// Функция для обновления содержания модального окна
function updateModal(curTask) {
    const htmlTitle = `
    <div class="wrapper-type-task">
        <img class="my-type-projects__icon-grid" src="./icon/grid_0.png" alt="">
        <span class="wrapper-type-task__name">${curTask.newTask_typeTask_name}</span>
        <img class="wrapper-type-task__icon-type-project" src="${curTask.newTask_typeTask_icon_src}" alt="">
    </div>
    `

    const htmlContent_nameDescription = `
        <div class="task__name-task" aria-label="Название задачи">${curTask.newTask_name}</div>
        <div class="task__description-task" aria-label="описание">
            <span class="task__description-task-text">${curTask.newTask_description}</span>
        </div>
    `

    const btnCheckbox_modal = modalContent.querySelector(".task__wrapper-button-task-checkbox button")  // Сама кнопка-кружок в м.о.
    const priorityClassColorTask_now = btnCheckbox_modal.getAttribute("class").split(" ")[1]        // Нынешний класс кружка с цветом (до изменения)
    const priorityClassColorTask_new = `task__button-task-checkbox_${curTask.newTask_priority_color}`   // Новый класс кружка с цветом (того таска, на который переключаемся)
    const prioritySrcMarkColorTask_new = `./icon/MarkOk_${curTask.newTask_priority_color}.png`     // Путь для новой галочки в кружке (того таска, на который переключаемся)



    const modalAside_nameTypeTask = curTask.newTask_typeTask_name
    const modalAside_iconTypeTask = curTask.newTask_typeTask_icon_src
    const modalAside_deadlineTask = curTask.newTask_deadlineTask
    const modalAside_deadlineTaskFullNum = curTask.newTask_deadlineFullDataTask
    const modalAside_priorityNameTask = curTask.newTask_priority_name


    


    const modalAside_prioritySrcColorTask = `./icon/priority_${curTask.newTask_priority_color}.png`



    modalTitle.querySelector(".wrapper-type-task").remove()     // Удаляю в title указанный ранее тип таска (название и иконку)

    modalContent.querySelector(".task__innerWrap-name-description").innerHTML = ""     // Очищаю содержание блока с именем/описанием таска в м.о.


    // Изменяю класс у кнопки-кружака на новый, а так же путь до галочки
    btnCheckbox_modal.classList.replace(priorityClassColorTask_now, priorityClassColorTask_new)     // Изменяю класс с цветом у кружка-кнопки  
    btnCheckbox_modal.querySelector("img").setAttribute("src", prioritySrcMarkColorTask_new)        // Изменяю путь до галочки

    // Вставляю в title тип таска (название и иконку) на который переключились
    modalTitle.insertAdjacentHTML("afterbegin", htmlTitle)   

    // Вставляю в content кимя/описание того таска на который переключились
    modalContent.querySelector(".task__innerWrap-name-description").insertAdjacentHTML("afterbegin", htmlContent_nameDescription)


    subtaskOuter_modal.innerHTML = ""

    // Перебираю все подзадачи этого таска, форматируя их в html и вставляя в м.о.
    curTask.newTask_Subtasks_arr.forEach(function(subtaskEl) {
        funcAddNewSubtask(subtaskEl)
    })
    // Обновляю поле с количеством подзадач
    countSubtasks.innerText = currentTask_arr.newTask_countSubtask



    // Вставляю в sidebar тип таска, на который переключились
    modalContent.querySelector(".itc-modal-body__select-setting .wrapper-type-task__name").innerText = modalAside_nameTypeTask
    modalContent.querySelector(".wrapper-type-task__icon-type-project").setAttribute("src", modalAside_iconTypeTask)

    // Вставляю в sidebar срок выполнения таска, на который переключились
    modalContent.querySelector(".itc-modal-body__select-setting .itc-modal-body__text-settings").innerText = modalAside_deadlineTask
    modalContent.querySelector(".itc-modal-body__select-setting .itc-modal-body__text-settings_hidden-num").innerText = modalAside_deadlineTaskFullNum


    // Вставляю в sidebar приоритет таска, на который переключились
    modalContent.querySelector(".itc-modal-body__wrapper-priority .itc-modal-body__text-settings").innerText = modalAside_priorityNameTask     
    modalContent.querySelector(".itc-modal-body__wrapper-priority .itc-modal-body__icon-selected-setting").setAttribute("src", modalAside_prioritySrcColorTask)





    // Убираю стиль для выбранного элемента из списка сроков выполнения (в скрытом меню)
    deadlineItem_modal.forEach(function(itemDeadline) { 
        itemDeadline.classList.remove("hovered_select_menu")
    })
    // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
    if (selectedDay_modal && selectedDay_modal != "") {
        selectedDay_modal.classList.remove("-selected-")
    }


    // Убираю стиль для выбранного элемента из списка типов тасков (в скрытом меню)
    priorityItem_modal.forEach(function(itemPriority) { 
        itemPriority.classList.remove("hovered_select_menu")    // Удаляю стиль выбранного элемента у ранее выбранного элемента
        hiddenByDisplay(itemPriority.querySelector(".itc-modal-body__priority-icon-selected"), "hide")
    })

    // Обновляю значения переменных в данном js файле (в связи с перелистыванием таска)
    // Обовляю переменные для МО во всех файлах-модулях
    getVarsMO_allFiles(curTask)
}


function reloadAll_subtasks(newArr) {
    all_subtasks = newArr
    all_tasks[currentIdTask_arr -1].newTask_Subtasks_arr = newArr

    window.localStorage.setItem('all_tasks', JSON.stringify(all_tasks))
}
function getAll_subtasks() {
    return all_subtasks
}


// Появление и скрытие поля с выбором срока выполнения подзадачи в меню создания/редактирования подзадачи и при открытии его через "Назначить срок" (когда открыто МО)
let isSelectionMenuActive_MO = ""
function setIsSelectionMenuActive_MO(val) {
    isSelectionMenuActive_MO = val
}
function getIsSelectionMenuActive_MO() {
    return isSelectionMenuActive_MO
}


// (для работы с доп функциями при клике на кнопку добавления нового таска)
let isNewDeadlineButtonClicked_MO = ""    

function setIsNewDeadlineButtonClicked_MO(val) {
    isNewDeadlineButtonClicked_MO = val
}
function getIsNewDeadlineButtonClicked_MO() {
    return isNewDeadlineButtonClicked_MO
}

// Элемент li под курсором в данный момент (если есть)
let currentLi_modal = null      

function setCurrentLi_modal(val) {
    currentLi_modal = val
}
function getCurrentLi_modal() {
    return currentLi_modal
}


// Подзадача, внутри которой был нажат "edit"
let targetLi_subtask = null      

function setTargetLi_subtask(val) {
    targetLi_subtask = val
}
function getTargetLi_subtask() {
    return targetLi_subtask
}




function getCurrentTask_arr() {
    return currentTask_arr
}


function setSelectedDay_modal(val) {
    selectedDay_modal = val
}

function getSelectedDay_modal() {
    return selectedDay_modal
}




export {getVarsMO_dataUpdate, checkNavArrow_modal, prevTask, nextTask, reloadAll_subtasks, getAll_subtasks, setIsSelectionMenuActive_MO, getIsSelectionMenuActive_MO, setIsNewDeadlineButtonClicked_MO, getIsNewDeadlineButtonClicked_MO, setCurrentLi_modal, getCurrentLi_modal, setTargetLi_subtask, getTargetLi_subtask, getCurrentTask_arr, setSelectedDay_modal, getSelectedDay_modal}
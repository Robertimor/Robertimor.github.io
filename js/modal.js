'use strict';
import ItcModal from "../modal/js/modal.js";
import {countAllTasks, sectionContentBlock_viewContent, taskForm, taskNameInput, taskDescriptionInput, deadlineButton, deadlineMenu, deadlineOptions, deadlineCalendar, priorityButton, taskTypeButton, buttonCloseMenuNewTask, buttonAddNewTask, buttonSaveTask} from "./doomElements.js"
import {reloadFormAddTask, removeTaskMass, reloadAllTasks, switchIsModal, switchIsModal_block} from "./scripts.js"
import {switchDisabledShowDopFuncTask} from "./toggleVisibleElements.js"

import {getVarsMO_dataUpdate, checkNavArrow_modal, prevTask, nextTask, setCurrentLi_modal, getCurrentLi_modal, getTargetLi_subtask, getCurrentTask_arr, getAll_subtasks} from "./MO_dataUpdate.js"

import {getVarsMO_toggleVisElTask, checkboxModalMouseover, checkboxModalMouseout, modalAisdeElementMouseover, modalAisdeElementMouseout, clickNameDescriptionModal, clickButTypeTask, clickFieldTypeTask, clickOuterFieldTypeTask, clickButDeadline, clickFieldDeadline, clickOuterFieldDeadline, clickButPriority, clickFieldPriority, clickOuterFieldPriority, reloadItemsPriority_modal} from "./MO_toggleVisibleElTask.js"
import {getVarsMO_toggleVisElSubTasks, selectDeadlineFunc, btnNewDeadlineSubtask, clickMenudeadline, clickFieldMenuDeadlineSubtask, clickOuterModal_deadlineSubtask, subtaskMouseover, subtaskMouseout, subtaskCheckboxMouseover, subtaskCheckboxMouseout, hide_subtask_dopFuncs_modal} from "./MO_toggleVisibleElSubtasks.js"
import {getVarsMO_selectElementsSubtask, clickButtonNewDeadlineSubtask, deadlineItemSubtaskFormClick, clickButtonNewDeadlineSubtaskFromCalendar, deadlineClickCalendar} from "./MO_selectElementsSubtask.js"
import {getVarsMO_selectElementsTask, clickCloseEditModal, clickSaveEditModal, selectTypetaskItemMO, selectDeadlineItemMO, selectDeadlineItemCalendarMO, selectPriorityItemMO} from "./MO_selectElementsTask.js"
import {getVarsMO_reloadSubtasks, editSubtasks, buttonSaveSubtask, removeSubTask, funcAddNewSubtask} from "./MO_reloadSubtasks.js"



let targetLi
let currentIdTask


function getVarsMO_allFiles() {
    targetLi = document.getElementById(`${window.localStorage.getItem("openMoTargetLiId")}`)
    currentIdTask = Number(targetLi.getAttribute("id")) 

    // Вызываю функцию для записи всех необходимых переменных в файл "MO_dataUpdate.js"
    getVarsMO_dataUpdate(targetLi)

    // Вызываю функцию для записи всех необходимых переменных в файл "MO_toggleVisibleElTask.js"
    getVarsMO_toggleVisElTask()

    // Вызываю функцию для записи всех необходимых переменных в файл "MO_toggleVisibleElSubtasks.js"
    getVarsMO_toggleVisElSubTasks()

    // Вызываю функцию для записи всех необходимых переменных в файл "MO_selectElementsTask.js"
    getVarsMO_selectElementsTask(targetLi)

    // Вызываю функцию для записи всех необходимых переменных в файл "MO_selectElementsSubtask.js"
    getVarsMO_selectElementsSubtask(targetLi)

    // Вызываю функцию для записи всех необходимых переменных в файл "MO_reloadSubtasks.js" 
    getVarsMO_reloadSubtasks()
}


// Функция для проверки того, открыто ли на данный момент МО
function statusIsModal() {
    const isModal = window.localStorage.getItem("isModal")
    if (isModal == "true") {
        return true
    }
    else if (isModal == "false") {
        return false
    }
}

let modal = ""
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    targetLi = e.target.closest(".task")


    if (!e.target.closest(".task__wrapper")) return    // Если клик был вне таска (вне его основного каркаса), то игнорировать клик
    if (e.target.closest(".task__dopFuncs")) return    // Если была нажата одна из кнопок доп.функций таска, то игнорировать клик
    if (e.target.closest(".task__wrapper-button-task-checkbox")) return     // Если была нажата кнопка-кружочек у таска (для удаляения таска), то игнорировать клик


    // Если стоит блокировка на открытие м.о., то игнорировать
    let isModal_block = window.localStorage.getItem("isModal_block")
    if (isModal_block == "true") return

    

    // Все задачи
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))
    
    window.localStorage.setItem("openMoTargetLiId", targetLi.getAttribute("id"))








     
    currentIdTask = Number(targetLi.getAttribute("id"))     // id у html элемента таска (нужно только при открытии МО. При перелистывании через стрелки оно не будет мешать)                         
    // Присваиваю переменной тот таск, который имеет тот же id, что и выбранный html элемент таска  
  

    let currentTask_arr = all_tasks.find(function(el) {     // Текущий объект таска в массиве          
        return el.newTask_ID == currentIdTask   
    })   
 
    
    const parentCurrentTask = targetLi.parentElement
          


    const currentTask_typeTask_icon = currentTask_arr.newTask_typeTask_icon_src
    const currentTask_typeTask_name = currentTask_arr.newTask_typeTask_name
    const currentTask_priority_color = currentTask_arr.newTask_priority_color
    const currentTask_priority_name = currentTask_arr.newTask_priority_name
    const currentTask_name = currentTask_arr.newTask_name
    const currentTask_description = currentTask_arr.newTask_description
    const currentTask_deadline = currentTask_arr.newTask_deadlineTask
    const currentTask_deadlineFullNum = currentTask_arr.newTask_deadlineFullDataTask



    modal = new ItcModal({
        title: `
        <div class="wrapper-type-task">
            <img class="my-type-projects__icon-grid" src="./icon/grid_0.png" alt="">
            <span class="wrapper-type-task__name">${currentTask_typeTask_name}</span>
            <img class="wrapper-type-task__icon-type-project" src="${currentTask_typeTask_icon}" alt="">
        </div>
        <div class="itc-modal-header__nav-prev-next">
            <button class="itc-modal-header__btn-prev-task hover-hint_black" data-title="Предыдущая задача" aria-disabled = false>
                <img src="./icon/up.png" alt="">
            </button>
            <button class="itc-modal-header__btn-next-task hover-hint_black" data-title="Следующая задача" aria-disabled = false>
                <img src="./icon/down.png" alt="">
            </button>
        </div>
        `,
        content: `
        <div class="itc-modal-body__main-content">
            <div class="task__wrapper">
                <div class="task__wrapper-button-task-checkbox">
                    <button class="task__button-task-checkbox task__button-task-checkbox_${currentTask_priority_color}"><img src="./icon/MarkOk_${currentTask_priority_color}.png" alt="" class="hide2"></button>
                </div>
                <div class="task__task-list-itemsContent-wrapper">
                    <div class="task__outerWrap-name-description">
                        <div class="task__innerWrap-name-description itc-modal-body__name_description">
                            <div class="task__name-task" aria-label="Название задачи">${currentTask_name}</div>
                            <div class="task__description-task" aria-label="описание">
                                <span class="task__description-task-text">${currentTask_description}</span>
                            </div>
                        </div>
                    </div>
                    <div class="buttuns-closeSave-task">
                        <button class="btn-close hovered1_2 hide2" aria-label="Отмена"><span>Отмена</span></button>
                        <button class="btn-save hide2" aria-label="Изменить задачу" aria-disabled="false"><span>Сохранить</span></button>
                    </div>
                </div>
            </div>

            <div class="itc-modal-body__subtask-content">
                <div class="itc-modal-body__subtask-count">
                    <img src="./icon/down.png" alt="">
                    <img src="./icon/right2.png" alt="" class="hide2">
                    <span>Подзадачи:</span>
                    <span class="itc-modal-body__subtasks-count"></span>
                </div>
                <ul class="itc-modal-body__subtask-outer-block">

                </ul>
            </div>

            <div class="itc-modal-body__btn-new-dop-task hovered1_2">
                <div><img src="./icon/add2_1.png" alt=""></div>
                <span>Добавить подзадачу</span>
            </div>

        </div>
        <div class="itc-modal-body__aside">
            <div class="itc-modal-body__group">
                <div class="itc-modal-body__name-setting">Проект</div>
                <div class="itc-modal-body__select-setting hover-hint" data-title="Перенести в...">
                    <div class="wrapper-type-task">
                        <img class="my-type-projects__icon-grid" src="./icon/grid_0.png" alt="">
                        <span class="wrapper-type-task__name">${currentTask_typeTask_name}</span>
                        <img class="wrapper-type-task__icon-type-project" src="${currentTask_typeTask_icon}" alt="">
                    </div>
                    
                    <div class="itc-modal-body__icon-down_wrapper hide2">
                        <img class="itc-modal-body__icon-down" src="icon/down.png">
                    </div>
                </div>
                <div class="itc-modal-body__hidden-menuTypesTask hide2">
                    <div class="itc-modal-body__wrapper-input-search">
                        <input type="text" name="searchType" id="search-type-task" list="list-types-task" placeholder="Введите название проекта">
                        <datalist id="list-types-task">
                            <option value="Дом"></option>
                            <option value="Работа"></option>
                            <option value="Учёба"></option>
                        </datalist>
                    </div>
                    <ul class="my-type-projects my-type-projects__conteiner_from-hidden-menu">
                        <li class="wrapper-type-task my-type-projects__type-project hovered_aside-items">
                            <img class="wrapper-type-task__icon-grid" src="./icon/grid_0.png" alt="" width="15px">
                            <span class="wrapper-type-task__name">Дом</span>
                            <img class="wrapper-type-task__icon-type-project" src="./icon/home.png" alt="" width="18px">
                        </li>
                        <li class="wrapper-type-task my-type-projects__type-project hovered_aside-items">
                            <img class="wrapper-type-task__icon-grid" src="./icon/grid_0.png" alt="" width="15px">
                            <span class="wrapper-type-task__name">Работа</span>
                            <img class="wrapper-type-task__icon-type-project" src="./icon/job.png" alt="" width="20px">
                        </li>
                        <li class="wrapper-type-task my-type-projects__type-project hovered_aside-items">
                            <img class="wrapper-type-task__icon-grid" src="./icon/grid_0.png" alt="" width="15px">
                            <span class="wrapper-type-task__name">Учёба</span>
                            <img class="wrapper-type-task__icon-type-project" src="./icon/study.png" alt="" width="19px">
                        </li>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="itc-modal-body__group">
                <div class="itc-modal-body__name-setting">Срок выполнения</div>
                <div class="itc-modal-body__select-setting hover-hint" data-title="Назначить новой крайний срок...">
                    <div class="itc-modal-body__select-deadline">
                        <img src="./icon/deadlineNewTask_0.png" alt="" width="13px" class="itc-modal-body__icon-selected-setting">
                        <span class="itc-modal-body__text-settings" aria-valuetext="notChanged">${currentTask_deadline}</span>
                        <span class="itc-modal-body__text-settings_hidden-num hide2" aria-valuetext="notChanged">${currentTask_deadlineFullNum}</span>
                    </div>
                    <div class="itc-modal-body__icon-down_wrapper hide2">
                        <img class="itc-modal-body__icon-down" src="icon/down.png">
                    </div>
                </div>
                <div class="itc-modal-body__hidden-menu-deadline hide2">
                    <ul class="itc-modal-body__deadline-list">
                        <li class="itc-modal-body__deadline-item hovered1_3">
                            <img src="./icon/sun.png" alt="" class="itc-modal-body__deadline-icon">
                            <span class="itc-modal-body__deadline-name">Сегодня</span>
                            <span class="itc-modal-body__deadline-info">#</span>
                        </li>
                        <li class="itc-modal-body__deadline-item hovered1_3">
                            <img src="./icon/deadlineNewTask_3.png  " alt="" class="itc-modal-body__deadline-icon">
                            <span class="itc-modal-body__deadline-name">Завтра</span>
                            <span class="itc-modal-body__deadline-info">#</span>
                        </li>
                        <li class="itc-modal-body__deadline-item hovered1_3">
                            <img src="./icon/divan.png" alt="" class="itc-modal-body__deadline-icon">
                            <span class="itc-modal-body__deadline-name">На выходных</span>
                            <span class="itc-modal-body__deadline-info">#</span>
                        </li>
                        <li class="itc-modal-body__deadline-item hovered1_3">
                            <img src="./icon/nextWeek.png" alt="" class="itc-modal-body__deadline-icon">
                            <span class="itc-modal-body__deadline-name">След. неделя</span>
                            <span class="itc-modal-body__deadline-info">#</span>
                        </li>
                        <li class="itc-modal-body__deadline-item hovered1_3">
                            <img src="./icon/noDeadline.png" alt="" class="itc-modal-body__deadline-icon">
                            <span class="itc-modal-body__deadline-name">Без срока</span>
                            <span class="itc-modal-body__deadline-info">#</span>
                        </li>
                    </ul>
                    <div class="itc-modal-body__hidden-menu-deadline-calendare"><input type="text" class="hidden-menu-deadline-calendare hide2"></div>
                </div>
            </div>
            <hr>
            <div class="itc-modal-body__group">
                <div class="itc-modal-body__name-setting">Приоритет</div>
                <div class="itc-modal-body__select-setting hover-hint" data-title="Назначить приоритет...">
                    <div class="itc-modal-body__wrapper-priority">
                        <img src="./icon/priority_${currentTask_priority_color}.png" class="itc-modal-body__icon-selected-setting">
                        <span class="itc-modal-body__text-settings">${currentTask_priority_name}</span>
                    </div>
                    <div class="itc-modal-body__icon-down_wrapper hide2">
                        <img class="itc-modal-body__icon-down" src="icon/down.png">
                    </div>
                </div>
                <div class="itc-modal-body__hidden-menu-priority hide2">
                    <ul class="itc-modal-body__priority-list">
                        <li class="itc-modal-body__priority-item hovered1_3">
                            <img src="./icon/priority_red.png" alt="" class="itc-modal-body__priority-icon">
                            <span class="itc-modal-body__priority-name" aria-label="P1">Приоритет 1</span>
                            <span class="itc-modal-body__priority-icon-selected hide2"><img src="./icon/redMarkOk.png" alt=""></span>
                        </li>
                        <li class="itc-modal-body__priority-item hovered1_3">
                            <img src="./icon/priority_orange.png" alt="" class="itc-modal-body__priority-icon">
                            <span class="itc-modal-body__priority-name" aria-label="P2">Приоритет 2</span>
                            <span class="itc-modal-body__priority-icon-selected hide2"><img src="./icon/redMarkOk.png" alt=""></span>
                        </li>
                        <li class="itc-modal-body__priority-item hovered1_3">
                            <img src="./icon/priority_blue.png" alt="" class="itc-modal-body__priority-icon">
                            <span class="itc-modal-body__priority-name" aria-label="P3">Приоритет 3</span>
                            <span class="itc-modal-body__priority-icon-selected hide2"><img src="./icon/redMarkOk.png" alt=""></span>
                        </li>
                        <li class="itc-modal-body__priority-item hovered1_3">
                            <img src="./icon/priority_ser.png" alt="" class="itc-modal-body__priority-icon">
                            <span class="itc-modal-body__priority-name" aria-label="Приоритет">Приоритет 4</span>
                            <span class="itc-modal-body__priority-icon-selected hide2"><img src="./icon/redMarkOk.png" alt=""></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        `,
    })


    getVarsMO_allFiles()


    
    const modalContent = document.querySelector(".itc-modal-body")
    const modalAside = document.querySelector(".itc-modal-body__aside")

    const modalBtn_GroupTypeTask = document.querySelector('.itc-modal-body__select-setting[data-title="Перенести в..."]')       // Кнопка в м.о. для изменения типа таска
        const conteinerFromHiddenMenuTypesTasks_modal = document.querySelector(".itc-modal-body__hidden-menuTypesTask")      // Скрытое меню выбора типа таска в м.о. 

    // Поле для выбора срока выполнения таска в м.о.
    const modalBtn_GroupDeadlineTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить новой крайний срок..."]')      
        // Скрытое меню выбора срока выполнения таска в м.о. 
        const conteinerFromHiddenMenuDeadlineTasks_modal = document.querySelector(".itc-modal-body__hidden-menu-deadline")      
                // Элементы li с вариантами срока выполнения
                const deadlineItem_modal = document.querySelectorAll(".itc-modal-body__deadline-item")     
            // Календарь в скрытом меню для выбора срока выполнения таска внутри МО 
            const DeadlineCalendare_modal = document.querySelector(".itc-modal-body__hidden-menu-deadline-calendare")  

    
    // Поле для выбора приоритета таска в м.о.
    const modalBtn_GroupPriorityTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить приоритет..."]') 
        // Скрытое меню выбора приоритета таска в м.о.       
        const conteinerFromHiddenMenuPriorityTasks_modal = document.querySelector(".itc-modal-body__hidden-menu-priority")
            // Элементы li с вариантами приоритета
            const priorityItem_modal = document.querySelectorAll(".itc-modal-body__priority-item")


    const typesProjectForSelect_modal = document.querySelectorAll(".itc-modal-body__hidden-menuTypesTask .my-type-projects__type-project")   // Элементы li с типом таска

    const modalWindow = document.querySelector(".itc-modal-content")      // Само модальное окно
    const buttonCloseEdit = modalWindow.querySelector(".buttuns-closeSave-task .btn-close")     // Кнопка закрытия редактирования ТАСКА (не подзадачи) в м.о.
    const buttonSaveEdit = modalWindow.querySelector(".buttuns-closeSave-task .btn-save")       // Кнопка сохранения редактирования ТАСКА в м.о.


    const modal_wrapper_name_description = modalWindow.querySelector(".task__innerWrap-name-description")   // Контейнер с именем и описанием таска

    const checkbox_modal = document.querySelector(".itc-modal-body__main-content .task__button-task-checkbox")      // Сам кнопка-кружок возле имени таска в м.о.


    const modalContent_main = modalContent.querySelector(".itc-modal-body__main-content")

    const addSubtask = modalContent.querySelector(".itc-modal-body__btn-new-dop-task")      // Кнопка "Добавить подзадачу"
    const wrapCountSubtask_and_Subtask = modalContent_main.querySelector(".itc-modal-body__subtask-content")
    const countSubtasks = wrapCountSubtask_and_Subtask.querySelector(".itc-modal-body__subtask-count .itc-modal-body__subtasks-count")
    const subtaskOuter_modal = modalContent.querySelector(".itc-modal-body__subtask-outer-block")

    countSubtasks.innerHTML = getCurrentTask_arr().newTask_countSubtask


    // При клике на поле с именем/описанием таска
    modal_wrapper_name_description.addEventListener("click", clickNameDescriptionModal)






    // Функция проверки и изменения состояния кнопок навигации (prev/next) в м.о.
    checkNavArrow_modal(currentIdTask, parentCurrentTask)      // Сразу же вызываем эту функцию, вставив в аргумент id выбранного html элемента таска


    // При клике на стрелочку "prev"
    document.querySelector(".itc-modal-header__btn-prev-task").addEventListener("click", prevTask)

    // При клике на стрелочку "next"
    document.querySelector(".itc-modal-header__btn-next-task").addEventListener("click", nextTask)




    // Отображение галочки в кружке-конпке при наведении на кружок:
    checkbox_modal.addEventListener("mouseover", checkboxModalMouseover)
    checkbox_modal.addEventListener("mouseout", checkboxModalMouseout)


    subtaskOuter_modal.addEventListener("mouseover", subtaskCheckboxMouseover)
    subtaskOuter_modal.addEventListener("mouseout", subtaskCheckboxMouseout)

    


    // При клике на кнопку "Отмена" при редактировании таска (не подзадачи!)(но внутри МО)
    buttonCloseEdit.addEventListener("click", clickCloseEditModal)


    // При клике на кнопку "Сохранить" при редактировании текущего таска (не подзадачи!) (но внутри МО)
    buttonSaveEdit.addEventListener("click", clickSaveEditModal)
    


    // Удаление текущего таска при нажатии на кнопку-кружок
    checkbox_modal.addEventListener("click", function(e) {
        // Удаляю текущий таск из html
        targetLi.remove()
        // Удаляю текущий таск из массива
        removeTaskMass(window.localStorage.getItem("openMoTargetLiId") - 1, 1)

        // Обновляю поле на странице с количеством существующих тасков
        countAllTasks.innerHTML = all_tasks.length    

        modal.dispose()
    })


    // При нажатии на кружок - удаляю подзадачу
    subtaskOuter_modal.addEventListener("click", function(e) {
        let target = e.target.closest(".subtask__button-subtask-checkbox")   //Нажатый кружок
        let targetLi = e.target.closest(".subtask")       // Подзадача, внутри которой был нажат кружок
        if (!target) return
    
        // Функция удаления подзадач при нажатии на кружок
        removeSubTask(targetLi)
    })


    



    // Перебираю все подзадачи этого таска, форматируя их в html и вставляя в м.о.
    currentTask_arr.newTask_Subtasks_arr.forEach(function(subtaskEl) {
        funcAddNewSubtask(subtaskEl)
    })


    // При наведении на один из пунктов выбора в modalAside
    modalAside.querySelectorAll(".itc-modal-body__select-setting").forEach(function(setting) {
        // При наведении
        setting.addEventListener("mouseover", modalAisdeElementMouseover)
        // При уходе мыши с объекта
        setting.addEventListener("mouseout", modalAisdeElementMouseout)
    })

    

    // Отображение поля с доп функциями при наведении на поле с подзадачей

    subtaskOuter_modal.addEventListener("mouseover", subtaskMouseover)

    subtaskOuter_modal.addEventListener("mouseout", subtaskMouseout)




    // Кнопка редактирования подзадач
    subtaskOuter_modal.addEventListener("click", editSubtasks)

    // При нажатии на кнопку "сохранить" при редактировании подзадачи
    buttonSaveTask.addEventListener("click", buttonSaveSubtask)

    


    // Создаю событие на кнопку "Отмена" и "Добавить задачу" в форме создания подзадачи
    buttonCloseMenuNewTask.addEventListener("click", closeSubtaskForm)
    buttonAddNewTask.addEventListener("click", addSubtaskForm)


    // При нажатии на кнопку "Добавить подзадачу"
    addSubtask.addEventListener("click", function(e) {
        addSubtask.classList.add("hide2")   // Скрывает кнопку "Добавить подзадачу"
        modalContent_main.append(taskForm)    // Перемещает форму для создания таска внутрь ".itc-modal-body__main-content"
        taskForm.classList.remove("hide2")    // Убирает скрытие с формы изменения таска, которая перенеслась в место элемента "addSubtask"


        // Убираю скрытие со всех подзадач, если где-то оно было (если до этого было открыто меню редактирование подзадачи, после чего сразу нажалась кнопка для добавлений новой подзадачи)
        subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
            subtask.classList.remove("hide2")
        })

        // Блокирую показ доп. функций подзадач
        switchDisabledShowDopFuncTask("true")
    }) 
    
    // Функция, вызываемая при нажатии на "Отмена" в форме создания подзадачи
    function closeSubtaskForm() {
        taskForm.classList.add("hide2")   // Скрывается Блок "taskForm"
        sectionContentBlock_viewContent.append(taskForm)  // Блок "taskForm" перемещается в конец страницы

        // Удаляется скрытие кнопки "addSubtask", вместо которого ранее был перемещён блок "taskForm"
        addSubtask.classList.remove("hide2")


        const currentLi_modal = getCurrentLi_modal()

        const targetLi_subtask = getTargetLi_subtask()

        // Если переменная, отвечающей за выбранную подзадачу, внутри которой должна находиться кнопка "отмена" - существует, (т.е. если "отмена прожата именно при редактировании существующей, а не при создании новой"), то 
        if (targetLi_subtask != null && currentLi_modal !=null) {  
            targetLi_subtask.querySelector(".subtask__wrapper").classList.remove("hide2")        // Показывается скрытый li (подзадача)

            // Скрываю все доп функции подзадачи
            hide_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))

            // Удаляю отметку о текущей подзадаче с отслеживания при наведении
            setCurrentLi_modal(null)
        }
        // В ином случае (если отмена была при добавлении новой подзадачи) убираю скрытие со всех подзадач, если где-то оно было (если до этого было открыто меню редактирование подзадачи, после чего сразу нажалась кнопка для добавлений новой подзадачи)
        else {
            subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
                subtask.classList.remove("hide2")
            })
        }

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска/подзадачи) и скрываю его
        reloadFormAddTask()

        // Разрешаю показ доп. функций подзадач
        switchDisabledShowDopFuncTask("false")
    }
    // Функция, вызываемая при нажатии на "Добавить задачу" в форме создания подзадачи
    function addSubtaskForm() {
        if (buttonAddNewTask.getAttribute("aria-disabled") == "false" && statusIsModal()) {
            all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))
            let all_subtasks = getAll_subtasks()

            currentTask_arr = getCurrentTask_arr()
            let colorPriority   
            if (priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_red.png") {
                colorPriority = "red"
            } else if (priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_orange.png") {
                colorPriority = "orange"
            } else if (priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_blue.png") {
                colorPriority = "blue"
            } else {colorPriority = "ser"}

            const contentNewSubtask = {    // Создаю объект из введённых данных
                newSubtask_name: taskNameInput.value, 
                newSubtask_description: taskDescriptionInput.value, 
                newSubtask_typeSubtask_name: taskTypeButton.querySelector(".form-from-add-new-task__name-type-task").innerHTML,
                newSubtask_typeSubtask_icon_src: taskTypeButton.querySelector(".form-from-add-new-task__icon_type").getAttribute("src"),
                newSubtask_deadlineSubtask: deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerHTML,
                newSubtask_deadlineFullDataSubtask: deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML,
                newSubtask_priority_name: priorityButton.querySelector(".form-from-add-new-task__text-settings").innerHTML,
                newSubtask_priority_color: colorPriority,
                newSubtask_ID: currentTask_arr.newTask_countSubtask + 1
            }

            currentTask_arr.newTask_countSubtask += 1


            // Добавляю созданый объект в параметр subtasks[] текущекго таска (в массиве тасков)
            currentTask_arr.newTask_Subtasks_arr.push(contentNewSubtask)

            // Запускаю функцию для добавления нового html элемента с новой подзадачей в м.о.
            funcAddNewSubtask(contentNewSubtask)

            // Обновляю поле с количеством подзадач
            countSubtasks.innerHTML = currentTask_arr.newTask_countSubtask

            // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
            reloadFormAddTask()


            // Обновляю текщий таск в массиве тасков, а так же массив с подзадачами внутри массива с тасками (локально в массиве текущего файла)
            all_tasks[window.localStorage.getItem("openMoTargetLiId")-1] = currentTask_arr      // Обновляю текущий таск в массиве тасков
            all_tasks[window.localStorage.getItem("openMoTargetLiId")-1].newTask_Subtasks_arr = all_subtasks        // Обновляю массив с подзадачами внутри текущего таска (в массиве тасков)

            // Обновляю массив с тасками в js файлах и в localStorage (перезаписываю с учётом изменений)
            reloadAllTasks(all_tasks)


            // Убираю скрытие со всех подзадач, если где-то оно было (если до этого было открыто меню редактирование подзадачи, после чего сразу нажалась кнопка для добавлений новой подзадачи)
            subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
                subtask.classList.remove("hide2")
            })
            taskForm.classList.add("hide2")

            // Удаляется скрытие кнопки "addSubtask", вместо которого ранее был перемещён блок "taskForm"
            addSubtask.classList.remove("hide2")

            // Разрешаю показ доп. функций тасков
            switchDisabledShowDopFuncTask("false")
        }
    }




    



    // ВЫБОР СРОКА ВЫПОЛНЕНИЯ ПОДЗАДАЧИ:

    // 1) Выбор срока выполнения подзадачи (при выборе из списка вариантов):

    // 1.1) Если меню выбора срока было открыто через доп. функцию подзадачи "Назначить срок", то ...
    // При клике на один из пунктов выбора срока выполнения подзадачи (из списка вариантов), при выборе через "Назначить срок"
    subtaskOuter_modal.addEventListener("click", clickButtonNewDeadlineSubtask)

    



    // 1.2) Если меню выбора срока было открыто при создании/редактировании подзадачи (т.е. не через доп. функцию "Назначить срок"), то ...
    // (При клике на один из пунктов выбора срока выполнения подзадачи (из списка вариантов), при выборе из "form-from-add-new-task__hidden-menu-deadline") 
    deadlineOptions.forEach(function(item) {
        item.addEventListener("click", deadlineItemSubtaskFormClick)
    })

    


    // 2) Выбор срока выполнения подзадачи (при выборе в календаре):


    // 2.1) Если меню выбора открыто через "Назначить срок", то...
    // (При клике на день в календаре, при выборе из "subtask__dopFunction__hidden-menu-deadline") 
    subtaskOuter_modal.addEventListener("click", clickButtonNewDeadlineSubtaskFromCalendar)

    // 2.2) Если меню выбора открыто создании/редактировании подзадачи, то...
    // (При клике на день в календаре, при выборе из "form-from-add-new-task__hidden-menu-deadline") 
    deadlineCalendar.addEventListener("click", deadlineClickCalendar)



    // При нажатии на кнопку в форме для создания/редактирования подзадачи
    deadlineButton.addEventListener("click", selectDeadlineFunc)      


    // 1) При нажатии на доп функцию "Назначить срок" у подзадачи
    subtaskOuter_modal.addEventListener("click", btnNewDeadlineSubtask)


    // 2.1) При нажатии на само поля выбора (при создании/редактировании и с учётом наличия ранее нажатой  доп ф. "назначить срок")
    deadlineMenu.addEventListener("click", clickMenudeadline)

    // 2.2) При нажатии на само поле выбора (при создании/редактировании подзадачи и нажатии доп ф. "назначить срок")
    subtaskOuter_modal.addEventListener("click", clickFieldMenuDeadlineSubtask)


    // 3) При нажатии вне поля выбора (при открытии меню срока выполнения у подзадачи при её редактировании/создании или при "Назначить срок" подзадачи)
    document.addEventListener("click", clickOuterModal_deadlineSubtask)

    

    // ИЗМЕНЕНИЕ ТИПА ТАСКА:


    // При клике на кнопку выбора типа таска в м.о.
    modalBtn_GroupTypeTask.addEventListener("click", clickButTypeTask)

    // При нажатии на само поля выбора
    conteinerFromHiddenMenuTypesTasks_modal.addEventListener("click", clickFieldTypeTask)
    
    // При нажатии вне поля выбора
    document.addEventListener("click", clickOuterFieldTypeTask)


    // При выборе типа таска (для изменения)
    typesProjectForSelect_modal.forEach(function(type) {
        type.addEventListener("click", function() {
            selectTypetaskItemMO(type)
        })
    })
    
    


    // ИЗМЕНЕНИЕ СРОКА ВЫПОЛНЕНИЯ ТАСКА (не у подзадачи) :

    // 1) Появление и скрытие поля с выбором срока выполнения задачи:

    // 1.1) При клике на кнопку выбора срока выполнения таска в м.о.
    modalBtn_GroupDeadlineTask.addEventListener("click", clickButDeadline)

    // 1.2) При нажатии на само поля выбора в скрытом меню "sidebar")
    conteinerFromHiddenMenuDeadlineTasks_modal.addEventListener("click", clickFieldDeadline)

    // 1.3) При нажатии вне поля выбора (для скрытого меню срока у sidebar)
    document.addEventListener("click", clickOuterFieldDeadline)


    // 2.1) Выбор срока выполнения ТАСКА (внутри МО) (при выборе из СПИСКА ВАРИАНТОВ):
    deadlineItem_modal.forEach(function(item) {
        item.addEventListener("click", function() {
            selectDeadlineItemMO(item)
        })
    })


    // 2.2) Выбор срока выполнения таска (при выборе в календаре):
    DeadlineCalendare_modal.addEventListener("click", selectDeadlineItemCalendarMO)

   



    // ИЗМЕНЕНИЕ ПРИОРИТЕТА ТАСКА:

    // 1) Появление и скрытие поле с выбором приоритета задачи в sidebar в МО

    // 1.1) При нажатии на кнопку
    modalBtn_GroupPriorityTask.addEventListener("click", clickButPriority)

    // 1.2) При нажатии на само поля выбора
    conteinerFromHiddenMenuPriorityTasks_modal.addEventListener("click", clickFieldPriority)

    // 1.3) При нажатии вне поля выбора - скрывается
    document.addEventListener("click", clickOuterFieldPriority)



    // 2) Выбор приоритета таска:
    
    // При выборе приоритета таска (для изменения)
    priorityItem_modal.forEach(function(item) {
        // Находит в списки приоритетов тот, который уже выбран и сразу применяет на него стиль выбранного приоритета (Это нужно что бы при запуске мо сразу же стиль сработал)
        if (modalBtn_GroupPriorityTask.querySelector(".itc-modal-body__icon-selected-setting").getAttribute("src") == item.querySelector(".itc-modal-body__priority-icon").getAttribute("src")) {
            reloadItemsPriority_modal(item)
        }
        item.addEventListener("click", function() {
            selectPriorityItemMO(item)
        })
    })



    modal.show()
    switchIsModal("true")


    // Событие при закрытии модального окна
    document.addEventListener('hide.itc.modal', closeModal, {once: true})   // Удаляется после срабатывания
    function closeModal() {
        switchIsModal("false")      // Модальное окно - отсутствует


        // Снимаю блокировку с открытия м.о.
        window.localStorage.setItem("isModal_block", "false")
        switchIsModal_block("false")

        taskForm.classList.add("hide2")   // Скрывается Блок "taskForm"
        sectionContentBlock_viewContent.append(taskForm)  // Блок "taskForm" перемещается в конец страницы
        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()


        // Удаляю событие с кнопки "Отмена" в форме добавления подзадачи
        buttonCloseMenuNewTask.removeEventListener("click", closeSubtaskForm)  
        // Удаляю событие с кнопки "Добавить задачу" в форме добавления подзадачи
        buttonAddNewTask.removeEventListener("click", addSubtaskForm) 
        // Удаляю событие с кнопки "сохранить" в форме добавления подзадачи
        buttonSaveTask.removeEventListener("click", buttonSaveSubtask)
  

        
        modal.dispose();  // Удаляю модальное окно из html документа
        document.removeEventListener("click", clickOuterFieldDeadline)
        deadlineMenu.removeEventListener("click", clickMenudeadline)
        document.removeEventListener("click", clickOuterModal_deadlineSubtask)
        deadlineOptions.forEach(function(item) {
            item.removeEventListener("click", deadlineItemSubtaskFormClick)
        })
        deadlineCalendar.removeEventListener("click", deadlineClickCalendar)
        deadlineButton.removeEventListener("click", selectDeadlineFunc) 
        document.querySelector("body").removeAttribute("style")

        window.localStorage.removeItem("openMoTargetLiId")
    }
})



export {getVarsMO_allFiles, statusIsModal} 
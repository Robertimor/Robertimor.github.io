'use strict';
// Данный файл для функций обновления подзадач

import {reloadFormAddTask, reloadAllTasks} from "./scripts.js"
import {switchDisabledShowDopFuncTask} from "./toggleVisibleElements.js"
import {statusIsModal} from "./modal.js"
import {sectionContentBlock_viewContent, taskForm, taskNameInput, taskDescriptionInput, deadlineButton, priorityButton, taskTypeButton, buttonAddNewTask, buttonSaveTask} from "./doomElements.js"
import {reloadCurrentLi_klick_MO} from "./MO_toggleVisibleElSubtasks.js"
import {reloadAll_subtasks, getAll_subtasks, setCurrentLi_modal, setTargetLi_subtask, getTargetLi_subtask, getCurrentTask_arr} from "./MO_dataUpdate.js"



let modalTitle
let modalContent
let modalAside 


let modalContent_main
let wrapCountSubtask_and_Subtask
let countSubtasks

let subtaskOuter_modal

function getVarsMO_reloadSubtasks() {
    modalTitle = document.querySelector(".itc-modal-title")
    modalContent = document.querySelector(".itc-modal-body")
    modalAside = document.querySelector(".itc-modal-body__aside")

    modalContent_main = modalContent.querySelector(".itc-modal-body__main-content")
    wrapCountSubtask_and_Subtask = modalContent_main.querySelector(".itc-modal-body__subtask-content")
    countSubtasks = wrapCountSubtask_and_Subtask.querySelector(".itc-modal-body__subtask-count .itc-modal-body__subtasks-count")

    subtaskOuter_modal = modalContent.querySelector(".itc-modal-body__subtask-outer-block")
}


// Кнопка редактирования подзадач
function editSubtasks(e) {
    let target = e.target.closest(".subtask__btnEdit")   // Нажатая кнопка "edit"
    // Если нажатие было не по кнопке редактирования, то игнор
    if (!target) return  


    let targetLi_subtask = e.target.closest(".subtask")       // Подзадача, внутри которой был нажат "edit"
    setTargetLi_subtask(targetLi_subtask)

    let all_subtasks = getAll_subtasks()



    // В область выбранной подзадачи добавляется поле для внесение изменений (вместо самого li, который скрывается)
    targetLi_subtask.append(taskForm) 

    // Убирается скрытие li со всех элементов (если до этого какой-то скрылся, из-за незаконченного редактирования)
    subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
        subtask.classList.remove("hide2")      
    })

    // Скрывается li
    targetLi_subtask.querySelector(".subtask__wrapper").classList.add("hide2") 
    // Убирает скрытие с формы изменения подзадачи, которая перенеслась в место элемента li      
    taskForm.classList.remove("hide2")   


    // Скрываю кнопку для создания подзадачи. И показываю кнопку для сохранения изменений при редактировании подзадачи
    buttonAddNewTask.classList.add("hide2")
    buttonSaveTask.classList.remove("hide2")



    let liFromArr   // Подзадача из массива
    // Перебираю массив подзадач и сохраняю в "liFromArr" id того, что совпадает с id выбранной для редактирования подзадачи (li)
    for (let i = 0; i < all_subtasks.length; i++) {
        if (all_subtasks[i].newSubtask_ID == targetLi_subtask.getAttribute("data-subtask-id")) {
            liFromArr = all_subtasks[i]   
            break
        }
    }

    // Вставляю данные у выбранной подзадачи в меню редактирования
    copyAndPushLabelsSubtask(liFromArr)
    
    // Блокирую показ доп. функций
    switchDisabledShowDopFuncTask("true")
}


// Функция для вставки полей у подзадачи, в форму для редактирования этого выбранного подзадачи
function copyAndPushLabelsSubtask(settingsSubtask) {
    taskNameInput.value = settingsSubtask.newSubtask_name   // Имя подзадачи
    taskDescriptionInput.value = settingsSubtask.newSubtask_description    // Описание подзадачи

    taskTypeButton.querySelector(".form-from-add-new-task__name-type-task").innerHTML = settingsSubtask.newSubtask_typeSubtask_name // Имя типа подзадачи
    taskTypeButton.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", settingsSubtask.newSubtask_typeSubtask_icon_src)  // Иконка типа подзадачи
    deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerHTML = settingsSubtask.newSubtask_deadlineSubtask
    deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML = settingsSubtask.newSubtask_deadlineFullDataSubtask
    priorityButton.querySelector(".form-from-add-new-task__text-settings").innerHTML = settingsSubtask.newSubtask_priority_name   // Имя приоритета
    priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", `./icon/priority_${settingsSubtask.newSubtask_priority_color}.png`)    // Цвет флага
}


// При нажатии на кнопку "сохранить" при редактировании подзадачи
function buttonSaveSubtask() {
    if (buttonSaveTask.getAttribute("aria-disabled") == "false" && statusIsModal()) {
        let targetLi = document.getElementById(`${window.localStorage.getItem("openMoTargetLiId")}`)
        let liFromArr   // Подзадача из массива

        let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))

        let all_subtasks = getAll_subtasks()

        const targetLi_subtask = getTargetLi_subtask()


        // Перебираю массив подзадач и сохраняю в "liFromArr" id того, что совпадает с id выбранной для редактирования подзадачи (li)
        for (let i = 0; i < all_subtasks.length; i++) {
            if (all_subtasks[i].newSubtask_ID == targetLi_subtask.getAttribute("data-subtask-id")) {
                liFromArr = all_subtasks[i]   
                break
            }
        }

        // Обновляю данные подзадачи в массиве подзадач и в html елементе подзадачи
        updateDataSubtask_arr(liFromArr)
        updateDataSubtask_element(targetLi_subtask, liFromArr)


        // Обновляю массив с подзадачами внутри массива с тасками (локально в массиве текущего файла)
        all_tasks[window.localStorage.getItem("openMoTargetLiId")-1].newTask_Subtasks_arr = all_subtasks

        // Обновляю массив с тасками (перезаписываю с учётом изменений) (глобально, в localstorage)
        reloadAllTasks(all_tasks)


        // Скрывается Блок "taskForm"
        taskForm.classList.add("hide2")   
        // Блок "taskForm" перемещается в конец
        sectionContentBlock_viewContent.append(taskForm)  
        
        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "taskForm"
        subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
            subtask.classList.remove("hide2")
        })
        

        // Обнуляю элементы поля .taskForm (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()


        // Скрываю все доп функции подзадачи
        targetLi_subtask.querySelector(".subtask__btnEdit").classList.add("hide1")
        targetLi_subtask.querySelector(".subtask__btnNewDeadline").classList.add("hide1")

        // Удаляю отметку о текущей подзадачи с отслеживания при наведении
        setCurrentLi_modal(null)
        setTargetLi_subtask(null)

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
}

// Функция для обновления данных подзадачи внутри массива подзадач
function updateDataSubtask_arr(subtaskArr) {
    subtaskArr.newSubtask_name = taskNameInput.value
    subtaskArr.newSubtask_description = taskDescriptionInput.value
    subtaskArr.newSubtask_typeSubtask_name = taskTypeButton.querySelector(".form-from-add-new-task__name-type-task").innerHTML   // Имя типа подзадачи
    subtaskArr.newSubtask_typeSubtask_icon_src = taskTypeButton.querySelector(".form-from-add-new-task__icon_type").getAttribute("src") // Иконка типа подзадачи
    subtaskArr.newSubtask_deadlineSubtask = deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerHTML
    subtaskArr.newSubtask_deadlineFullDataSubtask = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML
    subtaskArr.newSubtask_priority_name = priorityButton.querySelector(".form-from-add-new-task__text-settings").innerHTML

    // Создаю переменную для выяснения названия цвета у приоритета. Беру содержание тега src у выбранного изображения и разбиваю его на массив.
    let arrColor = priorityButton.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src").split("")
    arrColor.splice(-4)     // Удаляю последние 4 символа (".png")
    arrColor.splice(0, 16)  // Удаляю первые 16 символов, оставляя лишь название самого цвета

    subtaskArr.newSubtask_priority_color = arrColor.join("")      // Название цвета у приоритета выбранного пользователем подзадачи
}

// Функция для обновления данных элемента подзадачи
function updateDataSubtask_element(subtaskEl, subtaskArr) {
    subtaskEl.querySelector(".subtask__name-subtask").innerHTML = subtaskArr.newSubtask_name      // Название подзадачи
    subtaskEl.querySelector(".subtask__description-subtask-text").innerHTML = subtaskArr.newSubtask_description    // Описание подзадачи
    
    subtaskEl.querySelector(".subtask__deadline__date_visible").innerHTML = subtaskArr.newSubtask_deadlineSubtask     // Вписываю в поле с текстом со сроком выполнения данной подзадачи выбранноу дату (внизу слева у каждой подзадачи)
    subtaskEl.querySelector(".subtask__deadline__date_hidden").innerHTML = subtaskArr.newSubtask_deadlineFullDataSubtask

    subtaskEl.querySelector(".subtask__typeSubtask span").innerHTML = subtaskArr.newSubtask_typeSubtask_name  // Имя типа подзадачи

    subtaskEl.querySelector(".subtask__imgBlock-typeSubtask img").setAttribute("src", subtaskArr.newSubtask_typeSubtask_icon_src)  // Иконка типа подзадачи
    
    subtaskEl.querySelector(".subtask__wrapper-button-subtask-checkbox button").className = "subtask__button-subtask-checkbox"  // Очищаю от текущеко класса, отвечающего за цвет. Оставляю лишь общий
    subtaskEl.querySelector(".subtask__wrapper-button-subtask-checkbox button").classList.add(`subtask__button-subtask-checkbox_${subtaskArr.newSubtask_priority_color}`)      // Цвет кружка  

    subtaskEl.querySelector(".subtask__wrapper-button-subtask-checkbox img").setAttribute("src", `./icon/MarkOk_${subtaskArr.newSubtask_priority_color}.png`)     // Цвет галочки внутри кружка
}


// Функция для добавления нового html элемента с новой подзадачей в м.о.
function funcAddNewSubtask(content) {
    const currentTask_arr = getCurrentTask_arr()
    const html = `
    <li class="subtask" data-subtask-id = "${content.newSubtask_ID}">
    <div class="subtask__wrapper">
        <div class="subtask__wrapper-button-subtask-checkbox">
            <button class="subtask__button-subtask-checkbox subtask__button-subtask-checkbox_${content.newSubtask_priority_color}"><img src="./icon/MarkOk_${content.newSubtask_priority_color}.png" alt="" class="hide2"></button>
        </div>
        <div class="subtask__subtask-list-itemsContent-wrapper">
            <div class="subtask__outerWrap-name-description">
                <div class="subtask__innerWrap-name-description">
                    <div class="subtask__name-subtask" aria-label="Название задачи">${content.newSubtask_name}</div>
                    <div class="subtask__description-subtask" aria-label="описание">
                        <span class="subtask__description-subtask-text">${content.newSubtask_description}</span>
                    </div>
                </div>
            </div>
            <div class="subtask__deadline">
                <div class="subtask__imgBlock-deadline"><img src="./icon/deadlineNewTask_0.png" alt=""></div>
                <span class="subtask__deadline__date_visible">${content.newSubtask_deadlineSubtask}</span>
                <span class="subtask__deadline__date_hidden hide2">${content.newSubtask_deadlineFullDataSubtask}</span>
            </div>
            <div class="subtask__typeSubtask">
                <span>${content.newSubtask_typeSubtask_name}</span>
                <div class="subtask__imgBlock-typeSubtask"><img src="${content.newSubtask_typeSubtask_icon_src}" alt=""></div>
                <img class="subtask__imgBlock-typeSubtask_grid" src="./icon/grid_0.png" alt="">
            </div>
        </div>
        <div class="subtask__dopFuncs hide1" aria-label="Дополнительные функции для управления задачей">
            <div class="subtask__dopFunction subtask__btnEdit hover-hint hide1" data-title="Редактировать задачу">
                <div class="subtask__dopFunction_iconWrap">
                    <img src="./icon/edit.png" alt="">
                </div>
            </div>
            <div class="subtask__dopFunction subtask__btnNewDeadline hover-hint hide1" data-title="Назначить срок">
                <div class="subtask__dopFunction_iconWrap">
                    <img src="./icon/deadline_task.png" alt="">
                </div>
                <div class="subtask__dopFunction__hidden-menu-deadline hide2">
                    <ul class="subtask__dopFunction__deadline-list">
                        <li class="subtask__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/sun.png" alt="" class="subtask__dopFunction__deadline-icon">
                            <span class="subtask__dopFunction__deadline-name">Сегодня</span>
                            <span class="subtask__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="subtask__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/deadlineNewTask_3.png" alt="" class="subtask__dopFunction__deadline-icon">
                            <span class="subtask__dopFunction__deadline-name">Завтра</span>
                            <span class="subtask__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="subtask__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/divan.png" alt="" class="subtask__dopFunction__deadline-icon">
                            <span class="subtask__dopFunction__deadline-name">На выходных</span>
                            <span class="subtask__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="subtask__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/nextWeek.png" alt="" class="subtask__dopFunction__deadline-icon">
                            <span class="subtask__dopFunction__deadline-name">След. неделя</span>
                            <span class="subtask__dopFunction__deadline-info">#</span>
                        </li>
                        <li class="subtask__dopFunction__deadline-item hovered1_3">
                            <img src="./icon/noDeadline.png" alt="" class="subtask__dopFunction__deadline-icon">
                            <span class="subtask__dopFunction__deadline-name">Без срока</span>
                            <span class="subtask__dopFunction__deadline-info">#</span>
                        </li>
                    </ul>
                    <div class="subtask__dopFunction__hidden-menu-deadline-calendare">
                        <input type="text" class="hidden-menu-deadline-calendare hide2">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </li>
    `

    // Добавляю новый html элемент подзадачи в начало
    subtaskOuter_modal.insertAdjacentHTML("afterbegin", html)

    // Обновляю поле с количеством подзадач
    countSubtasks.innerHTML = currentTask_arr.newTask_countSubtask
}




// Удаляю отметку о текущей подзадаче
reloadCurrentLi_klick_MO(null)



// Функция удаления подзадач при нажатии на кружок

function removeSubTask(curSubtask) {
    let liFromArr   // id подзадачи в массиве

    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))
    
    let all_subtasks = getAll_subtasks()

    // Текущий объект таска в массиве
    let currentTask_arr = getCurrentTask_arr()

    // Перебираю массив подзадач и id того, что совпадает с id  html-элементом подзадачи, который собираются удалить
    for (let i = 0; i < all_subtasks.length; i++) {
        if (all_subtasks[i].newSubtask_ID == curSubtask.getAttribute("data-subtask-id")) {
            liFromArr = i   
            break
        }
    }



    // Все подзадачи в html текущего таска
    let allTasksHTML = subtaskOuter_modal.querySelectorAll(".subtask")

    // Удаляю подзадачу из html
    curSubtask.remove()
    // Удаляю подзадачу из массива подзадач
    all_subtasks.splice(liFromArr, 1)


    // Перебираю все подзадачи данного таска и обновляю их id (как в массиве подзадач, так и в html)
    for (let i = 0; i < all_subtasks.length; i++) {
        all_subtasks[i].newSubtask_ID = i + 1
        allTasksHTML[i].setAttribute("data-subtask-id", all_subtasks.length - i)
    } 

    currentTask_arr.newTask_countSubtask = all_subtasks.length
    // Обновляю текщий таск в массиве тасков (локально в массиве текущего файла)
    all_tasks[window.localStorage.getItem("openMoTargetLiId")-1] = currentTask_arr      // Обновляю текущий таск в массиве тасков

    // Обновляю поле с количеством подзадач
    countSubtasks.innerHTML = currentTask_arr.newTask_countSubtask


    // Обновляю массив с подзадачами в основном файле (хранилище для него)
    reloadAll_subtasks(all_subtasks)

    all_tasks[currentTask_arr.newTask_ID - 1].newTask_Subtasks_arr = all_subtasks

    // Обновляю массив с тасками в основном js файле и в localStorage
    reloadAllTasks(all_tasks)

    console.log(getAll_subtasks());
}

export {getVarsMO_reloadSubtasks, editSubtasks, buttonSaveSubtask, removeSubTask, updateDataSubtask_arr, updateDataSubtask_element, funcAddNewSubtask}
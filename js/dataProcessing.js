'use strict';
// Данный файл обрабатывает таски (сортировка по сроку, распределение).

import {countAllTasks, sectionContentBlock_viewContent, buttonSortAllTaskUP, buttonSortAllTaskDOWN, buttonSortOverdueTaskUP, buttonSortOverdueTaskDOWN, allOverdueTasks, butHideOverdue, iconHideOverdue, allCurrentTasksOuter} from "./domElements.js"
import {funcAddNewTask, reloadAllTasks} from "./scripts.js"





let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));

let tasksId = 0     // Счётчик для присваивания уникальных id создаваемым таскам
tasksId = Number(window.localStorage.getItem("tasksId"))

// При запуске страницы проверяю пуст ли массив с тасками и если нет, то сразу сортирую его по сроку и добавляю элементы на страницу
if (all_tasks && all_tasks.length > 0) {
    // Сортирую массив по сроку выполнения
    all_tasks.sort(function(a, b) {
        // Преобразуем строку с датой в объект Date.
        let dateA = new Date(a.newTask_dateCreated)
        let dateB = new Date(b.newTask_dateCreated)  

        
        //Если ascending === true, то сортируем по возрастанию (от ранних дат к поздним).
        //Если ascending === false, то сортируем по убыванию (от поздних дат к ранним).

        return dateA - dateB
    })
    reloadAllTasks(all_tasks);

    // Добавляю все элементы этого массива (таски) на html страницу 
    all_tasks.forEach(function(el) {
        funcAddNewTask(el, allCurrentTasksOuter)
    })
}




// Функция для сортировки тасков на странице (и обычных и просроченных) в порядке возрастания/убывания их срока выполнения
function sortTasks(container, ascending = true, statusDeadline) {
    all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));

    // console.log("tasks: ", tasks);
    // console.log("all_tasks: ", all_tasks);
    // console.log("all_tasks0: ", all_tasks0);

    // Отдельные массивы для просроченных и обычных задач
    let overdueTasks = all_tasks.filter(task => task.newTask_isOverdue);
    let normalTasks = all_tasks.filter(task => !task.newTask_isOverdue);


    // Выбираем нужный массив для сортировки
    let tasksToSort = [];
    if (statusDeadline == "overdue") {
        tasksToSort = overdueTasks;
    } else if (statusDeadline == "normal") {
        tasksToSort = normalTasks;
    } else {
        tasksToSort = all_tasks; // Если сортируем все задачи
    }


    // Сортировка массива
    tasksToSort.sort((a, b) => {
        let dateA = new Date(a.newTask_dateCreated);
        let dateB = new Date(b.newTask_dateCreated);
        return ascending ? dateA - dateB : dateB - dateA;
    });

    // Объединяем обратно в общий массив
    all_tasks = [...overdueTasks, ...normalTasks];


    // Обновляем localStorage и DOM:

    // Обновляю массив тасков в localStorage
    reloadAllTasks(all_tasks);


    // Очищаем контейнер и добавляем отсортированные элементы

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    tasksToSort.forEach(function(el) {
        funcAddNewTask(el, container)
    })
}


// События по клику на стрелочки для сортировки тасков
buttonSortAllTaskUP.addEventListener("click", function() {          // По возрастанию обычных тасков
    sortTasks(document.querySelector(".tasks__tasks-list"), true, "normal")
})
buttonSortAllTaskDOWN.addEventListener("click", function() {        // По убыванию обычных тасков
    sortTasks(document.querySelector(".tasks__tasks-list"), false, "normal")
})
buttonSortOverdueTaskUP.addEventListener("click", function() {      // По возрастанию просроченных тасков
    sortTasks(document.querySelector(".overdue__tasks-list"), true, "overdue")
})
buttonSortOverdueTaskDOWN.addEventListener("click", function() {    // По убыванию просроченых тасков
    sortTasks(document.querySelector(".overdue__tasks-list"), false, "overdue")
})






// Функция для распределения тасков для добавления в "Просрочено"
function raspredTasks() {
    let tasksNormal = [...allCurrentTasksOuter.children]; // HTML элементы
    let tasksOverdue = [...allOverdueTasks.children]; // HTML элементы
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));

    // Перебираю все таски (не просроченные) и перемещаю в просроченные те, у которых истёк срок
    tasksNormal.forEach(function(task) {
        // Нахожу в массиве тасков тот, id  которого равен текущему таску на html странице
        const thisTask = all_tasks.find(function(el) {
            return el.newTask_ID === Number(task.getAttribute("id"))
        })
        const dateTask = new Date(thisTask.newTask_dateCreated)
        const todayDate = new Date()
        // console.log(dateTask);
        // console.log(todayDate);
        // console.log("dateTask < todayDat? ", dateTask < todayDate);

        if (dateTask < todayDate) {
            allOverdueTasks.append(task)
            all_tasks[getIndexCurTask(all_tasks, thisTask.newTask_ID)].newTask_isOverdue = true
            reloadAllTasks(all_tasks)
        }
    })
    tasksOverdue.forEach(function(task) {
        // Нахожу в массиве тасков тот, id  которого равен текущему таску на html странице
        const thisTask = all_tasks.find(function(el) {
            return el.newTask_ID === task.getAttribute("id")
        })
        const dateTask = new Date(thisTask.newTask_dateCreated)
        const todayDate = new Date().toISOString()
        if (dateTask >= todayDate) {
            allCurrentTasksOuter.append(task)
            all_tasks[getIndexCurTask(all_tasks, thisTask.newTask_ID)].newTask_isOverdue = false
        }
    })
}


sortTasks(document.querySelector(".tasks__tasks-list"), true)

// При запуске страницы запускаю функцию для переноса задачи в раздел просроченных, если её дата выполнения меньше чем сегодняшний день
raspredTasks()





// При нажатии на кнопку скрытия просроченных тасков
butHideOverdue.addEventListener("click", function(e) {
    // Если иконка скрытия уже перевёрнута
    if (iconHideOverdue.classList.contains("iconOverdue-rotateR")) {
        // Поворачиваем в обратную сторону (сменяя класс)
        iconHideOverdue.classList.replace("iconOverdue-rotateR", "iconOverdue-rotateL")
        // Запускаю функцию для возвращения нужной высоты для имеющихся тасков
        showTaskTransition()
        // Плавно показываю ранее скрытые таски
        allOverdueTasks.classList.replace("transition-hide", "transition-show")

        // Спустя почти пол секунды удаляю класс "iconOverdue-rotateR" с икноки
        setTimeout(removeRotate, 400);
    } 
    // Иначе, если таски не были скрыты (если на иконке нету никаког класса, обозначающего перевёрнутость)
    else if (!iconHideOverdue.classList.contains("iconOverdue-rotateR") && !iconHideOverdue.classList.contains("iconOverdue-rotateL")) {
        // Добавляю иконке класс переворачивания
        iconHideOverdue.classList.add("iconOverdue-rotateR")
        // Плавно скрываю все таски
        allOverdueTasks.classList.replace("transition-show", "transition-hide")
        // Спустя 400мс убираю высоту, которую занимали таски
        setTimeout(showTaskTransition, 400);
    }
})

// Функция для удаления класса "iconOverdue-rotateR" с иконки (переворота стрелки) 
function removeRotate() {
    iconHideOverdue.classList.remove("iconOverdue-rotateL")
}
// Функция для скрытия/показа области, которую занимают просроченные задачи
function showTaskTransition() {
    allOverdueTasks.classList.toggle("hide3")
}

function setTasksId(val) {
    tasksId = val
    window.localStorage.setItem("tasksId", val)
}
function getTasksId() {
    return tasksId
}

function getIndexCurTask(arr, curId) {
    return arr.findIndex(function(task) {
        return task.newTask_ID === Number(curId)
    })
}

// te()
export {sortTasks, raspredTasks, setTasksId, getTasksId, getIndexCurTask}
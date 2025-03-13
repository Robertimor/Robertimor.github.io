'use strict';
// Данный файл обрабатывает таски (сортировка по сроку, распределение).

import {countAllTasks, sectionContentBlock_viewContent, buttonSortAllTaskUP, buttonSortAllTaskDOWN, buttonSortOverdueTaskUP, buttonSortOverdueTaskDOWN, allOverdueTasks, butHideOverdue, iconHideOverdue, allCurrentTasksOuter, nowData} from "./doomElements.js"
import {funcAddNewTask, reloadAllTasks} from "./scripts.js"





let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));

let tasksId = 0     // Счётчик для присваивания уникальных id создаваемым таскам
tasksId = Number(window.localStorage.getItem("tasksId"))

// При запуске страницы создаю дубль массива с существующими тасками, где сразу сортирую по сроку и добавляю их на страницу
// Дубль массива со всеми тасками
let allTasksDoubleStart = []
if (all_tasks && all_tasks.length > 0) {
    allTasksDoubleStart = all_tasks.slice()
}

// Сортирую массив по сроку выполнения
allTasksDoubleStart.sort(function(a, b) {
    // Преобразуем строку с датой в объект Date.
    let dateA = new Date(a.newTask_dateCreated)
    let dateB = new Date(b.newTask_dateCreated)  

    
    //Если ascending === true, то сортируем по возрастанию (от ранних дат к поздним).
    //Если ascending === false, то сортируем по убыванию (от поздних дат к ранним).

    return dateA - dateB
})
// Добавляю все элементы этого массива (таски) на html страницу 
allTasksDoubleStart.forEach(function(el) {
    funcAddNewTask(el)
})







// Функция для сортировки тасков на странице (и обычных и просроченных) в порядке возрастания/убывания их срока выполнения
// function sortTasks(container, ascending = true, statusDeadline) {
//     //  Получаем все элементы задач из контейнера
//     // [...] — превращаем HTMLCollection в массив для удобной работы с sort().
//     let tasks = [...container.children];

//     all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));
//     // Создаю так же отдельную переменную с текущим расположением элементов тасков в массиве. Нужно это что бы верно отсортировать html элементы тасков
//     let all_tasks0 = JSON.parse(window.localStorage.getItem("all_tasks"));

//     // console.log("tasks: ", tasks);
//     // console.log("all_tasks: ", all_tasks);
//     // console.log("all_tasks0: ", all_tasks0);

//     // Сортирую массив для html элементов тасков
//     tasks.sort((a, b) => {
//         let idA = Number(a.getAttribute("id")) -1 
//         let idB = Number(b.getAttribute("id")) -1 

//         // Преобразуем строку с датой в объект Date.
//         let dateA = new Date(all_tasks0[idA].newTask_dateCreated);
//         let dateB = new Date(all_tasks0[idB].newTask_dateCreated);

//         //Если ascending === true, то сортируем по возрастанию (от ранних дат к поздним).
//         //Если ascending === false, то сортируем по убыванию (от поздних дат к ранним).
//         return ascending ? dateA - dateB : dateB - dateA;
//     })

//     // Отдельные массивы для просроченных и обычных задач
//     let overdueTasks = all_tasks.filter(task => task.newTask_isOverdue);
//     let normalTasks = all_tasks.filter(task => !task.newTask_isOverdue);

//     // Выбираем нужный массив для сортировки
//     let tasksToSort;
//     if (statusDeadline === "overdue") {
//         tasksToSort = overdueTasks;
//     } else if (statusDeadline === "normal") {
//         tasksToSort = normalTasks;
//     } else {
//         tasksToSort = all_tasks;    // Если сортируем все задачи
//     }

//     // Сортировка массива
//     tasksToSort.sort((a, b) => {
//         let dateA = new Date(a.newTask_dateCreated);
//         let dateB = new Date(b.newTask_dateCreated);
//         return ascending ? dateA - dateB : dateB - dateA;
//     });

//     // Объединяем обратно в общий массив
//     all_tasks = [...overdueTasks, ...normalTasks];

//     // let allTasks3 = all_tasks0.slice()
//     // console.log("allTasks3: ", allTasks3);

//     // Если сортировка была запущена для просроченных задач:
//     // if (statusDeadline == "overdue") {
//     //     all_tasks.sort((a, b) => {
//     //         // Пропускаю к сравнению лишь те таски, которые просрочены
//     //         if (a.newTask_isOverdue == true && b.newTask_isOverdue == true) {
//     //             // Преобразуем строку с датой в объект Date.
//     //             let dateA = new Date(a.newTask_dateCreated)
//     //             let dateB = new Date(b.newTask_dateCreated)  

//     //             //Если ascending === true, то сортируем по возрастанию (от ранних дат к поздним).
//     //             //Если ascending === false, то сортируем по убыванию (от поздних дат к ранним).
//     //             return ascending ? dateA - dateB : dateB - dateA;   
//     //         }

//     //     })
//     // } 
  

//     // Иначе, если сортировка была запущена для обычных задач (не просроченных)
//     // else if (statusDeadline == "normal") {
//     //     // Сортирую сам массив с тасками
//     //     all_tasks.sort((a, b) => {  
//     //         // Пропускаю к сравнению лишь те таски, которые не просрочены
//     //         if (a.newTask_isOverdue == false && b.newTask_isOverdue == false) {
//     //             // Преобразуем строку с датой в объект Date.
//     //             let dateA = new Date(a.newTask_dateCreated)
//     //             let dateB = new Date(b.newTask_dateCreated)  

//     //             // console.log("a = ", a, "; b = ", b, "dateA = ", dateA, "dateB = ", dateB);
//     //             // console.log("dateB - dateA = ", dateB - dateA);

                
//     //             //Если ascending === true, то сортируем по возрастанию (от ранних дат к поздним).
//     //             //Если ascending === false, то сортируем по убыванию (от поздних дат к ранним).
//     //             return ascending ? dateA - dateB : dateB - dateA;
//     //         }
//     //     })
//     // }
//     // else if (!statusDeadline) {
//     //     all_tasks.sort((a, b) => {
//     //         // Преобразуем строку с датой в объект Date.
//     //         let dateA = new Date(a.newTask_dateCreated)
//     //         let dateB = new Date(b.newTask_dateCreated)  

            
//     //         //Если ascending === true, то сортируем по возрастанию (от ранних дат к поздним).
//     //         //Если ascending === false, то сортируем по убыванию (от поздних дат к ранним).

//     //         return ascending ? dateA - dateB : dateB - dateA;
//     //     })
//     // }


//     // let allTasks4 = allTasks3.slice().sort((a, b) => {  
//     //     // Преобразуем строку с датой в объект Date.
//     //     let dateA = new Date(a.newTask_dateCreated)
//     //     let dateB = new Date(b.newTask_dateCreated)  

//     //     // console.log("a = ", a, "; b = ", b, "dateA = ", dateA, "dateB = ", dateB);
//     //     // console.log("dateB - dateA = ", dateB - dateA);

        
//     //     //Если ascending === true, то сортируем по возрастанию (от ранних дат к поздним).
//     //     //Если ascending === false, то сортируем по убыванию (от поздних дат к ранним).
//     //     return ascending ? dateA - dateB : dateB - dateA;
//     // })

//     // all_tasks0.forEach(function(task) {
//     //     console.log("task.newTask_dateCreated: ", task.newTask_dateCreated)
//     //     console.log("new Date(task.newTask_dateCreated): ", new Date(task.newTask_dateCreated));
//     // })
    

//     // console.log("tasks: ", tasks);
//     // console.log("all_tasks: ", all_tasks);
//     // console.log("all_tasks0: ", all_tasks0);
//     // console.log("allTasks3: ", allTasks3);
//     // console.log("allTasks4: ", allTasks4);





//     // Удаляем все элементы из контейнера
//     while (container.firstChild) {
//         container.removeChild(container.firstChild);
//     }

//     // Перебираем отсортированные <li class="task"> в массиве tasks.
//     // appendChild(task) перемещает задачу в конец списка container, сохраняя ее в новом порядке.
//     tasks.forEach(task => container.appendChild(task));

//     // Обновляю массив с тасками в основном js файле и в localStorage
//     reloadAllTasks(all_tasks)

//     reIndexTasks()
// }
function sortTasks(container, ascending = true, statusDeadline) {
    let tasks = [...container.children]; // HTML элементы
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));
    let all_tasks0 = all_tasks.slice()

    // console.log("tasks: ", tasks);
    // console.log("all_tasks: ", all_tasks);
    // console.log("all_tasks0: ", all_tasks0);

    // Сортирую массив для html элементов тасков
    tasks.sort((a, b) => {
        let idA = Number(a.getAttribute("id")) -1 
        let idB = Number(b.getAttribute("id")) -1 

        // Преобразуем строку с датой в объект Date.
        let dateA = new Date(all_tasks0[idA].newTask_dateCreated);
        let dateB = new Date(all_tasks0[idB].newTask_dateCreated);

        //Если ascending === true, то сортируем по возрастанию (от ранних дат к поздним).
        //Если ascending === false, то сортируем по убыванию (от поздних дат к ранним).
        return ascending ? dateA - dateB : dateB - dateA;
    })



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


    // Обновляем localStorage и DOM
    reloadAllTasks(all_tasks);


    // Очищаем контейнер и добавляем отсортированные элементы
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    tasks.forEach(task => container.appendChild(task));

    reIndexTasks();
}

function te() {
    all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));
    all_tasks.forEach(function(task) {
        task.newTask_isOverdue = false
    })
    reloadAllTasks(all_tasks);
} 




// function testSort(asc) {
//     all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))
//     let all_tasks2 = all_tasks.slice()

//     if (asc == true) {
//         all_tasks2.sort((a, b) => new Date(a.newTask_dateCreated) - new Date(b.newTask_dateCreated));
//         console.log("Отсортированные задачи по возрастанию:", all_tasks2);
//     } else {
//         all_tasks2.sort((a, b) => new Date(b.newTask_dateCreated) - new Date(a.newTask_dateCreated));
//         console.log("Отсортированные задачи по убыванию:", all_tasks2);
//     }

// }




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


// Функция для перезаписи индексов тасков
function reIndexTasks() {
    // Все таски на html странице
    let allTasksHTML = sectionContentBlock_viewContent.querySelectorAll(".task")
    all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));


    // Перебираю все таски и обновляю их id (как в массиве тасков, так и в html)
    for (let i = 0; i < all_tasks.length; i++) {
        all_tasks[i].newTask_ID = i + 1
        allTasksHTML[i].setAttribute("id", i + 1)
    }
    
    // Обновляю счётчик тасков (это работает при удалении таска)
    tasksId = all_tasks.length
    window.localStorage.setItem("tasksId", all_tasks.length)

    countAllTasks.innerText = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков

    // Обновляю массив с тасками в основном js файле и в localStorage
    reloadAllTasks(all_tasks)
}







// Функция для распределения тасков для добавления в "Просрочено"
function raspredTasks() {
    all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"));

    // Перебираю все таски (не просроченные) и перемещаю в просроченные те, у которых истёк срок
    allCurrentTasksOuter.querySelectorAll(".tasks__tasks-list .task").forEach(function(task) {
        const dateTask = task.querySelector(".task__deadline__date_hidden").innerText.split(".").reverse().join(".")
        const todayDateReverse = nowData.toLocaleDateString().split(".").reverse().join(".")

        if (dateTask < todayDateReverse) {
            allOverdueTasks.append(task)
            all_tasks[task.getAttribute("id")-1].newTask_isOverdue = true
            reloadAllTasks(all_tasks)
        }
    })
    allOverdueTasks.querySelectorAll(".task").forEach(function(task) {
        const dateTask = task.querySelector(".task__deadline__date_hidden").innerText.split(".").reverse().join(".")
        const todayDateReverse = nowData.toLocaleDateString().split(".").reverse().join(".")
        if (dateTask >= todayDateReverse) {
            allCurrentTasksOuter.append(task)
            all_tasks[task.getAttribute("id")-1].newTask_isOverdue = false
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
// te()
export {sortTasks, raspredTasks, reIndexTasks, setTasksId, getTasksId}
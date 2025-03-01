'use strict';

import {closeModalNewTask} from "./aside.js"





const body = document.querySelector('body');



const countAllTasks = document.querySelector(".header-block__countNum-tasks-all-tasks")      // Поле с количеством заданий (всего, кроме просроченных)
const sectionContentBlock_viewContent = document.querySelector(".section-content-block__view-content")  // Основная область. С текущей датой, со списком тасков, с меню добавления новой задачи
const nameToday = document.querySelector(".tasks__name-today")          // Поле для отображения текущей даты


const buttonSortAllTaskUP = document.querySelector(".tasks__sort-up")      // Кнопка для сортировки тасков (кроме просроченных) по возрастанию
const buttonSortAllTaskDOWN = document.querySelector(".tasks__sort-down")      // Кнопка для сортировки тасков (кроме просроченных) по убыванию

const buttonSortOverdueTaskUP = document.querySelector(".overdue__sort-up")      // Кнопка для сортировки просроченных тасков по возрастанию
const buttonSortOverdueTaskDOWN = document.querySelector(".overdue__sort-down")      // Кнопка для сортировки просроченных тасков по убыванию




const allOverdueTasks = document.querySelector(".overdue__tasks-list")  // Область со всеми ПРОСРОЧЕННЫМИ тасками


const butHideOverdue = document.querySelector(".overdue__btn")   // Кнопка для скрытия просроченных задач
const iconHideOverdue = document.querySelector(".overdue__btn-icon")   // Иконка кнопки для скрытия просроченных задач



const allСurrentTasksOuter = document.querySelector(".tasks__tasks-list")        // Область со всеми актуальными созданными тасками (кроме просроченных)





const formFromAddNewTask = document.querySelector(".form-from-add-new-task")    // Поле добавления нового таска
const textAreaFromAddNewTask = document.querySelectorAll(".form-from-add-new-task__textarea-from-add-new-task")     //  Текстовые поля (имя и описание) для написания нового добавляемого таска 
const nameNewTask = document.querySelector(".form-from-add-new-task__name-new-task")   // Поле для написания имени нового добавляемого таска
const description = document.querySelector(".form-from-add-new-task__description")   // Поле для написания описания нового добавляемого таска



const dopSettingsForNewTask = document.querySelectorAll(".form-from-add-new-task__bnt-settings")   // Поле выбора срока выполнения и приоритета для нового таска

const selectDeadline = document.querySelector(".form-from-add-new-task__select-deadline")       // Поле (кнопка) для выбора срока выполнения нового таска

const hiddenMenuDeadline = document.querySelector(".form-from-add-new-task__hidden-menu-deadline")   // Скрытое поле с выбором срока выполнения таска при создании/редактировании задачи/подзадачи
const deadlineItem = document.querySelectorAll(".form-from-add-new-task__deadline-item")        // Элементы li с вариантами срока выполнения
const DeadlineCalendare = hiddenMenuDeadline.querySelector(".form-from-add-new-task__hidden-menu-deadline-calendare")    // Календарь в скрытом меню для выбора срока выполнения


const selectPriority = document.querySelector(".form-from-add-new-task__select-priority")   // Поле (кнопка) для выбора приоритета у нового таска
const hiddenMenuPriority = document.querySelector(".form-from-add-new-task__hidden-menu-priority")   // Скрытое поле с выбором приоритета таска
const priorityItem = document.querySelectorAll(".form-from-add-new-task__priority-item")        // Элементы li с вариантами приоритета
const priorityIconSelected = document.querySelector(".form-from-add-new-task__priority-icon-select")    // Иконка галочки для выбранного приоритета



const conteinerFromHiddenMenuTypesTasks = document.querySelector(".form-from-add-new-task__hidden-menu-types-task")     // Скрытое поле с выбором типа таска
const typesProjectForSelect = document.querySelectorAll(".form-from-add-new-task__hidden-menu-types-task .my-type-projects__conteiner_from-hidden-menu .my-type-projects__type-project")     // Элементы li с типом таска

const selectTypeTask = document.querySelector(".form-from-add-new-task__select-type-task")   // Поле для вставки названия и иконки выбранного типа таска
const buttonCloseMenuNewTask = formFromAddNewTask.querySelector(".btn-close")
const buttonAddNewTask = formFromAddNewTask.querySelector(".btn-add")        // Кнопка добавления описанного (выбрано имя и описание) таска
const buttonSaveTask = formFromAddNewTask.querySelector(".btn-save")

const addNewTask = document.querySelector(".add-new-task")      // Кнопка открытия поля для добавления нового таска
const imgAddTask1 = document.querySelector(".add-new-task__img-add-task-1")      // Иконка добавления таска 1 (Без наведения курсора)  
const imgAddTask2 = document.querySelector(".add-new-task__img-add-task-2")      // Иконка добавления таска 2 (Если навести курсор)



let MyCalendar

let MyCalendarForm
const curHiddenCalendarContainerForm = document.querySelector(".form-from-add-new-task__hidden-menu-deadline-calendare")
const curHiddenCalendarForm = document.querySelector(".hidden-menu-deadline-calendare-input")




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
    window.localStorage.setItem("all_tasks", JSON.stringify(all_tasks))
}


countAllTasks.innerHTML = all_tasks.length   // Вписывание количество тасков в поле для их подсчёта

let tasksId = 0     // Счётчик для присваивания уникальных id создаваемым таскам











// Создаю текущую дату
const localLanguage = navigator.language
const nowData = new Date() 
const options = {
    month: "long",
    day: "numeric",
    weekday: "long",
}
const options2 = {
    month: "short"
}
const options3 = {
    weekday: "long"
}
const options4 = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
}
const nowDataRu = Intl.DateTimeFormat(localLanguage, options).format(nowData)


const nowDay = nowData.getDate()    // Сегодняшнее число
const nowMonth = Intl.DateTimeFormat(localLanguage, options2).format(nowData)   // Сегодняшний месяц словами
const nowMonthNum = nowData.getMonth()
const nowYear = nowData.getFullYear()   // Сегодняшний год
const nowWeekday = (Intl.DateTimeFormat(localLanguage, options3).format(nowData))       // Сегодняшний день недели
const correctWeekday = (String(nowWeekday.split("").splice(0, 1)).toLocaleUpperCase()) + (nowWeekday.split("").splice(1, 10).join(""))



nameToday.innerHTML = `${nowDay} ${nowMonth} ‧ Сегодня ‧ ${correctWeekday}`     // Записываю в html код текущую дату

// Записываю сегодняшнее число в окно выбора срока выполнения для новой создаваемой задачи
selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML = `${nowDay} ${nowMonth}`
selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML = nowData.toLocaleDateString()


// Сегодняшняя дата в формате "год.месяц.число". Нужно для установки минимальной даты всем календарям
const currectEntryDate = `${nowYear}.${nowMonthNum + 1}.${nowDay}`












function addTestTasks() {
    // Задача 1
    tasksId += 1
    const myJobTask1 = {
        newTask_name: "Добавить автоматическое выделение выбранного в задаче приоритета и срока выполнения, при открытии меню редактирования таска и подзадачи.   24.06.2025", 
        newTask_description: "При открытии меню выбора приоритета и срока выполнения, ничего не выделено и не понятно визуально какой из пунктов выбран. Нужно что бы при открытии скрытых меню выбора, сразу ставилось выделение на текущем выборе", 
        newTask_typeTask_name: "Работа",
        newTask_typeTask_icon_src: "./icon/job.png",
        newTask_deadlineTask: "24 июнь",
        newTask_deadlineFullDataTask: "24.06.2025",
        newTask_priority_name: "P2",
        newTask_priority_color: "orange",
        newTask_ID: tasksId,
        newTask_countSubtask: 0,
        newTask_Subtasks_arr: []
    }
    addNewTaskMass(myJobTask1)
    countAllTasks.innerHTML = all_tasks.length



    // Задача 2
    tasksId += 1
    const myJobTask2 = {
        newTask_name: `aawdwacsefwddw ${nowData.toLocaleDateString()}`, 
        newTask_description: "qqqqqqqqqqqqqqqqqqqqqq", 
        newTask_typeTask_name: "Работа",
        newTask_typeTask_icon_src: "./icon/job.png",
        newTask_deadlineTask: `${nowDay} ${nowMonth}`,
        newTask_deadlineFullDataTask: nowData.toLocaleDateString(),
        newTask_priority_name: "P2",
        newTask_priority_color: "orange",
        newTask_ID: tasksId,
        newTask_countSubtask: 0,
        newTask_Subtasks_arr: []
    }
    addNewTaskMass(myJobTask2)
    countAllTasks.innerHTML = all_tasks.length


    // Задача 3
    tasksId += 1
    const myJobTask3 = {
        newTask_name: "dada2312ed123213ч Чугунка  24.03.2025", 
        newTask_description: "awdawl21lekd1x2ew2d1x213d", 
        newTask_typeTask_name: "Работа",
        newTask_typeTask_icon_src: "./icon/job.png",
        newTask_deadlineTask: "24 март",
        newTask_deadlineFullDataTask: "24.03.2025",
        newTask_priority_name: "P2",
        newTask_priority_color: "orange",
        newTask_ID: tasksId,
        newTask_countSubtask: 0,
        newTask_Subtasks_arr: []
    }
    addNewTaskMass(myJobTask3)
    countAllTasks.innerHTML = all_tasks.length


    // Задача 4
    tasksId += 1
    const myJobTask4 = {
        newTask_name: `#@$№№№№№№№№№№№№№№№№  ${ nowData.toLocaleDateString()}`, 
        newTask_description: "№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№", 
        newTask_typeTask_name: "Работа",
        newTask_typeTask_icon_src: "./icon/job.png",
        newTask_deadlineTask: `${nowDay} ${nowMonth}`,
        newTask_deadlineFullDataTask: nowData.toLocaleDateString(),
        newTask_priority_name: "P1",
        newTask_priority_color: "red",
        newTask_ID: tasksId,
        newTask_countSubtask: 0,
        newTask_Subtasks_arr: []
    }
    addNewTaskMass(myJobTask4)
    countAllTasks.innerHTML = all_tasks.length


    // Задача 5
    tasksId += 1
    const myJobTask5 = {
        newTask_name: "#########", 
        newTask_description: "#######################   01.05.2025", 
        newTask_typeTask_name: "Работа",
        newTask_typeTask_icon_src: "./icon/job.png",
        newTask_deadlineTask: "1 мая",
        newTask_deadlineFullDataTask: "01.05.2025",
        newTask_priority_name: "P1",
        newTask_priority_color: "red",
        newTask_ID: tasksId,
        newTask_countSubtask: 0,
        newTask_Subtasks_arr: []
    }
    addNewTaskMass(myJobTask5)
    countAllTasks.innerHTML = all_tasks.length


    // Задача 6
    tasksId += 1
    const myJobTask6 = {
        newTask_name: "##########", 
        newTask_description: "############################  02.12.2025", 
        newTask_typeTask_name: "Работа",
        newTask_typeTask_icon_src: "./icon/job.png",
        newTask_deadlineTask: "2 декабря",
        newTask_deadlineFullDataTask: "02.12.2025",
        newTask_priority_name: "P1",
        newTask_priority_color: "red",
        newTask_ID: tasksId,
        newTask_countSubtask: 0,
        newTask_Subtasks_arr: []
    }
    addNewTaskMass(myJobTask6)
    countAllTasks.innerHTML = all_tasks.length


    // Задача 7
    tasksId += 1
    const myJobTask7 = {
        newTask_name: "Старая задачка", 
        newTask_description: "Что-то уже ненужное 15.01.2025", 
        newTask_typeTask_name: "Работа",
        newTask_typeTask_icon_src: "./icon/job.png",
        newTask_deadlineTask: "15 дек.",
        newTask_deadlineFullDataTask: "15.01.2025",
        newTask_priority_name: "P1",
        newTask_priority_color: "red",
        newTask_ID: tasksId,
        newTask_countSubtask: 0,
        newTask_Subtasks_arr: []
    }
    addNewTaskMass(myJobTask7)
    countAllTasks.innerHTML = all_tasks.length



    // Задача 8
    tasksId += 1
    const myJobTask8 = {
        newTask_name: "Старая задачка 2", 
        newTask_description: "Что-то ещё более ненужное 23.11.2024", 
        newTask_typeTask_name: "Работа",
        newTask_typeTask_icon_src: "./icon/job.png",
        newTask_deadlineTask: "23 нояб.    ",
        newTask_deadlineFullDataTask: "23.11.2024",
        newTask_priority_name: "P1",
        newTask_priority_color: "red",
        newTask_ID: tasksId,
        newTask_countSubtask: 0,
        newTask_Subtasks_arr: []
    }
    addNewTaskMass(myJobTask8)
    countAllTasks.innerHTML = all_tasks.length
}
 








// При запуске страницы создаю дубль массива с существующими тасками, где сразу сортирую по сроку и добавляю их на страницу
// Дубль массива со всеми тасками
let allTasksDoubleStart = all_tasks.slice()
// Сортирую массив по сроку выполнения
allTasksDoubleStart.sort(function(a, b) {
    let numA = a.newTask_deadlineFullDataTask.split(".").reverse().join(".")
    let numB = b.newTask_deadlineFullDataTask.split(".").reverse().join(".")

    if (numA > numB) return -1
    if (numA < numB) return 1
    return 0
})
// Добавляю все элементы этого массива (таски) на html страницу 
allTasksDoubleStart.forEach(function(el) {
    funcAddNewTask(el)
})



// Функция для распределения тасков для добавления в "Просрочено"
function raspredTasks() {
    allСurrentTasksOuter.querySelectorAll(".task").forEach(function(task) {
        const dateTask = task.querySelector(".task__deadline__date_hidden").innerHTML.split(".").reverse().join(".")
        const todayDateReverse = nowData.toLocaleDateString().split(".").reverse().join(".")
        if (dateTask < todayDateReverse) {
            allOverdueTasks.append(task)
        }
    })
}

// При запуске страницы запускаю функцию для переноса задачи в раздел просроченных, если её дата выполнения меньше чем сегодняшний день
raspredTasks()


// Функция для сортировки тасков на странице (кроме просроченных) в порядке возрастания их срока выполнения
function sortAllTasksUP() {
    // Все таски на странице, кроме просроченных
    let tasksItems = allСurrentTasksOuter.querySelectorAll(".task")
    // Временный массив для этих тасков
    let tasksItemsArr = []
    // Родитель этих тасков (ul)
    let parentTasks = tasksItems[0].parentNode

    // Перебираю все таски и добавляю их в массив, попутно удаляя их со страницы
    for (let i = 0; i < tasksItems.length; i++) {
        tasksItemsArr.push(parentTasks.removeChild(tasksItems[i]))
    }

    // Сортирую массив из тасков в порядке их даты выполнения
    tasksItemsArr.sort(function(nodeA, nodeB) {
        let textA = nodeA.querySelector(".task__deadline__date_hidden").innerHTML
        let textB = nodeB.querySelector(".task__deadline__date_hidden").innerHTML
        let numA = textA.split(".").reverse().join(".") 
        let numB = textB.split(".").reverse().join(".")
        if (numA < numB) return -1
        if (numA > numB) return 1
        return 0
    })

    // Перебираю массив и добавляю на страницу все отсортированные таски из него в порядке возрастания
    tasksItemsArr.forEach(function(node) {
        parentTasks.appendChild(node)
      });
}


// Функция для сортировки ПРОСРОЧЕННЫХ тасков на странице в порядке возрастания их срока выполнения
function sortAllOverdueTasksUP() {
    // Все просроченных таски на странице
    let tasksItems = allOverdueTasks.querySelectorAll(".task")
    // Временный массив для этих тасков
    let tasksItemsArr = []
    // Родитель этих тасков (ul)
    let parentTasks = tasksItems[0].parentNode

    // Перебираю все таски и добавляю их в массив, попутно удаляя их со страницы
    for (let i = 0; i < tasksItems.length; i++) {
        tasksItemsArr.push(parentTasks.removeChild(tasksItems[i]))
    }

    // Сортирую массив из тасков в порядке их даты выполнения
    tasksItemsArr.sort(function(nodeA, nodeB) {
        let textA = nodeA.querySelector(".task__deadline__date_hidden").innerHTML
        let textB = nodeB.querySelector(".task__deadline__date_hidden").innerHTML
        let numA = textA.split(".").reverse().join(".") 
        let numB = textB.split(".").reverse().join(".")
        if (numA < numB) return -1
        if (numA > numB) return 1
        return 0
    })

    // Перебираю массив и добавляю на страницу все отсортированные таски из него в порядке возрастания
    tasksItemsArr.forEach(function(node) {
        parentTasks.appendChild(node)
      });
}


// Функция для сортировки тасков на странице (кроме просроченных) в порядке убывания их срока выполнения
function sortAllTasksDOWN() {
    // Все таски на странице, кроме просроченных
    let tasksItems = allСurrentTasksOuter.querySelectorAll(".task")
    // Временный массив для этих тасков
    let tasksItemsArr = []
    // Родитель этих тасков (ul)
    let parentTasks = tasksItems[0].parentNode

    // Перебираю все таски и добавляю их в массив, попутно удаляя их со страницы
    for (let i = 0; i < tasksItems.length; i++) {
        tasksItemsArr.push(parentTasks.removeChild(tasksItems[i]))
    }

    // Сортирую массив из тасков в порядке их даты выполнения
    tasksItemsArr.sort(function(nodeA, nodeB) {
        let textA = nodeA.querySelector(".task__deadline__date_hidden").innerHTML
        let textB = nodeB.querySelector(".task__deadline__date_hidden").innerHTML
        let numA = textA.split(".").reverse().join(".") 
        let numB = textB.split(".").reverse().join(".")
        if (numA > numB) return -1
        if (numA < numB) return 1
        return 0
    })

    // Перебираю массив и добавляю на страницу все отсортированные таски из него в порядке возрастания
    tasksItemsArr.forEach(function(node) {
        parentTasks.appendChild(node)
      });
}

// Функция для сортировки ПРОСРОЧЕННЫХ тасков на странице в порядке убывания их срока выполнения
function sortAllOverdueTasksDOWN() {
    // Все просроченных таски на странице
    let tasksItems = allOverdueTasks.querySelectorAll(".task")
    // Временный массив для этих тасков
    let tasksItemsArr = []
    // Родитель этих тасков (ul)
    let parentTasks = tasksItems[0].parentNode

    // Перебираю все таски и добавляю их в массив, попутно удаляя их со страницы
    for (let i = 0; i < tasksItems.length; i++) {
        tasksItemsArr.push(parentTasks.removeChild(tasksItems[i]))
    }

    // Сортирую массив из тасков в порядке их даты выполнения
    tasksItemsArr.sort(function(nodeA, nodeB) {
        let textA = nodeA.querySelector(".task__deadline__date_hidden").innerHTML
        let textB = nodeB.querySelector(".task__deadline__date_hidden").innerHTML
        let numA = textA.split(".").reverse().join(".") 
        let numB = textB.split(".").reverse().join(".")
        if (numA > numB) return -1
        if (numA < numB) return 1
        return 0
    })

    // Перебираю массив и добавляю на страницу все отсортированные таски из него в порядке возрастания
    tasksItemsArr.forEach(function(node) {
        parentTasks.appendChild(node)
      });
}







// События по клику на стрелочки для сортировки тасков
buttonSortAllTaskUP.addEventListener("click", sortAllTasksUP)
buttonSortAllTaskDOWN.addEventListener("click", sortAllTasksDOWN)

buttonSortOverdueTaskUP.addEventListener("click", sortAllOverdueTasksUP)
buttonSortOverdueTaskDOWN.addEventListener("click", sortAllOverdueTasksDOWN)


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





let timeVar2 = ''           // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)

// Удаляю отметку о текущей задаче  
let currentLi_klick = null



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
sectionContentBlock_viewContent.addEventListener("mouseover", function(e) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentLi есть, то мы ещё не ушли с предыдущего <li>, это переход внутри - игнорируем такое событие
    if (currentLi) return
    let target = e.target.closest("li.task")

    if (!target) return;    // переход не на <li> - игнорировать
    if (!sectionContentBlock_viewContent.contains(target)) return    // переход на <li>, но вне .sectionContentBlock_viewContent (возможно при вложенных списках) - игнорировать

    // ура, мы зашли на новый <li>

    currentLi = target

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
    currentLi = null
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
    if (!timeVar2) {
        thisDopFuncs.classList.add("hide1")
        thisDopFuncs.querySelector(".task__btnEdit").classList.add("hide1")
        thisDopFuncs.querySelector(".task__btnNewDeadline").classList.add("hide1")
    } 
    // Иначе, если нажимается кнопка назначения нового срока выполнения задаче, то скрывается лишь кнопка редактирования задачи
    else if (timeVar2 = 1) {
        thisDopFuncs.querySelector(".task__btnEdit").classList.add("hide1")
    }
}





// Кнопка редактирования тасков
sectionContentBlock_viewContent.addEventListener("click", function(e) {

    let target = e.target.closest(".task__btnEdit")   // Нажатая кнопка "edit"
    // Если нажатие было не по кнопке редактирования, то игнор
    if (!target) return

    let targetLi = e.target.closest(".task")       // Задача, внутри которой был нажат "edit"

    // Блокирую возможность открытия м.о.
    switchIsModal_block("true") 

    


    // В область выбранного таска добавляется поле для внесение изменений (вместо самого li, который скрывается)
    targetLi.append(formFromAddNewTask)   

    // Убирается скрытие li со всех элементов (если до этого какой-то скрылся, из-за незаконченного редактирования)
    sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
        task.classList.remove("hide2")      
    })
    targetLi.querySelector(".task__wrapper").classList.add("hide2")        // Скрывается li
    formFromAddNewTask.classList.remove("hide2")    // Убирает скрытие с формы изменения таска, которая перенеслась в место элемента li


    // Скрываю кнопку для создания таска. И показываю кнопку для сохранения изменений при редактированини таска
    buttonAddNewTask.classList.add("hide2")
    buttonSaveTask.classList.remove("hide2")


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
    nameNewTask.value = settingsTask.newTask_name   // Имя таска
    description.value = settingsTask.newTask_description    // Описание таска

    selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML = settingsTask.newTask_typeTask_name  // Имя типа таска
    selectTypeTask.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", settingsTask.newTask_typeTask_icon_src)  // Иконка типа таска
    selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML = settingsTask.newTask_deadlineTask
    selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML = settingsTask.newTask_deadlineFullDataTask
    selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML = settingsTask.newTask_priority_name   // Имя приоритета
    selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", `./icon/priority_${settingsTask.newTask_priority_color}.png`)    // Цвет флага
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
        updateDataTask_arr(liFromArr)
        updateDataTask_element(targetLi, liFromArr)

        // Обновляю массив с тасками в js и в localStorage (перезаписываю с учётом изменений)
        reloadAllTasks(all_tasks)



        // Скрывается Блок "formFromAddNewTask"
        formFromAddNewTask.classList.add("hide2")   
        // Блок "formFromAddNewTask" перемещается в конец
        sectionContentBlock_viewContent.append(formFromAddNewTask)  
        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
        sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Удаляю отметку о текущем таске с отслеживания при наведении
        currentLi = null

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false") 
        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
})

// Функция для обновления данных таска внутри массива тасков
function updateDataTask_arr(taskArr) {
    taskArr.newTask_name = nameNewTask.value
    taskArr.newTask_description = description.value
    taskArr.newTask_typeTask_name = selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML   // Имя типа таска
    taskArr.newTask_typeTask_icon_src = selectTypeTask.querySelector(".form-from-add-new-task__icon_type").getAttribute("src") // Иконка типа таска
    taskArr.newTask_deadlineTask = selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML
    taskArr.newTask_deadlineFullDataTask = selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML
    taskArr.newTask_priority_name = selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML

    // Создаю переменную для выяснения названия цвета у приоритета. Беру содержание тега src у выбранного изображения и разбиваю его на массив.
    let arrColor = selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src").split("")
    arrColor.splice(-4)     // Удаляю последние 4 символа (".png")
    arrColor.splice(0, 16)  // Удаляю первые 16 символов, оставляя лишь название самого цвета

    taskArr.newTask_priority_color = arrColor.join("")      // Название цвета у приоритета выбранного пользователем таска
}
// Функция для обновления данных элемента таска
export function updateDataTask_element(taskEl, taskArr) {
        taskEl.querySelector(".task__name-task").innerHTML = taskArr.newTask_name      // Название таска
        taskEl.querySelector(".task__description-task-text").innerHTML = taskArr.newTask_description    // Описание таска
        

        taskEl.querySelector(".task__deadline__date_visible").innerHTML = taskArr.newTask_deadlineTask   // Поле с текстом со сроком выполнения данного таска (вне мо, на основной странице)
        taskEl.querySelector(".task__deadline__date_hidden").innerHTML = taskArr.newTask_deadlineFullDataTask    // Поле с полной числовой датой срока выполнения (вне мо, на основной странице)
    
        taskEl.querySelector(".task__typeTask span").innerHTML = taskArr.newTask_typeTask_name  // Имя типа таска

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
        curHiddenMenuDeadlineNewDeadline.classList.remove("hide2")    


        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = targetTask.querySelector(".task__deadline__date_hidden")

        // Полная дата, которая была перевёрнута (стала: "год.месяц.число")
        const textAreaDeadlineHiddenNumReversed = textAreaDeadlineHiddenNum.innerHTML.split(".").reverse().join(".")

        
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
        timeVar2 = 1   

        // Отмечаю в глобальную переменную - таск, внутри которого был совершён клик по кнопке
        currentLi_klick = e.target.closest("li")            

        hide_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        switchIsModal_block("true")

        // Запрещается показ доп. функций тасков
        switchDisabledShowDopFuncTask("true")
    }
    
    // Если меню отображено (не скрыто)
    else if (curHiddenMenuDeadlineNewDeadline.classList.contains("hide2") == false && timeVar2) {  
        // Скрываю это меню выбора и уничтожаю созданный календарь
        curHiddenMenuDeadlineNewDeadline.classList.add("hide2") 
        MyCalendar.destroy()
        MyCalendar = null


        setTimeout(() => timeVar2='', 100)
        // Удаляю отметку о текущем таске
        currentLi_klick = null                                  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        switchIsModal_block("false")
    }
})








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
    thisMark.classList.toggle("hide2")
}

// Функция удаления тасков при нажатии на кружок
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    let target = e.target.closest(".task__button-task-checkbox")   //Нажатый кружок
    let targetLi = e.target.closest(".task")       // Задача, внутри которой был нажат кружок
    if (!target) return

    removeTask(targetLi)
})

function removeTask(curTask) {
    curTask.remove()

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

    countAllTasks.innerHTML = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков
}









// Замена иконок добавления таска, при наведении на это поле
addNewTask.addEventListener("mouseenter", function(e) {
    imgAddTask1.classList.add("hide2")
    imgAddTask2.classList.remove("hide2")
    addNewTask.classList.add("add-new-task__text_hovered")
})
addNewTask.addEventListener("mouseleave", function(e) {
    imgAddTask1.classList.remove("hide2")
    imgAddTask2.classList.add("hide2")
    addNewTask.classList.remove("add-new-task__text_hovered")
})

// При нажатии на кнопку добавления таска (открытие меню для внесения данных к новому создаваемогу таску)
addNewTask.addEventListener("click", function(e) {
    sectionContentBlock_viewContent.append(formFromAddNewTask)
    // Убираю скрытие у элемента li, вместо которого ранее могло подставляться поле для редактирования
    sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
        task.classList.remove("hide2")
    })
    formFromAddNewTask.classList.remove("hide2")
    
    // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
    reloadFormAddTask()
 

    // Блокирую возможность открытия м.о.
    switchIsModal_block("true")
    // Разрешаю показ доп. функций тасков
    switchDisabledShowDopFuncTask("true")
})




// Блокировка кнопки "Добавить задачу" и "Сохранить" (в меню добавления/редактирования таска)
nameNewTask.addEventListener("input", function(e) {
    if (e.target.value == "") {     // Если поле ввода имени стало пустым:
        buttonAddNewTask.setAttribute('aria-disabled', 'true')
        buttonSaveTask.setAttribute('aria-disabled', 'true')
    } else {    
        buttonAddNewTask.setAttribute('aria-disabled', 'false')
        buttonSaveTask.setAttribute('aria-disabled', 'false')
    }
})





// Регулировка высоты полей для ввода имени и описания нового добавляемого таска
for (let i = 0; i < textAreaFromAddNewTask.length; i++) {
    // textAreaFromAddNewTask[i].setAttribute("style", "height:" + 24 + "px;overflow-y:hidden;");      // Потом изменить/удалить строку эту
    textAreaFromAddNewTask[i].setAttribute("style", "height:" + (textAreaFromAddNewTask[i].scrollHeight + 24) + "px;overflow-y:hidden;");
    textAreaFromAddNewTask[i].addEventListener("input", OnInput, false);
}
//TODO: Refactor
function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}

// Изменение стилей поля с выбором (срок выполнения и приоритет)
dopSettingsForNewTask.forEach(function(itemSettings) {
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
selectTypeTask.addEventListener("mouseenter", function(e) {
    selectTypeTask.querySelector("span").classList.add("darkned")
    selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.add("darkned")
})
selectTypeTask.addEventListener("mouseleave", function(e) {
    // Если скрытое меню выбора таска показано, то игнорировать
    if (conteinerFromHiddenMenuTypesTasks.classList.contains("hide2") == false) return
    
    selectTypeTask.querySelector("span").classList.remove("darkned")
    selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
})


// Появление и скрытие поле с выбором типа таска в меню создания/редактирования новой задачи
let timeVar = ''
selectTypeTask.addEventListener("click", function(e) {      // При нажатии на кнопку 

    // Очищаю выделение срока выполнения в списке вариантов и в календаре
    reloadItemsAndCalendarDeadline()


    // Если скрытое меню показано (не скрыто)
    if (conteinerFromHiddenMenuTypesTasks.classList.contains("hide2") == false) {       
        conteinerFromHiddenMenuTypesTasks.classList.add("hide2")    // Скрываю меню выбора типа таска
 
        // Убираю выделения кнопки
        selectTypeTask.classList.remove("active2")
        selectTypeTask.querySelector("span").classList.remove("darkned")
        selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")

        // Убираю блокировку для открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
    // Иначе, если доп меню скрыто
    else
    {
        // Скрываю скрытые меню выбора срока выполнения таска и меню выбора приоритета, если они были открыты
        hiddenMenuDeadline.classList.add("hide2")
        hiddenMenuPriority.classList.add("hide2")


        conteinerFromHiddenMenuTypesTasks.classList.remove("hide2")     // Показываю меню выбора типа таска

        // Добавляю "active2" для постоянного выделения  
        selectTypeTask.classList.add("active2")


        timeVar = 1;  

        // Блокирую возможность открытия м.о.
        switchIsModal_block("true")  

        // Запрещается показ доп. функций тасков
        switchDisabledShowDopFuncTask("true")
    }
})

conteinerFromHiddenMenuTypesTasks.addEventListener("click", function(e) {     // При нажатии на само поля выбора
    timeVar = 1;  

     // Убираю выделения кнопки
     selectTypeTask.classList.remove("active2")
     selectTypeTask.querySelector("span").classList.remove("darkned")
     selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
})


body.addEventListener("click", function(e) {      // При нажатии вне поля выбора - скрывается

    // Если доп. меню типа таска - скрыто, то игнорируем
    if (conteinerFromHiddenMenuTypesTasks.classList.contains("hide2") == true) return


    // Если М.О. открыто, то:
    if (!isModal == "false") {
        const targetLi_modal = e.target.closest(".subtask")     // Элемент  li для последующего определения нового типа подзадаче (одна из двух кнопок доп функций подзадачи)       


        // Если клик был вне поля выбора и вне элемента подзадачи (li)
        if (!timeVar && targetLi_modal == null) {
            // Скрываю меню выбора типа таска
            conteinerFromHiddenMenuTypesTasks.classList.add("hide2") 
            // Убираю выделения кнопки
            selectTypeTask.classList.remove("active2")
            selectTypeTask.querySelector("span").classList.remove("darkned")
            selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
    
            // Снимаю блокировку с открытия м.о.
            switchIsModal_block("false")  
            // Разрешаю показ доп. функций задач/подзадач
            switchDisabledShowDopFuncTask("false")
            
        } 
        // Иначе, если клик был вне поля выбора и на элемент подзадачи (li)
        else if (!timeVar && targetLi_modal != null) {
            // Скрываю меню выбора типа таска
            conteinerFromHiddenMenuTypesTasks.classList.add("hide2") 
    
            // Убираю выделения кнопки
            selectTypeTask.classList.remove("active2")
            selectTypeTask.querySelector("span").classList.remove("darkned")
            selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
    
            // Снимаю блокировку с открытия м.о.
            switchIsModal_block("false")  
            // Разрешаю показ доп. функций задач/подзадач
            switchDisabledShowDopFuncTask("false")
            
    
            // Показываю доп. функции у той подзадачи, на которую был совершён клик (которая была под курсором в момент клика)
            targetLi_modal.querySelector(".subtask__dopFuncs").querySelector(".subtask__btnEdit").classList.remove("hide1")
            targetLi_modal.querySelector(".subtask__dopFuncs").querySelector(".subtask__btnNewDeadline").classList.remove("hide1")
        }
    
        if (timeVar) { 
            setTimeout(() => timeVar='', 100)
        }  


        // Игнорируем дальнейший код, который должен работать лишь если модальное окно закрыто.
        return
    }  

    const targetLi = e.target.closest(".task")     // Элемент  li для последующего определения нового типа таску (одна из двух кнопок доп функций таска)


    // Если клик был вне поля выбора и вне элемента таска (li)
    if (!timeVar && targetLi == null) {
        conteinerFromHiddenMenuTypesTasks.classList.add("hide2") 
        // Убираю выделения кнопки
        selectTypeTask.classList.remove("active2")
        selectTypeTask.querySelector("span").classList.remove("darkned")
        selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    } 
    // Иначе, если клик был вне поля выбора и на элемент таска (li)
    else if (!timeVar && targetLi != null) {
        conteinerFromHiddenMenuTypesTasks.classList.add("hide2") 

        // Убираю выделения кнопки
        selectTypeTask.classList.remove("active2")
        selectTypeTask.querySelector("span").classList.remove("darkned")
        selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Показываю доп. функции у того таска, на который был совершён клик (который был под курсором в момент клика)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))
    }

    if (timeVar) { 
        setTimeout(() => timeVar='', 100)
    }  
})


// Выбор типа таска в меню выбора при создании новой задачи
typesProjectForSelect.forEach(function(type) {
    type.addEventListener("click", function(e) {
        selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML = type.querySelector(".wrapper-type-task__name").innerHTML
        const selectedIcon = type.querySelector(".wrapper-type-task__icon-type-project")
        selectTypeTask.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", selectedIcon.getAttribute("src"))

        
        // Разрешаю показ доп функций и скрываю меню выбора приоритета 
        switchDisabledShowDopFuncTask("false")

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        conteinerFromHiddenMenuTypesTasks.classList.add("hide2")
    })
})



// Изменение полей выбора срока выполнения и приоритета, при нажатии на крестик
formFromAddNewTask.querySelectorAll(".form-from-add-new-task__icon-cross").forEach(function(crossItem) {
    crossItem.addEventListener("click", function(e) {
        const parentEl = crossItem.closest("div")
        // Изменение у срока выполнения
        if (parentEl.classList.contains("form-from-add-new-task__select-deadline")) {       
            parentEl.querySelector(".form-from-add-new-task__text-settings").innerHTML = "Срок выполнения"
            // Очищаю выделение срока в списке вариантов
            deadlineItem.forEach(function(itemDeadline) { 
                itemDeadline.classList.remove("hovered_select_menu")
            })
            // Очищаю выделение срока в календаре
            if (selectedDay && selectedDay != "") {
                selectedDay.classList.remove("-selected-")
            }

        // Изменение у приоритета
        } else if (parentEl.classList.contains        ("form-from-add-new-task__select-priority")) {    
            parentEl.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", "./icon/priority_0.png")
            parentEl.querySelector(".form-from-add-new-task__text-settings").innerHTML = "Приоритет"
            
            priorityItem.forEach(function(itemPriority) { 
                itemPriority.classList.remove("hovered_select_menu")    // Удаляю стиль выбранного элемента у ранее выбранного элемента
                itemPriority.querySelector(".form-from-add-new-task__priority-icon-selected").classList.add("hide2")    // Удаляю галочки у ранее выбранного элемента (если такой был)
            })
        }
    })
})




// Отслеживание скрытых меню срока выполнения и приоритета
let observerHiddenMenus
let isObservHiddenMenus = true     // Разрешено ли что-то делать при изменении отслеживании объекта. 
function observFunc(observObj) {
    observerHiddenMenus = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (isObservHiddenMenus == true) {
                observerHiddenMenus.disconnect();
                observObj.querySelector(".form-from-add-new-task__icon-cross").classList.remove("hide2")
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





//Функция для очистки стиля "выбранного элемента" со всех deadlineItem, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик. 
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
        deadlineItem.forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
        currentItemDeadline.classList.add("hovered_select_menu")
    }
}

//Функция для очистки стиля "выбранного элемента" со всех deadlineItem и у всех ячеек календаря, если он где-то был (удаляю со всех элементов класс "hovered_select_menu").
// Данная функция используется при редактировании срока у ТАСКОВ (кроме бокового меню в МО)
function reloadItemsAndCalendarDeadline() {
    // Очищаю выделение срока в списке вариантов (в форме для создания, редактирования задачи)
    deadlineItem.forEach(function(itemDeadline) { 
        itemDeadline.classList.remove("hovered_select_menu")
    })

    // Очищаю выделение срока в календаре (в форме для создания, редактирования задачи)
    if (selectedDay && selectedDay != "") {
        selectedDay.classList.remove("-selected-")
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
            const nameItemDeadline = item.querySelector(".task__dopFunction__deadline-name").innerHTML

            // Поле с текстом со сроком выполнения данного таска (нужно для доп функции "Назначить срок") (внизу слева у каждого таска)
            const deadlineThisTask = targetLi.querySelector(".task__deadline__date_visible")

            // Поле с полной датой в числовом формате у данного таска 
            const deadlineThisTaskFullNum = targetLi.querySelector(".task__deadline__date_hidden")


            if (nameItemDeadline == "Сегодня" && deadlineThisTask.innerHTML != `${nowDay} ${nowMonth}`) {
                deadlineThisTask.innerHTML = `${nowDay} ${nowMonth}`

                deadlineThisTaskFullNum.innerHTML = nowData2.toLocaleDateString()


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "Завтра" && deadlineThisTask.innerHTML != `${nowDay+1} ${nowMonth}`) {
                deadlineThisTask.innerHTML = `${nowDay+1} ${nowMonth}`

                nowData2.setDate(nowDay+1)
                deadlineThisTaskFullNum.innerHTML = nowData2.toLocaleDateString()


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "На выходных") {
                let dataWeekend = new Date()    // Создаю новый объект даты

                // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
                if (Intl.DateTimeFormat(localLanguage, options3).format(dataWeekend) != "суббота") {
                    dataWeekend.setDate(dataWeekend.getDate() + 1)
                }
                // Увеличиваю дату пока не достигну субботы
                while (Intl.DateTimeFormat(localLanguage, options3).format(dataWeekend) != "суббота") {
                    dataWeekend.setDate(dataWeekend.getDate() + 1)
                }
    
                // Если ближайшая суббота уже не была выбрана, то...
                if (deadlineThisTask.innerHTML != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend)}`) {
                    deadlineThisTask.innerHTML = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend)}`

                    deadlineThisTaskFullNum.innerHTML = dataWeekend.toLocaleDateString()
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadline(item)
                }
    
            } else if (nameItemDeadline == "След. неделя") {
                let dataNextWeek = new Date()   // Создаю новый объект даты
                dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)
    
                if (deadlineThisTask.innerHTML != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`) {
                    deadlineThisTask.innerHTML = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`

                    deadlineThisTaskFullNum.innerHTML = dataNextWeek.toLocaleDateString()
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadline(item)
                }
    
            } else if (nameItemDeadline == "Без срока" && deadlineThisTask.innerHTML != "Срок выполнения") {
                isObservHiddenMenus = false
    
                deadlineThisTask.innerHTML = "Срок выполнения"
                deadlineThisTaskFullNum.innerHTML = "Срок выполнения"


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "Без срока" && deadlineThisTask.innerHTML == "Срок выполнения") {
                isObservHiddenMenus == false
            }

            // Обновляю срок выполнения в массиве текущего таска
            liFromArr.newTask_deadlineTask = deadlineThisTask.innerHTML
            liFromArr.newTask_deadlineFullDataTask = deadlineThisTaskFullNum.innerHTML

            // Обновляю массив с тасками (перезаписываю с учётом изменений)
            reloadAllTasks(all_tasks)

            
            // Если текущий таск находится внутри просроченных, то переношу его ко всем остальным
            if (targetLi.closest(".overdue__tasks-list")) {
                allСurrentTasksOuter.append(targetLi)
            }
            
        }, { once: true })
    })
}   




// 1.2) Если меню выбора срока было открыто при создании/редактировании таска (т.е. не через доп. функцию "Назначить срок"), то ...
// (При клике на один из пунктов выбора срока выполнения задачи (из списка вариантов), при выборе из "form-from-add-new-task__hidden-menu-deadline") 
deadlineItem.forEach(function(item) {
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
        const nameItemDeadline = item.querySelector(".form-from-add-new-task__deadline-name").innerHTML

        // Поле с текстом для выбранного срока
        const textAreaDeadline = selectDeadline.querySelector(".form-from-add-new-task__text-settings")

        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num")
        

        if (nameItemDeadline == "Сегодня" && textAreaDeadline.innerHTML != `${nowDay} ${nowMonth}`) {
            textAreaDeadline.innerHTML = `${nowDay} ${nowMonth}`

            textAreaDeadlineHiddenNum.innerHTML = nowData2.toLocaleDateString()

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline(item)

        } else if (nameItemDeadline == "Завтра" && textAreaDeadline.innerHTML != `${nowDay+1} ${nowMonth}`) {
            textAreaDeadline.innerHTML = `${nowDay+1} ${nowMonth}`
            
            nowData2.setDate(nowDay+1)
            textAreaDeadlineHiddenNum.innerHTML = nowData2.toLocaleDateString()

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline(item)

        } else if (nameItemDeadline == "На выходных") {
            let dataWeekend = new Date()    // Создаю новый объект даты
            // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
            if (Intl.DateTimeFormat(localLanguage, options3).format(dataWeekend) != "суббота") {
                dataWeekend.setDate(dataWeekend.getDate() + 1)
            }
            // Увеличиваю дату пока не достигну субботы
            while (Intl.DateTimeFormat(localLanguage, options3).format(dataWeekend) != "суббота") {
                dataWeekend.setDate(dataWeekend.getDate() + 1)
            }


            // Если ближайшая суббота уже не была выбрана, то...
            if (textAreaDeadline.innerHTML != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend)}`) {
                textAreaDeadline.innerHTML = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend)}`

                textAreaDeadlineHiddenNum.innerHTML = dataWeekend.toLocaleDateString()

                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
            }

        } else if (nameItemDeadline == "След. неделя") {
            let dataNextWeek = new Date()   // Создаю новый объект даты
            dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)

            if (textAreaDeadline.innerHTML != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`) {
                textAreaDeadline.innerHTML = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`

                textAreaDeadlineHiddenNum.innerHTML = dataNextWeek.toLocaleDateString()

                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
            }

        } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerHTML != "Срок выполнения") {
            isObservHiddenMenus = false


            textAreaDeadline.innerHTML = "Срок выполнения"
            textAreaDeadlineHiddenNum.innerHTML = "Срок выполнения"

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline(item)

            selectDeadline.querySelector(".form-from-add-new-task__icon-cross").classList.add("hide2")
        } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerHTML == "Срок выполнения") {
            isObservHiddenMenus == false
        }
    })
})



// 2) Выбор срока выполнения таска (при выборе в календаре):
let selectedDay

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
    isObservHiddenMenus = true
    observFunc(selectDeadline)
    if (deadlineThisTask.innerHTML != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
        deadlineThisTask.innerHTML = dateDay + " " + selectMonthDataCalendare
    }
    deadlineThisTaskFullNum.innerHTML = selectDataCalendare.toLocaleDateString()


    let liFromArr   // Таск из массива
    // Перебираю массив тасков и сохраняю в "liFromArr"  тот таск, id которого совпадает с id выбранного для редактирования таска (li)
    for (let i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].newTask_ID == targetLi.getAttribute("id")) {
            liFromArr = all_tasks[i]   
            break
        }
    }

     // Обновляю срок выполнения в массиве текущего таска
     liFromArr.newTask_deadlineTask = deadlineThisTask.innerHTML
     liFromArr.newTask_deadlineFullDataTask = deadlineThisTaskFullNum.innerHTML

     reloadAllTasks(all_tasks)
})



// 2.2) Если меню выбора открыто создании/редактировании таска, то...
// (При клике на день в календаре, при выборе из "form-from-add-new-task__hidden-menu-deadline") 
DeadlineCalendare.addEventListener("click", function(e) {
    if (isModal != "false") return    // Если МО открыто, то игнор

    let target = e.target       // Где был совершён клик?


    // Если клик был не на элементе с ячейкой даты, то клик игнорируется
    if (!target.classList.contains("air-datepicker-cell")) return       


    // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
    const deadlineHiddenList = target.closest(".form-from-add-new-task__hidden-menu-deadline").querySelector(".form-from-add-new-task__deadline-list")

    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
    reloadItemsDeadline(deadlineHiddenList)


    // Поле для вставки и отображения выбранной даты у таска (с текстовым отображением месяца)
    const textAreaDeadline = selectDeadline.querySelector(".form-from-add-new-task__text-settings")

    // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
    const textAreaDeadlineHiddenNum = selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num")


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
    isObservHiddenMenus = true
    observFunc(selectDeadline)
    if (textAreaDeadline.innerHTML != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
        textAreaDeadline.innerHTML = dateDay + " " + selectMonthDataCalendare
    }
    textAreaDeadlineHiddenNum.innerHTML = selectDataCalendare.toLocaleDateString()
})






// Появление и скрытие поля с выбором срока выполнения задачи в меню создания/редактирования задачи и при открытии его через "Назначить срок" (когда МО закрыто)
timeVar = ''

// 1) При нажатии на кнопку в форме для создания/редактирования таска
selectDeadline.addEventListener("click", function(e) {      
    if (isModal != "false") return    // Если МО открыто, то игнор


    const btnCross = selectDeadline.querySelector(".form-from-add-new-task__icon-cross")


    // Если доп меню показано (не скрыто) и клик был на крестик и крестик показан (не скрыт)
    if (hiddenMenuDeadline.classList.contains("hide2") == false && e.target == btnCross.querySelector("img") && btnCross.classList.contains("hide2") == false) {
        btnCross.classList.add("hide2")  // ещё раз прописываю скрытие, ибо событие клика по крестику (отдельное) не скроет его (но изменит содержание тега с текстом)
    } 
    // Иначе, если доп меню показано (не скрыто) (и клик был не на крестик, соответственно)
    else if (hiddenMenuDeadline.classList.contains("hide2") == false) {
        // Скрываю само меню и удаляю календарь в нём
        hiddenMenuDeadline.classList.add("hide2") 
        MyCalendarForm.destroy()    
        MyCalendarForm = null


        isObservHiddenMenus = false
        observFunc(selectDeadline)

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline() 
    } 
    // Иначе, если доп меню скрыто и клик был на крестик:
    else if (hiddenMenuDeadline.classList.contains("hide2") == true && e.target == btnCross.querySelector("img")) {
        btnCross.classList.add("hide2")
    }
    // Иначе, если доп меню скрыто (и клик был, соответственно, не на крестик)
    else if (hiddenMenuDeadline.classList.contains("hide2") == true)
    {
        // Скрываю скрытые меню выбора типа таска и приоритета, если они были открыты
        conteinerFromHiddenMenuTypesTasks.classList.add("hide2")
        hiddenMenuPriority.classList.add("hide2")

        hiddenMenuDeadline.classList.remove("hide2")    // Показываю скрытое меню срока выполнения


        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num")

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

        timeVar = 1;  
        

        isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(selectDeadline)  // При первом открытии скрытого меню, начнётся отслеживание изменения окна "selectDeadline"


        // Блокирую возможность открытия м.о.
        switchIsModal_block("true")  

        // Запрещается показ доп. функций тасков
        switchDisabledShowDopFuncTask("true")
    }
})

// 2.1) При нажатии на само поля выбора (при создании/редактировании и с учётом наличия ранее нажатой  доп ф. "назначить срок")
hiddenMenuDeadline.addEventListener("click", function(e) {  
    if (isModal != "false") return    // Если МО открыто, то игнор

    
    timeVar = 1;  
    timeVar2 = 1        // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)

    // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    // Этот код работает только если ранее на каком-то таске было открыто скрытое меню через "назначить срок", а сейчас клик происходит по открытому аналогичному меню, но вызванному у таска при его создании/редактировании
    if ((currentLi_klick != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
        const curHiddenMenuDeadlineNewDeadline = currentLi_klick.querySelector(".task__dopFunction__hidden-menu-deadline")


        // Скрываю само меню и удаляю календарь в нём
        curHiddenMenuDeadlineNewDeadline.classList.add("hide2")   
        MyCalendar.destroy()    
        MyCalendar = null

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        timeVar2 = ''


        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi_klick.querySelector(".task__dopFuncs"))


        // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
        currentLi_klick = null 
        currentLi = null


        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")   

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    } 
    // Если ранее ни на каком из тасков не была нажата кнопка "NewDeadline" (иконка)
    else if ((currentLi_klick == null)) {
        timeVar2 = ""
    }

    if (isObservHiddenMenus == false) {
        isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(selectDeadline)   // Начинается слежка за "selectDeadline", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
})

// 2.2) При нажатии на само поле выбора (при создании/редактировании задачи и нажатии доп ф. "назначить срок")
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    if (isModal != "false") return    // Если МО открыто, то игнор

    const target_container_task = e.target.closest(".task__dopFunction__hidden-menu-deadline")   // Область скрытого меню выбора срока при нажатии на "Назначить срок"
    const target_container_formTask = e.target.closest(".form-from-add-new-task__hidden-menu-deadline")  // Область скрытого меню выбора срока при создании/редактировании задачи


    // Если клик был не по меню выбора срока выполнения в функции "назначить срок" и не по аналогичному меню при создании/редактировании задачи, то игнор
    if (!target_container_task && !target_container_formTask) return

    timeVar = 1;  
    timeVar2 = 1        // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)


    // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    // Этот код работает если клик был по меню выбора срока выполнения после нажатия на "Назначить срок" (только в этом случае нужно скрывать сразу меню выбора, ведь при создании/редактировании после выбора скрывать меню не нужно)
    if ((currentLi_klick != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        console.log("Хули еп");
        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
        const curHiddenMenuDeadlineNewDeadline = currentLi_klick.querySelector(".task__dopFunction__hidden-menu-deadline")


        // Скрываю само меню и удаляю календарь в нём
        curHiddenMenuDeadlineNewDeadline.classList.add("hide2")   
        MyCalendar.destroy()    
        MyCalendar = null

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        timeVar2 = ''


        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi_klick.querySelector(".task__dopFuncs"))


        // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
        currentLi_klick = null 
        currentLi = null


        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")   

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    } 
    // Если ранее ни на каком из тасков не была нажата кнопка "NewDeadline" (иконка)
    // Если скрытое меню выбора было открыто при создании/редактировании задачи
    else if ((currentLi_klick == null)) {
        timeVar2 = ""
    }

    if (isObservHiddenMenus == false) {
        isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(selectDeadline)   // Начинается слежка за "selectDeadline", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
})


// 3) При нажатии вне поля выбора (при открытии меню срока выполнения у таска при его редактировании/создании или при "Назначить срок" таска)
body.addEventListener("click", function(e) {     
    if (isModal == "true")  return  // Если МО открыто, то игнор

    // Если доп. меню срока выполнения (и у меню редактирования/создания задачи; и у доп. функции "назначить срок") - скрыто, то игнорируем
    if ((hiddenMenuDeadline.classList.contains("hide2") == true) && (!currentLi_klick)) return

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
    if (!timeVar && targetLi == null && currentLi_klick == null) {     // Если клик был вне поля и не на кнопку ".task__btnNewDeadline" (на иконку) и ранее не был отмечен текущий таск по клику
        isObservHiddenMenus = false
        observFunc(selectPriority)


        // Скрываю само меню и удаляю календарь в нём
        hiddenMenuDeadline.classList.add("hide2") 
        MyCalendarForm.destroy()    
        MyCalendarForm = null


        switchIsModal_block("false")       // Снимаю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline()

    } 
    
    // Если клик был вне поля выбора и вне элемента таска (li), и при этом уже был отмечен текущий таск по клику (ранее уже нажалась кнопка ".task__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
    else if (!timeVar && targetLi == null && currentLi_klick != null) {
        curHiddenMenuDeadlineNewDeadline.classList.add("hide2")
        MyCalendar.destroy()
        MyCalendar = null
        
        
        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        timeVar2 = ''

        // Скрываю доп функции таска
        hide_task_dopFuncs(currentLi_klick.querySelector(".task__dopFuncs"))

        currentLi_klick = null              // Удаляю отметку о текущем таске с отслеживателя по клику

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        switchIsModal_block("false")       // Снимаю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline()
    } 


    // Если клик был вне поля выбора, на элемент таска (li), но не на кнопку ".task__btnNewDeadline" и при этом ранее не был отмечен таск (ранее не нажималась кнопка ".task__btnNewDeadline", при нажатии на которую отображается меню выбора срока выполнения) 
    if (!timeVar && targetLi != null && !targetBtn && currentLi_klick == null) {
        // Скрываю само меню и удаляю календарь в нём
        hiddenMenuDeadline.classList.add("hide2") 
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
    else if (!timeVar && targetLi != null && !targetBtn && currentLi_klick != null) {
        // Скрываю само меню и удаляю календарь в нём
        curHiddenMenuDeadlineNewDeadline.classList.add("hide2")
        MyCalendar.destroy()
        MyCalendar = null

        // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        timeVar2 = ''

        // Скрываю доп функции у текущего таска
        hide_task_dopFuncs(currentLi_klick.querySelector(".task__dopFuncs"))

        currentLi_klick = null              // Удаляю отметку о текущем таске с отслеживателя по клику

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        switchIsModal_block("true")        // Ставлю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Показываю доп. функции у того таска, на который был совершён клик (который был под курсором в момент клика)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Очищаю выделение срока в списке вариантов и в календаре
        reloadItemsAndCalendarDeadline() 
    }

    
    if (timeVar) { 
        setTimeout(() => timeVar='', 100)
    }  
})







// Появление и скрытие поле с выбором приоритета задачи в меню создания/редактирования новой задачи
timeVar = ''
selectPriority.addEventListener("click", function(e) {      // При нажатии на кнопку
    // Очищаю выделение срока выполнения в списке вариантов и в календаре
    reloadItemsAndCalendarDeadline()

    const btnCross = selectPriority.querySelector(".form-from-add-new-task__icon-cross")

    // Если доп меню показано (не скрыто) и клик был на крестик и крестик показан (не скрыт)
    if (hiddenMenuPriority.classList.contains("hide2") == false && e.target == btnCross.querySelector("img") && btnCross.classList.contains("hide2") == false) {
        btnCross.classList.add("hide2")  // ещё раз прописываю скрытие, ибо событие клика по крестику (отдельное) не скроет его (но изменит содержание тега с текстом)
    } 
    // Иначе, если доп меню показано (не скрыто) (и клик был не на крестик, соответственно, а лишь на кнопку выбора приоритета)
    else if (hiddenMenuPriority.classList.contains("hide2") == false) {
        hiddenMenuPriority.classList.add("hide2") 
        isObservHiddenMenus = false
        observFunc(selectPriority)

        // Убираю блокировку для открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
    // Иначе, если доп меню скрыто и клик был на крестик:
    else if (hiddenMenuPriority.classList.contains("hide2") == true && e.target == btnCross.querySelector("img")) {
        btnCross.classList.add("hide2")
    }
    // Иначе, если доп меню скрыто (и клик был, соответственно, не на крестик)
    else if (hiddenMenuPriority.classList.contains("hide2") == true) {
        // Скрываю скрытые меню выбора типа таска и срока выполнения, если они были открыты
        conteinerFromHiddenMenuTypesTasks.classList.add("hide2")
        hiddenMenuDeadline.classList.add("hide2")


        hiddenMenuPriority.classList.remove("hide2")    // Отображаю скрытое меню выбора приоритета
        timeVar = 1;  

        isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(selectPriority)  // При первом открытии скрытого меню, начнётся отслеживание изменения окна "selectPriority"

        // Переменная с названием приоритета, которое было выбрано (и уже прописано. Например, "p1")
        const selectedPriorityName = selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML
        // Переменная с тем элементом приоритета из списка в скрытом меню, которое соответствует ранее выбранному приоритету
        const selectedPriority = hiddenMenuPriority.querySelector(`[aria-label="${selectedPriorityName}"]`).parentElement
// /

        selectedPriority.classList.add("hovered_select_menu")    // Добавляю стиль выбранного элемента
        selectedPriority.querySelector(".form-from-add-new-task__priority-icon-selected").classList.remove("hide2")  // Показываю галочку у выбранного элемента



        // Блокирую возможность открытия м.о.
        switchIsModal_block("true")  

        // Запрещается показ доп. функций тасков
        switchDisabledShowDopFuncTask("true")
    }
})

hiddenMenuPriority.addEventListener("click", function(e) {     // При нажатии на само поля выбора
    timeVar = 1;
    
    if (isObservHiddenMenus == false && selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML == "Приоритет") {
        isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(selectPriority)   // Начинается слежка за "selectPriority", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
})

// При нажатии вне поля выбора - скрывается
body.addEventListener("click", function(e) {      

    // Если доп. меню приоритета - скрыто, то игнорируем
    if (hiddenMenuPriority.classList.contains("hide2") == true) return


    // Если М.О. открыто, то:
    if (!isModal == "false") {   
        // return
        const targetLi_modal = e.target.closest(".subtask")    // Элемент  li для последующего определения нового срока выполнения подзадаче (одна из двух кнопок доп функций подзадачи)       

        // Если клик был вне поля выбора и вне элемента подзадачи (li)
        if (!timeVar && targetLi_modal == null) {
            isObservHiddenMenus = false
            observFunc(selectPriority)
            // Скрываю меню выбора приоритета
            hiddenMenuPriority.classList.add("hide2")
            
            // Снимаю блокировку с открытия м.о.
            switchIsModal_block("false")  
    
            // Разрешаю показ доп. функций задач/подзадач
            switchDisabledShowDopFuncTask("false")
        }
        // Иначе, если клик был вне поля выбора и на элемент подзадачи (li)
        if (!timeVar && targetLi_modal != null) {
            isObservHiddenMenus = false
            observFunc(selectPriority)
            // Скрываю меню выбора приоритета
            hiddenMenuPriority.classList.add("hide2") 


            // Снимаю блокировку с открытия м.о.
            switchIsModal_block("false")  

            // Разрешаю показ доп. функций задач/подзадач
            switchDisabledShowDopFuncTask("false")
    
            
            // Показываю доп. функции у той подзадачи, на которую был совершён клик (которая была под курсором в момент клика)
            targetLi_modal.querySelector(".subtask__dopFuncs").querySelector(".subtask__btnEdit").classList.remove("hide1")
            targetLi_modal.querySelector(".subtask__dopFuncs").querySelector(".subtask__btnNewDeadline").classList.remove("hide1")
        }
    
        if (timeVar) { 
            setTimeout(() => timeVar='', 100)
        }  


        // Игнорируем дальнейший код, который должен работать лишь если модальное окно закрыто.
        return
    }


    // Если МО закрыто, то выполняется следующий код:

    const targetLi = e.target.closest(".task")     // Элемент  li для последующего определения нового срока выполнения таску (одна из двух кнопок доп функций таска)


    // Если клик был вне поля выбора и вне элемента таска (li)
    if (!timeVar && targetLi == null) {
        isObservHiddenMenus = false
        observFunc(selectPriority)
        hiddenMenuPriority.classList.add("hide2") 

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
    // Иначе, если клик был вне поля выбора и на элемент таска (li)
    if (!timeVar && targetLi != null) {
        isObservHiddenMenus = false
        observFunc(selectPriority)
        hiddenMenuPriority.classList.add("hide2") 

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")

        // Показываю доп. функции у того таска, на который был совершён клик (который был под курсором в момент клика)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))
    }

    if (timeVar) { 
        setTimeout(() => timeVar='', 100)
    }  
})


// Выбор приоритета таска:

function reloadItemsPriority(currentItemPriority) {
    priorityItem.forEach(function(itemPriority) { 
        itemPriority.classList.remove("hovered_select_menu")    // Удаляю стиль выбранного элемента у ранее выбранного элемента
        itemPriority.querySelector(".form-from-add-new-task__priority-icon-selected").classList.add("hide2")    // Удаляю галочки у ранее выбранного элемента (если такой был)
    })
    currentItemPriority.classList.add("hovered_select_menu")    // Добавляю стиль выбранного элемента
    currentItemPriority.querySelector(".form-from-add-new-task__priority-icon-selected").classList.remove("hide2")  // Показываю галочку у выбранного элемента
}

priorityItem.forEach(function(item) {
    item.addEventListener("click", function(e) {
        const selectedIcon = item.querySelector(".form-from-add-new-task__priority-icon")   // Создаю переменную - иконка выбранного приоритета

        if (item.querySelector(".form-from-add-new-task__priority-name").getAttribute("aria-label") == "Приоритет") {
            isObservHiddenMenus = false
            selectPriority.querySelector(".form-from-add-new-task__icon-cross").classList.add("hide2")
        }

        // Подставляю в поле выбранного приоритета - иконку и "aria-label" выбранного приоритета, если выбираемый приоритет не является уже выбранным
        if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") != selectedIcon.getAttribute("src")) {
            selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", selectedIcon.getAttribute("src"))
            selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML = item.querySelector(".form-from-add-new-task__priority-name").getAttribute("aria-label")
    
            //Очищаю стиль "выбранного элемента" со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). А так же скрываю галочку справа (показывающую какой элемент пользователь выбрал) с элемента, у которого он показывался ранее (если был) и показываю на выбранном элементе
            reloadItemsPriority(item)
        }

        // Разрешаю показ доп функций и скрываю меню выбора приоритета 
        switchDisabledShowDopFuncTask("false")
        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  
        hiddenMenuPriority.classList.add("hide2")
    })
})









// При нажатии на кнопку добавления нового таска в меню создания
buttonAddNewTask.addEventListener("click", function(e) {
    console.log(isModal);
    if (buttonAddNewTask.getAttribute("aria-disabled") == "false" && isModal == "false") {
        console.log(isModal);
        console.log(window.localStorage.getItem("isModal"));
        let colorPriority
        if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_red.png") {
            colorPriority = "red"
        } else if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_orange.png") {
            colorPriority = "orange"
        } else if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_blue.png") {
            colorPriority = "blue"
        } else {colorPriority = "ser"}


        const selectedData = new Date()

        tasksId += 1    // Увеличение подсчёта id для создания нового таска. То-есть новый таск будет с повышенным на +1 id
        const contentNewTask = {    // Создаю объект из введённых данных
            newTask_name: nameNewTask.value, 
            newTask_description: description.value, 
            newTask_typeTask_name: selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML,
            newTask_typeTask_icon_src: selectTypeTask.querySelector(".form-from-add-new-task__icon_type").getAttribute("src"),
            newTask_deadlineTask: selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML,
            newTask_deadlineFullDataTask: selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML,
            newTask_priority_name: selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML,
            newTask_priority_color: colorPriority,
            newTask_ID: tasksId,
            newTask_countSubtask: 0,
            newTask_Subtasks_arr: []
        }

        const nowWeekday = (Intl.DateTimeFormat(localLanguage, options3).format(nowData))
        const correctWeekday = (String(nowWeekday.split("").splice(0, 1)).toLocaleUpperCase()) + (nowWeekday.split("").splice(1, 10).join(""))

        funcAddNewTask(contentNewTask)      // Запускаю функцию для добавления нового html элемента с новым таском
        addNewTaskMass(contentNewTask)     // Добавляю созданый объект в массив из списка всех тасков
        countAllTasks.innerHTML = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask() 

        
        // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
        const deadlineHiddenList = e.target.closest(".form-from-add-new-task").querySelector(".form-from-add-new-task__deadline-list")

        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadline(deadlineHiddenList)

        
        sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })
        formFromAddNewTask.classList.add("hide2")


        // Если модальное окно для создания новой задачи открыто (которое открывается при клике на кнопку в aside главной страницы)
        const modalNewTaskElem = document.querySelector('.modalAddNewTask');
        if (modalNewTaskElem.classList.contains('active')) {
            // Функция для закрытия модального окна для создания новой задачи (которое открывается при клике на кнопку в aside главной страницы)
            closeModalNewTask()
        }
        

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")  
        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
})

function funcAddNewTask(content) {
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
    allСurrentTasksOuter.insertAdjacentHTML("afterbegin", html)     // Добавляю новый html элемент таска в начало

    sortAllTasksUP()
}

function reloadFormAddTask() {
    nameNewTask.value = ""  
    description.value = ""
    buttonAddNewTask.setAttribute('aria-disabled', 'true')
    isObservHiddenMenus = false
    selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML = "Срок выполнения"
    selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML = "Срок выполнения"
    selectDeadline.querySelector(".form-from-add-new-task__icon-cross").classList.add("hide2")
    // Очищаю выделение выбранного срока выполнения из списка
    deadlineItem.forEach(function(itemDeadline) { 
        itemDeadline.classList.remove("hovered_select_menu")
    })  
    // Очищаю выделение выбранного срока выполнения из календаря
    if (selectedDay && selectedDay != "") {
        selectedDay.classList.remove("-selected-")
    }
    // Записываю сегодняшнее число в окно выбора срока выполнения для новой создаваемой задачи
    selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML = `${nowDay} ${nowMonth}`
    selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML = nowData.toLocaleDateString()
    // Убираю скрытие с крестика в поле выбора срока выполнения
    selectDeadline.querySelector(".form-from-add-new-task__icon-cross").classList.remove("hide2")

    
    selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML = "Приоритет"
    selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", "./icon/priority_ser.png")
    selectPriority.querySelector(".form-from-add-new-task__icon-cross").classList.add("hide2")
    // Очищаю выделение выбранного приоритета
    priorityItem.forEach(function(itemPriority) { 
        itemPriority.classList.remove("hovered_select_menu")    // Удаляю стиль выбранного элемента у ранее выбранного элемента
        itemPriority.querySelector(".form-from-add-new-task__priority-icon-selected").classList.add("hide2")    // Удаляю галочки у ранее выбранного элемента (если такой был)
    })

    selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML = "Дом"  // Имя типа таска
    selectTypeTask.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", "./icon/home.png")  // Иконка типа таска


    // Показываю кнопку для создания таска. И скрываю кнопку для сохранения изменений при редактированини таска
    buttonAddNewTask.classList.remove("hide2")
    buttonSaveTask.classList.add("hide2")

}
export { reloadFormAddTask }


// Скрытие меню добавления нового таска (/изменения выбранного) при нажатии на кнопку "Отмена" 
buttonCloseMenuNewTask.addEventListener("click", function(e) {
    if (isModal == "false") {
        formFromAddNewTask.classList.add("hide2")   // Скрывается Блок "formFromAddNewTask"
        sectionContentBlock_viewContent.append(formFromAddNewTask)  // Блок "formFromAddNewTask" перемещается в конец

        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
        sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()


        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")


        
        // Если модальное окно для создания новой задачи открыто (которое открывается при клике на кнопку в aside главной страницы)
        const modalNewTaskElem = document.querySelector('.modalAddNewTask');
        if (modalNewTaskElem.classList.contains('active')) {
            // Функция для закрытия модального окна для создания новой задачи (которое открывается при клике на кнопку в aside главной страницы)
            closeModalNewTask()
        }



        if (!currentLi) return  // Если кнопка отмены была нажата вне поля редактирования таска, то игнорировать

        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Удаляю отметку о текущем таске с отслеживания при наведении
        currentLi = null
    }
})


// Скрытие меню добавления нового таска (/изменения выбранного) при нажатии "Enter", при фокусировке на этом поле
formFromAddNewTask.addEventListener("keydown", function(e) {
    if (e.key == "Enter" && nameNewTask.value != "" && isModal == "false") {
        formFromAddNewTask.classList.add("hide2")   // Скрывается Блок "formFromAddNewTask"
        sectionContentBlock_viewContent.append(formFromAddNewTask)  // Блок "formFromAddNewTask" перемещается в конец
        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
        sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Снимаю блокировку с открытия м.о.
        switchIsModal_block("false")

        // Разрешаю показ доп. функций тасков
        switchDisabledShowDopFuncTask("false")
    }
})










































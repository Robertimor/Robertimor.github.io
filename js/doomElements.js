'use strict';
const countAllTasks = document.querySelector(".header-block__countNum-tasks-all-tasks")      // Поле с количеством заданий (всего, кроме просроченных)
const sectionContentBlock_viewContent = document.querySelector(".section-content-block__view-content")  // Основная область. С текущей датой, со списком тасков, с меню добавления новой задачи
const nameToday = sectionContentBlock_viewContent.querySelector(".tasks__name-today")          // Поле для отображения текущей даты


const buttonSortAllTaskUP = sectionContentBlock_viewContent.querySelector(".tasks__sort-up")      // Кнопка для сортировки тасков (кроме просроченных) по возрастанию
const buttonSortAllTaskDOWN = sectionContentBlock_viewContent.querySelector(".tasks__sort-down")      // Кнопка для сортировки тасков (кроме просроченных) по убыванию

const buttonSortOverdueTaskUP = sectionContentBlock_viewContent.querySelector(".overdue__sort-up")      // Кнопка для сортировки просроченных тасков по возрастанию
const buttonSortOverdueTaskDOWN = sectionContentBlock_viewContent.querySelector(".overdue__sort-down")      // Кнопка для сортировки просроченных тасков по убыванию




const allOverdueTasks = sectionContentBlock_viewContent.querySelector(".overdue__tasks-list")  // Область со всеми ПРОСРОЧЕННЫМИ тасками

const butHideOverdue = sectionContentBlock_viewContent.querySelector(".overdue__btn")   // Кнопка для скрытия просроченных задач
const iconHideOverdue = sectionContentBlock_viewContent.querySelector(".overdue__btn-icon")   // Иконка кнопки для скрытия просроченных задач



const allCurrentTasksOuter = sectionContentBlock_viewContent.querySelector(".tasks__tasks-list")        // Область со всеми актуальными созданными тасками (кроме просроченных)





const taskForm = document.querySelector(".form-from-add-new-task")    // Поле добавления нового таска
const taskTextAreas = taskForm.querySelectorAll(".form-from-add-new-task__textarea-from-add-new-task")     //  Текстовые поля (имя и описание) для написания нового добавляемого таска 
const taskNameInput = taskForm.querySelector(".form-from-add-new-task__name-new-task")   // Поле для написания имени нового добавляемого таска
const taskDescriptionInput = taskForm.querySelector(".form-from-add-new-task__description")   // Поле для написания описания нового добавляемого таска



const taskSettingsButtons = taskForm.querySelectorAll(".form-from-add-new-task__bnt-settings")   // Поле выбора срока выполнения и приоритета для нового таска

const deadlineButton = taskForm.querySelector(".form-from-add-new-task__select-deadline")       // Поле (кнопка) для выбора срока выполнения нового таска

const deadlineMenu = taskForm.querySelector(".form-from-add-new-task__hidden-menu-deadline")   // Скрытое поле с выбором срока выполнения таска при создании/редактировании задачи/подзадачи
const deadlineOptions = taskForm.querySelectorAll(".form-from-add-new-task__deadline-item")        // Элементы li с вариантами срока выполнения
const deadlineCalendar = deadlineMenu.querySelector(".form-from-add-new-task__hidden-menu-deadline-calendare")    // Календарь в скрытом меню для выбора срока выполнения


const priorityButton = taskForm.querySelector(".form-from-add-new-task__select-priority")   // Поле (кнопка) для выбора приоритета у нового таска
const priorityMenu = taskForm.querySelector(".form-from-add-new-task__hidden-menu-priority")   // Скрытое поле с выбором приоритета таска
const priorityOptions = taskForm.querySelectorAll(".form-from-add-new-task__priority-item")        // Элементы li с вариантами приоритета



const taskTypeMenu = taskForm.querySelector(".form-from-add-new-task__hidden-menu-types-task")     // Скрытое поле с выбором типа таска
const taskTypeOptions = taskForm.querySelectorAll(".form-from-add-new-task__hidden-menu-types-task .my-type-projects__conteiner_from-hidden-menu .my-type-projects__type-project")     // Элементы li с типом таска

const taskTypeButton = taskForm.querySelector(".form-from-add-new-task__select-type-task")   // Поле для вставки названия и иконки выбранного типа таска
const buttonCloseMenuNewTask = taskForm.querySelector(".btn-close")
const buttonAddNewTask = taskForm.querySelector(".btn-add")        // Кнопка добавления описанного (выбрано имя и описание) таска
const buttonSaveTask = taskForm.querySelector(".btn-save")


const addNewTask = document.querySelector(".add-new-task")      // Кнопка открытия поля для добавления нового таска
const addTaskIconDefault = addNewTask.querySelector(".add-new-task__img-add-task-1")      // Иконка добавления таска 1 (Без наведения курсора)  
const addTaskIconHover = addNewTask.querySelector(".add-new-task__img-add-task-2")      // Иконка добавления таска 2 (Если навести курсор)





// Создаю текущую дату
const localLanguage = navigator.language
const nowData = new Date() 

const options1 = {
    month: "short"
}
const options2 = {
    weekday: "long"
}


const nowDay = nowData.getDate()    // Сегодняшнее число
const nowMonth = Intl.DateTimeFormat(localLanguage, options1).format(nowData)   // Сегодняшний месяц словами
const nowMonthNum = nowData.getMonth()
const nowYear = nowData.getFullYear()   // Сегодняшний год
const nowWeekday = (Intl.DateTimeFormat(localLanguage, options2).format(nowData))       // Сегодняшний день недели
const correctWeekday = (String(nowWeekday.split("").splice(0, 1)).toLocaleUpperCase()) + (nowWeekday.split("").splice(1, 10).join(""))
const nowTime = nowData.toLocaleTimeString("ru-RU"); 


// Сегодняшняя дата в формате "год.месяц.число". Нужно для установки минимальной даты всем календарям
const currectEntryDate = `${nowYear}.${nowMonthNum + 1}.${nowDay}`



nameToday.innerHTML = `${nowDay} ${nowMonth} ‧ Сегодня ‧ ${correctWeekday}`     // Записываю в html код текущую дату

// Записываю сегодняшнее число в окно выбора срока выполнения для новой создаваемой задачи
deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerHTML = `${nowDay} ${nowMonth}`
deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML = nowData.toLocaleDateString()












export { countAllTasks, sectionContentBlock_viewContent, nameToday, buttonSortAllTaskUP, buttonSortAllTaskDOWN, buttonSortOverdueTaskUP, buttonSortOverdueTaskDOWN, allOverdueTasks, butHideOverdue, iconHideOverdue, allCurrentTasksOuter, taskForm, taskTextAreas, taskNameInput, taskDescriptionInput, taskSettingsButtons, deadlineButton, deadlineMenu, deadlineOptions, deadlineCalendar, priorityButton, priorityMenu, priorityOptions, taskTypeMenu, taskTypeOptions, taskTypeButton, buttonCloseMenuNewTask, buttonAddNewTask, buttonSaveTask, addNewTask, addTaskIconDefault, addTaskIconHover, localLanguage, nowData, options1, options2, nowDay, nowMonth, nowMonthNum, nowYear, nowWeekday, nowTime, correctWeekday, currectEntryDate };
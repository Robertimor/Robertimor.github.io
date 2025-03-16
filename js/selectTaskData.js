'use strict';
// Файл для поведения при выборе данных (тип таска, срок, приоритет) задачи (при создании / редактировании). 

import {countAllTasks, sectionContentBlock_viewContent, allCurrentTasksOuter, taskForm, taskNameInput, taskDescriptionInput, deadlineButton, deadlineOptions, deadlineCalendar, priorityButton, priorityMenu, priorityOptions, taskTypeMenu, taskTypeOptions, taskTypeButton} from "./domElements.js"
import {localLanguage, optionsWithMonth, optionsWithWeekday, nowDay, nowMonth} from "./dateElements.js"
import {hiddenByDisplay} from "./base.js"
import {switchDisabledShowDopFuncTask, setCurrentLi, getCurrentLi, setCurrentLi_klick, setIsNewDeadlineButtonClicked, getIsNewDeadlineButtonClicked, setIsObservHiddenMenus, hide_task_dopFuncs, observFunc, show_task_dopFuncs} from "./toggleVisibleElements.js"
import {reloadAllTasks, switchIsModal_block, reloadItemsDeadline, setSelectedDay, getSelectedDay} from "./scripts.js"
import {sortTasks, raspredTasks, setTasksId, getTasksId, getIndexCurTask} from "./dataProcessing.js"




// Выбор типа таска в меню выбора при создании новой задачи
taskTypeOptions.forEach(function(type) {
    type.addEventListener("click", function() {
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
            let selectedDay = getSelectedDay()

            // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
            if (selectedDay && selectedDay != "") {
                selectedDay.classList.remove("-selected-")
            }
    
            let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))
    
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

                deadlineThisTaskFullNum.innerHTML = nowData2.toLocaleDateString()


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "Завтра" && deadlineThisTask.innerText != `${nowDay+1} ${nowMonth}`) {
                deadlineThisTask.innerText = `${nowDay+1} ${nowMonth}`

                nowData2.setDate(nowDay+1)
                deadlineThisTaskFullNum.innerHTML = nowData2.toLocaleDateString()


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "На выходных") {
                let dataWeekend = new Date()    // Создаю новый объект даты

                // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
                if (Intl.DateTimeFormat(localLanguage, optionsWithWeekday).format(dataWeekend) != "суббота") {
                    dataWeekend.setDate(dataWeekend.getDate() + 1)
                }
                // Увеличиваю дату пока не достигну субботы
                while (Intl.DateTimeFormat(localLanguage, optionsWithWeekday).format(dataWeekend) != "суббота") {
                    dataWeekend.setDate(dataWeekend.getDate() + 1)
                }
    
                // Если ближайшая суббота уже не была выбрана, то...
                if (deadlineThisTask.innerText != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(dataWeekend)}`) {
                    deadlineThisTask.innerText = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(dataWeekend)}`

                    deadlineThisTaskFullNum.innerHTML = dataWeekend.toLocaleDateString()
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadline(item)
                }
    
            } else if (nameItemDeadline == "След. неделя") {
                let dataNextWeek = new Date()   // Создаю новый объект даты
                dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)
    
                if (deadlineThisTask.innerText != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(dataNextWeek)}`) {
                    deadlineThisTask.innerText = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(dataNextWeek)}`

                    deadlineThisTaskFullNum.innerHTML = dataNextWeek.toLocaleDateString()
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadline(item)
                }
    
            } else if (nameItemDeadline == "Без срока" && deadlineThisTask.innerText != "Срок выполнения") {
                setIsObservHiddenMenus(false)
    
                deadlineThisTask.innerText = "Срок выполнения"
                deadlineThisTaskFullNum.innerHTML = "Срок выполнения"


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
    
            } else if (nameItemDeadline == "Без срока" && deadlineThisTask.innerText == "Срок выполнения") {
                setIsObservHiddenMenus(false)
            }


            // Создаём полную дату + с текущим временем (нужно для дальнейшей сортировки)
            let fullDateTask = deadlineThisTaskFullNum.innerHTML
            let nowTimeTask = new Date().toLocaleTimeString("ru-RU");

            let [year, month, day] = fullDateTask.split(".").reverse().map(Number)
            let [hours, minutes, seconds] = nowTimeTask.split(":").map(Number);

            // Создаём объект Date (месяцы в JS начинаются с 0, поэтому вычитаем 1)
            let fullDateCreated = new Date(year, month - 1, day, hours + 3, minutes, seconds);


            // Обновляю срок выполнения в массиве текущего таска
            liFromArr.newTask_deadlineTask = deadlineThisTask.innerText
            liFromArr.newTask_deadlineFullDataTask = deadlineThisTaskFullNum.innerHTML
            liFromArr.newTask_dateCreated = fullDateCreated

            // Обновляю текущий таск из массива с тасками (локально в массиве текущего файла)
            all_tasks[getIndexCurTask(all_tasks, targetLi.getAttribute("id"))] = liFromArr

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
            // raspredTasks()

            
        }, { once: true })
    })
}   




// 1.2) Если меню выбора срока было открыто при создании/редактировании таска (т.е. не через доп. функцию "Назначить срок"), то ...
// (При клике на один из пунктов выбора срока выполнения задачи (из списка вариантов), при выборе из "form-from-add-new-task__hidden-menu-deadline") 
deadlineOptions.forEach(function(item) {
    item.addEventListener("click", function() {
        let isModal = window.localStorage.getItem("isModal")
        if (isModal != "false") return    // Если МО открыто, то игнор

        let selectedDay = getSelectedDay()

        // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
        if (selectedDay && selectedDay != "") {
            selectedDay.classList.remove("-selected-")
        }

        const nowData2 = new Date()

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
            if (Intl.DateTimeFormat(localLanguage, optionsWithWeekday).format(dataWeekend) != "суббота") {
                dataWeekend.setDate(dataWeekend.getDate() + 1)
            }
            // Увеличиваю дату пока не достигну субботы
            while (Intl.DateTimeFormat(localLanguage, optionsWithWeekday).format(dataWeekend) != "суббота") {
                dataWeekend.setDate(dataWeekend.getDate() + 1)
            }


            // Если ближайшая суббота уже не была выбрана, то...
            if (textAreaDeadline.innerText != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(dataWeekend)}`) {
                textAreaDeadline.innerText = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(dataWeekend)}`

                textAreaDeadlineHiddenNum.innerText = dataWeekend.toLocaleDateString()

                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
            }

        } else if (nameItemDeadline == "След. неделя") {
            let dataNextWeek = new Date()   // Создаю новый объект даты
            dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)

            if (textAreaDeadline.innerText != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(dataNextWeek)}`) {
                textAreaDeadline.innerText = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(dataNextWeek)}`

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

// 2.1) Если меню выбора открыто через "Назначить срок", то...
// (При клике на день в календаре, при выборе из "task__dopFunction__hidden-menu-deadline") 
sectionContentBlock_viewContent.addEventListener("click", function(e) {
    let isModal = window.localStorage.getItem("isModal")
    if (isModal != "false") return    // Если МО открыто, то игнор

    let target = e.target       // Где был совершён клик?

    const targetBtn = e.target.closest(".task__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 


    // Если клик был вне контейнера с кнопкой "NewDeadline" у ТАСКА, то игнорируем
    if (!targetBtn) return

    // Если клик был не на элементе с ячейкой даты, то клик игнорируется

    if (!target.classList.contains("air-datepicker-cell")) return  
    
    const targetLi = e.target.closest(".task")  // Задача, внутри которой была нажата кнопка "Назначить срок"

    let selectedDay = getSelectedDay()

    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))


    // Целиком список сроков из списка вариантов (ul) (при открытии из "Назначить срок") 
    const deadlineItemNewDeadline = targetLi.querySelector(".task__dopFunction__deadline-list")  

    // Очищаю выделение срока со всех элементов из списка выбора вариантов
    reloadItemsDeadline(deadlineItemNewDeadline)


    // Поле с текстом со сроком выполнения данного таска (нужно для доп функции "Назначить срок") (внизу слева у каждого таска)
    const deadlineThisTask = targetLi.querySelector(".task__deadline__date_visible")

    // Поле с полной датой в числовом формате у данного таска 
    const deadlineThisTaskFullNum = targetLi.querySelector(".task__deadline__date_hidden")


    selectedDay = target
    setSelectedDay(target)


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

    deadlineThisTaskFullNum.innerHTML = selectDataCalendare.toLocaleDateString()


    let liFromArr   // Таск из массива
    // Перебираю массив тасков и сохраняю в "liFromArr"  тот таск, id которого совпадает с id выбранного для редактирования таска (li)
    for (let i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].newTask_ID == targetLi.getAttribute("id")) {
            liFromArr = all_tasks[i]   
            break
        }
    }


    // Создаём полную дату + с текущим временем (нужно для дальнейшей сортировки)
    let fullDateTask = deadlineThisTaskFullNum.innerHTML
    let nowTimeTask = new Date().toLocaleTimeString("ru-RU");

    let [year, month, day] = fullDateTask.split(".").reverse().map(Number)
    let [hours, minutes, seconds] = nowTimeTask.split(":").map(Number);

    // Создаём объект Date (месяцы в JS начинаются с 0, поэтому вычитаем 1)
    let fullDateCreated = new Date(year, month - 1, day, hours + 3, minutes, seconds);


    // Обновляю срок выполнения в массиве текущего таска
    liFromArr.newTask_deadlineTask = deadlineThisTask.innerText
    liFromArr.newTask_deadlineFullDataTask = deadlineThisTaskFullNum.innerHTML
    liFromArr.newTask_dateCreated = fullDateCreated

    // Обновляю текущий таск из массива с тасками (локально в массиве текущего файла)
    all_tasks[getIndexCurTask(all_tasks, targetLi.getAttribute("id"))] = liFromArr
    
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



// 2.2) Если меню выбора открыто при создании/редактировании таска, то...
// (При клике на день в календаре, при выборе из "form-from-add-new-task__hidden-menu-deadline") 
deadlineCalendar.addEventListener("click", function(e) {
    let isModal = window.localStorage.getItem("isModal")
    if (isModal != "false") return    // Если МО открыто, то игнор

    let target = e.target       // Где был совершён клик?


    // Если клик был не на элементе с ячейкой даты, то клик игнорируется
    if (!target.classList.contains("air-datepicker-cell")) return      
    
    let selectedDay = getSelectedDay()


    // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
    const deadlineHiddenList = target.closest(".form-from-add-new-task__hidden-menu-deadline").querySelector(".form-from-add-new-task__deadline-list")

    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
    reloadItemsDeadline(deadlineHiddenList)


    // Поле для вставки и отображения выбранной даты у таска (с текстовым отображением месяца)
    const textAreaDeadline = deadlineButton.querySelector(".form-from-add-new-task__text-settings")

    // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
    const textAreaDeadlineHiddenNum = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num")


    selectedDay = target
    setSelectedDay(target)
    

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



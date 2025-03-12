'use strict';
// Данный файл для функций выбора данных подзадачи

import {hiddenByDisplay} from "./base.js"
import {deadlineButton, deadlineOptions, localLanguage, options1, options2, nowDay, nowMonth} from "./doomElements.js"
import {reloadAllTasks} from "./scripts.js"
import {setIsObservHiddenMenus, observFunc} from "./toggleVisibleElements.js"
import {statusIsModal} from "./modal.js"
import {reloadAll_subtasks, getAll_subtasks, setCurrentLi_modal, setTargetLi_subtask, getCurrentTask_arr} from "./MO_dataUpdate.js"



let targetLi                // Текущий таск (мо которого открыто)    


let selectedDay_MO_Subtask

function getVarsMO_selectElementsSubtask(curTask) {
    targetLi = curTask     
}

function getSelectedDay_MO_Subtask() {
    return selectedDay_MO_Subtask
}



//Функция для очистки стиля "выбранного элемента" со всех deadlineOptions, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик. 
// Данная функция используется при редактировании срока у ПОДЗАДАЧ
function reloadItemsDeadlineSubtask(currentItemDeadline) {
    // 1) Если передан целиков список

    // 1.1) Если в данный параметр был передан целиком список из "Назначить срок"
    if (currentItemDeadline.classList.contains("subtask__dopFunction__deadline-list")) {
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
    else if (currentItemDeadline.classList.contains("subtask__dopFunction__deadline-item")) {
        const parentCurDeadlineItems = currentItemDeadline.closest("ul")
        parentCurDeadlineItems.querySelectorAll("li").forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
    } 

    // 2.2) Иначе, если элемент списка срока находится в меню при создании/редактировании задачи
    else if (currentItemDeadline.classList.contains("form-from-add-new-task__deadline-item")) {
        deadlineOptions.forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
        currentItemDeadline.classList.add("hovered_select_menu")
    }
}

    



// ВЫБОР СРОКА ВЫПОЛНЕНИЯ ПОДЗАДАЧИ:

// 1) Выбор срока выполнения подзадачи (при выборе из списка вариантов):

// 1.1) Если меню выбора срока было открыто через доп. функцию подзадачи "Назначить срок", то ...
// При клике на один из пунктов выбора срока выполнения подзадачи (из списка вариантов), при выборе через "Назначить срок"
function clickButtonNewDeadlineSubtask(e) {
    const targetBtn = e.target.closest(".subtask__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 

    // Если клик был вне контейнера с кнопкой "NewDeadline" у ПОДЗАДАЧИ, то игнорируем
    if (!targetBtn) return

    const targetLi_Modal = e.target.closest(".subtask")  // Подзадача, внутри которой была нажата кнопка "Назначить срок"
    const deadlineItemNewDeadline = targetLi_Modal.querySelectorAll(".subtask__dopFunction__deadline-item")  // Все элементы для выбора срока выполнения у данной подзадачи


    // Запускаю функцию для создания одноразового обработчика события на каждом из элементов и сразу его вызова на элементе
    deadlineItemsSubtaskClick(deadlineItemNewDeadline)
}

// Функция для создания обработчика событий на все элементы списка выбора срока выполнения. При нажатии на какой-то из них, сразу происходит работа.
function deadlineItemsSubtaskClick(items) {
    items.forEach(function(item) {
        item.addEventListener("click", function(e) {
            // Все задачи
            let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks")) 


            // Элемент  li для последующего определения нового срока выполнения задаче (через доп. функцию "Назначить срок выполнения")
            const targetLi_modal = e.target.closest(".subtask")


            // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
            if (selectedDay_MO_Subtask && selectedDay_MO_Subtask != "") {
                selectedDay_MO_Subtask.classList.remove("-selected-")
            }
    
    
            const nowData2 = new Date()
    


            // Название выбранного дня (из списка)
            const nameItemDeadline = item.querySelector(".subtask__dopFunction__deadline-name").innerHTML

            // Поле с текстом со сроком выполнения данной подзадачи (нужно для доп функции "Назначить срок") (внизу слева у каждой подзадачи)
            const deadlineThisSubtask = targetLi_modal.querySelector(".subtask__deadline__date_visible")

            // Поле с полной датой в числовом формате у данной подзадачи 
            const deadlineThisSubtaskFullNum = targetLi_modal.querySelector(".subtask__deadline__date_hidden")


            if (nameItemDeadline == "Сегодня" && deadlineThisSubtask.innerHTML != `${nowDay} ${nowMonth}`) {
                deadlineThisSubtask.innerHTML = `${nowDay} ${nowMonth}`

                deadlineThisSubtaskFullNum.innerHTML = nowData2.toLocaleDateString()


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadlineSubtask(item)
    
            } else if (nameItemDeadline == "Завтра" && deadlineThisSubtask.innerHTML != `${nowDay+1} ${nowMonth}`) {
                deadlineThisSubtask.innerHTML = `${nowDay+1} ${nowMonth}`

                nowData2.setDate(nowDay+1)
                deadlineThisSubtaskFullNum.innerHTML = nowData2.toLocaleDateString()


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadlineSubtask(item)
    
            } else if (nameItemDeadline == "На выходных") {
                let dataWeekend = new Date()    // Создаю новый объект даты

                // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
                if (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend) != "суббота") {
                    dataWeekend.setDate(dataWeekend.getDate() + 1)
                }
                // Увеличиваю дату пока не достигну субботы
                while (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend) != "суббота") {
                    dataWeekend.setDate(dataWeekend.getDate() + 1)
                }
    
                // Если ближайшая суббота уже не была выбрана, то...
                if (deadlineThisSubtask.innerHTML != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend)}`) {
                    deadlineThisSubtask.innerHTML = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend)}`

                    deadlineThisSubtaskFullNum.innerHTML = dataWeekend.toLocaleDateString()
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadlineSubtask(item)
                }
    
            } else if (nameItemDeadline == "След. неделя") {
                let dataNextWeek = new Date()   // Создаю новый объект даты
                dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)
    
                if (deadlineThisSubtask.innerHTML != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek)}`) {
                    deadlineThisSubtask.innerHTML = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek)}`

                    deadlineThisSubtaskFullNum.innerHTML = dataNextWeek.toLocaleDateString()
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadlineSubtask(item)
                }
    
            } else if (nameItemDeadline == "Без срока" && deadlineThisSubtask.innerHTML != "Срок выполнения") {
                setIsObservHiddenMenus(false)
    
                deadlineThisSubtask.innerHTML = "Срок выполнения"
                deadlineThisSubtaskFullNum.innerHTML = "Срок выполнения"


                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadlineSubtask(item)
    
            } else if (nameItemDeadline == "Без срока" && deadlineThisSubtask.innerHTML == "Срок выполнения") {
                setIsObservHiddenMenus(false)
            }





            let all_subtasks = getAll_subtasks()

            // Текущий объект таска в массиве
            const currentTask_arr = getCurrentTask_arr()


            let idCurSubtask = ""     // Id подзадачи из массива
            // Перебираю массив подзадач и сохраняю в "liFromArr" id того, что совпадает с id выбранной для изменения срока выполнения подзадачи (li)
            for (let i = 0; i < all_subtasks.length; i++) {
                if (all_subtasks[i].newSubtask_ID == targetLi_modal.getAttribute("data-subtask-id")) { 
                    idCurSubtask = i
                    break
                }
            } 


            // Обновляю срок выполнения в массиве текущей ПОДЗАДАЧИ
            all_subtasks[idCurSubtask].newSubtask_deadlineSubtask = deadlineThisSubtask.innerHTML
            all_subtasks[idCurSubtask].newSubtask_deadlineFullDataSubtask = deadlineThisSubtaskFullNum.innerHTML

            // Обновляю массив с подзадачами в основном файле (хранилище для него)
            reloadAll_subtasks(all_subtasks)


            // Обновляю текущий таск из массива с тасками (локально в массиве текущего файла)
            all_tasks[window.localStorage.getItem("openMoTargetLiId")-1] = currentTask_arr

            // Обновляю массив с тасками в js файлах и в localStorage (перезаписываю с учётом изменений)
            reloadAllTasks(all_tasks)



            // Удаляю отметку о текущей подзадачи с отслеживания при наведении
            setCurrentLi_modal(null)
            setTargetLi_subtask(null)


            // Целиком список сроков из списка вариантов (ul) (в "Назначить срок") 
            const deadlineHiddenList = e.target.closest(".subtask__dopFunction__hidden-menu-deadline").querySelector(".subtask__dopFunction__deadline-list")
            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadlineSubtask(deadlineHiddenList)
            
        }, { once: true })
    })
}  




// 1.2) Если меню выбора срока было открыто при создании/редактировании подзадачи (т.е. не через доп. функцию "Назначить срок"), то ...
// (При клике на один из пунктов выбора срока выполнения подзадачи (из списка вариантов), при выборе из "form-from-add-new-task__hidden-menu-deadline") 

// Функция для создания обработчика событий на все элементы списка выбора срока выполнения. При нажатии на какой-то из них, сразу происходит работа.
function deadlineItemSubtaskFormClick(e) {
    if (!statusIsModal()) return    // Если МО отсутствует, то игнор

    // Элемент li из списка вариантов для выбора срока выполнения
    const item = e.target.closest(".form-from-add-new-task__deadline-item")



    // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
    if (selectedDay_MO_Subtask && selectedDay_MO_Subtask != "") {
        selectedDay_MO_Subtask.classList.remove("-selected-")
    }


    const nowData2 = new Date()



    // Название выбранного дня (из списка)
    const nameItemDeadline = item.querySelector(".form-from-add-new-task__deadline-name").innerHTML

    // Поле с текстом для выбранного срока
    const textAreaDeadline = deadlineButton.querySelector(".form-from-add-new-task__text-settings")

    // Скрытое поле для вставки выбранной даты у подзадачи (полной, с годом, и только числами)
    const textAreaDeadlineHiddenNum = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num")
    

    if (nameItemDeadline == "Сегодня" && textAreaDeadline.innerHTML != `${nowDay} ${nowMonth}`) {
        textAreaDeadline.innerHTML = `${nowDay} ${nowMonth}`

        textAreaDeadlineHiddenNum.innerHTML = nowData2.toLocaleDateString()

        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadlineSubtask(item)

    } else if (nameItemDeadline == "Завтра" && textAreaDeadline.innerHTML != `${nowDay+1} ${nowMonth}`) {
        textAreaDeadline.innerHTML = `${nowDay+1} ${nowMonth}`
        
        nowData2.setDate(nowDay+1)
        textAreaDeadlineHiddenNum.innerHTML = nowData2.toLocaleDateString()

        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadlineSubtask(item)

    } else if (nameItemDeadline == "На выходных") {
        let dataWeekend = new Date()    // Создаю новый объект даты
        // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
        if (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend) != "суббота") {
            dataWeekend.setDate(dataWeekend.getDate() + 1)
        }
        // Увеличиваю дату пока не достигну субботы
        while (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend) != "суббота") {
            dataWeekend.setDate(dataWeekend.getDate() + 1)
        }


        // Если ближайшая суббота уже не была выбрана, то...
        if (textAreaDeadline.innerHTML != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend)}`) {
            textAreaDeadline.innerHTML = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend)}`

            textAreaDeadlineHiddenNum.innerHTML = dataWeekend.toLocaleDateString()

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadlineSubtask(item)
        }

    } else if (nameItemDeadline == "След. неделя") {
        let dataNextWeek = new Date()   // Создаю новый объект даты
        dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)

        if (textAreaDeadline.innerHTML != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek)}`) {
            textAreaDeadline.innerHTML = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek)}`

            textAreaDeadlineHiddenNum.innerHTML = dataNextWeek.toLocaleDateString()

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadlineSubtask(item)
        }

    } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerHTML != "Срок выполнения") {
        setIsObservHiddenMenus(false)


        textAreaDeadline.innerHTML = "Срок выполнения"
        textAreaDeadlineHiddenNum.innerHTML = "Срок выполнения"

        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadlineSubtask(item)

        hiddenByDisplay(deadlineButton.querySelector(".form-from-add-new-task__icon-cross"), "hide")
    } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerHTML == "Срок выполнения") {
        setIsObservHiddenMenus(false)
    }
}




// 2) Выбор срока выполнения подзадачи (при выборе в календаре):

// 2.1) Если меню выбора открыто через "Назначить срок", то...
// (При клике на день в календаре, при выборе из "subtask__dopFunction__hidden-menu-deadline") 
function clickButtonNewDeadlineSubtaskFromCalendar(e) {
    if (!statusIsModal()) return    // Если МО отсутствует, то игнор

    let target = e.target       // Где был совершён клик?
    const targetBtn = e.target.closest(".subtask__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 

    // Если клик был вне контейнера с кнопкой "NewDeadline" у ПОДЗАДАЧИ, то игнорируем
    if (!targetBtn) return


    // Если клик был не на элементе с ячейкой даты, то клик игнорируется
    if (!target.classList.contains("air-datepicker-cell")) return  


    const targetLi_Modal = e.target.closest(".subtask")  // Подзадача, внутри которой была нажата кнопка "Назначить срок"

    // Текущий объект таска в массиве
    const currentTask_arr = getCurrentTask_arr()
    


    // Поле с текстом со сроком выполнения данной подзадачи (нужно для доп функции "Назначить срок") (внизу слева у каждой подзадачи)
    const deadlineThisSubtask = targetLi_Modal.querySelector(".subtask__deadline__date_visible")

    // Поле с полной датой в числовом формате у данной подзадачи 
    const deadlineThisSubtaskFullNum = targetLi_Modal.querySelector(".subtask__deadline__date_hidden")

    selectedDay_MO_Subtask = target

    const dateDay = selectedDay_MO_Subtask.getAttribute("data-date")   // Выбранный номер дня месяца
    const dateMonth = selectedDay_MO_Subtask.getAttribute("data-month")    // Выбранный месяц (числом)
    const dateYear = selectedDay_MO_Subtask.getAttribute("data-year") // Выбранный год


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
    if (deadlineThisSubtask.innerHTML != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
        deadlineThisSubtask.innerHTML = dateDay + " " + selectMonthDataCalendare
    }
    deadlineThisSubtaskFullNum.innerHTML = selectDataCalendare.toLocaleDateString()


    // Все задачи
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks")) 
    // Все подзадачи текущего таска
    let all_subtasks = getAll_subtasks()

    let idCurSubtask = ""     // Id подзадачи из массива
    // Перебираю массив подзадач и сохраняю в "liFromArr" id того, что совпадает с id выбранной для изменения срока выполнения подзадачи (li)
    for (let i = 0; i < all_subtasks.length; i++) {
        if (all_subtasks[i].newSubtask_ID == targetLi_Modal.getAttribute("data-subtask-id")) { 
            idCurSubtask = i
            break
        }
    } 


    // Обновляю срок выполнения в массиве текущей ПОДЗАДАЧИ
    all_subtasks[idCurSubtask].newSubtask_deadlineSubtask = deadlineThisSubtask.innerHTML
    all_subtasks[idCurSubtask].newSubtask_deadlineFullDataSubtask = deadlineThisSubtaskFullNum.innerHTML

    // Обновляю массив с подзадачами в основном файле (хранилище для него)
    reloadAll_subtasks(all_subtasks)

    // Обновляю текущий таск из массива с тасками (локально в массиве текущего файла)
    all_tasks[window.localStorage.getItem("openMoTargetLiId")-1] = currentTask_arr

    // Обновляю массив с тасками в js файлах и в localStorage (перезаписываю с учётом изменений)
    reloadAllTasks(all_tasks)



    // Удаляю отметку о текущей подзадачи с отслеживания при наведении
    setCurrentLi_modal(null)
    setTargetLi_subtask(null)


    // Целиком список сроков из списка вариантов (ul) (в "Назначить срок") 
    const deadlineHiddenList = e.target.closest(".subtask__dopFunction__hidden-menu-deadline").querySelector(".subtask__dopFunction__deadline-list")
    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
    reloadItemsDeadlineSubtask(deadlineHiddenList)
}



// 2.2) Если меню выбора открыто создании/редактировании подзадачи, то...
// (При клике на день в календаре, при выборе из "form-from-add-new-task__hidden-menu-deadline") 
function deadlineClickCalendar(e) {
    if (!statusIsModal()) return    // Если МО отсутствует, то игнор

    let target = e.target       // Где был совершён клик?

    // Если клик был не на элементе с ячейкой даты, то клик игнорируется
    if (!target.classList.contains("air-datepicker-cell")) return 


    // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
    const deadlineHiddenList = target.closest(".form-from-add-new-task__hidden-menu-deadline").querySelector(".form-from-add-new-task__deadline-list")

    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
    reloadItemsDeadlineSubtask(deadlineHiddenList)


    // Поле для вставки и отображения выбранной даты у таска (с текстовым отображением месяца)
    const textAreaDeadline = deadlineButton.querySelector(".form-from-add-new-task__text-settings")

    // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
    const textAreaDeadlineHiddenNum = deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num")


    selectedDay_MO_Subtask = target


    const dateDay = selectedDay_MO_Subtask.getAttribute("data-date")   // Выбранный номер дня месяца
    const dateMonth = selectedDay_MO_Subtask.getAttribute("data-month")    // Выбранный месяц (числом)
    const dateYear = selectedDay_MO_Subtask.getAttribute("data-year") // Выбранный год


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
    if (textAreaDeadline.innerHTML != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
        textAreaDeadline.innerHTML = dateDay + " " + selectMonthDataCalendare
    }
    textAreaDeadlineHiddenNum.innerHTML = selectDataCalendare.toLocaleDateString()

}


export {getVarsMO_selectElementsSubtask, getSelectedDay_MO_Subtask, reloadItemsDeadlineSubtask, clickButtonNewDeadlineSubtask, deadlineItemSubtaskFormClick, clickButtonNewDeadlineSubtaskFromCalendar, deadlineClickCalendar}
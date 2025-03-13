'use strict';
// Данный файл для функций выбора данных ТАСКА (внутри МО)

import {hiddenByDisplay} from "./base.js"
import {buttonCloseMenuNewTask, localLanguage, options1, options2, nowDay, nowMonth} from "./doomElements.js"
import {updateDataTask_element, reloadAllTasks} from "./scripts.js"
import {switchDisabledShowDopFuncTask} from "./toggleVisibleElements.js"
import {setCurrentLi_modal, getCurrentTask_arr, setSelectedDay_modal, getSelectedDay_modal} from "./MO_dataUpdate.js"

import {getEl_textarea_name, reloadItemsPriority_modal} from "./MO_toggleVisibleElTask.js"

let targetLi

let modalWindow             // Само модальное окно
let modalTitle = document.querySelector(".itc-modal-title")
let modalContent = document.querySelector(".itc-modal-body")
let modalAside = document.querySelector(".itc-modal-body__aside")

let checkbox_modal              // Сам кнопка-кружок возле имени таска в м.о.
let checkbox_modal_icon         // Галочка в кружочке

let div_name_task               // div с именем таска 
let div_description_task        // div с описанием таска 

let el_textarea_name            // Поле для заполнения имени таска
let el_textarea_description     // Поле для заполнения описания таска
let count_lenght_name_description_task    // Поле с указанимем длины строки имени и описания таска

let buttonCloseEdit             // Кнопка закрытия редактирования ТАСКА (не подзадачи) в м.о.
let buttonSaveEdit              // Кнопка сохранения редактирования ТАСКА в м.о.


let deadlineItem_modal      // Элементы li с вариантами срока выполнения



let modalBtn_GroupTypeTask                          // Кнопка в м.о. для изменения типа таска
let conteinerFromHiddenMenuTypesTasks_modal         // Скрытое меню выбора типа таска в м.о. 

let modalBtn_GroupPriorityTask                      // Поле для выбора приоритета таска в м.о.
let conteinerFromHiddenMenuPriorityTasks_modal      // Скрытое меню выбора приоритета таска в м.о.    
let priorityItem_modal                              // Элементы li с вариантами приоритета

let modal_wrapper_name_description                  // Контейнер с именем и описанием таска

let conteinerFromHiddenMenuDeadlineTasks_modal      // Скрытое меню выбора срока выполнения таска в м.о. 


let modalBtn_GroupDeadlineTask      // Поле для выбора срока выполнения таска в м.о.



function getVarsMO_selectElementsTask(curTask) {
    targetLi = curTask
    modalWindow = document.querySelector(".itc-modal-content")      // Само модальное окно
    modalTitle = document.querySelector(".itc-modal-title")
    modalContent = document.querySelector(".itc-modal-body")
    modalAside = document.querySelector(".itc-modal-body__aside")

    checkbox_modal = document.querySelector(".itc-modal-body__main-content .task__button-task-checkbox")   
    checkbox_modal_icon = checkbox_modal.querySelector("img")       

    deadlineItem_modal = document.querySelectorAll(".itc-modal-body__deadline-item")

    modalBtn_GroupTypeTask = document.querySelector('.itc-modal-body__select-setting[data-title="Перенести в..."]')  
    conteinerFromHiddenMenuTypesTasks_modal = document.querySelector(".itc-modal-body__hidden-menuTypesTask")      

    modalBtn_GroupPriorityTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить приоритет..."]') 
    conteinerFromHiddenMenuPriorityTasks_modal = document.querySelector(".itc-modal-body__hidden-menu-priority")
    priorityItem_modal = document.querySelectorAll(".itc-modal-body__priority-item")

    modal_wrapper_name_description = modalWindow.querySelector(".task__innerWrap-name-description") 

    conteinerFromHiddenMenuDeadlineTasks_modal = document.querySelector(".itc-modal-body__hidden-menu-deadline")  

    modalBtn_GroupDeadlineTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить новой крайний срок..."]')

    div_name_task = modal_wrapper_name_description.querySelector(".task__name-task")    // div с именем таска 
    div_description_task = modal_wrapper_name_description.querySelector(".task__description-task")  // div с описанием таска 


    buttonCloseEdit = modalWindow.querySelector(".buttuns-closeSave-task .btn-close") 
    buttonSaveEdit = modalWindow.querySelector(".buttuns-closeSave-task .btn-save")    
}



// Функция для очистки стиля "выбранного элемента" со всех deadlineOptions в скрытом меню у sidebar, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик.
function reloadItemsDeadline_modal_aside(currentItemDeadline) {
    deadlineItem_modal.forEach(function(itemDeadline) { 
        itemDeadline.classList.remove("hovered_select_menu")
    })
    if (currentItemDeadline) {
        currentItemDeadline.classList.add("hovered_select_menu")
    }
}



 // При клике на кнопку "Отмена" при редактировании таска (не подзадачи!)(но внутри МО)
 function clickCloseEditModal() {  
    el_textarea_name = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-name-task")
    el_textarea_description = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-description-task")
    // Создаю переменную контейнера для строк с указанием лимитов строк имени и описания таска
    count_lenght_name_description_task = modalContent.querySelector(".task__maxLenght_name_description")

    el_textarea_name = getEl_textarea_name()
    if (!el_textarea_name) return   // Если элемент textarea в м.о. ещё не был создан, то пропускаем


    // Удаляю оба поля textarea и поля с подсчётом длины имени и описания
    el_textarea_name.remove()
    el_textarea_description.remove()
    count_lenght_name_description_task.remove()

    // Убираю скрытие с элементов div (с именем/описанием таска)
    hiddenByDisplay(div_name_task, "show")
    hiddenByDisplay(div_description_task, "show")

    // Убираю класс "ramka" с контейнера у имени/описания таска
    modal_wrapper_name_description.classList.remove("ramka")

    // Скрываю кнопку "Отмена" и "Сохранить"
    hiddenByDisplay(buttonCloseEdit, "hide")
    hiddenByDisplay(buttonSaveEdit, "hide")

    if (buttonCloseMenuNewTask.closest(".itc-modal-body__subtask-outer-block")) {
        setCurrentLi_modal(null)
    }
     
    // Разрешаю показ доп. функций тасков
    switchDisabledShowDopFuncTask("false")
 } 


// При клике на кнопку "Сохранить" при редактировании текущего таска (не подзадачи!) (но внутри МО)
function clickSaveEditModal() {
    const el_textarea_name = getEl_textarea_name()
    el_textarea_description = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-description-task")
    count_lenght_name_description_task = modalContent.querySelector(".task__maxLenght_name_description")

    if (!el_textarea_name) return       // Если элемент textarea в м.о. ещё не был создан, то пропускаем

    // Массив со всеми тасками
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))

    // Текущий объект таска в массиве
    const currentTask_arr = getCurrentTask_arr()
 
    // Обновляю оба поля div с именем/описанием таска (внутри м.о.)
    div_name_task.innerText = el_textarea_name.value
    div_description_task.querySelector("span").innerText = el_textarea_description.value

    //  Изменяю имя и описание текущего таска внутри массива (с этим таском)
    currentTask_arr.newTask_name = el_textarea_name.value
    currentTask_arr.newTask_description = el_textarea_description.value

    all_tasks[currentTask_arr.newTask_ID-1] = currentTask_arr

    // Обновляю массив с тасками в js файлах и в localStorage (перезаписываю с учётом изменений)
    reloadAllTasks(all_tasks)

    // Вызываю функцию для обновления html элемента с текущим таском
    updateDataTask_element(targetLi, currentTask_arr)

    // Удаляю оба поля textarea и поля с подсчётом длины имени и описания
    el_textarea_name.remove()
    el_textarea_description.remove()
    count_lenght_name_description_task.remove()

    // Убираю скрытие с элементов div (с именем/описанием таска)
    hiddenByDisplay(div_name_task, "show")
    hiddenByDisplay(div_description_task, "show")

    // Убираю класс "ramka" с контейнера у имени/описания таска
    modal_wrapper_name_description.classList.remove("ramka")

    // Скрываю кнопку "Отмена" и "Сохранить"
    hiddenByDisplay(buttonCloseEdit, "hide")
    hiddenByDisplay(buttonSaveEdit, "hide")

    // Разрешаю показ доп. функций тасков
    switchDisabledShowDopFuncTask("false")
}






// При выборе типа таска (для изменения)
function selectTypetaskItemMO(type) {
    modalBtn_GroupTypeTask.querySelector(".itc-modal-body__select-setting .wrapper-type-task__name").innerText = type.querySelector(".wrapper-type-task__name").innerText
    const selectedIcon = type.querySelector(".wrapper-type-task__icon-type-project")
    modalBtn_GroupTypeTask.querySelector(".wrapper-type-task__icon-type-project").setAttribute("src", selectedIcon.getAttribute("src"))

    // Массив со всеми тасками
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))

    // Текущий объект таска в массиве
    const currentTask_arr = getCurrentTask_arr()

    // Скрываю меню выбора типа таска
    hiddenByDisplay(conteinerFromHiddenMenuTypesTasks_modal, "hide")
    // Изменяю класс с active на hover-hint
    modalBtn_GroupTypeTask.classList.replace("active", "hover-hint")


    //  Изменяю имя и иконку типа таска внутри массива (с этим таском)
    currentTask_arr.newTask_typeTask_name = type.querySelector(".wrapper-type-task__name").innerText
    currentTask_arr.newTask_typeTask_icon_src = modalBtn_GroupTypeTask.querySelector(".wrapper-type-task__icon-type-project").getAttribute("src")

    
    // Обновляю массив с подзадачами внутри массива с тасками (локально в массиве текущего файла)
    all_tasks[window.localStorage.getItem("openMoTargetLiId")-1] = currentTask_arr

    // Обновляю массив с тасками (перезаписываю с учётом изменений)
    reloadAllTasks(all_tasks)



    // Изменяю имя и иконку типа таска в шапке м.о.
    modalTitle.querySelector(".wrapper-type-task__name").innerText = currentTask_arr.newTask_typeTask_name
    modalTitle.querySelector(".wrapper-type-task__icon-type-project").setAttribute("src", currentTask_arr.newTask_typeTask_icon_src)


    // Вызываю функцию для обновления html элемента с текущим таском
    updateDataTask_element(targetLi, currentTask_arr)
}




// 2.1) Выбор срока выполнения ТАСКА (внутри МО) (при выборе из СПИСКА ВАРИАНТОВ):
function selectDeadlineItemMO(item) {
    
    // Если меню выбора срока выполнения находится внутри sidebar (в разделе изменения срока выполнения ТАСКА).

    // Массив со всеми тасками
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))

    // Текущий объект таска в массиве
    const currentTask_arr = getCurrentTask_arr()

    // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
    const selectedDay_modal = getSelectedDay_modal() 
    if (selectedDay_modal && selectedDay_modal != "") {
        selectedDay_modal.classList.remove("-selected-")
    }

    const nowData2 = new Date()


    // Название выбранного дня (из списка)
    const nameItemDeadline_modal = item.querySelector(".itc-modal-body__deadline-name").innerText 
    // Поле с текстом для выбранного срока
    const textAreaDeadline_modal = document.querySelector(".itc-modal-body__text-settings")     



    // Поле с числовым полным значением для выбранного срока
    const textAreaDeadlineHiddenNum_modal = document.querySelector(".itc-modal-body__text-settings_hidden-num")     

    // Поле с текстом со сроком выполнения данного таска, которое внизу слева (вне мо, на основной странице)
    const deadlineThisTask = targetLi.querySelector(".task__deadline__date_visible") 
    // Поле с числовым полным значением со сроком выполнения данного таска (вне мо, на основной странице)    
    const deadlineThisTaskFullNum = targetLi.querySelector(".task__deadline__date_hidden")     


    if (nameItemDeadline_modal == "Сегодня") {
        textAreaDeadline_modal.innerText = `${nowDay} ${nowMonth}`

        textAreaDeadlineHiddenNum_modal.innerText = nowData2.toLocaleDateString()
        deadlineThisTaskFullNum.innerText = nowData2.toLocaleDateString()
    } else if (nameItemDeadline_modal == "Завтра") {
        textAreaDeadline_modal.innerText = `${nowDay+1} ${nowMonth}`  // Обновляю срок данной задачи внутри мо

        nowData2.setDate(nowDay+1)
        textAreaDeadlineHiddenNum_modal.innerText = nowData2.toLocaleDateString()
        deadlineThisTaskFullNum.innerText = nowData2.toLocaleDateString()
    } else if (nameItemDeadline_modal == "На выходных") {
        let dataWeekend_modal = new Date()    // Создаю новый объект даты

        // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
        if (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend_modal) != "суббота") {
            dataWeekend_modal.setDate(dataWeekend_modal.getDate() + 1)
        }
        // Увеличиваю дату пока не достигну субботы
        while (Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend_modal) != "суббота") {
            dataWeekend_modal.setDate(dataWeekend_modal.getDate() + 1)
        }


        textAreaDeadline_modal.innerText = `${dataWeekend_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataWeekend_modal)}`

        textAreaDeadlineHiddenNum_modal.innerText = dataWeekend_modal.toLocaleDateString()
        deadlineThisTaskFullNum.innerText = dataWeekend_modal.toLocaleDateString()
    } else if (nameItemDeadline_modal == "След. неделя") {
        let dataNextWeek_modal = new Date()   // Создаю новый объект даты
        dataNextWeek_modal.setDate(dataNextWeek_modal.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)

        if (textAreaDeadline_modal.innerText != `${dataNextWeek_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek_modal)}`) {
            textAreaDeadline_modal.innerText = `${dataNextWeek_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options1).format(dataNextWeek_modal)}`


            textAreaDeadlineHiddenNum_modal.innerText = dataNextWeek_modal.toLocaleDateString()
            deadlineThisTaskFullNum.innerText = dataNextWeek_modal.toLocaleDateString()
        }
        
    } else if (nameItemDeadline_modal == "Без срока" && textAreaDeadline_modal.innerText != "Срок выполнения") {
        textAreaDeadline_modal.innerText = "Срок выполнения"

        textAreaDeadlineHiddenNum_modal.innerText = "Срок выполнения"
        deadlineThisTaskFullNum.innerText = "Срок выполнения"
    }

    

    // Обновляю срок выполнения в массиве текущего таска
    currentTask_arr.newTask_deadlineTask = textAreaDeadline_modal.innerText
    currentTask_arr.newTask_deadlineFullDataTask = textAreaDeadlineHiddenNum_modal.innerText

    // Обновляю массив с подзадачами внутри массива с тасками (локально в массиве текущего файла)
    all_tasks[window.localStorage.getItem("openMoTargetLiId")-1] = currentTask_arr

    // Обновляю массив с тасками в localStorage и у основного файла js (перезаписываю с учётом изменений)
    reloadAllTasks(all_tasks)

    // Обновляю срок задачи внутри элементов таска (вне мо)(внизу слева у таска)
    deadlineThisTask.innerText = textAreaDeadline_modal.innerText

    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
    reloadItemsDeadline_modal_aside()
}


// 2.2) Выбор срока выполнения таска (при выборе в календаре):

function selectDeadlineItemCalendarMO(e) {
    let target = e.target       // Где был совершён клик?

    if (!target.classList.contains("air-datepicker-cell")) return       // Если клик был не на элементе с ячейкой даты, то клик игнорируется


    // Если клик был по ячейке с датой, до запускается функция, где уже будет произведена работа с выбранной ячейкой
    showElCalentare_modal(target)
}


function showElCalentare_modal(currData) {
    const selectedDay_modal = getSelectedDay_modal()

    // Поле с текстом для выбранного срока
    const textAreaDeadline = modalBtn_GroupDeadlineTask.querySelector(".itc-modal-body__text-settings") 

    // Поле с числовым полным значением для выбранного срока
    const textAreaDeadlineHiddenNum_modal = modalBtn_GroupDeadlineTask.querySelector(".itc-modal-body__text-settings_hidden-num")     

    // Поле с текстом со сроком выполнения данного таска, которое внизу слева (вне мо, на основной странице)
    const deadlineThisTask = targetLi.querySelector(".task__deadline__date_visible") 
    // Поле с числовым полным значением со сроком выполнения данного таска (вне мо, на основной странице)    
    const deadlineThisTaskFullNum = targetLi.querySelector(".task__deadline__date_hidden")     


    // Массив со всеми тасками
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))

    // Текущий объект таска в массиве
    const currentTask_arr = getCurrentTask_arr()



    selectedDay_modal = currData
    setSelectedDay_modal(currData)

    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
    reloadItemsDeadline_modal_aside()
    selectedDay_modal.classList.add("-selected-")

    
    const dateDay = selectedDay_modal.getAttribute("data-date")   // Выбранный номер дня месяца
    const dateMonth = selectedDay_modal.getAttribute("data-month")    // Выбранный месяц (числом)
    const dateYear = selectedDay_modal.getAttribute("data-year") // Выбранный год


    // Создаю каллендарь на основании выбранного дня и месяца
    const selectDataCalendare = new Date(dateYear, dateMonth, dateDay)        
    const optionsSelection = {  
        month: "short"
    }
    // Создаю переменную с текстовым обозначением выбранного в календаре месяца
    const selectMonthDataCalendare = (Intl.DateTimeFormat(localLanguage, optionsSelection).format(selectDataCalendare))


    
    // Ввожу в поле с выбором срока выполнения - выбранную в календаре дату (число + месяц)
    textAreaDeadline.innerText = dateDay + " " + selectMonthDataCalendare
    // Ввожу в скрытое поле с полным числовым значением (в мо в sidebar)
    textAreaDeadlineHiddenNum_modal.innerText = selectDataCalendare.toLocaleDateString()


    // Обновляю срок задачи внутри элементов таска (вне мо)(внизу слева у таска)
    deadlineThisTask.innerText = dateDay + " " + selectMonthDataCalendare
    // Ввожу в скрытое поле с полным числовым значением у таска (вне мо)
    deadlineThisTaskFullNum.innerText = selectDataCalendare.toLocaleDateString()
    

    // Обновляю срок выполнения в массиве текущего таска
    currentTask_arr.newTask_deadlineTask = dateDay + " " + selectMonthDataCalendare
    currentTask_arr.newTask_deadlineFullDataTask = selectDataCalendare.toLocaleDateString()

    // Обновляю массив с подзадачами внутри массива с тасками (локально в массиве текущего файла)
    all_tasks[window.localStorage.getItem("openMoTargetLiId")-1] = currentTask_arr

    // Обновляю массив с тасками в localStorage и у основного файла js (перезаписываю с учётом изменений)
    reloadAllTasks(all_tasks)
}





 // 2) Выбор приоритета таска:
    
// При выборе приоритета таска (для изменения)
function selectPriorityItemMO(item) {
    const selectedIcon = item.querySelector(".itc-modal-body__priority-icon")   // Создаю переменную - иконка выбранного приоритета

    // Массив со всеми тасками
    let all_tasks = JSON.parse(window.localStorage.getItem("all_tasks"))

    // Текущий объект таска в массиве
    const currentTask_arr = getCurrentTask_arr()


    // Подставляю в поле выбранного приоритета - иконку и "aria-label" выбранного приоритета, если выбираемый приоритет не является уже выбранным
    if (modalBtn_GroupPriorityTask.querySelector(".itc-modal-body__icon-selected-setting").getAttribute("src") != selectedIcon.getAttribute("src")) {
        modalBtn_GroupPriorityTask.querySelector(".itc-modal-body__icon-selected-setting").setAttribute("src", selectedIcon.getAttribute("src"))
        modalBtn_GroupPriorityTask.querySelector(".itc-modal-body__text-settings").innerText = item.querySelector(".itc-modal-body__priority-name").getAttribute("aria-label")

        //Очищаю стиль "выбранного элемента" со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). А так же скрываю галочку справа (показывающую какой элемент пользователь выбрал) с элемента, у которого он показывался ранее (если был) и показываю на выбранном элементе
        reloadItemsPriority_modal(item)
    }

    // Скрываю меню выбора приоритета таска
    hiddenByDisplay(conteinerFromHiddenMenuPriorityTasks_modal, "hide")
    // Изменяю класс с active на hover-hint
    modalBtn_GroupPriorityTask.classList.replace("active", "hover-hint")
    

    // Изменяю в массиве название приоритета текущего таска
    currentTask_arr.newTask_priority_name = item.querySelector(".itc-modal-body__priority-name").getAttribute("aria-label") 



        
    

    let colorPriority = item.querySelector(".itc-modal-body__priority-icon").getAttribute("src").split("")      // Выбранный новый приоритет (цвет) для изменения таска
    colorPriority.splice(0, 16)     // Удаляю первые 16 символов, оставляя лишь название самого цвета
    colorPriority.splice(-4)        // Удаляю последние 4 символа (".png")
    currentTask_arr.newTask_priority_color = colorPriority.join("")     // Изменяю в массиве название цвета у приоритета текущего таска

    const checkbox_modal_color = checkbox_modal.getAttribute("class").split(" ")[1]         // Полное название второго класса у кнопки-кружка (в котором и присутствует название цвета
    checkbox_modal.classList.replace(checkbox_modal_color, `${checkbox_modal_color.slice(0, 27)}${colorPriority.join("")}`)     // Меняю класс с цветом у кружка на новый (с тем цветом, который был выбран)

    const checkbox_modal_icon_newSrc = `./icon/MarkOk_${currentTask_arr.newTask_priority_color}.png`       // Новый полноценный путь (ссылка) на галочку с нужным цветом


    checkbox_modal_icon.setAttribute("src", checkbox_modal_icon_newSrc)     // Меняю путь до галочки - на новый

    // Обновляю массив с подзадачами внутри массива с тасками (локально в массиве текущего файла)
    all_tasks[window.localStorage.getItem("openMoTargetLiId")-1] = currentTask_arr

    // Обновляю массив с тасками (перезаписываю с учётом изменений)
    reloadAllTasks(all_tasks)  
    
    // Вызываю функцию для обновления html элемента с текущим таском
    updateDataTask_element(targetLi, currentTask_arr)
}



export {getVarsMO_selectElementsTask, clickCloseEditModal, clickSaveEditModal, selectTypetaskItemMO, selectDeadlineItemMO, selectDeadlineItemCalendarMO, selectPriorityItemMO}
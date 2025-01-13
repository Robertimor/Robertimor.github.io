'use strict';

import ItcModal from "../modal/js/modal.js";
// import AirDatepicker from "../"

const body = document.querySelector('body');

const cale = document.querySelector(".calendar");

const chestForCalendar = document.querySelector(".chest-for-calendar")
const DeadlineCalendare_modal = document.querySelector(".itc-modal-body__hiddenMenu-deadline-calendare")  // Календарь в скрытом меню для выбора срока выполнения (изначально элемент находится вне модального окна, создан при загрузке страницы, для дальнейшего перемещения его в м.о.)

const aside = document.querySelector(".aside")                  // Сайдбар целиком
const logReg = document.querySelector(".log-reg")               // Поле с регистрацией/авторизацией
const InpLogin = document.querySelector(".inp-login");            // Поле для логина при регистрации/авторизации
const InpPassword = document.querySelector(".inp-password");     // Поле для пароля при регистрации/авторизации
const butLogin = document.querySelector(".btn-login");          // Кнопка авторизации
const butReg = document.querySelector(".btn-register");          // Кнопка регистрации


const userMenu = document.querySelector("#asideUserMenu")       // Поле aside-а авторизированного пользователя
const nicknameUser = document.querySelector(".asideUserMenu__nicknameUser")    // Отображаемый nickname (login) пользователя
const buttonMenuProfile = document.querySelector(".asideUserMenu__button_menuProfile");   // Поле с фото и логином, при нажатии на которое открывается скрытое меню профиля
const menuProfile = document.querySelector(".hidden-menu-profile");         // Скрытое меню профиля
const notifications = document.querySelector(".asideUserMenu__btn-notifications")      // Кнопка уведомления
const hideAndShow_Sidebar = document.querySelector(".asideUserMenu__btn-hideAndShow-sidebar")      // Кнопка скрытия/показа сайдбара



const countTasksToday = document.querySelector(".header-block__countNum-tasks-today")      // Поле с количеством заданий на сегодня
const sectionContentBlock_viewContent = document.querySelector(".section-content-block__view-content")  // Основная область. С текущей датой, со списком тасков, с меню добавления новой задачи
const nameToday = document.querySelector(".section-content-block__nameToday")          // Поле для отображения текущей даты


const todayTaskOuter = document.querySelector(".today-task-outer-block")        // Область со всеми созданными сегодняшними тасками
const task = document.querySelectorAll(".task")       // Поле с сегодняшними тасками

const buttonTaskCheckboxReady = document.querySelectorAll(".task__button-task-checkbox")  // Кнопка возле таска для отметки "выполнено"
const taskDopFuncs = document.querySelectorAll(".task__dopFuncs")   // Поле с дополнительными тремя кнопками к таску

const ElNameTask = document.querySelectorAll(".task__name-task")
const ElDescriptionTask = document.querySelectorAll(".task__description-task-text")
const ElTypeTaskName = document.querySelectorAll(".task__typeTask span")
const ElTypeTaskIcon = document.querySelectorAll(".task__imgBlock-typeTask img")



const formFromAddNewTask = document.querySelector(".form-from-add-new-task")    // Поле добавления нового таска
const textAreaFromAddNewTask = document.querySelectorAll(".form-from-add-new-task__textarea-from-add-new-task")     //  Текстовые поля (имя и описание) для написания нового добавляемого таска 
const nameNewTask = document.querySelector(".form-from-add-new-task__name-new-task")   // Поле для написания имени нового добавляемого таска
const description = document.querySelector(".form-from-add-new-task__description")   // Поле для написания описания нового добавляемого таска


const dopSettingsForNewTask = document.querySelectorAll(".form-from-add-new-task__bnt-settings")   // Поле выбора срока выполнения и приоритета для нового таска

const selectDeadline = document.querySelector(".form-from-add-new-task__select-deadline")       // Поле (кнопка) для выбора срока выполнения нового таска
const hiddenMenuDeadline = document.querySelector(".form-from-add-new-task__hiddenMenu-deadline")   // Скрытое поле с выбором срока выполнения таска
const deadlineItem = document.querySelectorAll(".form-from-add-new-task__deadline-item")        // Элементы li с вариантами срока выполнения
const DeadlineCalendare = hiddenMenuDeadline.querySelector(".form-from-add-new-task__hiddenMenu-deadline-calendare")    // Календарь в скрытом меню для выбора срока выполнения


const selectPriority = document.querySelector(".form-from-add-new-task__select-priority")   // Поле (кнопка) для выбора приоритета у нового таска
const hiddenMenuPriority = document.querySelector(".form-from-add-new-task__hiddenMenu-priority")   // Скрытое поле с выбором приоритета таска
const priorityItem = document.querySelectorAll(".form-from-add-new-task__priority-item")        // Элементы li с вариантами приоритета
const priorityIconSelected = document.querySelector(".form-from-add-new-task__priority-icon-select")    // Иконка галочки для выбранного приоритета



const conteinerFromHiddenMenuTypesTasks = document.querySelector(".form-from-add-new-task__hiddenMenuTypesTask")     // Скрытое поле с выбором типа таска
const typesProjectForSelect = document.querySelectorAll(".form-from-add-new-task__hiddenMenuTypesTask .my-type-projects__conteiner_from-hiddenMenu .my-type-projects__type-project")     // Элементы li с типом таска

const selectTypeTask = document.querySelector(".form-from-add-new-task__select-type-task")   // Поле для вставки названия и иконки выбранного типа таска
const buttonCloseMenuNewTask = formFromAddNewTask.querySelector(".btn-close")
const buttonAddNewTask = formFromAddNewTask.querySelector(".btn-add")        // Кнопка добавления описанного (выбрано имя и описание) таска
const buttonSaveTask = formFromAddNewTask.querySelector(".btn-save")

const addNewTask = document.querySelector(".add-new-task")      // Кнопка открытия поля для добавления нового таска
const imgAddTask1 = document.querySelector(".add-new-task__imgAddTask1")      // Иконка добавления таска 1 (Без наведения курсора)  
const imgAddTask2 = document.querySelector(".add-new-task__imgAddTask2")      // Иконка добавления таска 2 (Если навести курсор)






let accounts = []
let currentAccount 
// let currentAccount = {
//     login: "Ando",
//     password: 123
// }

butReg.addEventListener("click", function(e) {      // При нажатии на кнопку регистрации:
    e.preventDefault()
    let isAcc = accounts.some(function(acc) {       // Проверяю существует ли уже в базе введёный пользователем логин
        return acc.login == InpLogin.value
    })
    if (isAcc == true) {    // Если введёный логин уже занят
        alert("Такой логин уже занят! Придумайте другой.")
    } else if (InpLogin.value != "" && InpPassword.value != "") {    // Если поля не пустые:
        const user = {      // Создаю объект с данными нового пользователя
            login: InpLogin.value,
            password: InpPassword.value,
        } 
        accounts.push(user)     // Добавляю этого пользователя в список пользователей
        InpLogin.value = InpPassword.value = ""     // Очищаю поля ввода
        document.querySelector(".log-reg__successfulReg").classList.remove("hide2")  // Уведомляю об успешной регистрации
        document.querySelector(".log-reg__empty-field").classList.add("hide2");  // Скрываю надпись о неудачной регистрации если она была показана ранее
    } else {
        document.querySelector(".log-reg__empty-field").classList.remove("hide2");       //Показываю заготовленное сообщение об необходимости заполнить поля
        document.querySelector(".log-reg__successfulReg").classList.add("hide2")         // Удаляю поле с успешной ранее регистрацией если она была показана ранее
    }
    
})

// Авторизация
butLogin.addEventListener("click", function(e) {    // При нажатии на кнопку авторизации:
    e.preventDefault()
    let isAcc = accounts.some(function(acc) {       // Проверяю наличие пользователя с введёнными данными
        return acc.login == InpLogin.value && acc.password == InpPassword.value
    })
    if (isAcc) {    // Если пользователь с введёными данными существует
        currentAccount = {       // Обозначаю текущего авторизированного пользователя
            login: InpLogin.value,
            password: InpPassword.value,
        }
        alert(`Вы успешно авторизировались. Добро пожаловать, ${currentAccount.login}`)
        logReg.classList.add("hide2")
        userMenu.classList.remove("hide2")
        nicknameUser.innerHTML = currentAccount.login
    } else {
        alert("Неверное имя пользователя или пароль!")
    }
})




// Показ (изначальо скрытого) меню профиля
buttonMenuProfile.addEventListener("click", function (e) {
    menuProfile.classList.toggle("hide2")
    
})

// Скрытие сайдбара
hideAndShow_Sidebar.addEventListener("click", function (e) {
    aside.classList.toggle("_hide-sidebar")
    hideAndShow_Sidebar.classList.toggle("_moved-btn-hide-and-show-sidebar")
})



let all_tasks = []     // Массив из созданных тасков
countTasksToday.innerHTML = all_tasks.length   // Вписывание количество тасков в поле для их подсчёта

let tasksId = -1     // Счётчик для присваивания уникальных id создаваемым таскам



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

const nowDay = nowData.getDate()
const nowMonth = Intl.DateTimeFormat(localLanguage, options2).format(nowData)
const nowWeekday = (Intl.DateTimeFormat(localLanguage, options3).format(nowData))
const correctWeekday = (String(nowWeekday.split("").splice(0, 1)).toLocaleUpperCase()) + (nowWeekday.split("").splice(1, 10).join(""))


console.log(nowDataRu);
nameToday.innerHTML = `${nowDay} ${nowMonth} ‧ Сегодня ‧ ${correctWeekday}`     // Записываю в html код текущую дату

// Записываю сегодняшнее число в окно выбора срока выполнения для новой создаваемой задачи
selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML = `${nowDay} ${nowMonth}`





// Отображение поля с доп функциями при наведении на поле с таском

let currentLi = null    // Элемент li под курсором в данный момент (если есть)
todayTaskOuter.addEventListener("mouseover", function(e) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentLi есть, то мы ещё не ушли с предыдущего <li>, это переход внутри - игнорируем такое событие
    if (currentLi) return
    let target = e.target.closest("li")

    if (!target) return;    // переход не на <li> - игнорировать
    if (!todayTaskOuter.contains(target)) return    // переход на <li>, но вне .todayTaskOuter (возможно при вложенных списках) - игнорировать

    // ура, мы зашли на новый <li>
    currentLi = target
    show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))     // Показываем скрытое меню с доп func этого элемента
    
})

todayTaskOuter.addEventListener("mouseout", function(e) {
    // если мы вне <li>, то игнорируем уход мыши. Это какой-то переход внутри .todayTaskOuter, но вне <li>
    if (!currentLi) return
    
    // мы покидаем элемент – но куда? Возможно, на потомка?
    let relatedTarget = e.relatedTarget
    while (relatedTarget) {
        // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет. Если да, то это переход внутри элемента – игнорируем
        if (relatedTarget == currentLi) return
        relatedTarget = relatedTarget.parentNode
    }

    // мы действительно покинули элемент li
    show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"), currentLi)  // Скрываем меню с доп func этого элемента
    currentLi = null
})

// Функция показа/скрытия доп функций элемента таска
function show_task_dopFuncs(thisDopFuncs, thisLi) {
    
    let parentEl = hiddenMenuDeadline.parentElement
    // Если внутри таска нету меню выбора срока выполнения, то все доп функции скрываются/показываются
    if (parentEl.classList.contains("task__btnNewDeadline") == false) {
        thisDopFuncs.querySelector(".task__btnEdit").classList.toggle("hide1")
        thisDopFuncs.querySelector(".task__btnNewDeadline").classList.toggle("hide1")
        thisDopFuncs.querySelector(".task__addComment").classList.toggle("hide1")
    } 
    // Иначе, если внутри таска есть меню выбора срока выполнения, то скрываются/показываются все доп функции, кроме кнопки выбора срока приоритета
    else if (parentEl.classList.contains("task__btnNewDeadline") == true) {
        thisDopFuncs.querySelector(".task__btnEdit").classList.toggle("hide1")
        thisDopFuncs.querySelector(".task__addComment").classList.toggle("hide1")
    }


} 


// Кнопка редактирование тасков
todayTaskOuter.addEventListener("click", function(e) {
    let targetLi = e.target.closest(".task")       // Задача, внутри которой был нажат "edit"
    let target = e.target.closest(".task__btnEdit")   // Нажатая кнопка "edit"
    if (!target) return

    // В область выбранного таска добавляется поле для внесение изменений (вместо самого li, который скрывается)
    targetLi.append(formFromAddNewTask)     
    todayTaskOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
        task.classList.remove("hide2")      // Убирается скрытие li со всех элементов (если до этого какой-то скрылся, из-за незаконченного редактирования)
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

})


// Функция для вставки полей у таска, в форму для редактирования этого выбранного таска
function copyAndPushLabelsTask(settingsTask) {
    nameNewTask.value = settingsTask.newTask_name   // Имя таска
    description.value = settingsTask.newTask_description    // Описание таска

    selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML = settingsTask.newTask_typeTask_name  // Имя типа таска
    selectTypeTask.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", settingsTask.newTask_typeTask_icon_src)  // Иконка типа таска
    selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML = settingsTask.newTask_deadlineTask
    selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML = settingsTask.newTask_priority_name   // Имя приоритета
    selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", `./icon/priority_${settingsTask.newTask_priority_color}.png`)    // Цвет флага
}

// При нажатии на кнопку "сохранить" при редактировании таска
buttonSaveTask.addEventListener("click", function (e) {
    if (buttonSaveTask.getAttribute("aria-disabled") == "false") {
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

        // Скрывается Блок "formFromAddNewTask"
        formFromAddNewTask.classList.add("hide2")   
        // Блок "formFromAddNewTask" перемещается в конец
        sectionContentBlock_viewContent.append(formFromAddNewTask)  
        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
        todayTaskOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Скрываю все доп функции таска
        targetLi.querySelector(".task__btnEdit").classList.add("hide1")
        targetLi.querySelector(".task__btnNewDeadline").classList.add("hide1")
        targetLi.querySelector(".task__addComment").classList.add("hide1")
        // Удаляю отметку о текущем таске с отслеживания при наведении
        currentLi = null

    }
})

// Функция для обновления данных таска внутри массива тасков
function updateDataTask_arr(taskArr) {
    taskArr.newTask_name = nameNewTask.value
    taskArr.newTask_description = description.value
    taskArr.newTask_typeTask_name = selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML   // Имя типа таска
    taskArr.newTask_typeTask_icon_src = selectTypeTask.querySelector(".form-from-add-new-task__icon_type").getAttribute("src") // Иконка типа таска
    taskArr.newTask_deadlineTask = selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML
    taskArr.newTask_priority_name = selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML

    // Создаю переменную для выяснения названия цвета у приоритета. Беру содержание тега src у выбранного изображения и разбиваю его на массив.
    let arrColor = selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src").split("")
    arrColor.splice(-4)     // Удаляю последние 4 символа (".png")
    arrColor.splice(0, 16)  // Удаляю первые 16 символов, оставляя лишь название самого цвета

    taskArr.newTask_priority_color = arrColor.join("")      // Название цвета у приоритета выбранного пользователем таска
}
// Функция для обновления данных элемента таска
function updateDataTask_element(taskEl, taskArr) {
        taskEl.querySelector(".task__name-task").innerHTML = taskArr.newTask_name      // Название таска
        taskEl.querySelector(".task__description-task-text").innerHTML = taskArr.newTask_description    // Описание таска
        
    
        taskEl.querySelector(".task__typeTask span").innerHTML = taskArr.newTask_typeTask_name  // Имя типа таска

        taskEl.querySelector(".task__imgBlock-typeTask img").setAttribute("src", taskArr.newTask_typeTask_icon_src)  // Иконка типа таска
        
        taskEl.querySelector(".task__wrapper-button-task-checkbox button").className = "task__button-task-checkbox"  // Очищаю от текущеко класса, отвечающего за цвет. Оставляю лишь общий
        taskEl.querySelector(".task__wrapper-button-task-checkbox button").classList.add(`task__button-task-checkbox_${taskArr.newTask_priority_color}`)      // Цвет кружка  

        taskEl.querySelector(".task__wrapper-button-task-checkbox img").setAttribute("src", `./icon/MarkOk_${taskArr.newTask_priority_color}.png`)     // Цвет галочки внутри кружка
}


let timeVar2 = ''           // (для работы с доп функциями при клике на кнопку добавления нового таска)
let currentLi_klick = null
// Кнопка добавления нового срока выполнения таску (одна из 3 доп функций таска)
todayTaskOuter.addEventListener("click", function(e) {
    const targetBtn = e.target.closest(".task__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 
    const targetBtnIcon = e.target.closest(".task__dopFunction_iconWrap")
    let defaultLocation = formFromAddNewTask.querySelector(".form-from-add-new-task__setting-deadline") // Стандартное расположение скрытого меню deadline. (внутри формы для добавления нового таска)
    
    // Если клик был вне контейнера с кнопкой "NewDeadline", то игнорируем
    if (!targetBtn) return

    // Если клик был вне контейнера с иконкой кнопки "NewDeadline" (даже если например, на календарь), то игнорируем
    if (!targetBtnIcon) return

    // Если меню скрыто
    if (hiddenMenuDeadline.classList.contains("hide2") == true) {   
        targetBtn.append(hiddenMenuDeadline)                   // Перемещаю меню выбора к текущему таску, к кнопке "NewDeadline"
        hiddenMenuDeadline.classList.remove("hide2")        // Показываю это меню выбора (удаляю скрытие)
        timeVar2 = 1
        currentLi_klick = e.target.closest("li")            // Отмечаю в глобальную переменную - таск, внутри которого был совершён клик по кнопке
    }
    
    // Если меню отображено (не скрыто)
    else if (hiddenMenuDeadline.classList.contains("hide2") == false && timeVar2) {     
        hiddenMenuDeadline.classList.add("hide2")               // Скрываю это меню выбора
        defaultLocation.append(hiddenMenuDeadline)              // Перемещаю меню выбора обратно в форму для создания нового таска
        setTimeout(() => timeVar2='', 100)
        
        currentLi_klick = null                                  // Удаляю отметку о текущем таске

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()
    }
})








// Отображение галочки в кружке-конпке при наведении на кружок:

let currentBtnCheckbox = null   // Элемент task__button-task-checkbox под курсором в данный момент (если есть)
todayTaskOuter.addEventListener("mouseover", function(e) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentBtnCheckbox есть, то мы ещё не ушли с предыдущего кружка, это переход внутри - игнорируем такое событие
    if (currentBtnCheckbox) return
    let target2 = e.target.closest(".task__button-task-checkbox")
    if (!target2) return

    // ура, мы зашли на новый кружок
    currentBtnCheckbox = target2
    show_mark_OK(currentBtnCheckbox.querySelector("img"))     // Показываем галочку внутри этого элемента   
})

todayTaskOuter.addEventListener("mouseout", function(e) { 
     // если мы вне кружка, то игнорируем уход мыши. Это какой-то переход внутри .todayTaskOuter, но вне кружка
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
todayTaskOuter.addEventListener("click", function(e) {
    let target = e.target.closest(".task__button-task-checkbox")   //Нажатый кружок
    let targetLi = e.target.closest(".task")       // Задача, внутри которой был нажат кружок
    if (!target) return

    removeTask(targetLi)
    // targetLi.remove()

    // let liFromArr   // id таска в массиве
    // // Перебираю массив тасков и id того, что совпадает с id  html-элементом таска, который собираются удалить
    // for (let i = 0; i < all_tasks.length; i++) {
    //     if (all_tasks[i].newTask_ID == targetLi.getAttribute("id")) {
    //         liFromArr = i   
    //         break
    //     }
    // }


    // all_tasks.splice(liFromArr, 1)     // Удаляю этот таск из массива с тасками
    // countTasksToday.innerHTML = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков
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


    all_tasks.splice(liFromArr, 1)     // Удаляю этот таск из массива с тасками
    countTasksToday.innerHTML = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков
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
    todayTaskOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
        task.classList.remove("hide2")
    })
    formFromAddNewTask.classList.remove("hide2")


    // Показываю кнопку для создания таска. И скрываю кнопку для сохранения изменений при редактированини таска
    buttonAddNewTask.classList.remove("hide2")
    buttonSaveTask.classList.add("hide2")

    
    // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
    reloadFormAddTask()
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
    selectTypeTask.querySelector("span").classList.remove("darkned")
    selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")
})


// Появление и скрытие поле с выбором типа таска в меню создания новой задачи
let timeVar = ''
selectTypeTask.addEventListener("click", function(e) {      // При нажатии на кнопку 
    if (conteinerFromHiddenMenuTypesTasks.classList.contains("hide2") == false) {       // Если скрытое меню показано (не скрыто)
        conteinerFromHiddenMenuTypesTasks.classList.add("hide2")    // Скрываю меню выбора типа таска
 
        selectTypeTask.classList.remove("active")
    }
    else
    {
        // Скрываю скрытые меню выбора срока выполнения таска и меню выбора приоритета, если они были открыты
        hiddenMenuDeadline.classList.add("hide2")
        hiddenMenuPriority.classList.add("hide2")


        conteinerFromHiddenMenuTypesTasks.classList.remove("hide2")     // Показываю меню выбора типа таска

        // Добавляю "active" для постоянного выделения  
        selectTypeTask.classList.add("active")

        timeVar = 1;  
    }
})

conteinerFromHiddenMenuTypesTasks.addEventListener("click", function(e) {     // При нажатии на само поля выбора
    timeVar = 1;  
})

body.addEventListener("click", function(e) {      // При нажатии вне поля выбора - скрывается
    if (!timeVar) {
        conteinerFromHiddenMenuTypesTasks.classList.add("hide2") 
        selectTypeTask.classList.remove("active")
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

        conteinerFromHiddenMenuTypesTasks.classList.add("hide2")
    })
})



// Изменение полей выбора срока выполнения и приоритета, при нажатии на крестик
formFromAddNewTask.querySelectorAll(".form-from-add-new-task__icon-cross").forEach(function(crossItem) {
    crossItem.addEventListener("click", function(e) {
        const parentEl = crossItem.closest("div")
        if (parentEl.classList.contains("form-from-add-new-task__select-deadline")) {
            parentEl.querySelector(".form-from-add-new-task__text-settings").innerHTML = "Срок выполнения"
        } else if (parentEl.classList.contains("form-from-add-new-task__select-priority")) {
            parentEl.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", "./icon/priority_4.png")
            parentEl.querySelector(".form-from-add-new-task__text-settings").innerHTML = "Приоритет"
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





// Появление и скрытие поля с выбором срока выполнения задачи в меню создания новой задачи
timeVar = ''
selectDeadline.addEventListener("click", function(e) {      // При нажатии на кнопку 
    const btnCross = selectDeadline.querySelector(".form-from-add-new-task__icon-cross")
    // Если доп меню показано (не скрыто) и клик был на крестик и крестик показан (не скрыт)
    if (hiddenMenuDeadline.classList.contains("hide2") == false && e.target == btnCross.querySelector("img") && btnCross.classList.contains("hide2") == false) {
        btnCross.classList.add("hide2")  // ещё раз прописываю скрытие, ибо событие клика по крестику (отдельное) не скроет его (но изменит содержание тега с текстом)
    } 
    // Иначе, если доп меню показано (не скрыто) (и клик был не на крестик, соответственно)
    else if (hiddenMenuDeadline.classList.contains("hide2") == false) {
        hiddenMenuDeadline.classList.add("hide2") 
        isObservHiddenMenus = false
        observFunc(selectDeadline)
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
        timeVar = 1;  

        isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(selectDeadline)  // При первом открытии скрытого меню, начнётся отслеживание изменения окна "selectDeadline"
    }
})

hiddenMenuDeadline.addEventListener("click", function(e) {     // При нажатии на само поля выбора
    let defaultLocation = formFromAddNewTask.querySelector(".form-from-add-new-task__setting-deadline") // Стандартное расположение скрытого меню deadline. (внутри формы для добавления нового таска)
    timeVar = 1;  
    timeVar2 = 1        // (для работы с доп функциями при клике на кнопку добавления нового таска)

    // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    if ((currentLi_klick != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        hiddenMenuDeadline.classList.add("hide2")       // Скрываю само меню
        defaultLocation.append(hiddenMenuDeadline)      // Перемещаю меню выбора обратно в форму для создания нового таска

        // Скрываю все доп функции таска
        currentLi_klick.querySelector(".task__btnEdit").classList.add("hide1")
        currentLi_klick.querySelector(".task__btnNewDeadline").classList.add("hide1")
        currentLi_klick.querySelector(".task__addComment").classList.add("hide1")

        // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
        currentLi_klick = null 
        currentLi = null


        setTimeout(() => timeVar2='', 100)

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()
    }

    if (isObservHiddenMenus == false) {
        isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(selectDeadline)   // Начинается слежка за "selectDeadline", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
})

body.addEventListener("click", function(e) {      // При нажатии вне поля выбора
    const targetLi = e.target.closest(".task")     // Элемент для определения нового срока выполнения таску (одна из трёх кнопок доп функций таска)
    const targetBtn = e.target.closest(".task__btnNewDeadline")   // Была ли нажата кнопка "NewDeadline" 
    const defaultLocation = formFromAddNewTask.querySelector(".form-from-add-new-task__setting-deadline") // Стандартное расположение скрытого меню deadline. (внутри формы для добавления нового таска)


    // Если клик был вне поля выбора и не на кнопку ".task__btnNewDeadline" (иконку), и при этом ранее не был отмечен текущий таск по клику (перед этим кликом не нажалась кнопка ".task__btnNewDeadline" (иконка), после которой отображается меню выбора срока выполнения)
    if (!timeVar && targetLi == null && currentLi_klick == null) {     // Если клик был вне поля и не на кнопку ".task__btnNewDeadline" (на иконку) и ранее не был отмечен текущий таск по клику
        isObservHiddenMenus = false
        observFunc(selectPriority)

        hiddenMenuDeadline.classList.add("hide2") 
    } 
    
    // Если клик был вне поля выбора и вне элемента таска (li), и при этом уже был отмечен текущий таск по клику (ранее уже нажалась кнопка ".task__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
    if (!timeVar && targetLi == null && currentLi_klick != null) {
        hiddenMenuDeadline.classList.add("hide2")
        defaultLocation.append(hiddenMenuDeadline)      // Перемещаю меню выбора обратно в форму для создания нового таска

        // Скрываю все доп функции таска
        currentLi_klick.querySelector(".task__btnEdit").classList.add("hide1")
        currentLi_klick.querySelector(".task__btnNewDeadline").classList.add("hide1")
        currentLi_klick.querySelector(".task__addComment").classList.add("hide1")


        currentLi_klick = null              // Удаляю отметку о текущем таске с отслеживателя по клику

        setTimeout(() => timeVar2='', 100)

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()
    }

    // Если клик был вне поля выбора и не на кнопку ".task__btnNewDeadline" (иконку) (т.е., например, на сам элемент li, или другие его элементы, кроме "newDeadline"), и при этом уже был отмечен текущий таск по клику (ранее уже нажалась кнопка ".task__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
    if (!timeVar && !targetBtn && currentLi_klick != null) {
        hiddenMenuDeadline.classList.add("hide2")
        defaultLocation.append(hiddenMenuDeadline)      // Перемещаю меню выбора обратно в форму для создания нового таска

        currentLi_klick = null              // Удаляю отметку о текущем таске с отслеживателя по клику

        setTimeout(() => timeVar2='', 100)

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()
    }

    


    if (timeVar) { 
        setTimeout(() => timeVar='', 100)
    }  

})






//Функция для очистки стиля "выбранного элемента" со всех deadlineItem, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик.
function reloadItemsDeadline(currentItemDeadline) {
    deadlineItem.forEach(function(itemDeadline) { 
        itemDeadline.classList.remove("hovered_select_menu")
    })
    if (currentItemDeadline) {
        currentItemDeadline.classList.add("hovered_select_menu")
    }
}

// Выбор срока выполнения таска (при выборе из списка вариантов):
deadlineItem.forEach(function(item) {
    item.addEventListener("click", function(e) {
        // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
        if (selectedDay && selectedDay != "") {
            selectedDay.classList.remove("-selected-")
        }

        const nameItemDeadline = item.querySelector(".form-from-add-new-task__deadline-name").innerHTML
        const textAreaDeadline = selectDeadline.querySelector(".form-from-add-new-task__text-settings")     // Поле с текстом для выбранного срока

        if (nameItemDeadline == "Сегодня" && textAreaDeadline.innerHTML != `${nowDay} ${nowMonth}`) {
            textAreaDeadline.innerHTML = `${nowDay} ${nowMonth}`
            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline(item)

        } else if (nameItemDeadline == "Завтра" && textAreaDeadline.innerHTML != `${nowDay+1} ${nowMonth}`) {
            textAreaDeadline.innerHTML = `${nowDay+1} ${nowMonth}`
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

            if (textAreaDeadline.innerHTML != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend)}`) {
                textAreaDeadline.innerHTML = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend)}`

                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
            }

        } else if (nameItemDeadline == "След. неделя") {
            let dataNextWeek = new Date()   // Создаю новый объект даты
            dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)

            if (textAreaDeadline.innerHTML != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`) {
                textAreaDeadline.innerHTML = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`

                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline(item)
            }

        } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerHTML != "Срок выполнения") {
            isObservHiddenMenus = false


            textAreaDeadline.innerHTML = "Срок выполнения"
            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline(item)

            selectDeadline.querySelector(".form-from-add-new-task__icon-cross").classList.add("hide2")
        } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerHTML == "Срок выполнения") {
            isObservHiddenMenus == false
        }
    })
})


// Выбор срока выполнения таска (при выборе в календаре):
let selectedDay
DeadlineCalendare.addEventListener("click", function(e) {
    let target = e.target       // Где был совершён клик?

    if (!target.classList.contains("air-datepicker-cell")) return       // Если клик был не на элементе с ячейкой даты, то клик игнорируется

    showElCalentare(target)     // Если клик был по ячейке с датой, до запускается функция, где уже будет произведена работа с выбранной ячейкой
})
function showElCalentare(currData) {
    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
    reloadItemsDeadline()
    const textAreaDeadline = selectDeadline.querySelector(".form-from-add-new-task__text-settings")
    selectedDay = currData

    const dataDay = selectedDay.getAttribute("data-date")   // Выбранный номер дня месяца
    const dataMonth = selectedDay.getAttribute("data-month")    // Выбранный месяц (числом)

    const selectDataCalendare = new Date(dataDay, dataMonth)        // Создаю каллендарь на основании выбранного дня и месяца
    const optionsSelection = {  
        month: "short"
    }
    // Создаю переменную с текстовым обозначением выбранного в календаре месяца
    const selectMonthDataCalendare = (Intl.DateTimeFormat(localLanguage, optionsSelection).format(selectDataCalendare))

    // Ввожу в поле с выбором срока выполнения - выбранную в календаре дату (число + месяц)
    isObservHiddenMenus = true
    observFunc(selectDeadline)
    if (textAreaDeadline.innerHTML != dataDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
        textAreaDeadline.innerHTML = dataDay + " " + selectMonthDataCalendare
    }

    
}



// Появление и скрытие поле с выбором приоритета задачи в меню создания новой задачи
timeVar = ''
selectPriority.addEventListener("click", function(e) {      // При нажатии на кнопку 
    const btnCross = selectPriority.querySelector(".form-from-add-new-task__icon-cross")

    // Если доп меню показано (не скрыто) и клик был на крестик и крестик показан (не скрыт)
    if (hiddenMenuPriority.classList.contains("hide2") == false && e.target == btnCross.querySelector("img") && btnCross.classList.contains("hide2") == false) {
        btnCross.classList.add("hide2")  // ещё раз прописываю скрытие, ибо событие клика по крестику (отдельное) не скроет его (но изменит содержание тега с текстом)
    } 
    // Иначе, если доп меню показано (не скрыто) (и клик был не на крестик, соответственно)
    else if (hiddenMenuPriority.classList.contains("hide2") == false) {
        hiddenMenuPriority.classList.add("hide2") 
        isObservHiddenMenus = false
        observFunc(selectPriority)
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
    }
})

hiddenMenuPriority.addEventListener("click", function(e) {     // При нажатии на само поля выбора
    timeVar = 1;
    
    if (isObservHiddenMenus == false && selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML == "Приоритет") {
        isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
        observFunc(selectPriority)   // Начинается слежка за "selectPriority", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
    }
})

body.addEventListener("click", function(e) {      // При нажатии вне поля выбора - скрывается
    if (!timeVar) {
        isObservHiddenMenus = false
        observFunc(selectPriority)
        hiddenMenuPriority.classList.add("hide2") 
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

    })
})








// При нажатии на кнопку добавления нового таска в меню создания
buttonAddNewTask.addEventListener("click", function(e) {
    if (buttonAddNewTask.getAttribute("aria-disabled") == "false") {
        let colorPriority
        if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_red.png") {
            colorPriority = "red"
        } else if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_orange.png") {
            colorPriority = "orange"
        } else if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_blue.png") {
            colorPriority = "blue"
        } else {colorPriority = "ser"}

        tasksId += 1    // Увеличение подсчёта id для создания нового таска. То-есть новый таск будет с повышенным на +1 id
        const contentNewTask = {    // Создаю объект из введённых данных
            newTask_name: nameNewTask.value, 
            newTask_description: description.value, 
            newTask_typeTask_name: selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML,
            newTask_typeTask_icon_src: selectTypeTask.querySelector(".form-from-add-new-task__icon_type").getAttribute("src"),
            newTask_deadlineTask: selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML,
            newTask_priority_name: selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML,
            newTask_priority_color: colorPriority,
            newTask_ID: tasksId
        }
        funcAddNewTask(contentNewTask)      // Запускаю функцию для добавления нового html элемента с новым таском
        all_tasks.push(contentNewTask)     // Добавляю созданый объект в массив из списка всех тасков
        countTasksToday.innerHTML = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        todayTaskOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })
        formFromAddNewTask.classList.add("hide2")
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
            <div class="task__typeTask">
                <span>${content.newTask_typeTask_name}</span>
                <div class="task__imgBlock-typeTask"><img src="${content.newTask_typeTask_icon_src}" alt=""></div>
                <img class="task__imgBlock-typeTask_grid" src="./icon/grid_0.png" alt="">
            </div>
        </div>
        <div class="task__dopFuncs" aria-label="Дополнительные функции для управления задачей">
            <div class="task__dopFunction task__btnEdit hover-hint hide1" data-title="Редактировать задачу">
                <div class="task__dopFunction_iconWrap">
                    <img src="./icon/edit.png" alt="">
                </div>
            </div>
            <div class="task__dopFunction task__btnNewDeadline hover-hint hide1" data-title="Назначить срок">
                <div class="task__dopFunction_iconWrap">
                    <img src="./icon/deadline_task.png" alt="">
                </div>
            </div>
            <div class="task__dopFunction task__addComment hover-hint hide1" data-title="Прокомментировать задачу">
                <div class="task__dopFunction_iconWrap">
                    <img src="./icon/addComment_task.png" alt="">
                </div>
            </div> 
        </div>
    </div>
    </li>
    `
    todayTaskOuter.insertAdjacentHTML("afterbegin", html)     // Добавляю новый html элемент таска в начало
}

function reloadFormAddTask() {
    nameNewTask.value = ""  
    description.value = ""
    buttonAddNewTask.setAttribute('aria-disabled', 'true')
    isObservHiddenMenus = false
    selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML = "Срок выполнения"
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


}


// Скрытие меню добавления нового таска (/изменения выбранного) при нажатии на кнопку "Отмена" 
buttonCloseMenuNewTask.addEventListener("click", function(e) {
    formFromAddNewTask.classList.add("hide2")   // Скрывается Блок "formFromAddNewTask"
    sectionContentBlock_viewContent.append(formFromAddNewTask)  // Блок "formFromAddNewTask" перемещается в конец
    // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
    todayTaskOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
        task.classList.remove("hide2")
    })

    // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
    reloadFormAddTask()

    if (!currentLi) return  // Если кнопка отмены была нажата вне поля редактирования таска, то игнорировать
    // Скрываю все доп функции таска
    currentLi.querySelector(".task__btnEdit").classList.add("hide1")
    currentLi.querySelector(".task__btnNewDeadline").classList.add("hide1")
    currentLi.querySelector(".task__addComment").classList.add("hide1")
    // Удаляю отметку о текущем таске с отслеживания при наведении
    currentLi = null
})


// Скрытие меню добавления нового таска (/изменения выбранного) при нажатии "Enter", при фокусировке на этом поле
formFromAddNewTask.addEventListener("keydown", function(e) {
    if (e.key == "Enter" && nameNewTask.value != "") {
        formFromAddNewTask.classList.add("hide2")   // Скрывается Блок "formFromAddNewTask"
        sectionContentBlock_viewContent.append(formFromAddNewTask)  // Блок "formFromAddNewTask" перемещается в конец
        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
        todayTaskOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()
    }
})







// МОДАЛЬНОЕ ОКНО:


let modal = ""
todayTaskOuter.addEventListener("click", function(e) {
    let targetLi = e.target.closest(".task")
    

    if (!e.target.closest(".task__wrapper")) return    // Если клик был вне таска (вне его основного каркаса), то игнорировать клик
    if (e.target.closest(".task__dopFuncs")) return    // Если была нажата одна из кнопок доп.функций таска, то игнорировать клик
    if (e.target.closest(".task__wrapper-button-task-checkbox")) return     // Если была нажата кнопка-кружочек у таска (для удаляения таска), то игнорировать клик


    


    let currentIdTask = Number(targetLi.getAttribute("id"))         // id у html элемента таска
    let currentTask_arr = ""                            // Текущий объект таска в массиве

    currentTask_arr = all_tasks.find(function(el) {       // Присваиваю переменной тот таск, который имеет тот же id, что и выбранный html элемент таска
        return el.newTask_ID == currentIdTask
    })

    let currentIdTask_arr = currentTask_arr.newTask_ID          // id таска у выбранного элемента массива

    const currentTask_typeTask_icon = currentTask_arr.newTask_typeTask_icon_src
    const currentTask_typeTask_name = currentTask_arr.newTask_typeTask_name
    const currentTask_priority_color = currentTask_arr.newTask_priority_color
    const currentTask_priority_name = currentTask_arr.newTask_priority_name
    const currentTask_name = currentTask_arr.newTask_name
    const currentTask_description = currentTask_arr.newTask_description
    const currentTask_deadline = currentTask_arr.newTask_deadlineTask

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
                <div class="itc-modal-body__hiddenMenuTypesTask hide2">
                    <div class="itc-modal-body__wrapper-inpSearch">
                        <input type="text" name="searchType" id="search-type-task" list="list-types-task" placeholder="Введите название проекта">
                        <datalist id="list-types-task">
                            <option value="Дом"></option>
                            <option value="Работа"></option>
                            <option value="Учёба"></option>
                        </datalist>
                    </div>
                    <ul class="my-type-projects my-type-projects__conteiner_from-hiddenMenu">
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
                    </div>
                    <div class="itc-modal-body__icon-down_wrapper hide2">
                        <img class="itc-modal-body__icon-down" src="icon/down.png">
                    </div>
                </div>
                <div class="itc-modal-body__hiddenMenu-deadline hide2">
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
                <div class="itc-modal-body__hiddenMenu-priority hide2">
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


    
    const modalTitle = document.querySelector(".itc-modal-title")
    const modalContent = document.querySelector(".itc-modal-body")
    const modalAside = document.querySelector(".itc-modal-body__aside")

    const modalBtn_GroupTypeTask = document.querySelector('.itc-modal-body__select-setting[data-title="Перенести в..."]')       // Кнопка в м.о. для изменения типа таска
        const conteinerFromHiddenMenuTypesTasks_modal = document.querySelector(".itc-modal-body__hiddenMenuTypesTask")      // Скрытое меню выбора типа таска в м.о. 

    // Поле для выбора срока выполнения таска в м.о.
    const modalBtn_GroupDeadlineTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить новой крайний срок..."]')      
        // Скрытое меню выбора срока выполнения таска в м.о. 
        const conteinerFromHiddenMenuDeadlineTasks_modal = document.querySelector(".itc-modal-body__hiddenMenu-deadline")      
            // Элементы li с вариантами срока выполнения
            const deadlineItem_modal = document.querySelectorAll(".itc-modal-body__deadline-item")      

    
    // Поле для выбора приоритета таска в м.о.
    const modalBtn_GroupPriorityTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить приоритет..."]') 
        // Скрытое меню выбора приоритета таска в м.о.       
        const conteinerFromHiddenMenuPriorityTasks_modal = document.querySelector(".itc-modal-body__hiddenMenu-priority")
            // Элементы li с вариантами приоритета
            const priorityItem_modal = document.querySelectorAll(".itc-modal-body__priority-item")


    const typesProjectForSelect_modal = document.querySelectorAll(".itc-modal-body__hiddenMenuTypesTask .my-type-projects__type-project")   // Элементы li с типом таска

    const modalWindow = document.querySelector(".itc-modal-content")      // Само модальное окно
    const buttonCloseEdit = modalWindow.querySelector(".btn-close")     // Кнопка закрытия редактирования в м.о.
    const buttonSaveEdit = modalWindow.querySelector(".btn-save")       // Кнопка сохранения редактирования в м.о.


    const modal_wrapper_name_description = modalWindow.querySelector(".task__innerWrap-name-description")   // Контейнер с именем и описанием таска

    let div_name_task               // div с именем таска 
    let div_description_task        // div с описанием таска 

    let el_textarea_name            // Поле для заполнения имени таска
    let el_textarea_description     // Поле для заполнения описания таска


    // Функция проверки и изменения состояния кнопок навигации (prev/next) в м.о.
    function checkNavArrow_modal(curId) {
        // Если выбраный таск является первым (самым недавно созданным) (id выбранного таска в массиве равен id у html-дока), то стрелочка "prev" диактивируется. В ином случае, - активируется
        if (all_tasks[all_tasks.length - 1].newTask_ID == curId) {
            document.querySelector(".itc-modal-header__btn-prev-task").classList.add("disabled")
            document.querySelector(".itc-modal-header__btn-prev-task").setAttribute("aria-disabled", "true");
            document.querySelector(".itc-modal-header__btn-prev-task").classList.remove("hover-hint_black");
        } else if (all_tasks[all_tasks.length - 1].newTask_ID != curId) {
            document.querySelector(".itc-modal-header__btn-prev-task").classList.remove("disabled")
            document.querySelector(".itc-modal-header__btn-prev-task").setAttribute("aria-disabled", "false");
            document.querySelector(".itc-modal-header__btn-prev-task").classList.add("hover-hint_black");
        }


        // Если выбраный таск является последним (в массиве index=0), то стрелочка "next" диактивируется. В ином случае, - активируется
        if (all_tasks[0].newTask_ID == curId) {
            document.querySelector(".itc-modal-header__btn-next-task").classList.add("disabled")
            document.querySelector(".itc-modal-header__btn-next-task").setAttribute("aria-disabled", "true");
            document.querySelector(".itc-modal-header__btn-next-task").classList.remove("hover-hint_black");
        } else if (all_tasks[0].newTask_ID != curId) {     // Иначе, если наоборот, то:
            document.querySelector(".itc-modal-header__btn-next-task").classList.remove("disabled")
            document.querySelector(".itc-modal-header__btn-next-task").setAttribute("aria-disabled", "false");
            document.querySelector(".itc-modal-header__btn-next-task").classList.add("hover-hint_black");
        }
    }
    checkNavArrow_modal(currentIdTask)      // Сразу же вызываем эту функцию, вставив в аргумент id выбранного html элемента таска


    // При клике на стрелочку "prev"
    document.querySelector(".itc-modal-header__btn-prev-task").addEventListener("click", function(e) {
        // Если стрелка "prev" имеет аттрибут "aira-disabled = false" (кнопка не деактивирована)
        if (document.querySelector(".itc-modal-header__btn-prev-task").getAttribute("aria-disabled") == "false") {
            currentIdTask_arr += 1      // Увеличиваю число id, что бы он соответствовал тому таску в массиве, на который нужно перейти
            // Текущий выбранный (новый, после нажатия на стрелочку) таск меняется на тот, что соответствует новому id (увеличенному на 1)   
            currentTask_arr = all_tasks[currentIdTask_arr]  
            targetLi = document.getElementById(currentIdTask_arr) 
  

            // Вызываю функцию для обновления содержания модального окна
            updateModal(currentTask_arr)
            // Вызываю функцию для отслеживания и изменения состояния стрелок навигации.
            checkNavArrow_modal(currentIdTask_arr)

            // Удаляю оба textarea, возвращаю видимость div-ов, скрываю кнопки "Отмена" и "Ошибка"
            clickCloseEditModal()


            const checkbox_modal = document.querySelector(".itc-modal-body__main-content .task__button-task-checkbox")      // Сам кнопка-кружок возле имени таска в м.о.
            const checkbox_modal_icon = checkbox_modal.querySelector("img")         // Галочка в кружочке

            // Отображение галочки в кружке-конпке при наведении на кружок:
            checkbox_modal.addEventListener("mouseover", function(e) {
                checkbox_modal_icon.classList.remove("hide2")
            })
            checkbox_modal.addEventListener("mouseout", function(e) {
                checkbox_modal_icon.classList.add("hide2")
            })
        }
    })

    // При клике на стрелочку "next"
    document.querySelector(".itc-modal-header__btn-next-task").addEventListener("click", function(e) {
        // Если стрелка "next" имеет аттрибут "aira-disabled = false" (кнопка не деактивирована)
        if (document.querySelector(".itc-modal-header__btn-next-task").getAttribute("aria-disabled") == "false") {
            currentIdTask_arr -= 1      // Уменьшаю число id, что бы он соответствовал тому таску в массиве, на который нужно перейти
            // Текущий выбранный (новый, после нажатия на стрелочку) таск меняется на тот, что соответствует новому id (увеличенному на 1)   
            currentTask_arr = all_tasks[currentIdTask_arr]

            targetLi = document.getElementById(currentIdTask_arr) 

            // Вызываю функцию для обновления содержания модального окна
            updateModal(currentTask_arr)
            // Вызываю функцию для отслеживания и изменения состояния стрелок навигации.
            checkNavArrow_modal(currentIdTask_arr)

            // Удаляю оба textarea, возвращаю видимость div-ов, скрываю кнопки "Отмена" и "Ошибка"
            clickCloseEditModal()



            const checkbox_modal = document.querySelector(".itc-modal-body__main-content .task__button-task-checkbox")      // Сам кнопка-кружок возле имени таска в м.о.
            const checkbox_modal_icon = checkbox_modal.querySelector("img")         // Галочка в кружочке

            // Отображение галочки в кружке-конпке при наведении на кружок:
            checkbox_modal.addEventListener("mouseover", function(e) {
                checkbox_modal_icon.classList.remove("hide2")
            })
            checkbox_modal.addEventListener("mouseout", function(e) {
                checkbox_modal_icon.classList.add("hide2")
            })
        }
    })



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

        // Вставляю в aside тип таска, на который переключились
        modalContent.querySelector(".itc-modal-body__select-setting .wrapper-type-task__name").innerHTML = modalAside_nameTypeTask
        modalContent.querySelector(".wrapper-type-task__icon-type-project").setAttribute("src", modalAside_iconTypeTask)

        // Вставляю в aside срок выполнения таска, на который переключились
        modalContent.querySelector(".itc-modal-body__select-setting .itc-modal-body__text-settings").innerHTML = modalAside_deadlineTask

        // Вставляю в aside приоритет таска, на который переключились
        modalContent.querySelector(".itc-modal-body__wrapper-priority .itc-modal-body__text-settings").innerHTML = modalAside_priorityNameTask     
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
            itemPriority.querySelector(".itc-modal-body__priority-icon-selected").classList.add("hide2")    // Удаляю галочки у ранее выбранного элемента (если такой был)
        })
    }


    // При клике на поле с именем/описанием таска
    modal_wrapper_name_description.addEventListener("click", clickNameDescriptionModal)
    function clickNameDescriptionModal(event) {
        if (!event.target.closest(".task__innerWrap-name-description div")) return      // Если клик был не по div-ам с именем/описанием таска, но по их контейнеру - игнорируем

        // Создаю и даю значение новой переменной, нужной для обозначения того, на какой именно из элементов div был совершён клик (на имя или на описание таска)
        let focusTextarea = ""      
        if (event.target.closest(".task__name-task")) {
            focusTextarea = "name"
        } else if (event.target.closest(".task__description-task")) {
            focusTextarea = "description"
        }


        div_name_task = modal_wrapper_name_description.querySelector(".task__name-task")    // div с именем таска 
        div_description_task = modal_wrapper_name_description.querySelector(".task__description-task")  // div с описанием таска 
        // Скрываю div-ы с именем и описанием таска
        div_name_task.classList.add("hide2")       
        div_description_task.classList.add("hide2")

        // Добавляю их контейнеру класс "ramka", для выделения двух полей textarea
        modal_wrapper_name_description.classList.add("ramka")


        // Переменная с двумя textarea, которые затем будут вставлены в html код
        const modal_newTextarea = `
        <textarea class="itc-modal-content__textarea-name-task" name="name-task" placeholder="Название задачи" rows="1"></textarea>
        <textarea class="itc-modal-content__textarea-description-task" rows="1" name="description-task" placeholder="Описание задачи"></textarea>
        `
        // Вставляю поля textarea в контейнер, где были ранее отображены div-ы с именем/описанием таска
        modal_wrapper_name_description.insertAdjacentHTML("afterbegin", modal_newTextarea)

        // Создаю переменные, присвоим им html элементы созданных и добавленных textarea (2шт)
        el_textarea_name = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-name-task")
        el_textarea_description = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-description-task")

        // Вставляю в эти textarea значения имени/описания текущего таска (которые были внутри ранее отображаемого div-а)
        el_textarea_name.value = div_name_task.innerHTML 
        el_textarea_description.value = div_description_task.querySelector("span").innerHTML 

        // Создаю для этих двух textarea обработчик события, который запускает функцию "resizeTextarea" каждый раз, когда что-то вводится в о поле textarea
        el_textarea_name.addEventListener("input", resizeTextarea)
        el_textarea_description.addEventListener("input", resizeTextarea)


        // Делаю фокус на одном из textarea, в зависимости от того, на какой элемент div был совершён клик (на имя или на описание)
        if (focusTextarea == "name") {
            el_textarea_name.focus()
        }
        if (focusTextarea == "description") {
            el_textarea_description.focus()
        }

        // Убираю скрытие с кнопок "Отмена" и "Сохранить"
        buttonCloseEdit.classList.remove("hide2")
        buttonSaveEdit.classList.remove("hide2")
    }

    // Функция для настройки изменяемой (растягивающейся) высоты поля - textarea, по мере его заполнения
    function resizeTextarea(_e) {     
        let event = _e || event || window.event
        let getElement = event.target || event.srcElement
        getElement.style.height = "auto"; 

        getElement.style.height = Math.max(getElement.scrollHeight, getElement.offsetHeight)+"px"
    }


    // При клике на кнопку "Отмена"
    buttonCloseEdit.addEventListener("click", clickCloseEditModal)
    function clickCloseEditModal() {      
        if (!el_textarea_name) return   // Если элемент textarea в м.о. ещё не был создан, то пропускаем

        // Удаляюю оба поля textarea
        el_textarea_name.remove()
        el_textarea_description.remove()

        // Убираю скрытие с элементов div (с именем/описанием таска)
        div_name_task.classList.remove("hide2")
        div_description_task.classList.remove("hide2")

        // Убираю класс "ramka" с контейнера у имени/описания таска
        modal_wrapper_name_description.classList.remove("ramka")

        // Скрываю кнопку "Отмена" и "Сохранить"
        buttonCloseEdit.classList.add("hide2")
        buttonSaveEdit.classList.add("hide2")
    }


    // При клике на кнопку "Сохранить"
    buttonSaveEdit.addEventListener("click", clickSaveEditModal)
    function clickSaveEditModal() {
        if (!el_textarea_name) return       // Если элемент textarea в м.о. ещё не был создан, то пропускаем

        // Обновляю оба поля div с именем/описанием таска (внутри м.о.)
        div_name_task.innerHTML = el_textarea_name.value
        div_description_task.querySelector("span").innerHTML = el_textarea_description.value

        //  Изменяю имя и описание текущего таска внутри массива (с этим таском)
        currentTask_arr.newTask_name = el_textarea_name.value
        currentTask_arr.newTask_description = el_textarea_description.value

        // Вызываю функцию для обновления html элемента с текущим таском
        updateDataTask_element(targetLi, currentTask_arr)

        // Удаляюю оба поля textarea
        el_textarea_name.remove()
        el_textarea_description.remove()

        // Убираю скрытие с элементов div (с именем/описанием таска)
        div_name_task.classList.remove("hide2")
        div_description_task.classList.remove("hide2")

        // Убираю класс "ramka" с контейнера у имени/описания таска
        modal_wrapper_name_description.classList.remove("ramka")

        // Скрываю кнопку "Отмена" и "Сохранить"
        buttonCloseEdit.classList.add("hide2")
        buttonSaveEdit.classList.add("hide2")
    }
    

    const checkbox_modal = document.querySelector(".itc-modal-body__main-content .task__button-task-checkbox")      // Сам кнопка-кружок возле имени таска в м.о.
    const checkbox_modal_icon = checkbox_modal.querySelector("img")         // Галочка в кружочке

    // Отображение галочки в кружке-конпке при наведении на кружок:
    checkbox_modal.addEventListener("mouseover", function(e) {
        checkbox_modal_icon.classList.remove("hide2")
    })
    checkbox_modal.addEventListener("mouseout", function(e) {
        checkbox_modal_icon.classList.add("hide2")
    })



    // Удаление текущего таска при нажатии на кнопку-кружок
    checkbox_modal.addEventListener("click", function(e) {
        // Удаляю текущий таск из html
        targetLi.remove()
        // Удаляю текущий таск из массива
        all_tasks.splice(currentIdTask_arr, 1)

        // Обновляю поле на странице с количеством существующих тасков
        countTasksToday.innerHTML = all_tasks.length    

        modal.dispose()
    })

    

    // При наведении на один из пунктов выбора в modalAside
    modalAside.querySelectorAll(".itc-modal-body__select-setting").forEach(function(setting) {
        // При наведении
        setting.addEventListener("mouseover", function(e) {
            const curbtn = e.target.closest(".itc-modal-body__select-setting")
            curbtn.querySelector(".itc-modal-body__icon-down_wrapper").classList.remove("hide2")
        })
        // При уходе мыши с объекта
        setting.addEventListener("mouseout", function(e) {
            const curbtn = e.target.closest(".itc-modal-body__select-setting")
            curbtn.querySelector(".itc-modal-body__icon-down_wrapper").classList.add("hide2")
        })
    })



    // ИЗМЕНЕНИЕ ТИПА ТАСКА:

    let timeVar_MO = ''
    // При клике на кнопку выбора типа таска в м.о.
    modalBtn_GroupTypeTask.addEventListener("click", function(e) {
        if (conteinerFromHiddenMenuTypesTasks_modal.classList.contains("hide2") == false) {     // Если скрытое меню показано (не скрыто)
            conteinerFromHiddenMenuTypesTasks_modal.classList.add("hide2")      // Скрываю меню выбора типа таска

            modalBtn_GroupTypeTask.classList.add("hover-hint")   // Добавляю обратно класс для стилизации подсказки при наведении
            modalBtn_GroupTypeTask.classList.remove("active")
        }
        else {
            // Скрываю скрытые меню выбора срока выполнения таска и меню выбора приоритета, если они были открыты
            // ..
            conteinerFromHiddenMenuTypesTasks_modal.classList.remove("hide2")   // Показываю меню выбора типа таска

            // Удаляю класс для стилизации подсказки при наведении и добавляю "active" для постоянного выделения
            modalBtn_GroupTypeTask.classList.remove("hover-hint")   
            modalBtn_GroupTypeTask.classList.add("active")
            timeVar_MO = 1
        }
    })

    // При нажатии на само поля выбора
    conteinerFromHiddenMenuTypesTasks_modal.addEventListener("click", function(e) {     
        timeVar_MO = 1
    })
    
    // При нажатии вне поля выбора
    body.addEventListener("click", function(e) {
        if (!timeVar_MO) {
            conteinerFromHiddenMenuTypesTasks_modal.classList.add("hide2")
            modalBtn_GroupTypeTask.classList.add("hover-hint")
            modalBtn_GroupTypeTask.classList.remove("active")
        }

        if (timeVar_MO) {
            setTimeout(() => timeVar_MO='', 100)
        }
    })


    // При выборе типа таска (для изменения)
    typesProjectForSelect_modal.forEach(function(type) {
        type.addEventListener("click", function(e) {
            modalBtn_GroupTypeTask.querySelector(".itc-modal-body__select-setting .wrapper-type-task__name").innerHTML = type.querySelector(".wrapper-type-task__name").innerHTML
            const selectedIcon = type.querySelector(".wrapper-type-task__icon-type-project")
            modalBtn_GroupTypeTask.querySelector(".wrapper-type-task__icon-type-project").setAttribute("src", selectedIcon.getAttribute("src"))
    

            conteinerFromHiddenMenuTypesTasks_modal.classList.add("hide2")
            modalBtn_GroupTypeTask.classList.add("hover-hint")
            modalBtn_GroupTypeTask.classList.remove("active")


            //  Изменяю имя и иконку типа таску внутри массива (с этим таском)
            currentTask_arr.newTask_typeTask_name = type.querySelector(".wrapper-type-task__name").innerHTML
            currentTask_arr.newTask_typeTask_icon_src = modalBtn_GroupTypeTask.querySelector(".wrapper-type-task__icon-type-project").getAttribute("src")

            // Вызываю функцию для обновления html элемента с текущим таском
            updateDataTask_element(targetLi, currentTask_arr)
        })
    })
    
    


    // ИЗМЕНЕНИЕ СРОКА ВЫПОЛНЕНИЯ ТАСКА:

    // 1) Появление и скрытие поля с выбором срока выполнения задачи:
    timeVar_MO = ''

    // 1.1) При клике на кнопку выбора срока выполнения таска в м.о.
    modalBtn_GroupDeadlineTask.addEventListener("click", function(e) {
        // Если доп меню показано (не скрыто)
        if (conteinerFromHiddenMenuDeadlineTasks_modal.classList.contains("hide2") == false) {
            conteinerFromHiddenMenuDeadlineTasks_modal.classList.add("hide2")

            // Перемещаю календарь из м.о., - в конец body страницы
            chestForCalendar.append(DeadlineCalendare_modal)  
            DeadlineCalendare_modal.classList.add("hide2")
        }
        // Иначе, если доп меню скрыто
        else if (conteinerFromHiddenMenuDeadlineTasks_modal.classList.contains("hide2") == true) {
            // Скрываю скрытые меню выбора типа таска и приоритета, если они были открыты
            // ..

            conteinerFromHiddenMenuDeadlineTasks_modal.classList.remove("hide2")    // Показываю скрытое меню срока выполнения

            // Перемещаю календарь в м.о. внутрь скрытого меню изменения срока выполнения таска
            conteinerFromHiddenMenuDeadlineTasks_modal.append(DeadlineCalendare_modal)  
            DeadlineCalendare_modal.classList.remove("hide2")

            timeVar_MO = 1;  
        }
    })

    // 1.2) При нажатии на само поля выбора
    conteinerFromHiddenMenuDeadlineTasks_modal.addEventListener("click", function(e) {
        timeVar_MO = 1;
        if (e.target.closest(".itc-modal-body__deadline-item") || e.target.closest(".-day-")) {
            conteinerFromHiddenMenuDeadlineTasks_modal.classList.add("hide2")   // Скрываю само меню
        }
    })

    // 1.3) При нажатии вне поля выбора
    body.addEventListener("click", clickOuterModal_deadline)
    function clickOuterModal_deadline(elem) {
        const btnClick = e.target.closest('.itc-modal-body__select-setting[data-title="Назначить приоритет..."]')      // Кнопка для открытия скрытого меню выбора срока выполнения
        if (!timeVar_MO && !btnClick) {
            conteinerFromHiddenMenuDeadlineTasks_modal.classList.add("hide2")

            // Перемещаю календарь из м.о., - в конец body страницы
            chestForCalendar.append(DeadlineCalendare_modal) 
            DeadlineCalendare_modal.classList.add("hide2")
        }

        if (timeVar_MO) { 
            setTimeout(() => timeVar_MO='', 100)
        }  
    }

    
    //Функция для очистки стиля "выбранного элемента" со всех deadlineItem, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик.
    function reloadItemsDeadline_modal(currentItemDeadline) {
        deadlineItem_modal.forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
        if (currentItemDeadline) {
            currentItemDeadline.classList.add("hovered_select_menu")
        }
    }

    // 2.1) Выбор срока выполнения таска (при выборе из списка вариантов):
    deadlineItem_modal.forEach(function(item) {
        item.addEventListener("click", function(e) {
            if (selectedDay_modal && selectedDay_modal != "") {
                selectedDay_modal.classList.remove("-selected-")
            }

            const nameItemDeadline_modal = item.querySelector(".itc-modal-body__deadline-name").innerHTML
            const textAreaDeadline_modal = modalBtn_GroupDeadlineTask.querySelector(".itc-modal-body__text-settings")     // Поле с текстом для выбранного срока


            if (nameItemDeadline_modal == "Сегодня" && textAreaDeadline_modal.innerHTML != `${nowDay} ${nowMonth}`) {
                textAreaDeadline_modal.innerHTML = `${nowDay} ${nowMonth}`
                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline_modal(item)
    
            } else if (nameItemDeadline_modal == "Завтра" && textAreaDeadline_modal.innerHTML != `${nowDay+1} ${nowMonth}`) {
                textAreaDeadline_modal.innerHTML = `${nowDay+1} ${nowMonth}`
                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline_modal(item)
    
            } else if (nameItemDeadline_modal == "На выходных") {
                let dataWeekend_modal = new Date()    // Создаю новый объект даты
                // Если сегодня уже суббота, то передвигаю счётчик на 1 вперёд что бы сработал следующий цикл и дошёл до субботы следующей недели
                if (Intl.DateTimeFormat(localLanguage, options3).format(dataWeekend_modal) != "суббота") {
                    dataWeekend_modal.setDate(dataWeekend_modal.getDate() + 1)
                }
                // Увеличиваю дату пока не достигну субботы
                while (Intl.DateTimeFormat(localLanguage, options3).format(dataWeekend_modal) != "суббота") {
                    dataWeekend_modal.setDate(dataWeekend_modal.getDate() + 1)
                }
    
                if (textAreaDeadline_modal.innerHTML != `${dataWeekend_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend_modal)}`) {
                    textAreaDeadline_modal.innerHTML = `${dataWeekend_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend_modal)}`
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadline_modal(item)
                }
    
            } else if (nameItemDeadline_modal == "След. неделя") {
                let dataNextWeek_modal = new Date()   // Создаю новый объект даты
                dataNextWeek_modal.setDate(dataNextWeek_modal.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)
    
                if (textAreaDeadline_modal.innerHTML != `${dataNextWeek_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek_modal)}`) {
                    textAreaDeadline_modal.innerHTML = `${dataNextWeek_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek_modal)}`
    
                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadline_modal(item)
                }
    
            } else if (nameItemDeadline_modal == "Без срока" && textAreaDeadline_modal.innerHTML != "Срок выполнения") {
                isObservHiddenMenus = false
    
    
                textAreaDeadline_modal.innerHTML = "Срок выполнения"
                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadline_modal(item)

            } else if (nameItemDeadline_modal == "Без срока" && textAreaDeadline_modal.innerHTML == "Срок выполнения") {
                isObservHiddenMenus == false
            }

            // Обновляю срок выполнения в массиве текущего таска
            currentTask_arr.newTask_deadlineTask = textAreaDeadline_modal.innerHTML
        })
    })

    // 2.2) Выбор срока выполнения таска (при выборе в календаре):
    let selectedDay_modal = ""
    DeadlineCalendare_modal.addEventListener("click", function(e) {
        let target = e.target       // Где был совершён клик?

        if (!target.classList.contains("air-datepicker-cell")) return       // Если клик был не на элементе с ячейкой даты, то клик игнорируется

        showElCalentare_modal(target)     // Если клик был по ячейке с датой, до запускается функция, где уже будет произведена работа с выбранной ячейкой
    })

    function showElCalentare_modal(currData) {
        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadline_modal()
        const textAreaDeadline = modalBtn_GroupDeadlineTask.querySelector(".itc-modal-body__text-settings")
        selectedDay_modal = currData
    
        const dataDay = selectedDay_modal.getAttribute("data-date")   // Выбранный номер дня месяца
        const dataMonth = selectedDay_modal.getAttribute("data-month")    // Выбранный месяц (числом)
    
        const selectDataCalendare = new Date(dataDay, dataMonth)        // Создаю каллендарь на основании выбранного дня и месяца
        const optionsSelection = {  
            month: "short"
        }
        // Создаю переменную с текстовым обозначением выбранного в календаре месяца
        const selectMonthDataCalendare = (Intl.DateTimeFormat(localLanguage, optionsSelection).format(selectDataCalendare))
    
        // Ввожу в поле с выбором срока выполнения - выбранную в календаре дату (число + месяц)
        if (textAreaDeadline.innerHTML != dataDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
            textAreaDeadline.innerHTML = dataDay + " " + selectMonthDataCalendare
        }
    
        // Обновляю срок выполнения в массиве этого таска
        currentTask_arr.newTask_deadlineTask = dataDay + " " + selectMonthDataCalendare
    }



    // ИЗМЕНЕНИЕ ПРИОРИТЕТА ТАСКА:

    // 1) Появление и скрытие поле с выбором приоритета задачи в меню создания новой задачи

    timeVar_MO = ''
    // 1.1) При нажатии на кнопку
    modalBtn_GroupPriorityTask.addEventListener("click", function(e) {       
        if (conteinerFromHiddenMenuPriorityTasks_modal.classList.contains("hide2") == false) {
            conteinerFromHiddenMenuPriorityTasks_modal.classList.add("hide2")
        }
        else if (conteinerFromHiddenMenuPriorityTasks_modal.classList.contains("hide2") == true) {
            // Скрываю скрытые меню выбора типа таска и срока выполнения, если они были открыты
            //....

            conteinerFromHiddenMenuPriorityTasks_modal.classList.remove("hide2")
            timeVar_MO = 1
        }
    })

    // 1.2) При нажатии на само поля выбора
    conteinerFromHiddenMenuPriorityTasks_modal.addEventListener("click", function(e) {       
        timeVar_MO = 1
    })

    // 1.3) При нажатии вне поля выбора - скрывается
    body.addEventListener("click", function(e) {        
        if (!timeVar_MO) {
            conteinerFromHiddenMenuPriorityTasks_modal.classList.add("hide2")
        }

        if (timeVar_MO) {
            setTimeout(() => timeVar_MO='', 100)
        }
    })


    // 2) Выбор приоритета таска:
    
    function reloadItemsPriority_modal(currentItemPriority) {
        priorityItem_modal.forEach(function(itemPriority) { 
            itemPriority.classList.remove("hovered_select_menu")    // Удаляю стиль выбранного элемента у ранее выбранного элемента
            itemPriority.querySelector(".itc-modal-body__priority-icon-selected").classList.add("hide2")    // Удаляю галочки у ранее выбранного элемента (если такой был)
        })
        currentItemPriority.classList.add("hovered_select_menu")    // Добавляю стиль выбранного элемента
        currentItemPriority.querySelector(".itc-modal-body__priority-icon-selected").classList.remove("hide2")  // Показываю галочку у выбранного элемента
    }


    // При выборе приоритета таска (для изменения)
    priorityItem_modal.forEach(function(item) {
        item.addEventListener("click", function(e) {
            const selectedIcon = item.querySelector(".itc-modal-body__priority-icon")   // Создаю переменную - иконка выбранного приоритета
    
            // Подставляю в поле выбранного приоритета - иконку и "aria-label" выбранного приоритета, если выбираемый приоритет не является уже выбранным
            if (modalBtn_GroupPriorityTask.querySelector(".itc-modal-body__icon-selected-setting").getAttribute("src") != selectedIcon.getAttribute("src")) {
                modalBtn_GroupPriorityTask.querySelector(".itc-modal-body__icon-selected-setting").setAttribute("src", selectedIcon.getAttribute("src"))
                modalBtn_GroupPriorityTask.querySelector(".itc-modal-body__text-settings").innerHTML = item.querySelector(".itc-modal-body__priority-name").getAttribute("aria-label")
        
                //Очищаю стиль "выбранного элемента" со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). А так же скрываю галочку справа (показывающую какой элемент пользователь выбрал) с элемента, у которого он показывался ранее (если был) и показываю на выбранном элементе
                reloadItemsPriority_modal(item)
            }


            currentTask_arr.newTask_priority_name = item.querySelector(".itc-modal-body__priority-name").getAttribute("aria-label")     // Изменяю в массиве название приоритета текущего таска

            let colorPriority = item.querySelector(".itc-modal-body__priority-icon").getAttribute("src").split("")      // Выбранный новый приоритет (цвет) для изменения таска
            colorPriority.splice(0, 16)     // Удаляю первые 16 символов, оставляя лишь название самого цвета
            colorPriority.splice(-4)        // Удаляю последние 4 символа (".png")
            currentTask_arr.newTask_priority_color = colorPriority.join("")     // Изменяю в массиве название цвета у приоритета текущего таска

            const checkbox_modal_color = checkbox_modal.getAttribute("class").split(" ")[1]         // Полное название второго класса у кнопки-кружка (в котором и присутствует название цвета
            checkbox_modal.classList.replace(checkbox_modal_color, `${checkbox_modal_color.slice(0, 27)}${colorPriority.join("")}`)     // Меняю класс с цветом у кружка на новый (с тем цветом, который был выбран)

            const checkbox_modal_icon_newSrc = `./icon/MarkOk_${currentTask_arr.newTask_priority_color}.png`       // Новый полноценный путь (ссылка) на галочку с нужным цветом
 

            checkbox_modal_icon.setAttribute("src", checkbox_modal_icon_newSrc)     // Меняю путь до галочки - на новый
            
            // Вызываю функцию для обновления html элемента с текущим таском
            updateDataTask_element(targetLi, currentTask_arr)
        })
    })



    // document.querySelector(".itc-modal-btn-close").setAttribute("data-title", "Закрыть задачу")
    // document.querySelector(".itc-modal-btn-close").classList.add("hover-hint_black")
    modal.show()


    // Событие при закрытии модального окна
    document.addEventListener('hide.itc.modal', closeModal, {once: true})   // Удаляется после срабатывания
    function closeModal() {
        chestForCalendar.append(document.querySelector(".itc-modal-body__hiddenMenu-deadline-calendare"))
        modal.dispose();  // Удаляю модальное окно из html документа
        body.removeEventListener("click", clickOuterModal_deadline)
        // body.removeEventListener("click", clickOuterModal_deadline)
        body.removeAttribute("style")
    }
})


// checkbox_modal_color.slice(0, 26)







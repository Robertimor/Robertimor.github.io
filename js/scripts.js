'use strict';

import ItcModal from "../modal/js/modal.js";
// import AirDatepicker from "../"

const body = document.querySelector('body');

const cale = document.querySelector(".calendar");


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



const overlay = document.querySelector(".overlay")  // Подложка для модального окна, которое появится при нажатии на кнопку добавления задачи из aside главной страницы
const asideAddTask = document.querySelector(".asideUserMenu__add-new-task")    // Кнопка добавления задачи из aside главной страницы
const modalCloseButtonNewTask = document.querySelector('.js-modal-close')   // Кнопка для закрытия подального окна для создания новой задачи



const asideAllTasks = document.querySelector(".asideUserMenu__allTasks-list")   // Кнопка для отображения ВСЕХ тасков на странице



const asideSearchTasks = document.querySelector(".asideUserMenu__search-task")
const asideInputSearchTasks = document.querySelector("#inpSearchTasks")

const asideTodayTasks = document.querySelector(".asideUserMenu__today-list")    // Кнопка для показа на странице лишь тасков на СЕГОДНЯ
const asideFilterItems = document.querySelectorAll(".asideFilterItem")  // Все элементы aside, которые выполняют роль фильтра отображения тасков на странице (по сроку, по типу)


const asideHomeTasks = document.querySelector(".asideUserMenu__type-home")  // Кнопка для показа на странице лишь тасков типа "Дом"
const asideJobTasks = document.querySelector(".asideUserMenu__type-job")    // Кнопка для показа на странице лишь тасков типа "Работа"
const asideStudyTasks = document.querySelector(".asideUserMenu__type-study")    // Кнопка для показа на странице лишь тасков типа "Учёба"





const countAllTasks = document.querySelector(".header-block__countNum-tasks-allTasks")      // Поле с количеством заданий (всего, кроме просроченных)
const sectionContentBlock_viewContent = document.querySelector(".section-content-block__view-content")  // Основная область. С текущей датой, со списком тасков, с меню добавления новой задачи
const nameToday = document.querySelector(".section-content-block__nameToday")          // Поле для отображения текущей даты


const allTasksOuter = document.querySelector(".allTasks-outer-block")        // Область со всеми созданными тасками (кроме просроченных)





const formFromAddNewTask = document.querySelector(".form-from-add-new-task")    // Поле добавления нового таска
const textAreaFromAddNewTask = document.querySelectorAll(".form-from-add-new-task__textarea-from-add-new-task")     //  Текстовые поля (имя и описание) для написания нового добавляемого таска 
const nameNewTask = document.querySelector(".form-from-add-new-task__name-new-task")   // Поле для написания имени нового добавляемого таска
const description = document.querySelector(".form-from-add-new-task__description")   // Поле для написания описания нового добавляемого таска



const dopSettingsForNewTask = document.querySelectorAll(".form-from-add-new-task__bnt-settings")   // Поле выбора срока выполнения и приоритета для нового таска

const selectDeadline = document.querySelector(".form-from-add-new-task__select-deadline")       // Поле (кнопка) для выбора срока выполнения нового таска
const hiddenMenuDeadline = document.querySelector(".form-from-add-new-task__hiddenMenu-deadline")   // Скрытое поле с выбором срока выполнения таска при создании/редактировании задачи/подзадачи
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



let MyCalendar

let MyCalendarForm
const curHiddenCalendarContainerForm = document.querySelector(".form-from-add-new-task__hiddenMenu-deadline-calendare")
const curHiddenCalendarForm = document.querySelector(".hiddenMenu-deadline-calendare-input")




let isModal = false
let isModal_block = false








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




// Показ/скрытие (изначальо скрытого) меню профиля
buttonMenuProfile.addEventListener("click", function (e) {
    menuProfile.classList.toggle("hide2")
})

// При клике вне меню профиля
document.addEventListener("click", function(e) {
    // Если скрытое меню профиля показано и клик был не по кнопке его открытия/скрытия
    if (!menuProfile.classList.contains("hide2") && !e.target.closest(".asideUserMenu__button_menuProfile")) {
        menuProfile.classList.add("hide2")
        console.log("LALAALAL");
    }
})



// Скрытие сайдбара
hideAndShow_Sidebar.addEventListener("click", function (e) {
    aside.classList.toggle("_hide-sidebar")
    hideAndShow_Sidebar.classList.toggle("_moved-btn-hide-and-show-sidebar")
})




let all_tasks = []     // Массив из созданных тасков
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

const containerAsideCalendar = document.querySelector(".asideUserMenu__calendar")
const inpAsideCalendar = document.querySelector("#aside-calendar")
const MyCalendarAside = new AirDatepicker(inpAsideCalendar, {
    inline: true,  
    buttons: ["today", "clear"],
    minDate: currectEntryDate,
    container: containerAsideCalendar,
    autoClose: false,
    onSelect({date, formattedDate, datepicker}) {
        // Если после выбора даты в календаре окажется, что ни одна не выделена (т.е. если я нажму на уже выбранную дату)
        if (!containerAsideCalendar.querySelector(".-selected-")) {      
            // Если какой-то из фильтров уже был выделен, то игнорирую (эта проверка необходима для избежания бесконечного зацикливания при сбросе дат)
            if (aside.querySelector(".hovered_select_menu")) {
                return
            }

            
            // Убираю скрытие со всех тасков, которые были скрыты фильтром
            reloadAllTasksFiltered()

            //Очищаю стиль выбранного элемента со всех фильтров, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю его на выбранном ("Все задачи")
            reloadItemsAsideFilterItems(asideAllTasks)
        } 
        else {
            console.log("Выделил");
            // Отфильтровываю все таски на странице, скрыв те, у которых срок не равен выбранному в календарю дню
            filterByDeadline(formattedDate)

            //Очищаю стиль выбранного элемента со всех фильтров, если он где-то был (удаляю со всех элементов класс "hovered_select_menu").
            reloadItemsAsideFilterItems()
        }  
    }
}) 

MyCalendarAside.show()




















/* Открытие модального окна для создания новой задачи (при клике на кнопку в aside главной страницы). */
asideAddTask.addEventListener('click', function(e) {
    const modalNewTaskElem = document.querySelector('.modalAddNewTask');

    modalNewTaskElem.classList.add('active');
    overlay.classList.add('active');


    // В область модального окна добавляется поле для добавления нового таска
    modalNewTaskElem.append(formFromAddNewTask)  
    // Убирает скрытие с формы добавления таска, которая перенеслась в МО
    formFromAddNewTask.classList.remove("hide2")    

    // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
    reloadFormAddTask()

    // Убирается скрытие li со всех тасков (если до этого какой-то скрылся, из-за незаконченного редактирования)
    allTasksOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
        task.classList.remove("hide2")      
    })


}); 

/* Закрытие модального окна для создания новой задачи (которое открывается при клике на кнопку в aside главной страницы) */
modalCloseButtonNewTask.addEventListener('click', function(e) {
    closeModalNewTask()
});

/* Закрытие по ESC (Закрытие модального окна для создания новой задачи (которое открывается при клике на кнопку в aside главной страницы)) */
document.body.addEventListener('keyup', function (e) {
    const modalNewTaskElem = document.querySelector('.modalAddNewTask');
    // Если модальное окно закрыто (Закрытие модального окна для создания новой задачи (которое открывается при клике на кнопку в aside главной страницы)) - игнор
    if (!modalNewTaskElem.classList.contains('active')) return


    const key = e.key;  // Нажатая клавиша


    if (key == "Escape") {
        closeModalNewTask()
    };
}, false);

/* скрытие окна при клике на подложку */
overlay.addEventListener('click', function() {

    const modalNewTaskElem = document.querySelector('.modalAddNewTask');
    // Если модальное окно закрыто (Закрытие модального окна для создания новой задачи (которое открывается при клике на кнопку в aside главной страницы)) - игнор
    if (!modalNewTaskElem.classList.contains('active')) return

    closeModalNewTask()
});

// Функция для закрытия модального окна для создания новой задачи (которое открывается при клике на кнопку в aside главной страницы)
function closeModalNewTask() {
    const modalNewTaskElem = document.querySelector('.modalAddNewTask');

    modalNewTaskElem.classList.remove('active');
    overlay.classList.remove('active');

    // Разрешаю показ доп. функций
    disabledShowDopTask = false
}





// При нажатии на поле поиска тасков (search)
asideSearchTasks.addEventListener("click", function(e) {
    // Если на текущем поле поиска уже есть класс выделения (уже выбран этот фильтр), то игнор
    if (asideSearchTasks.classList.contains("hovered_select_menu")) return

    // Очищаю стиль выбранного элемента со всех фильтров, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю его на выбранном ("Поиск")
    reloadItemsAsideFilterItems(asideSearchTasks)

    // Убираю скрытие со всех тасков, которые были скрыты фильтром
    reloadAllTasksFiltered()
})


// При изменении поля input для поиска тасков
asideInputSearchTasks.addEventListener("input", function(e) {
    // Отфильтровываю все таски на странице, скрыв те, у которых в имени таска нет введённых символов
    filterSearchNameTasks(e.target.value)
})


// При нажатии на кнопку фильтрации тасков - "Все задачи"
asideAllTasks.addEventListener("click", function(e) {
    // Если фильтр "Все задачи" уже выбран, то игнор
    if (asideAllTasks.classList.contains("hovered_select_menu")) return

    // Очищаю стиль выбранного элемента со всех фильтров, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю его на выбранном ("Все задачи")
    reloadItemsAsideFilterItems(asideAllTasks)

    // Убираю скрытие со всех тасков, которые были скрыты фильтром
    reloadAllTasksFiltered()
})


// При нажатии на кнопку фильтрации тасков по сроку - "Сегодня"
asideTodayTasks.addEventListener("click", function(e) {
    // Если на текущем фильтре уже есть класс выделения (уже выбран этот фильтр)
    if (asideTodayTasks.classList.contains("hovered_select_menu")) {
        // Убираю выделение со всех фильтров, где оно было ранее и выделяю фильтр - "Все задачи"
        reloadItemsAsideFilterItems(asideAllTasks)

        // Убираю скрытие со всех тасков, которые были скрыты фильтром
        reloadAllTasksFiltered()
    }
    else {
        //Очищаю стиль выбранного элемента со всех фильтров, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю его на выбранном ("Сегодня")
        reloadItemsAsideFilterItems(asideTodayTasks)

        // Отфильтровываю все таски на странице, скрыв те, у которых срок не равен сегодняшнему дню
        filterByDeadline(nowData.toLocaleDateString())
    }
})


// При нажатии на кнопку фильтрации тасков по типу - "Дом"
asideHomeTasks.addEventListener("click", function(e) {
    // Если на текущем фильтре уже есть класс выделения (уже выбран этот фильтр)
    if (asideHomeTasks.classList.contains("hovered_select_menu")) {
        // Убираю выделение со всех фильтров, где оно было ранее и выделяю фильтр - "Все задачи"
        reloadItemsAsideFilterItems(asideAllTasks)

        // Убираю скрытие со всех тасков, которые были скрыты фильтром
        reloadAllTasksFiltered()
    }
    else {
        //Очищаю стиль выбранного элемента со всех фильтров, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю его на выбранном ("Дом")
        reloadItemsAsideFilterItems(asideHomeTasks)

        // Отфильтровываю все таски на странице, скрыв те, у которых тип не "Дом"
        filterByType("Дом")
    }
})

// При нажатии на кнопку фильтрации тасков по типу - "Работа"
asideJobTasks.addEventListener("click", function(e) {
    // Если на текущем фильтре уже есть класс выделения (уже выбран этот фильтр)
    if (asideJobTasks.classList.contains("hovered_select_menu")) {
        // Убираю выделение со всех фильтров, где оно было ранее и выделяю фильтр - "Все задачи"
        reloadItemsAsideFilterItems(asideAllTasks)

        // Убираю скрытие со всех тасков, которые были скрыты фильтром
        reloadAllTasksFiltered()
    }
    else {
        //Очищаю стиль выбранного элемента со всех фильтров, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю его на выбранном ("Работа")
        reloadItemsAsideFilterItems(asideJobTasks)

        // Отфильтровываю все таски на странице, скрыв те, у которых тип не "Дом"
        filterByType("Работа")
    }
})

// При нажатии на кнопку фильтрации тасков по типу - "Учёба"
asideStudyTasks.addEventListener("click", function(e) {
    // Если на текущем фильтре уже есть класс выделения (уже выбран этот фильтр)
    if (asideStudyTasks.classList.contains("hovered_select_menu")) {
        // Убираю выделение со всех фильтров, где оно было ранее и выделяю фильтр - "Все задачи"
        reloadItemsAsideFilterItems(asideAllTasks)

        // Убираю скрытие со всех тасков, которые были скрыты фильтром
        reloadAllTasksFiltered()
    }
    else {
        //Очищаю стиль выбранного элемента со всех фильтров, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю его на выбранном ("Учёба")
        reloadItemsAsideFilterItems(asideStudyTasks)

        // Отфильтровываю все таски на странице, скрыв те, у которых тип не "Учёба"
        filterByType("Учёба")
    }
})









// Функция фильтра по поиску названия таска
function filterSearchNameTasks(curName) {
    document.querySelectorAll(".task").forEach(function(task) {
        // Содержимое имени таска
        const nameTask = task.querySelector(".task__name-task").innerHTML

        // Если в строке имени таска нет введённых символов, то скрываю этот таск
        if (!nameTask.includes(curName)) {
            task.classList.add("hiddenFiltered")
        } 
        // Иначе, если в строке имени таска есть введённые символы - убираю класс скрытия с таска (если он был)
        else if (nameTask.includes(curName)) {
            task.classList.remove("hiddenFiltered")
        }
    })
}


// Функция фильтра тасков по выбранной дате
function filterByDeadline(curDate) {
    // Сперва убираю ранее стоявшие фильтры на тасках
    reloadAllTasksFiltered()
    
    // Все таски на странице
    const allTasks = document.querySelectorAll(".task")

    // Перебираю все таски
    allTasks.forEach(function(task) {
        // Если дата текущего таска не равна выбранной фильтром, то присваиваю элементу таска специальный класс скрытия
        if (task.querySelector(".task__deadline__date_hidden").innerHTML != curDate) {
            task.classList.add("hiddenFiltered")
        }
    })
}

// Функция фильтра тасков по выбранному типу таска
function filterByType(curType) {
    // Сперва убираю ранее стоявшие фильтры на тасках
    reloadAllTasksFiltered()
    
    // Все таски на странице
    const allTasks = document.querySelectorAll(".task")

    // Перебираю все таски
    allTasks.forEach(function(task) {
        // Если тип текущего таска не равна выбранной фильтром, то присваиваю элементу таска специальный класс скрытия
        if (task.querySelector(".task__typeTask span").innerHTML != curType) {
            task.classList.add("hiddenFiltered")
        }
    })
}


// Функция для сброса фильтра с тасков. (Убирает скрытие со всех задач)
function reloadAllTasksFiltered() {
    document.querySelectorAll(".task").forEach(function(task) {
        if (task.classList.contains("hiddenFiltered")) {
            task.classList.remove("hiddenFiltered")
        }
    })
}
 


//Функция для очистки стиля "выбранного элемента" со всех asideFilterItem, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик.
function reloadItemsAsideFilterItems(curItem) {
    asideInputSearchTasks.value = ""
    // Перебираю все фильтры и убираю у всех выделение (если было)
    asideFilterItems.forEach(function(item) {
        item.classList.remove("hovered_select_menu")
    })

    // Если в функцию был передан какой-либо фильтр
    if (curItem) {
        // Ставлю класс выделения на выбранный фильтр
        curItem.classList.add("hovered_select_menu")

        // Очищаю выбранные в календаре дни (если были)
        MyCalendarAside.clear()
    }
    
}


































// Мои задачи

// Задача 1
tasksId += 1
const myJobTask1 = {
    newTask_name: "Добавить автоматическое выделение выбранного в задаче приоритета и срока выполнения, при открытии меню редактирования таска и подзадачи", 
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
funcAddNewTask (myJobTask1)
all_tasks.push(myJobTask1)
countAllTasks.innerHTML = all_tasks.length



// Задача 2
tasksId += 1
const myJobTask2 = {
    newTask_name: "aawdwacsefwddw", 
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
funcAddNewTask (myJobTask2)
all_tasks.push(myJobTask2)
countAllTasks.innerHTML = all_tasks.length


// Задача 3
tasksId += 1
const myJobTask3 = {
    newTask_name: "Возможно запретить отображение и возможность выбора доп. функций, когда открыто меню создания/редактирования задачи/подзадачи", 
    newTask_description: "awdawl21lekd1x2ew2d1x213d", 
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
funcAddNewTask (myJobTask3)
all_tasks.push(myJobTask3)
countAllTasks.innerHTML = all_tasks.length


// Задача 4
tasksId += 1
const myJobTask4 = {
    newTask_name: "#@$№№№№№№№№№№№№№№№№'", 
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
funcAddNewTask (myJobTask4)
all_tasks.push(myJobTask4)
countAllTasks.innerHTML = all_tasks.length


// Задача 5
tasksId += 1
const myJobTask5 = {
    newTask_name: "#########", 
    newTask_description: "#######################", 
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
funcAddNewTask (myJobTask5)
all_tasks.push(myJobTask5)
countAllTasks.innerHTML = all_tasks.length


// Задача 6
tasksId += 1
const myJobTask6 = {
    newTask_name: "##########", 
    newTask_description: "############################", 
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
funcAddNewTask (myJobTask6)
all_tasks.push(myJobTask6)
countAllTasks.innerHTML = all_tasks.length












let timeVar2 = ''           // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)

// Удаляю отметку о текущей задаче  
let currentLi_klick = null
// Удаляю отметку о текущей подзадаче
let currentLi_klick_MO = null    

// Можно ли показывать доп. функции таска и подзадачи (изначально скрытые)
let disabledShowDopTask = false









// Отображение поля с доп функциями при наведении на поле с таском

let currentLi = null    // Элемент li под курсором в данный момент (если есть)
allTasksOuter.addEventListener("mouseover", function(e) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentLi есть, то мы ещё не ушли с предыдущего <li>, это переход внутри - игнорируем такое событие
    if (currentLi) return
    let target = e.target.closest("li.task")

    if (!target) return;    // переход не на <li> - игнорировать
    if (!allTasksOuter.contains(target)) return    // переход на <li>, но вне .allTasksOuter (возможно при вложенных списках) - игнорировать

    // ура, мы зашли на новый <li>

    currentLi = target

    show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))     // Показываем скрытое меню с доп func этого элемента
})

allTasksOuter.addEventListener("mouseout", function(e) {
    // если мы вне <li>, то игнорируем уход мыши. Это какой-то переход внутри .allTasksOuter, но вне <li>
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
    if (disabledShowDopTask == false || (currentLi_klick == currentLi)) {
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
allTasksOuter.addEventListener("click", function(e) {

    let target = e.target.closest(".task__btnEdit")   // Нажатая кнопка "edit"
    // Если нажатие было не по кнопке редактирования, то игнор
    if (!target) return

    let targetLi = e.target.closest(".task")       // Задача, внутри которой был нажат "edit"

    // Блокирую возможность открытия м.о.
    isModal_block = true 

    


    // В область выбранного таска добавляется поле для внесение изменений (вместо самого li, который скрывается)
    targetLi.append(formFromAddNewTask)   

    // Убирается скрытие li со всех элементов (если до этого какой-то скрылся, из-за незаконченного редактирования)
    allTasksOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
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
    disabledShowDopTask = true
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
    if (buttonSaveTask.getAttribute("aria-disabled") == "false" && (isModal == false)) {
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
        allTasksOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Скрываю все доп функции таска
        hide_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Удаляю отметку о текущем таске с отслеживания при наведении
        currentLi = null

        // Снимаю блокировку с открытия м.о.
        isModal_block = false  
        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
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
function updateDataTask_element(taskEl, taskArr) {
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
allTasksOuter.addEventListener("click", function(e) {
    const targetBtn = e.target.closest(".task__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 
    const targetBtnIcon = e.target.closest(".task__dopFunction_iconWrap")

    
    // Если клик был вне контейнера с кнопкой "NewDeadline", то игнорируем
    if (!targetBtn) return

    // Если клик был вне контейнера с иконкой кнопки "NewDeadline" (даже если например, на календарь), то игнорируем
    if (!targetBtnIcon) return


    const targetTask = e.target.closest(".task")


    // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
    const curHiddenMenuDeadlineNewDeadline = targetBtn.querySelector(".task__dopFunction__hiddenMenu-deadline")

    const curHiddenCalendarContainer = targetBtn.querySelector(".task__dopFunction__hiddenMenu-deadline-calendare")
    const curHiddenCalendar = targetBtn.querySelector(".hiddenMenu-deadline-calendare")



    


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

        isModal_block = true

        // Запрещается показ доп. функций тасков
        disabledShowDopTask = true
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
        disabledShowDopTask = false

        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        isModal_block = false
    }
})








// Отображение галочки в кружке-конпке при наведении на кружок:

let currentBtnCheckbox = null   // Элемент task__button-task-checkbox под курсором в данный момент (если есть)
allTasksOuter.addEventListener("mouseover", function(e) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentBtnCheckbox есть, то мы ещё не ушли с предыдущего кружка, это переход внутри - игнорируем такое событие
    if (currentBtnCheckbox) return
    let target2 = e.target.closest(".task__button-task-checkbox")
    if (!target2) return

    // ура, мы зашли на новый кружок
    currentBtnCheckbox = target2
    show_mark_OK(currentBtnCheckbox.querySelector("img"))     // Показываем галочку внутри этого элемента   
})

allTasksOuter.addEventListener("mouseout", function(e) { 
     // если мы вне кружка, то игнорируем уход мыши. Это какой-то переход внутри .allTasksOuter, но вне кружка
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
allTasksOuter.addEventListener("click", function(e) {
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
    // countAllTasks.innerHTML = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков
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
    allTasksOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
        task.classList.remove("hide2")
    })
    formFromAddNewTask.classList.remove("hide2")
    
    // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
    reloadFormAddTask()
 

    // Блокирую возможность открытия м.о.
    isModal_block = true
    // Разрешаю показ доп. функций тасков
    disabledShowDopTask = true
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
        isModal_block = false  

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
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
        isModal_block = true  

        // Запрещается показ доп. функций тасков
        disabledShowDopTask = true
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
    if (!isModal == false) {
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
            isModal_block = false  
            // Разрешаю показ доп. функций задач/подзадач
            disabledShowDopTask = false
            
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
            isModal_block = false  
            // Разрешаю показ доп. функций задач/подзадач
            disabledShowDopTask = false
            
    
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
        isModal_block = false  

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
    } 
    // Иначе, если клик был вне поля выбора и на элемент таска (li)
    else if (!timeVar && targetLi != null) {
        conteinerFromHiddenMenuTypesTasks.classList.add("hide2") 

        // Убираю выделения кнопки
        selectTypeTask.classList.remove("active2")
        selectTypeTask.querySelector("span").classList.remove("darkned")
        selectTypeTask.querySelector(".form-from-add-new-task__icon").classList.remove("darkned")

        // Снимаю блокировку с открытия м.о.
        isModal_block = false  

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false

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
        disabledShowDopTask = false

        // Снимаю блокировку с открытия м.о.
        isModal_block = false  

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
allTasksOuter.addEventListener("click", function(e) {
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
            
        }, { once: true })
    })
}   




// 1.2) Если меню выбора срока было открыто при создании/редактировании таска (т.е. не через доп. функцию "Назначить срок"), то ...
// (При клике на один из пунктов выбора срока выполнения задачи (из списка вариантов), при выборе из "form-from-add-new-task__hiddenMenu-deadline") 
deadlineItem.forEach(function(item) {
    item.addEventListener("click", function(e) {
        if (isModal != false) return    // Если МО открыто, то игнор

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
// (При клике на день в календаре, при выборе из "task__dopFunction__hiddenMenu-deadline") 
allTasksOuter.addEventListener("click", function(e) {
    if (isModal != false) return    // Если МО открыто, то игнор

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
})



// 2.2) Если меню выбора открыто создании/редактировании таска, то...
// (При клике на день в календаре, при выборе из "form-from-add-new-task__hiddenMenu-deadline") 
DeadlineCalendare.addEventListener("click", function(e) {
    if (isModal != false) return    // Если МО открыто, то игнор

    let target = e.target       // Где был совершён клик?


    // Если клик был не на элементе с ячейкой даты, то клик игнорируется
    if (!target.classList.contains("air-datepicker-cell")) return       


    // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
    const deadlineHiddenList = target.closest(".form-from-add-new-task__hiddenMenu-deadline").querySelector(".form-from-add-new-task__deadline-list")

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

// 1) // При нажатии на кнопку в форме для создания/редактирования таска
selectDeadline.addEventListener("click", function(e) {      
    if (isModal != false) return    // Если МО открыто, то игнор


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
        isModal_block = false  

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false

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
        isModal_block = true  

        // Запрещается показ доп. функций тасков
        disabledShowDopTask = true
    }
})

// 2.1) При нажатии на само поля выбора (при создании/редактировании и с учётом наличия ранее нажатой  доп ф. "назначить срок")
hiddenMenuDeadline.addEventListener("click", function(e) {  
    if (isModal != false) return    // Если МО открыто, то игнор

    
    timeVar = 1;  
    timeVar2 = 1        // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)

    // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    // Этот код работает только если ранее на каком-то таске было открыто скрытое меню через "назначить срок", а сейчас клик происходит по открытому аналогичному меню, но вызванному у таска при его создании/редактировании
    if ((currentLi_klick != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
        const curHiddenMenuDeadlineNewDeadline = currentLi_klick.querySelector(".task__dopFunction__hiddenMenu-deadline")


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
        isModal_block = false   

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
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
allTasksOuter.addEventListener("click", function(e) {
    if (isModal != false) return    // Если МО открыто, то игнор

    const target_container_task = e.target.closest(".task__dopFunction__hiddenMenu-deadline")   // Область скрытого меню выбора срока при нажатии на "Назначить срок"
    const target_container_formTask = e.target.closest(".form-from-add-new-task__hiddenMenu-deadline")  // Область скрытого меню выбора срока при создании/редактировании задачи


    // Если клик был не по меню выбора срока выполнения в функции "назначить срок" и не по аналогичному меню при создании/редактировании задачи, то игнор
    if (!target_container_task && !target_container_formTask) return

    timeVar = 1;  
    timeVar2 = 1        // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)


    // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
    // Этот код работает если клик был по меню выбора срока выполнения после нажатия на "Назначить срок" (только в этом случае нужно скрывать сразу меню выбора, ведь при создании/редактировании после выбора скрывать меню не нужно)
    if ((currentLi_klick != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
        console.log("Хули еп");
        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущего таска
        const curHiddenMenuDeadlineNewDeadline = currentLi_klick.querySelector(".task__dopFunction__hiddenMenu-deadline")


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
        isModal_block = false   

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
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
    if (isModal == true)  return  // Если МО открыто, то игнор

    // Если доп. меню срока выполнения (и у меню редактирования/создания задачи; и у доп. функции "назначить срок") - скрыто, то игнорируем
    if ((hiddenMenuDeadline.classList.contains("hide2") == true) && (!currentLi_klick)) return

    else if (currentLi_klick) {
        if (currentLi_klick.querySelector(".task__dopFunction__hiddenMenu-deadline").classList.contains("hide2") == true) {
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
        curHiddenMenuDeadlineNewDeadline = currentLi_klick.querySelector(".task__dopFunction__hiddenMenu-deadline")
    }


    

    // Если клик был вне поля выбора и вне элемента таска (li), и при этом ранее не был отмечен текущий таск по клику (перед этим кликом не нажалась кнопка ".task__btnNewDeadline" (иконка), после которой отображается меню выбора срока выполнения)
    if (!timeVar && targetLi == null && currentLi_klick == null) {     // Если клик был вне поля и не на кнопку ".task__btnNewDeadline" (на иконку) и ранее не был отмечен текущий таск по клику
        isObservHiddenMenus = false
        observFunc(selectPriority)


        // Скрываю само меню и удаляю календарь в нём
        hiddenMenuDeadline.classList.add("hide2") 
        MyCalendarForm.destroy()    
        MyCalendarForm = null


        isModal_block = false       // Снимаю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false

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

        isModal_block = false       // Снимаю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false

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
        disabledShowDopTask = false

        // Показываю доп. функции у того таска, на который был совершён клик (который был под курсором в момент клика)
        show_task_dopFuncs(currentLi.querySelector(".task__dopFuncs"))

        isModal_block = false   // Снимаю блокировку с открытия м.о.

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

        isModal_block = true        // Ставлю блокировку с открытия м.о.

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false

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
        isModal_block = false  

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
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
        isModal_block = true  

        // Запрещается показ доп. функций тасков
        disabledShowDopTask = true
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
    if (!isModal == false) {   
        // return
        const targetLi_modal = e.target.closest(".subtask")    // Элемент  li для последующего определения нового срока выполнения подзадаче (одна из двух кнопок доп функций подзадачи)       

        // Если клик был вне поля выбора и вне элемента подзадачи (li)
        if (!timeVar && targetLi_modal == null) {
            isObservHiddenMenus = false
            observFunc(selectPriority)
            // Скрываю меню выбора приоритета
            hiddenMenuPriority.classList.add("hide2")
            
            // Снимаю блокировку с открытия м.о.
            isModal_block = false  
    
            // Разрешаю показ доп. функций задач/подзадач
            disabledShowDopTask = false
        }
        // Иначе, если клик был вне поля выбора и на элемент подзадачи (li)
        if (!timeVar && targetLi_modal != null) {
            isObservHiddenMenus = false
            observFunc(selectPriority)
            // Скрываю меню выбора приоритета
            hiddenMenuPriority.classList.add("hide2") 


            // Снимаю блокировку с открытия м.о.
            isModal_block = false  

            // Разрешаю показ доп. функций задач/подзадач
            disabledShowDopTask = false
    
            
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
        isModal_block = false  

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
    }
    // Иначе, если клик был вне поля выбора и на элемент таска (li)
    if (!timeVar && targetLi != null) {
        isObservHiddenMenus = false
        observFunc(selectPriority)
        hiddenMenuPriority.classList.add("hide2") 

        // Снимаю блокировку с открытия м.о.
        isModal_block = false  

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false

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
        disabledShowDopTask = false
        // Снимаю блокировку с открытия м.о.
        isModal_block = false  
        hiddenMenuPriority.classList.add("hide2")
    })
})









// При нажатии на кнопку добавления нового таска в меню создания
buttonAddNewTask.addEventListener("click", function(e) {
    if (buttonAddNewTask.getAttribute("aria-disabled") == "false" && isModal == false) {
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
        all_tasks.push(contentNewTask)     // Добавляю созданый объект в массив из списка всех тасков
        countAllTasks.innerHTML = all_tasks.length    // Обновляю поле на странице с количеством существующих тасков

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask() 

        
        // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
        const deadlineHiddenList = e.target.closest(".form-from-add-new-task").querySelector(".form-from-add-new-task__deadline-list")

        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadline(deadlineHiddenList)

        
        allTasksOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
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
        isModal_block = false  
        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
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
                <div class="task__dopFunction__hiddenMenu-deadline hide2">
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
                    <div class="task__dopFunction__hiddenMenu-deadline-calendare">
                        <input type="text" class="hiddenMenu-deadline-calendare hide2">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </li>
    `
    allTasksOuter.insertAdjacentHTML("afterbegin", html)     // Добавляю новый html элемент таска в начало
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


// Скрытие меню добавления нового таска (/изменения выбранного) при нажатии на кнопку "Отмена" 
buttonCloseMenuNewTask.addEventListener("click", function(e) {
    if (isModal == false) {
        formFromAddNewTask.classList.add("hide2")   // Скрывается Блок "formFromAddNewTask"
        sectionContentBlock_viewContent.append(formFromAddNewTask)  // Блок "formFromAddNewTask" перемещается в конец

        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
        allTasksOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()


        // Снимаю блокировку с открытия м.о.
        isModal_block = false

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false


        
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
    if (e.key == "Enter" && nameNewTask.value != "" && isModal == false) {
        formFromAddNewTask.classList.add("hide2")   // Скрывается Блок "formFromAddNewTask"
        sectionContentBlock_viewContent.append(formFromAddNewTask)  // Блок "formFromAddNewTask" перемещается в конец
        // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
        allTasksOuter.querySelectorAll(".task__wrapper").forEach(function(task) {
            task.classList.remove("hide2")
        })

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()

        // Снимаю блокировку с открытия м.о.
        isModal_block = false

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
    }
})







































// МОДАЛЬНОЕ ОКНО:


let modal = ""
allTasksOuter.addEventListener("click", function(e) {
    let targetLi = e.target.closest(".task")


    if (!e.target.closest(".task__wrapper")) return    // Если клик был вне таска (вне его основного каркаса), то игнорировать клик
    if (e.target.closest(".task__dopFuncs")) return    // Если была нажата одна из кнопок доп.функций таска, то игнорировать клик
    if (e.target.closest(".task__wrapper-button-task-checkbox")) return     // Если была нажата кнопка-кружочек у таска (для удаляения таска), то игнорировать клик


    // Если стоит блокировка на открытие м.о., то игнорировать
    if (isModal_block == true) return
    

    let currentIdTask = Number(targetLi.getAttribute("id"))         // id у html элемента таска
    let currentTask_arr = ""                            // Текущий объект таска в массиве

    currentTask_arr = all_tasks.find(function(el) {       // Присваиваю переменной тот таск, который имеет тот же id, что и выбранный html элемент таска
        return el.newTask_ID == currentIdTask
    })


    // id таска у выбранного элемента массива
    let currentIdTask_arr = currentTask_arr.newTask_ID          


    const currentTask_typeTask_icon = currentTask_arr.newTask_typeTask_icon_src
    const currentTask_typeTask_name = currentTask_arr.newTask_typeTask_name
    const currentTask_priority_color = currentTask_arr.newTask_priority_color
    const currentTask_priority_name = currentTask_arr.newTask_priority_name
    const currentTask_name = currentTask_arr.newTask_name
    const currentTask_description = currentTask_arr.newTask_description
    const currentTask_deadline = currentTask_arr.newTask_deadlineTask
    const currentTask_deadlineFullNum = currentTask_arr.newTask_deadlineFullDataTask


    // Массив из всех подзадач текущего таска
    let all_subtasks = currentTask_arr.newTask_Subtasks_arr


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
                        <span class="itc-modal-body__text-settings_hidden-num hide2" aria-valuetext="notChanged">${currentTask_deadlineFullNum}</span>
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
                    <div class="itc-modal-body__hiddenMenu-deadline-calendare"><input type="text" class="hiddenMenu-deadline-calendare hide2"></div>
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
            // Календарь в скрытом меню для выбора срока выполнения таска внутри МО 
            const DeadlineCalendare_modal = document.querySelector(".itc-modal-body__hiddenMenu-deadline-calendare")  

    
    // Поле для выбора приоритета таска в м.о.
    const modalBtn_GroupPriorityTask = document.querySelector('.itc-modal-body__select-setting[data-title="Назначить приоритет..."]') 
        // Скрытое меню выбора приоритета таска в м.о.       
        const conteinerFromHiddenMenuPriorityTasks_modal = document.querySelector(".itc-modal-body__hiddenMenu-priority")
            // Элементы li с вариантами приоритета
            const priorityItem_modal = document.querySelectorAll(".itc-modal-body__priority-item")


    const typesProjectForSelect_modal = document.querySelectorAll(".itc-modal-body__hiddenMenuTypesTask .my-type-projects__type-project")   // Элементы li с типом таска

    const modalWindow = document.querySelector(".itc-modal-content")      // Само модальное окно
    const buttonCloseEdit = modalWindow.querySelector(".buttuns-closeSave-task .btn-close")     // Кнопка закрытия редактирования ТАСКА (не подзадачи) в м.о.
    const buttonSaveEdit = modalWindow.querySelector(".buttuns-closeSave-task .btn-save")       // Кнопка сохранения редактирования в м.о.


    const modal_wrapper_name_description = modalWindow.querySelector(".task__innerWrap-name-description")   // Контейнер с именем и описанием таска

    let div_name_task               // div с именем таска 
    let div_description_task        // div с описанием таска 

    let el_textarea_name            // Поле для заполнения имени таска
    let el_textarea_description     // Поле для заполнения описания таска

    let count_lenght_name_description_task    // Поле с указанимем длины строки имени и описания таска


    // Функция проверки и изменения состояния кнопок навигации (prev/next) в м.о.
    function checkNavArrow_modal(curId) {
        // Если выбраный таск является первым (самым недавно созданным) (id выбранного таска максимальный), то стрелочка "prev" диактивируется. В ином случае, - активируется
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

            currentTask_arr = all_tasks[currentIdTask_arr - 1]  

            targetLi = document.getElementById(currentIdTask_arr) 

            all_subtasks = currentTask_arr.newTask_Subtasks_arr
  

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
            currentTask_arr = all_tasks[currentIdTask_arr - 1]

            targetLi = document.getElementById(currentIdTask_arr)
            
            all_subtasks = currentTask_arr.newTask_Subtasks_arr

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
        const modalAside_deadlineTaskFullNum = curTask.newTask_deadlineFullDataTask
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


        subtaskOuter_modal.innerHTML = ""

        // Перебираю все подзадачи этого таска, форматируя их в html и вставляя в м.о.
        curTask.newTask_Subtasks_arr.forEach(function(subtaskEl) {
            funcAddNewSubtask(subtaskEl)
        })
        // Обновляю поле с количеством подзадач
        countSubtasks.innerHTML = currentTask_arr.newTask_countSubtask



        // Вставляю в aside тип таска, на который переключились
        modalContent.querySelector(".itc-modal-body__select-setting .wrapper-type-task__name").innerHTML = modalAside_nameTypeTask
        modalContent.querySelector(".wrapper-type-task__icon-type-project").setAttribute("src", modalAside_iconTypeTask)

        // Вставляю в aside срок выполнения таска, на который переключились
        modalContent.querySelector(".itc-modal-body__select-setting .itc-modal-body__text-settings").innerHTML = modalAside_deadlineTask
        modalContent.querySelector(".itc-modal-body__select-setting .itc-modal-body__text-settings_hidden-num").innerHTML = modalAside_deadlineTaskFullNum


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
        if (!event.target.closest(".task__innerWrap-name-description div") || event.target.closest(".task__maxLenght_name_description")) return      // Если клик был не по div-ам с именем/описанием таска, но по их контейнеру - игнорируем

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
        <textarea class="itc-modal-content__textarea-name-task" name="name-task" placeholder="Название задачи" maxlength="500"></textarea>
        <textarea class="itc-modal-content__textarea-description-task" name="description-task" placeholder="Описание задачи" maxlength="10000"></textarea>
        <div class="task__maxLenght_name_description">
            <div class="task__maxLenght_name">Лимит названия задачи: <span class="num_lenght_name">${div_name_task.innerHTML.length}</span> / 500</div>
            <div class="task__maxLenght_description">Лимит описания задачи: <span class="num_lenght_description">${div_description_task.querySelector('.task__description-task-text').innerHTML.length}</span> / 10000</div>
        </div>
        `
        // Вставляю поля textarea в контейнер, где были ранее отображены div-ы с именем/описанием таска
        modal_wrapper_name_description.insertAdjacentHTML("afterbegin", modal_newTextarea)

        // Создаю переменные, присвоим им html элементы созданных и добавленных textarea (2шт)
        el_textarea_name = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-name-task")
        el_textarea_description = modal_wrapper_name_description.querySelector(".itc-modal-content__textarea-description-task")

        // Создаю переменную контейнера для строк с указанием лимитов строк имени и описания таска
        count_lenght_name_description_task = modalContent.querySelector(".task__maxLenght_name_description")




        // Вставляю в эти textarea значения имени/описания текущего таска (которые были внутри ранее отображаемого div-а)
        el_textarea_name.value = div_name_task.innerHTML 
        el_textarea_description.value = div_description_task.querySelector("span").innerHTML 

        // Создаю для этих двух textarea обработчик события, который запускает функцию "resizeTextarea" каждый раз, когда что-то вводится в поле textarea
        el_textarea_name.addEventListener("input", resizeTextarea)
        el_textarea_description.addEventListener("input", resizeTextarea)

        // Создаю для этих двух textarea обработчик события, который запускает функцию "changValueLenght" каждый раз, когда что-то вводится в поле textarea
        el_textarea_name.addEventListener("input", changValueLenght)
        el_textarea_description.addEventListener("input", changValueLenght)


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


        // Выставляю сразу необходимую высоту полю с именем таска
        el_textarea_name.style.height = "auto";
        el_textarea_name.style.height = Math.max(el_textarea_name.scrollHeight, el_textarea_name.offsetHeight)+"px"      

        // Выставляю сразу необходимую высоту полю с описанием таска
        el_textarea_description.style.height = "auto";
        el_textarea_description.style.height = Math.max(el_textarea_description.scrollHeight, el_textarea_description.offsetHeight)+"px"   


        // Запрещаю показ доп. функций подзадач
        disabledShowDopTask = true

    }

    // Функция для настройки изменяемой (растягивающейся) высоты поля - textarea, по мере его заполнения
    function resizeTextarea(_e) {     
        let event = _e || event || window.event
        let getElement = event.target || event.srcElement
        getElement.style.height = "auto"; 

        getElement.style.height = Math.max(getElement.scrollHeight, getElement.offsetHeight)+"px"        
    }

    // Функция для отслеживания длины полей имени и описания таска (Для отображения лимитов)
    function changValueLenght(_e) {
        let event = _e || event || window.event
        let getElement = event.target || event.srcElement

        let maxLenght_name_description = modal_wrapper_name_description.querySelector(".task__maxLenght_name_description")  // Поле с лимитами длины имени и описания таска
        let maxLenght_name = maxLenght_name_description.querySelector(".task__maxLenght_name")  // Поле с текстом для лимита имени таска
        let maxLenght_description = maxLenght_name_description.querySelector(".task__maxLenght_description")    // Поле с текстом для лимита описания таска
        let length_name = maxLenght_name_description.querySelector(".num_lenght_name")  // Поле для вставки текущей длины имени таска
        let length_description = maxLenght_name_description.querySelector(".num_lenght_description")    // Поле для вставки текущей длины описания таска




        // Если изменено поле имени таска
        if (getElement.classList.contains('itc-modal-content__textarea-name-task') && getElement.value.length <= 500) {
            maxLenght_name.style.color = '#ADADAD'
            length_name.innerHTML = getElement.value.length
        } 

        // Если изменено поле имени таска и оно достигло лимита
        if (getElement.classList.contains('itc-modal-content__textarea-name-task') && getElement.value.length == 500) {
            maxLenght_name.style.color = 'red'
        }

        // Если изменено поле описания таска
        if (getElement.classList.contains('itc-modal-content__textarea-description-task') && getElement.value.length <= 10000) {
            maxLenght_description.style.color = '#ADADAD'
            length_description.innerHTML = getElement.value.length
        }

        // Если изменено поле описания таска и оно достигло лимита
        if (getElement.classList.contains('itc-modal-content__textarea-description-task') && getElement.value.length == 10000) {
            maxLenght_description.style.color = 'red'
        } 
    } 


    // При клике на кнопку "Отмена" при редактировании таска (не подзадачи!)(но внутри МО)
    buttonCloseEdit.addEventListener("click", clickCloseEditModal)
    function clickCloseEditModal() {      
        if (!el_textarea_name) return   // Если элемент textarea в м.о. ещё не был создан, то пропускаем


        // Удаляю оба поля textarea и поля с подсчётом длины имени и описания
        el_textarea_name.remove()
        el_textarea_description.remove()
        count_lenght_name_description_task.remove()

        // Убираю скрытие с элементов div (с именем/описанием таска)
        div_name_task.classList.remove("hide2")
        div_description_task.classList.remove("hide2")

        // Убираю класс "ramka" с контейнера у имени/описания таска
        modal_wrapper_name_description.classList.remove("ramka")

        // Скрываю кнопку "Отмена" и "Сохранить"
        buttonCloseEdit.classList.add("hide2")
        buttonSaveEdit.classList.add("hide2")

        if (buttonCloseMenuNewTask.closest(".itc-modal-body__subtask-outer-block")) {
            currentLi_modal = null
        }
        
        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
    } 


    // При клике на кнопку "Сохранить" при редактировании текущего таска (не подзадачи!) (но внутри МО)
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

        // Удаляю оба поля textarea и поля с подсчётом длины имени и описания
        el_textarea_name.remove()
        el_textarea_description.remove()
        count_lenght_name_description_task.remove()

        // Убираю скрытие с элементов div (с именем/описанием таска)
        div_name_task.classList.remove("hide2")
        div_description_task.classList.remove("hide2")

        // Убираю класс "ramka" с контейнера у имени/описания таска
        modal_wrapper_name_description.classList.remove("ramka")

        // Скрываю кнопку "Отмена" и "Сохранить"
        buttonCloseEdit.classList.add("hide2")
        buttonSaveEdit.classList.add("hide2")

        // Разрешаю показ доп. функций тасков
        disabledShowDopTask = false
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
        countAllTasks.innerHTML = all_tasks.length    

        modal.dispose()
    })







    const modalContent_main = modalContent.querySelector(".itc-modal-body__main-content")

    const addSubtask = modalContent.querySelector(".itc-modal-body__btn-new-dop-task")  // Кнопка "Добавить подзадачу"
    const wrapCountSubtask_and_Subtask = modalContent_main.querySelector(".itc-modal-body__subtask-content")
    const countSubtasks = wrapCountSubtask_and_Subtask.querySelector(".itc-modal-body__subtask-count .itc-modal-body__subtasks-count")
    const subtaskOuter_modal = modalContent.querySelector(".itc-modal-body__subtask-outer-block")



    // Перебираю все подзадачи этого таска, форматируя их в html и вставляя в м.о.
    currentTask_arr.newTask_Subtasks_arr.forEach(function(subtaskEl) {
        funcAddNewSubtask(subtaskEl)
    })




    // Создаю событие на кнопку "Отмена" и "Добавить задачу" в форме создания подзадачи
    buttonCloseMenuNewTask.addEventListener("click", closeSubtaskForm)
    buttonAddNewTask.addEventListener("click", addSubtaskForm)


    // При нажатии на кнопку "Добавить подзадачу"
    addSubtask.addEventListener("click", function(e) {
        addSubtask.classList.add("hide2")   // Скрывает кнопку "Добавить подзадачу"
        modalContent_main.append(formFromAddNewTask)    // Перемещает форму для создания таска внутрь ".itc-modal-body__main-content"
        formFromAddNewTask.classList.remove("hide2")    // Убирает скрытие с формы изменения таска, которая перенеслась в место элемента "addSubtask"


        // Убираю скрытие со всех подзадач, если где-то оно было (если до этого было открыто меню редактирование подзадачи, после чего сразу нажалась кнопка для добавлений новой подзадачи)
        subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
            subtask.classList.remove("hide2")
        })

        // Блокирую показ доп. функций подзадач
        disabledShowDopTask = true
    })
    
    // Функция, вызываемая при нажатии на "Отмена" в форме создания подзадачи
    function closeSubtaskForm() {
        formFromAddNewTask.classList.add("hide2")   // Скрывается Блок "formFromAddNewTask"
        sectionContentBlock_viewContent.append(formFromAddNewTask)  // Блок "formFromAddNewTask" перемещается в конец страницы

        // Удаляется скрытие кнопки "addSubtask", вместо которого ранее был перемещён блок "formFromAddNewTask"
        addSubtask.classList.remove("hide2")


        // Если переменная, отвечающей за выбранную подзадачу, внутри которой должна находиться кнопка "отмена" - существует, (т.е. если "отмена прожата именно при редактировании существующей, а не при создании новой"), то 
        if (targetLi_subtask !=null && currentLi_modal !=null) {  
            targetLi_subtask.querySelector(".subtask__wrapper").classList.remove("hide2")        // Показывается скрытый li (подзадача)

            // Скрываю все доп функции подзадачи
            hide_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))

            // Удаляю отметку о текущей подзадаче с отслеживания при наведении
            currentLi_modal = null
        }
        // В ином случае (если отмена была при добавлении новой подзадачи) убираю скрытие со всех подзадач, если где-то оно было (если до этого было открыто меню редактирование подзадачи, после чего сразу нажалась кнопка для добавлений новой подзадачи)
        else {
            subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
                subtask.classList.remove("hide2")
            })
        }

        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска/подзадачи) и скрываю его
        reloadFormAddTask()

        // Разрешаю показ доп. функций подзадач
        disabledShowDopTask = false
    }
    // Функция, вызываемая при нажатии на "Добавить задачу" в форме создания таска
    function addSubtaskForm() {
        if (buttonAddNewTask.getAttribute("aria-disabled") == "false") {
            let colorPriority
            if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_red.png") {
                colorPriority = "red"
            } else if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_orange.png") {
                colorPriority = "orange"
            } else if (selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src") == "./icon/priority_blue.png") {
                colorPriority = "blue"
            } else {colorPriority = "ser"}

            const contentNewSubtask = {    // Создаю объект из введённых данных
                newSubtask_name: nameNewTask.value, 
                newSubtask_description: description.value, 
                newSubtask_typeSubtask_name: selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML,
                newSubtask_typeSubtask_icon_src: selectTypeTask.querySelector(".form-from-add-new-task__icon_type").getAttribute("src"),
                newSubtask_deadlineSubtask: selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML,
                newSubtask_deadlineFullDataSubtask: selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML,
                newSubtask_priority_name: selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML,
                newSubtask_priority_color: colorPriority,
                newSubtask_ID: currentTask_arr.newTask_countSubtask
            }

            currentTask_arr.newTask_countSubtask += 1

            // Добавляю созданый объект в параметр subtasks[] текущекго таска (в массиве тасков)
            currentTask_arr.newTask_Subtasks_arr.push(contentNewSubtask)

            // Запускаю функцию для добавления нового html элемента с новой подзадачей в м.о.
            funcAddNewSubtask(contentNewSubtask)

            // Обновляю поле с количеством подзадач
            countSubtasks.innerHTML = currentTask_arr.newTask_countSubtask

            // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
            reloadFormAddTask()


            // Убираю скрытие со всех подзадач, если где-то оно было (если до этого было открыто меню редактирование подзадачи, после чего сразу нажалась кнопка для добавлений новой подзадачи)
            subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
                subtask.classList.remove("hide2")
            })
            formFromAddNewTask.classList.add("hide2")

            // Удаляется скрытие кнопки "addSubtask", вместо которого ранее был перемещён блок "formFromAddNewTask"
            addSubtask.classList.remove("hide2")

            // Разрешаю показ доп. функций тасков
            disabledShowDopTask = false
        }
    }

    // Функция для добавления нового html элемента с новой подзадачей в м.о.
    function funcAddNewSubtask(content) {
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
                    <div class="subtask__dopFunction__hiddenMenu-deadline hide2">
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
                        <div class="subtask__dopFunction__hiddenMenu-deadline-calendare">
                            <input type="text" class="hiddenMenu-deadline-calendare hide2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </li>
        `

        // Добавляю новый html элемент таска в начало
        subtaskOuter_modal.insertAdjacentHTML("afterbegin", html)
    }



    // Можно ли показывать доп. функции подзадачи (изначально скрытые)
    disabledShowDopTask = false


    // Отображение поля с доп функциями при наведении на поле с подзадачей
    let currentLi_modal = null      // Элемент li под курсором в данный момент (если есть)

    subtaskOuter_modal.addEventListener("mouseover", function(e) {
        // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий если currentLi_modal есть, то мы ещё не ушли с предыдущего <li>, это переход внутри - игнорируем такое событие
        if (currentLi_modal) return
        let target = e.target.closest("li.subtask")


        if (!target) return;    // переход не на <li> - игнорировать
        if (!subtaskOuter_modal.contains(target)) return    // переход на <li>, но вне .subtaskOuter_modal (возможно при вложенных списках) - игнорировать

        // ура, мы зашли на новый <li>
        currentLi_modal = target

        show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))     // Показываем скрытое меню с доп func этого элемента
    })

    subtaskOuter_modal.addEventListener("mouseout", function(e) {
        // если мы вне <li>, то игнорируем уход мыши. Это какой-то переход внутри .subtaskOuter_modal, но вне <li>
        if (!currentLi_modal) return
        
        // мы покидаем элемент – но куда? Возможно, на потомка?
        let relatedTarget = e.relatedTarget
        while (relatedTarget) {
            // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет. Если да, то это переход внутри элемента – игнорируем
            if (relatedTarget == currentLi_modal) return
            relatedTarget = relatedTarget.parentNode
        }
    
        // мы действительно покинули элемент li

        hide_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"), currentLi_modal)  // Скрываем меню с доп func этого элемента
        currentLi_modal = null
    })

    // Функция показа доп функций элемента подзадачи
    function show_subtask_dopFuncs_modal(thisDopFuncs) {
        // Если запрета на показ доп.ф. нету, ИЛИ мы навелись на ту подзадачу, на которую только что кликнули
        if (disabledShowDopTask == false || (currentLi_klick_MO == currentLi_modal)) {
            thisDopFuncs.classList.remove("hide1")
            thisDopFuncs.querySelector(".subtask__btnEdit").classList.remove("hide1")
            thisDopFuncs.querySelector(".subtask__btnNewDeadline").classList.remove("hide1")
        }
    }


    // Функция скрытия доп функций элемента подзадачи
    function hide_subtask_dopFuncs_modal(thisDopFuncs) {
        // Если внутри подзадачи нету меню выбора срока выполнения, то все доп функции скрываются
        if (!timevar2_MO) {
            thisDopFuncs.classList.add("hide1")
            thisDopFuncs.querySelector(".subtask__btnEdit").classList.add("hide1")
            thisDopFuncs.querySelector(".subtask__btnNewDeadline").classList.add("hide1")
        } 
        // Иначе, если внутри подзадачи есть меню выбора срока выполнения, то скрываются все доп функции, кроме кнопки выбора срока выполнения
        else if (timevar2_MO = 1) {
            thisDopFuncs.querySelector(".subtask__btnEdit").classList.add("hide1")
        }
    }



    let targetLi_subtask = null




    // Кнопка редактирования подзадач
    subtaskOuter_modal.addEventListener("click", function(e) {  

        let target = e.target.closest(".subtask__btnEdit")   // Нажатая кнопка "edit"
        // Если нажатие было не по кнопке редактирования, то игнор
        if (!target) return  


        targetLi_subtask = e.target.closest(".subtask")       // Подзадача, внутри которой был нажат "edit"


    
        // В область выбранного таска добавляется поле для внесение изменений (вместо самого li, который скрывается)
        targetLi_subtask.append(formFromAddNewTask) 

        // Убирается скрытие li со всех элементов (если до этого какой-то скрылся, из-за незаконченного редактирования)
        subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
            subtask.classList.remove("hide2")      
        })

        // Скрывается li
        targetLi_subtask.querySelector(".subtask__wrapper").classList.add("hide2") 
        // Убирает скрытие с формы изменения таска, которая перенеслась в место элемента li      
        formFromAddNewTask.classList.remove("hide2")   
    
    
        // Скрываю кнопку для создания таска. И показываю кнопку для сохранения изменений при редактированини таска
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
        disabledShowDopTask = true
    })

    // Функция для вставки полей у подзадачи, в форму для редактирования этого выбранного подзадачи
    function copyAndPushLabelsSubtask(settingsSubtask) {
        nameNewTask.value = settingsSubtask.newSubtask_name   // Имя таска
        description.value = settingsSubtask.newSubtask_description    // Описание таска

        selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML = settingsSubtask.newSubtask_typeSubtask_name // Имя типа таска
        selectTypeTask.querySelector(".form-from-add-new-task__icon_type").setAttribute("src", settingsSubtask.newSubtask_typeSubtask_icon_src)  // Иконка типа таска
        selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML = settingsSubtask.newSubtask_deadlineSubtask
        selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML = settingsSubtask.newSubtask_deadlineFullDataSubtask
        selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML = settingsSubtask.newSubtask_priority_name   // Имя приоритета
        selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").setAttribute("src", `./icon/priority_${settingsSubtask.newSubtask_priority_color}.png`)    // Цвет флага
    }


    // При нажатии на кнопку "сохранить" при редактировании подзадачи
    buttonSaveTask.addEventListener("click", buttonSaveSubtask)
    function buttonSaveSubtask() {
        if (buttonSaveTask.getAttribute("aria-disabled") == "false" && isModal == true) {
            let liFromArr   // Таск из массива


            // Перебираю массив тасков и сохраняю в "liFromArr" id того, что совпадает с id выбранного для редактирования таска (li)
            for (let i = 0; i < all_subtasks.length; i++) {
                if (all_subtasks[i].newSubtask_ID == targetLi_subtask.getAttribute("data-subtask-id")) {
                    liFromArr = all_subtasks[i]   
                    break
                }
            }

            // Обновляю данные подзадачи в массиве подзадач и в html елементе подзадачи
            updateDataSubtask_arr(liFromArr)
            updateDataSubtask_element(targetLi_subtask, liFromArr)

            // Скрывается Блок "formFromAddNewTask"
            formFromAddNewTask.classList.add("hide2")   
            // Блок "formFromAddNewTask" перемещается в конец
            sectionContentBlock_viewContent.append(formFromAddNewTask)  
            
            // Удаляется скрытие элемента таска, вместо которого ранее был перемещён блок "formFromAddNewTask"
            subtaskOuter_modal.querySelectorAll(".subtask__wrapper").forEach(function(subtask) {
                subtask.classList.remove("hide2")
            })
            

            // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
            reloadFormAddTask()


            // Скрываю все доп функции подзадачи
            targetLi_subtask.querySelector(".subtask__btnEdit").classList.add("hide1")
            targetLi_subtask.querySelector(".subtask__btnNewDeadline").classList.add("hide1")

            // Удаляю отметку о текущей подзадачи с отслеживания при наведении
            currentLi_modal = null
            targetLi_subtask = null

            // Разрешаю показ доп. функций тасков
            disabledShowDopTask = false
        }
    }

    // Функция для обновления данных подзадачи внутри массива подзадач
    function updateDataSubtask_arr(subtaskArr) {
        subtaskArr.newSubtask_name = nameNewTask.value
        subtaskArr.newSubtask_description = description.value
        subtaskArr.newSubtask_typeSubtask_name = selectTypeTask.querySelector(".form-from-add-new-task__name-type-task").innerHTML   // Имя типа подзадачи
        subtaskArr.newSubtask_typeSubtask_icon_src = selectTypeTask.querySelector(".form-from-add-new-task__icon_type").getAttribute("src") // Иконка типа подзадачи
        subtaskArr.newSubtask_deadlineSubtask = selectDeadline.querySelector(".form-from-add-new-task__text-settings").innerHTML
        subtaskArr.newSubtask_deadlineFullDataSubtask = selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerHTML
        subtaskArr.newSubtask_priority_name = selectPriority.querySelector(".form-from-add-new-task__text-settings").innerHTML

        // Создаю переменную для выяснения названия цвета у приоритета. Беру содержание тега src у выбранного изображения и разбиваю его на массив.
        let arrColor = selectPriority.querySelector(".form-from-add-new-task__icon-selected-setting").getAttribute("src").split("")
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


    let timevar2_MO = ""        // (для работы с доп функциями при клике на кнопку добавления нового таска)

    // Удаляю отметку о текущей подзадаче
    currentLi_klick_MO = null



    

    //Функция для очистки стиля "выбранного элемента" со всех deadlineItem, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик. 
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
            deadlineItem.forEach(function(itemDeadline) { 
                itemDeadline.classList.remove("hovered_select_menu")
            })
            currentItemDeadline.classList.add("hovered_select_menu")
        }
    }

    //Функция для очистки стиля "выбранного элемента" со всех deadlineItem и у всех ячеек календаря, если он где-то был (удаляю со всех элементов класс "hovered_select_menu").
    // Данная функция используется при редактировании срока у ПОДЗАДАЧ 
    function reloadItemsAndCalendarDeadlineSubtask() {
        // Очищаю выделение срока в списке вариантов (в форме для создания, редактирования подзадачи)
        deadlineItem.forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })

        // Очищаю выделение срока в календаре (в форме для создания, редактирования подзадачи)
        if (selectedDay_MO_Subtask && selectedDay_MO_Subtask != "") {
            selectedDay_MO_Subtask.classList.remove("-selected-")
        }
    }









    // ВЫБОР СРОКА ВЫПОЛНЕНИЯ ПОДЗАДАЧИ:

    // 1) Выбор срока выполнения подзадачи (при выборе из списка вариантов):

    // 1.1) Если меню выбора срока было открыто через доп. функцию подзадачи "Назначить срок", то ...
    // При клике на один из пунктов выбора срока выполнения подзадачи (из списка вариантов), при выборе через "Назначить срок"
    subtaskOuter_modal.addEventListener("click", function(e) {
        const targetBtn = e.target.closest(".subtask__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 

        // Если клик был вне контейнера с кнопкой "NewDeadline" у ПОДЗАДАЧИ, то игнорируем
        if (!targetBtn) return

        const targetLi_Modal = e.target.closest(".subtask")  // Подзадача, внутри которой была нажата кнопка "Назначить срок"
        const deadlineItemNewDeadline = targetLi_Modal.querySelectorAll(".subtask__dopFunction__deadline-item")  // Все элементы для выбора срока выполнения у данной подзадачи
    
    
        // Запускаю функцию для создания одноразового обработчика события на каждом из элементов и сразу его вызова на элементе
        deadlineItemsSubtaskClick(deadlineItemNewDeadline)
    })
    // Функция для создания обработчика событий на все элементы списка выбора срока выполнения. При нажатии на какой-то из них, сразу происходит работа.
    function deadlineItemsSubtaskClick(items) {
        items.forEach(function(item) {
            item.addEventListener("click", function(e) {
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
                    if (Intl.DateTimeFormat(localLanguage, options3).format(dataWeekend) != "суббота") {
                        dataWeekend.setDate(dataWeekend.getDate() + 1)
                    }
                    // Увеличиваю дату пока не достигну субботы
                    while (Intl.DateTimeFormat(localLanguage, options3).format(dataWeekend) != "суббота") {
                        dataWeekend.setDate(dataWeekend.getDate() + 1)
                    }
        
                    // Если ближайшая суббота уже не была выбрана, то...
                    if (deadlineThisSubtask.innerHTML != `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend)}`) {
                        deadlineThisSubtask.innerHTML = `${dataWeekend.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend)}`

                        deadlineThisSubtaskFullNum.innerHTML = dataWeekend.toLocaleDateString()
        
                        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                        reloadItemsDeadlineSubtask(item)
                    }
        
                } else if (nameItemDeadline == "След. неделя") {
                    let dataNextWeek = new Date()   // Создаю новый объект даты
                    dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)
        
                    if (deadlineThisSubtask.innerHTML != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`) {
                        deadlineThisSubtask.innerHTML = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`

                        deadlineThisSubtaskFullNum.innerHTML = dataNextWeek.toLocaleDateString()
        
                        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                        reloadItemsDeadlineSubtask(item)
                    }
        
                } else if (nameItemDeadline == "Без срока" && deadlineThisSubtask.innerHTML != "Срок выполнения") {
                    isObservHiddenMenus = false
        
                    deadlineThisSubtask.innerHTML = "Срок выполнения"
                    deadlineThisSubtaskFullNum.innerHTML = "Срок выполнения"


                    //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                    reloadItemsDeadlineSubtask(item)
        
                } else if (nameItemDeadline == "Без срока" && deadlineThisSubtask.innerHTML == "Срок выполнения") {
                    isObservHiddenMenus == false
                }






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



                // Удаляю отметку о текущей подзадачи с отслеживания при наведении
                currentLi_modal = null
                targetLi_subtask = null


                // Целиком список сроков из списка вариантов (ul) (в "Назначить срок") 
                const deadlineHiddenList = e.target.closest(".subtask__dopFunction__hiddenMenu-deadline").querySelector(".subtask__dopFunction__deadline-list")
                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadlineSubtask(deadlineHiddenList)
                
            }, { once: true })
        })
    }  




    // 1.2) Если меню выбора срока было открыто при создании/редактировании подзадачи (т.е. не через доп. функцию "Назначить срок"), то ...
    // (При клике на один из пунктов выбора срока выполнения подзадачи (из списка вариантов), при выборе из "form-from-add-new-task__hiddenMenu-deadline") 
    deadlineItem.forEach(function(item) {
        item.addEventListener("click", deadlineItemSubtaskFormClick)
    })
    function deadlineItemSubtaskFormClick(e) {
        if (isModal == false) return    // Если МО отсутствует, то игнор

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
        const textAreaDeadline = selectDeadline.querySelector(".form-from-add-new-task__text-settings")

        // Скрытое поле для вставки выбранной даты у подзадачи (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num")
        

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
                reloadItemsDeadlineSubtask(item)
            }

        } else if (nameItemDeadline == "След. неделя") {
            let dataNextWeek = new Date()   // Создаю новый объект даты
            dataNextWeek.setDate(dataNextWeek.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)

            if (textAreaDeadline.innerHTML != `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`) {
                textAreaDeadline.innerHTML = `${dataNextWeek.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek)}`

                textAreaDeadlineHiddenNum.innerHTML = dataNextWeek.toLocaleDateString()

                //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
                reloadItemsDeadlineSubtask(item)
            }

        } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerHTML != "Срок выполнения") {
            isObservHiddenMenus = false


            textAreaDeadline.innerHTML = "Срок выполнения"
            textAreaDeadlineHiddenNum.innerHTML = "Срок выполнения"

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadlineSubtask(item)

            selectDeadline.querySelector(".form-from-add-new-task__icon-cross").classList.add("hide2")
        } else if (nameItemDeadline == "Без срока" && textAreaDeadline.innerHTML == "Срок выполнения") {
            isObservHiddenMenus == false
        }
    }

    


    // 2) Выбор срока выполнения подзадачи (при выборе в календаре):
    let selectedDay_MO_Subtask

    // 2.1) Если меню выбора открыто через "Назначить срок", то...
    // (При клике на день в календаре, при выборе из "subtask__dopFunction__hiddenMenu-deadline") 
    subtaskOuter_modal.addEventListener("click", function(e) {
        if (isModal == false) return    // Если МО отсутствует, то игнор

        let target = e.target       // Где был совершён клик?
        const targetBtn = e.target.closest(".subtask__btnNewDeadline")   // Нажатая кнопка "NewDeadline" 

        // Если клик был вне контейнера с кнопкой "NewDeadline" у ПОДЗАДАЧИ, то игнорируем
        if (!targetBtn) return


        // Если клик был не на элементе с ячейкой даты, то клик игнорируется
        if (!target.classList.contains("air-datepicker-cell")) return  


        const targetLi_Modal = e.target.closest(".subtask")  // Подзадача, внутри которой была нажата кнопка "Назначить срок"
        


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
        isObservHiddenMenus = true
        observFunc(selectDeadline)
        if (deadlineThisSubtask.innerHTML != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
            deadlineThisSubtask.innerHTML = dateDay + " " + selectMonthDataCalendare
        }
        deadlineThisSubtaskFullNum.innerHTML = selectDataCalendare.toLocaleDateString()


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



        // Удаляю отметку о текущей подзадачи с отслеживания при наведении
        currentLi_modal = null
        targetLi_subtask = null


        // Целиком список сроков из списка вариантов (ul) (в "Назначить срок") 
        const deadlineHiddenList = e.target.closest(".subtask__dopFunction__hiddenMenu-deadline").querySelector(".subtask__dopFunction__deadline-list")
        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadlineSubtask(deadlineHiddenList)
    })



    // 2.2) Если меню выбора открыто создании/редактировании подзадачи, то...
    // (При клике на день в календаре, при выборе из "form-from-add-new-task__hiddenMenu-deadline") 
    DeadlineCalendare.addEventListener("click", deadlineClickCalendar)
    function deadlineClickCalendar(e) {
        if (isModal == false) return    // Если МО отсутствует, то игнор

        let target = e.target       // Где был совершён клик?

        // Если клик был не на элементе с ячейкой даты, то клик игнорируется
        if (!target.classList.contains("air-datepicker-cell")) return 


        // Целиком список сроков из списка вариантов (ul) (при создании/редактировании задачи) 
        const deadlineHiddenList = target.closest(".form-from-add-new-task__hiddenMenu-deadline").querySelector(".form-from-add-new-task__deadline-list")

        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadlineSubtask(deadlineHiddenList)


        // Поле для вставки и отображения выбранной даты у таска (с текстовым отображением месяца)
        const textAreaDeadline = selectDeadline.querySelector(".form-from-add-new-task__text-settings")

        // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
        const textAreaDeadlineHiddenNum = selectDeadline.querySelector(".form-from-add-new-task__text-settings_hidden-num")


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
        isObservHiddenMenus = true
        observFunc(selectDeadline)
        if (textAreaDeadline.innerHTML != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
            textAreaDeadline.innerHTML = dateDay + " " + selectMonthDataCalendare
        }
        textAreaDeadlineHiddenNum.innerHTML = selectDataCalendare.toLocaleDateString()

    }







    // Появление и скрытие поля с выбором срока выполнения подзадачи в меню создания/редактирования подзадачи и при открытии его через "Назначить срок" (когда открыто МО)
    let timeVar_MO = ''

    // При нажатии на кнопку в форме для создания/редактирования подзадачи
    selectDeadline.addEventListener("click", selectDeadlineFunc)      
    function selectDeadlineFunc(e) {
        if (isModal == false) return    // Если МО отсутствует, то игнор


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
            isModal_block = false  

            // Разрешаю показ доп. функций тасков
            disabledShowDopTask = false

            // Очищаю выделение срока в списке вариантов и в календаре (при создании/редактировании задачи)
            reloadItemsAndCalendarDeadlineSubtask() 
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

            timeVar_MO = 1;  
            

            isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
            observFunc(selectDeadline)  // При первом открытии скрытого меню, начнётся отслеживание изменения окна "selectDeadline"


            // Запрещается показ доп. функций подзадач
            disabledShowDopTask = true
        }
    }


    // 1) При нажатии на доп функцию "Назначить срок" у подзадачи
    subtaskOuter_modal.addEventListener("click", function(e) {
        const targetBtn = e.target.closest(".subtask__btnNewDeadline")      // Нажатая кнопка "NewDeadline" 
        const targetBtnIcon = e.target.closest(".subtask__dopFunction_iconWrap")

        // Если клик был вне контейнера с кнопкой "NewDeadline", то игнорируем
        if (!targetBtn) return

        // Если клик был вне контейнера с иконкой кнопки "NewDeadline" (даже если например, на календарь), то игнорируем
        if (!targetBtnIcon) return

        const targetSubtask = e.target.closest(".subtask")



        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
        const curHiddenMenuDeadlineNewDeadline = targetBtn.querySelector(".subtask__dopFunction__hiddenMenu-deadline")

        const curHiddenCalendarContainer = targetBtn.querySelector(".subtask__dopFunction__hiddenMenu-deadline-calendare")
        const curHiddenCalendar = targetBtn.querySelector(".hiddenMenu-deadline-calendare")



        // Если меню скрыто
        if (curHiddenMenuDeadlineNewDeadline.classList.contains("hide2") == true) {   
            // Показываю это меню выбора (удаляю скрытие)
            curHiddenMenuDeadlineNewDeadline.classList.remove("hide2")
            
            
            // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
            const textAreaDeadlineHiddenNum = targetSubtask.querySelector(".subtask__deadline__date_hidden")

            // Полная дата, которая была перевёрнута (стала: "год.месяц.число")
            const textAreaDeadlineHiddenNumReversed = textAreaDeadlineHiddenNum.innerHTML.split(".").reverse().join(".")

            MyCalendar = new AirDatepicker(curHiddenCalendar, {
                inline: false,  
                buttons: ["today", "clear"],
                minDate: currectEntryDate,
                container: curHiddenCalendarContainer,
                selectedDates: textAreaDeadlineHiddenNumReversed,
                autoClose: true,
                // isDestroyed: true
            })
            MyCalendar.show();

            
            // Отмечаю нажатие на кнопку назначения нового срока выполнения
            timevar2_MO = 1

            // Отмечаю в глобальную переменную - подзадачу, внутри которой был совершён клик по кнопке
            currentLi_klick_MO = e.target.closest("li")            

            hide_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))

            // Запрещается показ доп. функций подзадач
            disabledShowDopTask = true
        }

        // Если меню отображено (не скрыто)
        else if (curHiddenMenuDeadlineNewDeadline.classList.contains("hide2") == false && timevar2_MO) {     
            // Скрываю это меню выбора и уничтожаю созданный календарь
            curHiddenMenuDeadlineNewDeadline.classList.add("hide2") 
            MyCalendar.destroy()
            MyCalendar = null


           
            setTimeout(() => timevar2_MO='', 100)
            // timevar2_MO=''
            
            // Удаляю отметку о текущей подзадаче
            currentLi_klick_MO = null                                  

            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false

            show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))

            // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
            reloadFormAddTask()
        }
    })


    // 2.1) При нажатии на само поля выбора (при создании/редактировании и с учётом наличия ранее нажатой  доп ф. "назначить срок")
    hiddenMenuDeadline.addEventListener("click", clickMenudeadline)
    function clickMenudeadline(e) { 
        if (isModal == false) return    // Если МО отсутствует, то игнор
    
        timeVar_MO = 1;  
        timevar2_MO = 1        // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)
    
        // Если ранее на каком-то из подзадач была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
        // Этот код работает только если ранее на какой-то подзадачае было открыто скрытое меню через "назначить срок", а сейчас клик происходит по открытому аналогичному меню, но вызванному у подзадачи при её создании/редактировании
        if ((currentLi_klick_MO != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
            // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
            const curHiddenMenuDeadlineNewDeadline = currentLi_klick_MO.querySelector(".subtask__dopFunction__hiddenMenu-deadline")
    
    
            // Скрываю само меню и удаляю календарь в нём
            curHiddenMenuDeadlineNewDeadline.classList.add("hide2")   
            MyCalendar.destroy()    
            MyCalendar = null
    
            // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
            timevar2_MO = ''
    
    
            // Скрываю все доп функции подзадачи
            hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))
    
    
            // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
            currentLi_klick_MO = null 
            currentLi_modal = null
    
    
            // Обнуляю элементы поля .formFromAddNewTask (поле для добавление новой подзадачи) и скрываю его
            reloadFormAddTask()
    
    
            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false
        } 
        // Если ранее ни на какой из подзадач не была нажата кнопка "NewDeadline" (иконка)
        else if ((currentLi_klick_MO == null)) {
            timevar2_MO = ""
        }
    
        if (isObservHiddenMenus == false) {
            isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
            observFunc(selectDeadline)   // Начинается слежка за "selectDeadline", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
        }
    }

    // 2.2) При нажатии на само поле выбора (при создании/редактировании подзадачи и нажатии доп ф. "назначить срок")
    subtaskOuter_modal.addEventListener("click", function(e) {
        if (isModal == false) return    // Если МО отсутствует, то игнор

        const target_container_subtask = e.target.closest(".subtask__dopFunction__hiddenMenu-deadline")   // Область скрытого меню выбора срока при нажатии на "Назначить срок"
        const target_container_formSubtask = e.target.closest(".form-from-add-new-task__hiddenMenu-deadline")  // Область скрытого меню выбора срока при создании/редактировании задачи

        // Если клик был не по меню выбора срока выполнения в функции "назначить срок" и не по аналогичному меню при создании/редактировании подзадачи, то игнор
        if (!target_container_subtask && !target_container_formSubtask) return


        timeVar_MO = 1;  
        timevar2_MO = 1        // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)

        // Если ранее на каком-то из тасков была нажата кнопка "NewDeadline" (иконка) и при этом СЕЙЧАС клик произошёл не на навигатор в календаре (месяцы/годы), не на кнопки календаря
        // Этот код работает если клик был по меню выбора срока выполнения после нажатия на "Назначить срок" (только в этом случае нужно скрывать сразу меню выбора, ведь при создании/редактировании после выбора скрывать меню не нужно)
        if ((currentLi_klick_MO != null) && !(e.target.closest(".air-datepicker--navigation") || e.target.closest(".-months-") || e.target.closest(".-years-") || e.target.closest(".air-datepicker--buttons"))) {
            // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
            const curHiddenMenuDeadlineNewDeadline = currentLi_klick_MO.querySelector(".subtask__dopFunction__hiddenMenu-deadline")
    
    
            // Скрываю само меню и удаляю календарь в нём
            curHiddenMenuDeadlineNewDeadline.classList.add("hide2")   
            MyCalendar.destroy()    
            MyCalendar = null
    
            // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
            timevar2_MO = ''
    
    
            // Скрываю все доп функции подзадачи
            hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))
    
    
            // Удаляю отметку о текущем таске с отслеживателя по клику и с отслеживания от наведения
            currentLi_klick_MO = null 
            currentLi_modal = null
    
    
            // Обнуляю элементы поля .formFromAddNewTask (поле для добавление новой подзадачи) и скрываю его
            reloadFormAddTask()
    
    
            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false
        } 
        // Если ранее ни на какой из подзадач не была нажата кнопка "NewDeadline" (иконка)
        else if ((currentLi_klick_MO == null)) {
            timevar2_MO = ""
        }
    
        if (isObservHiddenMenus == false) {
            isObservHiddenMenus = true     // Даётся разрешение на реакцию при изменении во время слежки за объектом
            observFunc(selectDeadline)   // Начинается слежка за "selectDeadline", если ранее была отключена (либо повторно устанавливается. Старая удаляется)
        }
    
    })


    // 3) При нажатии вне поля выбора (при открытии меню срока выполнения у подзадачи при её редактировании/создании или при "Назначить срок" подзадачи)
    body.addEventListener("click", clickOuterModal_deadlineSubtask)
    function clickOuterModal_deadlineSubtask(e) {
        // Если доп. меню срока выполнения (и у меню редактирования/создания подзадачи; и у доп. функции "назначить срок") - скрыто, то игнорируем
        if ((hiddenMenuDeadline.classList.contains("hide2") == true) && (!currentLi_klick_MO)) return

        else if (currentLi_klick_MO) {
            if (currentLi_klick_MO.querySelector(".subtask__dopFunction__hiddenMenu-deadline").classList.contains("hide2") == true) {
                console.log("Странно");
                return
            }
        }
        console.log("вошло");

        const targetLi_modal = e.target.closest(".subtask")     // Элемент  li для последующего определения нового срока выполнения подзадаче (одна из двух кнопок доп функций подзадачи)       
        const targetBtn = e.target.closest(".subtask__btnNewDeadline")   // Была ли нажата кнопка "NewDeadline" 

        // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
        let curHiddenMenuDeadlineNewDeadline = null
        // Если ранее была нажата кнопка "Назначить срок" у задачи, то переменной выше присваиваю нужное значение
        if (currentLi_klick_MO != null) {
            curHiddenMenuDeadlineNewDeadline = currentLi_klick_MO.querySelector(".subtask__dopFunction__hiddenMenu-deadline")
        }


        // Если клик был вне поля выбора и вне элемента подзадачи (li), и при этом ранее не была отмечена текущая ПОДЗАДАЧА по клику (перед этим кликом не нажалась кнопка ".subtask__btnNewDeadline" (иконка), после которой отображается меню выбора срока выполнения)
        if (!timeVar_MO && targetLi_modal == null && currentLi_klick_MO == null) {     // Если клик был вне поля и не на кнопку ".subtask__btnNewDeadline" (на иконку) и ранее не был отмечена текущая подзадача по клику
            console.log("1111111"); 
            isObservHiddenMenus = false
            observFunc(selectPriority)

            // Скрываю само меню и удаляю календарь в нём
            hiddenMenuDeadline.classList.add("hide2") 
            MyCalendarForm.destroy()    
            MyCalendarForm = null

            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false

            // Очищаю выделение срока в списке вариантов и в календаре (при создании/редактировании задачи)
            reloadItemsAndCalendarDeadlineSubtask()
        } 

        // Если клик был вне поля выбора и вне элемента подзадачи (li), и при этом уже была отмечена текущая ПОДЗАДАЧА по клику (ранее уже нажалась кнопка ".subtask__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
        else if (!timeVar_MO && targetLi_modal == null && currentLi_klick_MO != null) {
            console.log("2222222222222");
            curHiddenMenuDeadlineNewDeadline.classList.add("hide2")
            MyCalendar.destroy()
            MyCalendar = null
            
            
            // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
            timevar2_MO = ''

            // Скрываю доп функции подзадачи
            hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))

            currentLi_klick_MO = null              // Удаляю отметку о текущей подзадаче с отслеживателя по клику

            // Обнуляю элементы поля .formFromAddNewTask (поле для добавление новой подзадачи) и скрываю его
            reloadFormAddTask()

            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false

            // Целиком список сроков из списка вариантов (ul) (в "Назначить срок") 
            const deadlineHiddenList = curHiddenMenuDeadlineNewDeadline.querySelector(".subtask__dopFunction__deadline-list")
            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadlineSubtask(deadlineHiddenList)
        } 

        // Если клик был вне поля выбора, на элемент подзадачи (li), но не на кнопку ".subtask__btnNewDeadline" и при этом ранее не была отмечена подзадача (ранее не нажималась кнопка ".subtask__btnNewDeadline", при нажатии на которую отображается меню выбора срока выполнения) 
        if (!timeVar_MO && targetLi_modal != null && !targetBtn && currentLi_klick_MO == null) {
            console.log("3333333333333");
            // Скрываю само меню и удаляю календарь в нём
            hiddenMenuDeadline.classList.add("hide2") 
            MyCalendarForm.destroy()    
            MyCalendarForm = null


            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false

            // Показываю доп. функции у той подзадачи, на которую был совершён клик (которая была под курсором в момент клика)
            show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))


            // Очищаю выделение срока в списке вариантов и в календаре
            reloadItemsAndCalendarDeadlineSubtask()
        }

        // Если клик был вне поля выбора, на элемент подзадачи (li), но не на кнопку ".subtask__btnNewDeadline" и при этом ранее уже была отмечена подзадача (ранее уже нажалась кнопка ".subtask__btnNewDeadline" (иконку) и отобразилось меню выбора срока выполнения)
        else if (!timeVar_MO && targetLi_modal != null && !targetBtn && currentLi_klick_MO != null) {
            console.log("444444444");
            // Скрываю само меню и удаляю календарь в нём
            curHiddenMenuDeadlineNewDeadline.classList.add("hide2")
            MyCalendar.destroy()
            MyCalendar = null

            // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
            timevar2_MO = ''

            // Скрываю доп функции у текущей подзадачи
            hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))

            currentLi_klick_MO = null              // Удаляю отметку о текущей подзадачи с отслеживателя по клику

            // Обнуляю элементы поля .formFromAddNewTask (поле для добавление новой подзадачи) и скрываю его
            reloadFormAddTask()



            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false


            // Показываю доп. функции у той подзадачи, на которую был совершён клик (которая была под курсором в момент клика)
            show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))



            // Целиком список сроков из списка вариантов (ul) (в "Назначить срок") 
            const deadlineHiddenList = curHiddenMenuDeadlineNewDeadline.querySelector(".subtask__dopFunction__deadline-list")
            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadlineSubtask(deadlineHiddenList)
        }

        if (timeVar_MO) { 
            setTimeout(() => timeVar_MO='', 100)
        }  

    }



    
    




    
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


    // При клике на кнопку выбора типа таска в м.о.
    modalBtn_GroupTypeTask.addEventListener("click", function(e) {
        // Если скрытое меню выбора типа таска показано (не скрыто)
        if (conteinerFromHiddenMenuTypesTasks_modal.classList.contains("hide2") == false) {     // Если скрытое меню показано (не скрыто)
            // Скрываю меню выбора типа таска
            conteinerFromHiddenMenuTypesTasks_modal.classList.add("hide2")      

            // Изменяю класс с active на hover-hint
            modalBtn_GroupTypeTask.classList.replace("active", "hover-hint")
        }
        // Если скрытое меню выбора типа таска скрыто
        else {
            // Скрываю скрытое меню выбора приоритета, если оно было открыто
            conteinerFromHiddenMenuPriorityTasks_modal.classList.add("hide2")


            // Показываю меню выбора типа таска
            conteinerFromHiddenMenuTypesTasks_modal.classList.remove("hide2")   

            // Удаляю класс для стилизации подсказки при наведении и добавляю "active" для постоянного выделения
            modalBtn_GroupTypeTask.classList.replace("hover-hint", "active")
            timeVar_MO = 1
        }
    })

    // При нажатии на само поля выбора
    conteinerFromHiddenMenuTypesTasks_modal.addEventListener("click", function(e) {     
        timeVar_MO = 1
    })
    
    // При нажатии вне поля выбора
    body.addEventListener("click", function(e) {
        // Если скрытое меню типа таска (в aside) скрыто, а клик был не по одной из кнопке изменения параметра задачи (в aside), то игнор
        if ((conteinerFromHiddenMenuTypesTasks_modal.classList.contains("hide2")) && (!e.target.closest(".itc-modal-body__select-setting"))) return



        // Если клик был вне поля выбора типа таска, ИЛИ же клик был по одной из кнопке изменения параметра задачи (в aside), кроме текущей (изменения типа)
        if (!timeVar_MO || (e.target.closest(".itc-modal-body__select-setting") && !e.target.closest(".itc-modal-body__select-setting[data-title='Перенести в...']"))) {
            // Скрываю меню выбора типа таска
            conteinerFromHiddenMenuTypesTasks_modal.classList.add("hide2")

            // Изменяю класс с active на hover-hint
            modalBtn_GroupTypeTask.classList.replace("active", "hover-hint")
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
    
            // Скрываю меню выбора типа таска
            conteinerFromHiddenMenuTypesTasks_modal.classList.add("hide2")
            // Изменяю класс с active на hover-hint
            modalBtn_GroupTypeTask.classList.replace("active", "hover-hint")


            //  Изменяю имя и иконку типа таска внутри массива (с этим таском)
            currentTask_arr.newTask_typeTask_name = type.querySelector(".wrapper-type-task__name").innerHTML
            currentTask_arr.newTask_typeTask_icon_src = modalBtn_GroupTypeTask.querySelector(".wrapper-type-task__icon-type-project").getAttribute("src")



            // Изменяю имя и иконку типа таска в шапке м.о.
            modalTitle.querySelector(".wrapper-type-task__name").innerHTML = currentTask_arr.newTask_typeTask_name
            modalTitle.querySelector(".wrapper-type-task__icon-type-project").setAttribute("src", currentTask_arr.newTask_typeTask_icon_src)


            // Вызываю функцию для обновления html элемента с текущим таском
            updateDataTask_element(targetLi, currentTask_arr)
        })
    })
    
    


    // ИЗМЕНЕНИЕ СРОКА ВЫПОЛНЕНИЯ ТАСКА (не у подзадачи) :

    // 1) Появление и скрытие поля с выбором срока выполнения задачи:
    timeVar_MO = ''

    // 1.1) При клике на кнопку выбора срока выполнения таска в м.о.
    modalBtn_GroupDeadlineTask.addEventListener("click", function(e) {
        const curBtnDeadline = e.target.closest(".itc-modal-body__group")
        const curHiddenCalendarContainer = curBtnDeadline.querySelector(".itc-modal-body__hiddenMenu-deadline-calendare")
        const curHiddenCalendar = curBtnDeadline.querySelector(".hiddenMenu-deadline-calendare")

        
        // Если доп меню скрыто
        if (conteinerFromHiddenMenuDeadlineTasks_modal.classList.contains("hide2") == true) {
            // Скрываю скрытые меню выбора типа таска и приоритета, если они были открыты
            conteinerFromHiddenMenuTypesTasks_modal.classList.add("hide2")
            conteinerFromHiddenMenuPriorityTasks_modal.classList.add("hide2")


            // Показываю скрытое меню срока выполнения
            conteinerFromHiddenMenuDeadlineTasks_modal.classList.remove("hide2") 


            // Скрытое поле для вставки выбранной даты у таска (полной, с годом, и только числами)
            const textAreaDeadlineHiddenNum = modalAside.querySelector(".itc-modal-body__text-settings_hidden-num")

            // Полная дата, которая была перевёрнута (стала: "год.месяц.число")
            const textAreaDeadlineHiddenNumReversed = textAreaDeadlineHiddenNum.innerHTML.split(".").reverse().join(".")

            MyCalendar = new AirDatepicker(curHiddenCalendar, {
                inline: false,  
                buttons: ["today", "clear"],
                minDate: currectEntryDate,
                container: curHiddenCalendarContainer,
                selectedDates: textAreaDeadlineHiddenNumReversed,
                autoClose: true,
                // isDestroyed: true
            })
            MyCalendar.show();


            
            // Удаляю класс для стилизации подсказки при наведении и добавляю "active" для постоянного выделения
            modalBtn_GroupDeadlineTask.classList.replace("hover-hint", "active")


            timeVar_MO = 1;  

            
            // Запрещаю показ доп. функций подзадач
            disabledShowDopTask = true
        }

        // Если доп меню показано (не скрыто)
        else if (conteinerFromHiddenMenuDeadlineTasks_modal.classList.contains("hide2") == false) {
            // Скрываю меню выбора срока выполнения таска и уничтожаю созданный календарь
            conteinerFromHiddenMenuDeadlineTasks_modal.classList.add("hide2")
            MyCalendar.destroy()
            MyCalendar = null

            // Изменяю класс с active на hover-hint
            modalBtn_GroupDeadlineTask.classList.replace("active", "hover-hint")

            
            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false
        }
    })

    // 1.2) При нажатии на само поля выбора в скрытом меню "aside")
    conteinerFromHiddenMenuDeadlineTasks_modal.addEventListener("click", function(e) {     
        
        timeVar_MO = 1;
        timevar2_MO = 1     // (для работы с доп функциями при клике на кнопку добавления нового срока выполнения)


        // Если клик был после открытия окна срока в aside (в разделе изменения срока выполнения ТАСКА)
        // Если клик произошёл на дату из списка ul, или на день в каллендаре;
        if (e.target.closest(".itc-modal-body__deadline-item") || e.target.closest(".-day-")) {
            // Скрываю меню выбора срока выполнения таска и удаляю календарь в нём
            conteinerFromHiddenMenuDeadlineTasks_modal.classList.add("hide2") 
            MyCalendar.destroy()    
            MyCalendar = null

            // Изменяю класс с active на hover-hint
            modalBtn_GroupDeadlineTask.classList.replace("active", "hover-hint")

            
            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false

            timevar2_MO = ''
        }
    })



    // 1.3) При нажатии вне поля выбора (для скрытого меню срока у aside)
    body.addEventListener("click", clickOuterModal_deadline)
    function clickOuterModal_deadline(e) {
        if (isModal == false) return    // Если МО отсутствует, то игнор

        // Если доп. меню срока выполнения ТАСКА - скрыто, то игнорируем
        if (conteinerFromHiddenMenuDeadlineTasks_modal.classList.contains("hide2") == true) return

        
        
        
        // Если клик был после открытия окна срока в aside (в разделе изменения срока выполнения ТАСКА)
        // Если клик был вне поля выбора ИЛИ на кнопку изменения типа/приоритета таска
        if (!timeVar_MO || (e.target.closest(".itc-modal-body__select-setting") && !e.target.closest(".itc-modal-body__select-setting[data-title='Назначить новой крайний срок...']"))) {
            console.log("дадада");
            // Если клик был по доп функции подзадачи "Назначить срок", то игнорировать
            if (e.target.closest(".subtask__btnNewDeadline")) return


            // Скрываю меню выбора срока выполнения таска и удаляю календарь в нём
            conteinerFromHiddenMenuDeadlineTasks_modal.classList.add("hide2") 
            MyCalendar.destroy()    
            MyCalendar = null
            

            // Изменяю класс с active на hover-hint
            modalBtn_GroupDeadlineTask.classList.replace("active", "hover-hint")

            // Разрешаю показ доп. функций подзадач
            disabledShowDopTask = false

            if (targetLi_subtask != null) {
                show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))
            } 
        }

        // Если клик был после открытия доп. функции "Назначить срок"
        // Если клик был вне поля выбора ИЛИ на кнопку изменения типа/приоритета таска
        // else if (!timeVar_MO || (e.target.closest(".itc-modal-body__select-setting") && !e.target.closest(".itc-modal-body__select-setting[data-title='Назначить новой крайний срок...']"))) {
        //     console.log("PAPAP");
        //     // Если клик был по этой доп. функции подзадачи "Назначить срок", то игнорировать
        //     if (e.target.closest(".subtask__btnNewDeadline")) return

        //     // Скрытое меню выбора срока выполнения у кнопки "Назначить срок" конкретно текущей подзадачи
        //     const curHiddenMenuDeadlineNewDeadline = currentLi_klick_MO.querySelector(".subtask__dopFunction__hiddenMenu-deadline")

        //     // Скрываю само меню и удаляю календарь в нём
        //     curHiddenMenuDeadlineNewDeadline.classList.add("hide2")   
        //     MyCalendar.destroy()    
        //     MyCalendar = null         


        //     // Отмечаю, что сейчас не нажиматся кнопка "Назначить срок" и можно скрывать все доп. функции
        //     timevar2_MO = ''

            
        //     hide_subtask_dopFuncs_modal(currentLi_klick_MO.querySelector(".subtask__dopFuncs"))

        //     currentLi_klick_MO = null                                  // Удаляю отметку о текущей подзадаче

        //     // Разрешаю показ доп. функций подзадач
        //     disabledShowDopTask = false

            
        //     if (currentLi_modal != null) {
        //         show_subtask_dopFuncs_modal(currentLi_modal.querySelector(".subtask__dopFuncs"))
        //     } 


        //     // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        //     reloadFormAddTask()
        // }


        if (timeVar_MO) { 
            setTimeout(() => timeVar_MO='', 100)
        }  
    }






    



    
    // Функция для очистки стиля "выбранного элемента" со всех deadlineItem в скрытом меню у aside, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик.
    function reloadItemsDeadline_modal_aside(currentItemDeadline) {
        deadlineItem_modal.forEach(function(itemDeadline) { 
            itemDeadline.classList.remove("hovered_select_menu")
        })
        if (currentItemDeadline) {
            currentItemDeadline.classList.add("hovered_select_menu")
        }
    }

    // 2.1) Выбор срока выполнения ТАСКА (внутри МО) (при выборе из СПИСКА ВАРИАНТОВ):
    deadlineItem_modal.forEach(function(item) {
        item.addEventListener("click", function(e) {  
            // Если меню выбора срока выполнения находится внутри aside (в разделе изменения срока выполнения ТАСКА).

            // Убираю выделение выбранного дня в календаре, если ранее там было что-то выбрано
            if (selectedDay_modal && selectedDay_modal != "") {
                selectedDay_modal.classList.remove("-selected-")
            }

            const nowData2 = new Date()


            // Название выбранного дня (из списка)
            const nameItemDeadline_modal = item.querySelector(".itc-modal-body__deadline-name").innerHTML 

            // Поле с текстом для выбранного срока 
            const textAreaDeadline_modal = modalBtn_GroupDeadlineTask.querySelector(".itc-modal-body__text-settings")  

            // Поле с числовым полным значением для выбранного срока
            const textAreaDeadlineHiddenNum_modal = modalBtn_GroupDeadlineTask.querySelector(".itc-modal-body__text-settings_hidden-num")     

            // Поле с текстом со сроком выполнения данного таска, которое внизу слева (вне мо, на основной странице)
            const deadlineThisTask = targetLi.querySelector(".task__deadline__date_visible") 
            // Поле с числовым полным значением со сроком выполнения данного таска (вне мо, на основной странице)    
            const deadlineThisTaskFullNum = targetLi.querySelector(".task__deadline__date_hidden")     


            if (nameItemDeadline_modal == "Сегодня") {
                textAreaDeadline_modal.innerHTML = `${nowDay} ${nowMonth}`

                textAreaDeadlineHiddenNum_modal.innerHTML = nowData2.toLocaleDateString()
                deadlineThisTaskFullNum.innerHTML = nowData2.toLocaleDateString()
            } else if (nameItemDeadline_modal == "Завтра") {
                textAreaDeadline_modal.innerHTML = `${nowDay+1} ${nowMonth}`  // Обновляю срок данной задачи внутри мо

                nowData2.setDate(nowDay+1)
                textAreaDeadlineHiddenNum_modal.innerHTML = nowData2.toLocaleDateString()
                deadlineThisTaskFullNum.innerHTML = nowData2.toLocaleDateString()
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


                textAreaDeadline_modal.innerHTML = `${dataWeekend_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataWeekend_modal)}`

                textAreaDeadlineHiddenNum_modal.innerHTML = dataWeekend_modal.toLocaleDateString()
                deadlineThisTaskFullNum.innerHTML = dataWeekend_modal.toLocaleDateString()
            } else if (nameItemDeadline_modal == "След. неделя") {
                let dataNextWeek_modal = new Date()   // Создаю новый объект даты
                dataNextWeek_modal.setDate(dataNextWeek_modal.getDate() + 7)    // Увеличиваю дату ровно на неделю (7 дней)
    
                if (textAreaDeadline_modal.innerHTML != `${dataNextWeek_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek_modal)}`) {
                    textAreaDeadline_modal.innerHTML = `${dataNextWeek_modal.getDate()} ${Intl.DateTimeFormat(localLanguage, options2).format(dataNextWeek_modal)}`


                    textAreaDeadlineHiddenNum_modal.innerHTML = dataNextWeek_modal.toLocaleDateString()
                    deadlineThisTaskFullNum.innerHTML = dataNextWeek_modal.toLocaleDateString()
                }
    
            } else if (nameItemDeadline_modal == "Без срока" && textAreaDeadline_modal.innerHTML != "Срок выполнения") {
                textAreaDeadline_modal.innerHTML = "Срок выполнения"

                textAreaDeadlineHiddenNum_modal.innerHTML = "Срок выполнения"
                deadlineThisTaskFullNum.innerHTML = "Срок выполнения"
            }

            // Обновляю срок выполнения в массиве текущего таска
            currentTask_arr.newTask_deadlineTask = textAreaDeadline_modal.innerHTML
            currentTask_arr.newTask_deadlineFullDataTask = textAreaDeadlineHiddenNum_modal.innerHTML

            // Обновляю срок задачи внутри элементов таска (вне мо)(внизу слева у таска)
            deadlineThisTask.innerHTML = textAreaDeadline_modal.innerHTML

            //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
            reloadItemsDeadline_modal_aside()
            
            
        })
    })

    // 2.2) Выбор срока выполнения таска (при выборе в календаре):

    let selectedDay_modal = ""
    DeadlineCalendare_modal.addEventListener("click", function(e) {
        let target = e.target       // Где был совершён клик?


        // Родитель скрытого меню срока выполнения (что бы узнать в последствии, находится этот элемент внутри aside или внутри доп. функции подзадачи "назначить срок")
        let parentDeadlineHiddenMenu = conteinerFromHiddenMenuDeadlineTasks_modal.parentElement

        if (!target.classList.contains("air-datepicker-cell")) return       // Если клик был не на элементе с ячейкой даты, то клик игнорируется


        // Если клик был по ячейке с датой, до запускается функция, где уже будет произведена работа с выбранной ячейкой
        showElCalentare_modal(target)
        
        
    })

    function showElCalentare_modal(currData) {
        // Родитель скрытого меню срока выполнения (что бы узнать в последствии, находится этот элемент внутри aside или внутри подзадачи  в кнопке "назначить срок")
        let parentDeadlineHiddenMenu = conteinerFromHiddenMenuDeadlineTasks_modal.parentElement


        // Поле с текстом для выбранного срока
        const textAreaDeadline = modalBtn_GroupDeadlineTask.querySelector(".itc-modal-body__text-settings") 

        // Поле с числовым полным значением для выбранного срока
        const textAreaDeadlineHiddenNum_modal = modalBtn_GroupDeadlineTask.querySelector(".itc-modal-body__text-settings_hidden-num")     

        // Поле с текстом со сроком выполнения данного таска, которое внизу слева (вне мо, на основной странице)
        const deadlineThisTask = targetLi.querySelector(".task__deadline__date_visible") 
        // Поле с числовым полным значением со сроком выполнения данного таска (вне мо, на основной странице)    
        const deadlineThisTaskFullNum = targetLi.querySelector(".task__deadline__date_hidden")     
    


        selectedDay_modal = currData

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
        textAreaDeadline.innerHTML = dateDay + " " + selectMonthDataCalendare
        // Ввожу в скрытое поле с полным числовым значением (в мо в aside)
        textAreaDeadlineHiddenNum_modal.innerHTML = selectDataCalendare.toLocaleDateString()


        // Обновляю срок задачи внутри элементов таска (вне мо)(внизу слева у таска)
        deadlineThisTask.innerHTML = dateDay + " " + selectMonthDataCalendare
        // Ввожу в скрытое поле с полным числовым значением у таска (вне мо)
        deadlineThisTaskFullNum.innerHTML = selectDataCalendare.toLocaleDateString()
        
    
        // Обновляю срок выполнения в массиве текущего таска
        currentTask_arr.newTask_deadlineTask = dateDay + " " + selectMonthDataCalendare
        currentTask_arr.newTask_deadlineFullDataTask = selectDataCalendare.toLocaleDateString()
        
    }


    function showElCalentareNewDeadline_modal(currData) {
        //Очищаю стиль выбранного элемента со всех, если он где-то был (удаляю со всех элементов класс "hovered_select_menu")
        reloadItemsDeadline_modal_aside()

        selectedDay = currData  

        // Поле с текстом со сроком выполнения данной подзадачи, которое внизу слева (нужно так же для доп. функции "Назначить срок")
        const deadlineThisSubtask = targetLi_subtask.querySelector(".subtask__deadline__date_visible")

        // Поле с числовым полным значением со сроком выполнения данной подзадачи
        const deadlineThisSubtaskFullNum = targetLi_subtask.querySelector(".subtask__deadline__date_hidden")     

 
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
        if (deadlineThisSubtask.innerHTML != dateDay + " " + selectMonthDataCalendare) {   // Если выбранная дата не такая же как уже выбранная
            deadlineThisSubtask.innerHTML = dateDay + " " + selectMonthDataCalendare
            deadlineThisSubtaskFullNum.innerHTML = selectDataCalendare.toLocaleDateString()
        }

        let idCurSubtask = ""     // Id подзадачи из массива
        // Перебираю массив подзадач и сохраняю в "liFromArr" id того, что совпадает с id выбранной для изменения срока выполнения подзадачи (li)
        for (let i = 0; i < all_subtasks.length; i++) {
            if (all_subtasks[i].newSubtask_ID == targetLi_subtask.getAttribute("data-subtask-id")) { 
                idCurSubtask = i
                break
            }
        } 


        // Обновляю срок выполнения в массиве текущей ПОДЗАДАЧИ
        all_subtasks[idCurSubtask].newSubtask_deadlineSubtask = deadlineThisSubtask.innerHTML
        all_subtasks[idCurSubtask].newSubtask_deadlineFullDataSubtask = deadlineThisSubtaskFullNum.innerHTML

        // Удаляю отметку о текущей подзадачи с отслеживания при наведении
        currentLi_modal = null
        targetLi_subtask = null
    }



    // ИЗМЕНЕНИЕ ПРИОРИТЕТА ТАСКА:

    // 1) Появление и скрытие поле с выбором приоритета задачи в меню создания новой задачи

    timeVar_MO = ''
    // 1.1) При нажатии на кнопку
    modalBtn_GroupPriorityTask.addEventListener("click", function(e) {    
        // Если меню выбора приоритета показано (не скрыто) 
        if (conteinerFromHiddenMenuPriorityTasks_modal.classList.contains("hide2") == false) {
            // Скрываю меню выбора приоритета таска
            conteinerFromHiddenMenuPriorityTasks_modal.classList.add("hide2")
            // Изменяю класс с active на hover-hint
            modalBtn_GroupPriorityTask.classList.replace("active", "hover-hint")
        }
        // Если меню выбора приоритета скрыто
        else if (conteinerFromHiddenMenuPriorityTasks_modal.classList.contains("hide2") == true) {
            // Скрываю скрытое меню выбора типа таска, если оно было открыты
            conteinerFromHiddenMenuTypesTasks_modal.classList.add("hide2")

            // Показываю скрытое меню выбора приоритета
            conteinerFromHiddenMenuPriorityTasks_modal.classList.remove("hide2")

            // Удаляю класс для стилизации подсказки при наведении и добавляю "active" для постоянного выделения
            modalBtn_GroupPriorityTask.classList.replace("hover-hint", "active")
            timeVar_MO = 1
        }
    })

    // 1.2) При нажатии на само поля выбора
    conteinerFromHiddenMenuPriorityTasks_modal.addEventListener("click", function(e) {       
        timeVar_MO = 1
    })

    // 1.3) При нажатии вне поля выбора - скрывается
    body.addEventListener("click", function(e) {   
        // Если скрытое меню приоритета таска (в aside) скрыто, а клик был не по одной из кнопке изменения параметра задачи (в aside), то игнор
        if ((conteinerFromHiddenMenuPriorityTasks_modal.classList.contains("hide2")) && (!e.target.closest(".itc-modal-body__select-setting"))) return

        if (!timeVar_MO || (e.target.closest(".itc-modal-body__select-setting") && !e.target.closest(".itc-modal-body__select-setting[data-title='Назначить приоритет...']"))) {
            // Скрываю меню выбора приоритета таска
            conteinerFromHiddenMenuPriorityTasks_modal.classList.add("hide2")

            // Изменяю класс с active на hover-hint
            modalBtn_GroupPriorityTask.classList.replace("active", "hover-hint")
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

            // Скоываю меню выбора приоритета таска
            conteinerFromHiddenMenuPriorityTasks_modal.classList.add("hide2")
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
            
            // Вызываю функцию для обновления html элемента с текущим таском
            updateDataTask_element(targetLi, currentTask_arr)
        })
    })




    modal.show()
    isModal = true


    // Событие при закрытии модального окна
    document.addEventListener('hide.itc.modal', closeModal, {once: true})   // Удаляется после срабатывания
    function closeModal() {
        isModal = false     // Модальное окно - отсутствует

        formFromAddNewTask.classList.add("hide2")   // Скрывается Блок "formFromAddNewTask"
        sectionContentBlock_viewContent.append(formFromAddNewTask)  // Блок "formFromAddNewTask" перемещается в конец страницы
        // Обнуляю элементы поля .formFromAddNewTask (поле для добавление нового таска) и скрываю его
        reloadFormAddTask()


        // Удаляю событие с кнопки "Отмена" в форме добавления таска
        buttonCloseMenuNewTask.removeEventListener("click", closeSubtaskForm)  
        // Удаляю событие с кнопки "Добавить задачу" в форме добавления таска
        buttonAddNewTask.removeEventListener("click", addSubtaskForm) 
        // Удаляю событие с кнопки "сохранить" в форме добавления таска
        buttonSaveTask.removeEventListener("click", buttonSaveSubtask)
  

        
        modal.dispose();  // Удаляю модальное окно из html документа
        body.removeEventListener("click", clickOuterModal_deadline)
        hiddenMenuDeadline.removeEventListener("click", clickMenudeadline)
        body.removeEventListener("click", clickOuterModal_deadlineSubtask)
        deadlineItem.forEach(function(item) {
            item.removeEventListener("click", deadlineItemSubtaskFormClick)
        })
        DeadlineCalendare.removeEventListener("click", deadlineClickCalendar)
        selectDeadline.removeEventListener("click", selectDeadlineFunc) 
        body.removeAttribute("style")
    }
})


// checkbox_modal_color.slice(0, 26)







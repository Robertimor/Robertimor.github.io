import {reloadFormAddTask} from "./scripts.js"





const aside = document.querySelector(".aside")                  // Сайдбар целиком
const buttonMenuProfile = document.querySelector(".aside-user-menu__btn_menu-profile");   // Поле с фото и логином, при нажатии на которое открывается скрытое меню профиля
const menuProfile = document.querySelector(".hidden-menu-profile");         // Скрытое меню профиля
const notifications = document.querySelector(".aside-user-menu__btn-notifications")      // Кнопка уведомления
const hideAndShow_Sidebar = document.querySelector(".aside-user-menu__btn-hideAndShow-sidebar")      // Кнопка скрытия/показа сайдбара



const overlay = document.querySelector(".overlay")  // Подложка для модального окна, которое появится при нажатии на кнопку добавления задачи из aside главной страницы
const asideAddTask = document.querySelector(".aside-user-menu__add-new-task")    // Кнопка добавления задачи из aside главной страницы
const modalCloseButtonNewTask = document.querySelector('.js-modal-close')   // Кнопка для закрытия подального окна для создания новой задачи



const asideAllTasks = document.querySelector(".aside-user-menu__all-tasks-list")   // Кнопка для отображения ВСЕХ тасков на странице



const asideSearchTasks = document.querySelector(".aside-user-menu__search-task")
const asideInputSearchTasks = document.querySelector("#input-search-tasks")

const asideTodayTasks = document.querySelector(".aside-user-menu__today-list")    // Кнопка для показа на странице лишь тасков на СЕГОДНЯ
const asideFilterItems = document.querySelectorAll(".aside-user-menu__filter-item")  // Все элементы aside, которые выполняют роль фильтра отображения тасков на странице (по сроку, по типу)


const asideHomeTasks = document.querySelector(".aside-user-menu__type-home")  // Кнопка для показа на странице лишь тасков типа "Дом"
const asideJobTasks = document.querySelector(".aside-user-menu__type-job")    // Кнопка для показа на странице лишь тасков типа "Работа"
const asideStudyTasks = document.querySelector(".aside-user-menu__type-study")    // Кнопка для показа на странице лишь тасков типа "Учёба"



const formFromAddNewTask = document.querySelector(".form-from-add-new-task")    // Поле добавления нового таска
const nameNewTask = document.querySelector(".form-from-add-new-task__name-new-task")   // Поле для написания имени нового добавляемого таска
const description = document.querySelector(".form-from-add-new-task__description")   // Поле для написания описания нового добавляемого таска
const buttonAddNewTask = formFromAddNewTask.querySelector(".btn-add")        // Кнопка добавления описанного (выбрано имя и описание) таска
const sectionContentBlock_viewContent = document.querySelector(".section-content-block__view-content")  // Основная область. С текущей датой, со списком тасков, с меню добавления новой задачи





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

const nowDay = nowData.getDate()    // Сегодняшнее число
const nowMonth = Intl.DateTimeFormat(localLanguage, options2).format(nowData)   // Сегодняшний месяц словами
const nowMonthNum = nowData.getMonth()
const nowYear = nowData.getFullYear()   // Сегодняшний год

// Сегодняшняя дата в формате "год.месяц.число". Нужно для установки минимальной даты всем календарям
const currectEntryDate = `${nowYear}.${nowMonthNum + 1}.${nowDay}`

const containerAsideCalendar = document.querySelector(".aside-user-menu__calendar")
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




// Показ/скрытие (изначальо скрытого) меню профиля
buttonMenuProfile.addEventListener("click", function (e) {
    menuProfile.classList.toggle("hide2")
})

// При клике вне меню профиля
document.addEventListener("click", function(e) {
    // Если скрытое меню профиля показано и клик был не по кнопке его открытия/скрытия
    if (!menuProfile.classList.contains("hide2") && !e.target.closest(".aside-user-menu__btn_menu-profile")) {
        menuProfile.classList.add("hide2")
    }
})



// Скрытие сайдбара
hideAndShow_Sidebar.addEventListener("click", function (e) {
    aside.classList.toggle("_hide-sidebar")
    hideAndShow_Sidebar.classList.toggle("_moved-btn-hide-and-show-sidebar")
})





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
    sectionContentBlock_viewContent.querySelectorAll(".task__wrapper").forEach(function(task) {
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
export function closeModalNewTask() {
    const modalNewTaskElem = document.querySelector('.modalAddNewTask');

    modalNewTaskElem.classList.remove('active');
    overlay.classList.remove('active');

    // Разрешаю показ доп. функций
    window.localStorage.setItem("disabledShowDopFuncTask", "false")
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
        const nameTask = task.querySelector(".task__name-task").innerHTML.toLocaleLowerCase()

        // Если в строке имени таска нет введённых символов, то скрываю этот таск
        if (!nameTask.includes(curName.toLocaleLowerCase())) {
            task.classList.add("hiddenFiltered")
        } 
        // Иначе, если в строке имени таска есть введённые символы - убираю класс скрытия с таска (если он был)
        else if (nameTask.includes(curName.toLocaleLowerCase())) {
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
 


//Функция для очистки стиля "выбранного элемента" со всех aside-user-menu__filter-item, если он где-то был (удаляю со всех элементов класс "hovered_select_menu"). И ставлю этот класс (стиль "выбранного элемента") тому, на который был произведён клик.
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




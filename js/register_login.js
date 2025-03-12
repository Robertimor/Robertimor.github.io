'use strict';

import {hiddenByDisplay} from "./base.js"

const sidebar = document.querySelector(".sidebar")                  // Сайдбар целиком
const logReg = document.querySelector(".log-reg")               // Поле с регистрацией/авторизацией
const InpLogin = document.querySelector(".inp-login");            // Поле для логина при регистрации/авторизации
const InpPassword = document.querySelector(".inp-password");     // Поле для пароля при регистрации/авторизации
const butLogin = document.querySelector(".btn-login");          // Кнопка авторизации
const butReg = document.querySelector(".btn-register");          // Кнопка регистрации
const butExit = document.querySelector(".hidden-menu-profile__link-to-exit")    // Кнопка выхода из аккаунта



const userMenu = document.querySelector(".sidebar-user-menu")       // Поле sidebar-а авторизированного пользователя
const mainContent = document.querySelector(".block-all-tasks")
const nicknameUser = document.querySelector(".sidebar-user-menu__nickname-user")    // Отображаемый nickname (login) пользователя


let accounts
let currentAccount 
// Если ранее небыло создано аккаунтов, то переменная равняется пустому массиву. Если уже был создан какой-то аккаунт, то переменная аккаунтов и текущего авторизированного аккаунта присваевают значения из localStorage
if (window.localStorage.getItem("accounts") == null) {
    accounts = []
} 
else {
    accounts = JSON.parse(window.localStorage.getItem("accounts"))
    currentAccount = JSON.parse(window.localStorage.getItem("currentAccount"))
}



// При нажатии на кнопку регистрации:
butReg.addEventListener("click", function(e) {      
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
        window.localStorage.setItem("accounts", JSON.stringify(accounts))

        InpLogin.value = InpPassword.value = ""     // Очищаю поля ввода
        hiddenByDisplay(document.querySelector(".log-reg__successfulReg"), "show")  // Уведомляю об успешной регистрации
        hiddenByDisplay(document.querySelector(".log-reg__empty-field"), "hide")    // Скрываю надпись о неудачной регистрации если она была показана ранее
    } else {
        hiddenByDisplay(document.querySelector(".log-reg__empty-field"), "show")           // Показываю заготовленное сообщение об необходимости заполнить поля
        hiddenByDisplay(document.querySelector(".log-reg__successfulReg"), "hide")         // Удаляю поле с успешной ранее регистрацией если она была показана ранее
    }
    
})

// Если зафиксирован активный пользователь, то сразу скрывается меню ренистрации/авторизации и показывается всё остальное
if (currentAccount) {
    hiddenByDisplay(logReg, "hide")
    hiddenByDisplay(userMenu, "show")
    hiddenByDisplay(mainContent, "show")
    nicknameUser.innerHTML = currentAccount.login
}

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
        window.localStorage.setItem("currentAccount", JSON.stringify(currentAccount))
        alert(`Вы успешно авторизировались. Добро пожаловать, ${currentAccount.login}`)
        hiddenByDisplay(logReg, "hide")
        hiddenByDisplay(userMenu, "show")
        hiddenByDisplay(mainContent, "show")
        nicknameUser.innerHTML = currentAccount.login
    } else {
        alert("Неверное имя пользователя или пароль!")
    }
})


// Выход из аккаунта
butExit.addEventListener("click", function(e) {
    location.reload()
    currentAccount = null
    window.localStorage.removeItem("currentAccount")
})
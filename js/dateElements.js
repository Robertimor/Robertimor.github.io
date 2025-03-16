'use strict';

import {nameToday, deadlineButton} from "./domElements.js"

// Создаю текущую дату
const localLanguage = navigator.language
const nowData = new Date() 

const optionsWithMonth = {
    month: "short"
}
const optionsWithWeekday = {
    weekday: "long"
}


const nowDay = nowData.getDate()    // Сегодняшнее число
const nowMonth = Intl.DateTimeFormat(localLanguage, optionsWithMonth).format(nowData)   // Сегодняшний месяц словами
const nowMonthNum = nowData.getMonth()
const nowYear = nowData.getFullYear()   // Сегодняшний год
const nowWeekday = (Intl.DateTimeFormat(localLanguage, optionsWithWeekday).format(nowData))       // Сегодняшний день недели
const correctWeekday = (String(nowWeekday.split("").splice(0, 1)).toLocaleUpperCase()) + (nowWeekday.split("").splice(1, 10).join(""))
const nowTime = nowData.toLocaleTimeString("ru-RU"); 


// Сегодняшняя дата в формате "год.месяц.число". Нужно для установки минимальной даты всем календарям
const currectEntryDate = `${nowYear}.${nowMonthNum + 1}.${nowDay}`



nameToday.innerText = `${nowDay} ${nowMonth} ‧ Сегодня ‧ ${correctWeekday}`     // Записываю в html код текущую дату

// Записываю сегодняшнее число в окно выбора срока выполнения для новой создаваемой задачи
deadlineButton.querySelector(".form-from-add-new-task__text-settings").innerText = `${nowDay} ${nowMonth}`
deadlineButton.querySelector(".form-from-add-new-task__text-settings_hidden-num").innerText = nowData.toLocaleDateString()



export {localLanguage, nowData, optionsWithMonth, optionsWithWeekday, nowDay, nowMonth, nowMonthNum, nowYear, nowWeekday, nowTime, correctWeekday, currectEntryDate}
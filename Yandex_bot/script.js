// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

let yInput = document.getElementById("text"); //строка инпут в яндексе
let keywords = ['Гобой', 'Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна'];
let keyword = keywords[getRandom(0,keywords.length)];
let btnK = document.getElementsByClassName("button_theme_websearch")[0]; //кнопка Найти в яндексе на главной странице
let i = 0;
let links = document.links; //все ссылки на странице
let removeBlankPage = document.querySelectorAll('a');

if (btnK != undefined){
    let timerId = setInterval(()=>{
        yInput.value += keyword[i];
        i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },1000);
}else if(location.hostname == "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai"){
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if (getRandom(0,101)>=80){
            location.href = 'https://yandex.ru/';
        }
        else if (links[index].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            links[index].click();}
    },getRandom(3000,7000));
}else{
    let nextYpage = true;
    for (let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            let link = links[i];
            nextYpage = false;
            link.removeAttribute("target"); // убираем атрибут таргет у одной ссылки! только у той, по которой кликаем
            setTimeout(()=>{link.click();},getRandom(1000,4000));
            break;
        }
    }
    if (document.querySelector('.pager__item_current_yes').innerText == "5"){ //пятая страница яндекса
        nextYpage = false;
        location.href = 'https://yandex.ru/';
    }
    if (nextYpage){
        setTimeout(()=>{document.querySelector('.pager__item_kind_next').click();},getRandom(1000,4000)); //перейти на следующую страницу яндекс
    }
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

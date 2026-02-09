"use strict";

let maxLength = 0
let maxKey = ""
let ul_for_visits = document.getElementById("ul_for_visits")

for (let cite = 0; cite < localStorage.length; cite++) {

    let new_h = document.createElement("h1")
    let new_ul = document.createElement("ul")
    new_h.innerText = localStorage.key(cite)

    console.log(localStorage.key(cite))
    let cite_array_length = JSON.parse(localStorage.getItem(localStorage.key(cite))).length

    if (cite_array_length > maxLength) {
        maxLength = cite_array_length
        maxKey = localStorage.key(cite)
    }

    for (let date = 0; date < cite_array_length; date++) {

        let new_li = document.createElement("li")
        let array = localStorage.getItem(localStorage.key(cite))
        let day_not_date = JSON.parse(array)[date]
        let day_date = new Date(Number(day_not_date));

        new_li.innerText = day_date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
        new_ul.appendChild(new_li)
    }

    ul_for_visits.appendChild(new_h)
    ul_for_visits.appendChild(new_ul)
}

let maxTimeH = document.getElementById("maxTimeH")
if (maxLength) {
    maxTimeH.innerText = `The most tried: ${maxKey} ${maxLength} attempts`
}
else {maxTimeH.innerText = "Hey, you didn't visited brainrot cites! Or maybe you just deleted localStorage :)"}


let clear_lS = document.getElementById("clear_lS")
clear_lS.addEventListener("click", function () {
    window.location.reload()
    localStorage.clear()
})


document.getElementById("custom_url_form").addEventListener("submit", sendCustomPatternScript)


async function sendCustomPatternScript(event) {
    event.preventDefault()
    let custom_url = document.getElementById("custom_url_input")
    let pattern = `*://*.${custom_url.value.trim()}/*`
    console.log(pattern)
    let url = {
        js: [{file: "scripts/full_prohibited.js"}],
        matches: [pattern]
    }

    browser.runtime.sendMessage({url: url, auth: "CustomProhibit"})

    custom_url.value = ""
}
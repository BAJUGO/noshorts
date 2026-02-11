let maxLength = 0
let maxKey = ""
let ul_for_visits = document.getElementById("ul_for_visits")

for (let cite = 0; cite < localStorage.length; cite++) {
    if (localStorage.key(cite).startsWith("custom.")) {
        continue
    }

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


let clear_lS = document.getElementById("clear_history")
clear_lS.addEventListener("click", function () {
    const keys = Object.keys(localStorage)
    for (let key of keys) {
        if (!key.startsWith("custom.")) {
            localStorage.removeItem(key)
        }
    }

    window.location.reload()
})


document.getElementById("custom_url_form").addEventListener("submit", sendCustomUrlScript)

async function sendCustomUrlScript(event) {
    event.preventDefault()
    let custom_cite = document.getElementById("custom_cite_input")
    let cite = custom_cite.value
    localStorage.setItem(`custom.${cite}`, JSON.stringify("This url is custom"))

    browser.runtime.sendMessage({cite: cite, auth: "CustomUrl"})
    custom_cite.value = ""
}


document.getElementById("delete_custom_url_form").addEventListener("submit", deleteCustomUrlScript)

async function deleteCustomUrlScript(event) {
    event.preventDefault()
    let custom_cite = document.getElementById("delete_custom_cite_input")
    let cite = custom_cite.value
    localStorage.removeItem(`custom.${cite}`)

    browser.runtime.sendMessage({cite: cite, auth: "DeleteCustomUrl"})

    custom_cite.value = ""

}

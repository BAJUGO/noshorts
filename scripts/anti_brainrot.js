let maxLength = 0
let maxKey = ""
const ul_for_visits = document.getElementById("ul_for_visits")

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith("custom.")) continue

    const array = JSON.parse(localStorage.getItem(key))
    const len = array.length

    if (len > maxLength) {
        maxLength = len
        maxKey = key
    }

    const h = document.createElement("h1")
    const ul = document.createElement("ul")
    h.innerText = key

    for (let j = 0; j < len; j++) {
        const li = document.createElement("li")
        const date = new Date(Number(array[j]))
        li.innerText = date.toLocaleString('ru-RU')
        ul.appendChild(li)
    }

    ul_for_visits.append(h, ul)
}


document.getElementById("maxTimeH").innerText = (maxLength)
    ? `The most tried: ${maxKey} ${maxLength} attempts`
    : "Hey, you didn't visited brainrot cites! Or maybe you just deleted localStorage :)"


document.getElementById("clear_history").addEventListener("click", function () {
    const keys = Object.keys(localStorage)
    for (let key of keys) {
        if (!key.startsWith("custom.")) {
            localStorage.removeItem(key)
        }
    }
    window.location.reload()
})

document.getElementById("clean_custom_urls").addEventListener("click", function () {
    const keys = Object.keys(localStorage)
    for (let key of keys) {
        if (key.startsWith("custom.")) {
            localStorage.removeItem(key)
        }
        browser.runtime.sendMessage({cite: key, auth: "DeleteCustomUrl"})
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

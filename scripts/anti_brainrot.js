let maxLength = 0
let maxKey = ""
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

    document.body.appendChild(new_h)
    document.body.appendChild(new_ul)
}

let maxTimeH = document.createElement("h1")
maxTimeH.innerText = `You've tried to reach ${maxKey} ${maxLength} times`
document.body.appendChild(maxTimeH)
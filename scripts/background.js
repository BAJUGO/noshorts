console.log("background script is totally running")


for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith("custom.")) {
        browser.contentScripts.register({
            js: [{file: "scripts/full_prohibited.js"}],
            matches: [`*://*.${localStorage.key(i).replace("custom.", "")}/*`]
        })
    }}




browser.runtime.onMessage.addListener(listener_messages)

function listener_messages(message) {
    if (message.auth === "AntiBrainrot") {
       try {
           let stored = JSON.parse(localStorage.getItem(message.cite)) || [];
           stored.push(message.data)
           localStorage.setItem(message.cite, JSON.stringify(stored))
       }
       catch (e) {
           console.log(e);
       }
    }
    if (message.auth === "CustomUrl") {
        try {
            browser.contentScripts.register({
                js: [{file: "scripts/full_prohibited.js"}],
                matches: [`*://*.${message.cite}/*`]
            })

        }
        catch (e) {
            console.log(e)
        }
    }
}



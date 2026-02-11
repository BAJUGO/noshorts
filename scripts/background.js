console.log("background script is totally running")

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("custom.")) {
        browser.contentScripts.register({
            js: [{file: "scripts/full_prohibited.js"}],
            matches: [`*://*.${key.replace("custom.", "")}/*`]
        })
    }}

let registeredScripts = {}


browser.runtime.onMessage.addListener(listener_messages)

async function listener_messages(message) {
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
            registeredScripts[message.cite] = await browser.contentScripts.register({
                js: [{file: "scripts/full_prohibited.js"}],
                matches: [`*://*.${message.cite}/*`]
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    if (message.auth === "DeleteCustomUrl") {
        try {
            registeredScripts[message.cite].unregister()
            delete registeredScripts[message.cite]
        }
        catch (e) {
            console.log(e)
        }
    }
}



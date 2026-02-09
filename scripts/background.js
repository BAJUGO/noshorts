console.log("background script is totally running")

browser.browserAction.onClicked.addListener(listener)
function listener(tab) {
    console.log(tab);
}


browser.runtime.onMessage.addListener(listener_messages)

function listener_messages(message) {
    if (message.auth === "AntiBrainrot") {
       try {
           let stored = JSON.parse(localStorage.getItem(message.cite)) || [];
           stored.push(message.data)
           localStorage.setItem(message.cite, JSON.stringify(stored))
       }
       catch (e) {
           console.error(e);
       }
    }
    if (message.auth === "CustomUrl") {
        try {
            void registerCustomScript(message.final_script)
        }
        catch (e) {
            console.error(e)
        }
    }
}

async function registerCustomScript(final_script) {
    await browser.contentScripts.register(final_script);
}


console.log("background script is totally running")

browser.browserAction.onClicked.addListener(listener)
function listener(tab) {
    console.log(tab);
}


browser.runtime.onMessage.addListener(listener_messages)

function listener_messages(message) {
    if (message.auth === "AntiBrainrot") {
        try {
            let stored = JSON.parse(localStorage.getItem(message.cite)) || []
            stored.push(message.data)
            localStorage.setItem(message.cite, JSON.stringify(stored))
        }
        catch (e) {
            console.error(e)
        }
    }
    if (message.auth === "CustomProhibit") {
        void registerContentScript(message.url)
    }
}


async function registerContentScript(url) {
    await browser.contentScripts.register(url)
}
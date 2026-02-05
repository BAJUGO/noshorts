console.log("background script is totally running")

browser.browserAction.onClicked.addListener(listener)
function listener(tab) {
    console.log(tab);
}


browser.runtime.onMessage.addListener(listener_messages)
function listener_messages(event) {
    if (!event.data || event.auth !== "AntiBrainrot") {
        try {
            let cite = JSON.parse(event.cite);
            let data = JSON.parse(event.data)
            let stored = JSON.parse(localStorage.getItem(cite) || [])
            stored.push(JSON.stringify(data));
            localStorage.setItem(cite, JSON.stringify(stored));

        }
        catch (error) {
            console.log(error);
        }
    }
}
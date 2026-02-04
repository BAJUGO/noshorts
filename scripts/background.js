console.log("background script is totally running")

browser.browserAction.onClicked.addListener(listener)
function listener(tab) {
    console.log(tab);
}


browser.runtime.onMessage.addListener(listener_messages)
function listener_messages(event, tab) {
    console.log(JSON.stringify(event.data));
    console.log(JSON.stringify(tab));
}
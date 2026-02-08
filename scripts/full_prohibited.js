let cite = JSON.stringify(location.host).replace("www.", "")
let data = JSON.stringify(Date.now())
let auth = JSON.stringify("AntiBrainrot")

browser.runtime.sendMessage({cite: cite, data: data, auth:auth});
location.href = browser.extension.getURL("../pages/anti_brainrot.html");

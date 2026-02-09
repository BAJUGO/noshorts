let cite = location.host.replace("www.", "")
let data = Date.now()
let auth = "AntiBrainrot"

browser.runtime.sendMessage({ cite, data, auth })
location.href = browser.runtime.getURL("../pages/anti_brainrot.html")

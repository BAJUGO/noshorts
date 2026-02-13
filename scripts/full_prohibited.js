let site = location.host.replace("www.", "")
let data = Date.now()
let auth = "AntiBrainrot"

browser.runtime.sendMessage({site: site, data: data, auth: auth })
location.href = browser.runtime.getURL("../pages/anti_brainrot.html")
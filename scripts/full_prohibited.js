let host
switch (location.host) {
    case "www.tiktok.com":
        host = "tiktok"
        break;
    case "www.instagram.com":
        host = "instagram"
        break;
    default:
        host = "unknown";
}

let cite = JSON.stringify(host)
let data = JSON.stringify(Date.now())
let auth = JSON.stringify("AntiBrainrot")

browser.runtime.sendMessage({cite: cite, data: data, auth:auth})
location.href = browser.extension.getURL("../pages/anti_brainrot.html");

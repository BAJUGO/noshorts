checkUrl()
let lastUrl = location.href;


const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = window.location.href;
        checkUrl();
    }
})

observer.observe(document.querySelector('ytd-app'), {childList: true, subtree: true });


function checkUrl() {
    if (location.href.startsWith("https://www.youtube.com/shorts/")) {
        let cite = location.host.replace("www.", "")
        let data = Date.now()
        let auth = "AntiBrainrot"

        browser.runtime.sendMessage({cite: cite, data: data, auth: auth})
        location.href = browser.runtime.getURL("../pages/anti_brainrot.html");
    }
}


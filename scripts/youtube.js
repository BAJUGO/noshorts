checkUrl()
let lastUrl = window.location.href;


const observer = new MutationObserver(() => {
    if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        checkUrl();
    }
})

observer.observe(document.querySelector('ytd-app'), {childList: true, subtree: true });


function checkUrl() {
    if (window.location.href.startsWith("https://www.youtube.com/shorts/")) {
        let cite = JSON.stringify("youtube_shorts")
        let data = JSON.stringify(Date.now())
        let auth = JSON.stringify("AntiBrainrot")

        browser.runtime.sendMessage({cite: cite, data: data, auth: auth})
        location.href = browser.extension.getURL("../pages/anti_brainrot.html");
    }
}


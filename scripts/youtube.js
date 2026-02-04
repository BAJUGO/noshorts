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
    if (window.location.href.includes("https://www.youtube.com/shorts/")) {
        browser.runtime.sendMessage({data: JSON.stringify(Date.now())})
        location.href = browser.extension.getURL("../pages/anti-brainrot.html");
    }
}


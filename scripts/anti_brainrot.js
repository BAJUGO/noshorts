window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== "AntiBrainrot" || event.data.site !== "youtube_shorts") return false;
    console.log("message_received")
    let data = JSON.parse(localStorage.getItem('youtube_shorts') || "[]");
    data.push(event.data.time)
    localStorage.setItem('youtube_shorts', JSON.stringify(data))
})
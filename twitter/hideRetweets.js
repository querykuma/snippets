function hideRetweets() {
    target_name = document.querySelector("b.u-linkComplex-target").textContent;
    document.querySelectorAll("#stream-items-id>li").forEach(l => { if (l.getElementsByClassName("tweet")[0].getAttribute("data-screen-name") !== target_name) { l.style.display = "none" } });
}

function showRetweets() {
    target_name = document.querySelector("b.u-linkComplex-target").textContent;
    document.querySelectorAll("#stream-items-id>li").forEach(l => { if (l.getElementsByClassName("tweet")[0].getAttribute("data-screen-name") !== target_name) { l.style.display = "" } });
}

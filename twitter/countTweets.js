function countTweets() {
    const target_name = document.querySelector("b.u-linkComplex-target").textContent;
    let count = 0;
    const li = document.querySelectorAll("#stream-items-id>li");
    li.forEach(l => { if (l.getElementsByClassName("tweet")[0].getAttribute("data-screen-name") === target_name) { count++; } });
    `${count}/${li.length}`;
}
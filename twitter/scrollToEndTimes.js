function scrollToEndTimes() {
    const sleep_time = 2000;
    const scroll_times = 5;
    const scrollToEnd = (times) => {
        if (times <= 0) return;
        scrollTo(0, document.documentElement.scrollHeight);
        setTimeout(() => scrollToEnd(times - 1), sleep_time);
    };
    scrollToEnd(scroll_times);
}

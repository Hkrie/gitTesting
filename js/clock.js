const printClock = () => {
    // clock variables
    const day = new Date();
    const a = day.getFullYear();
    let mo = day.getMonth() + 1;//getMonth()starts at 0
    let d = day.getDate();
    const h = day.getHours();
    let m = day.getMinutes();
    let s = day.getSeconds();
    let ms = day.getMilliseconds();

    //so that the width doesn't change to much all the time, just added zeroes in front of single numbers (where i think it'S nice)
    ms /= 10;
    ms = ms.toFixed(0);
    (ms >= 100) ? ms = 99 : ms; //actually dunno why that actually keeps happening
    (mo < 10) ? mo = '0' + mo : mo;
    (d < 10) ? d = '0' + d : d;
    (s < 10) ? s = '0' + s : s;
    (m < 10) ? m = '0' + m : m;
    (ms < 10) ? ms = '0' + ms : ms;
    //(ms<10)? ms = '0' + ms : (ms<100)? ms = '00' + ms : ms;

    let time = document.getElementById('clock');
    time.innerHTML = h + ':' + m + ':' + s + ':' + ms + '\xa0\xa0\xa0' + d + '.' + mo + '.' + a;

    setTimeout(printClock, 90);
};
document.addEventListener("DOMContentLoaded", printClock);

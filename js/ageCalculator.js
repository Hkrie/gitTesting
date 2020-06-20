document.addEventListener('DOMContentLoaded', () => {
    const BodyClockDec = document.createElement("div");
    BodyClockDec.id = 'bodyClockDec';
    document.getElementById('ageClock').appendChild(BodyClockDec);

    const BodyClock = document.createElement("div");
    BodyClock.id = 'bodyClock';
    document.getElementById('ageClock').appendChild(BodyClock);
    //printAgeDecimal();
    printAgeFull();
});

/*const printAgeDecimal = () => {
    const person = {
        'year': 2000,
        'month': '9',
        'day': 12,
        'hour': 12,
        'minute': 18,
    };
    const martinKotschmar = {
        'year': 1999,
        'month': '8',
        'day': 4,
        'hour': 9,
        'minute': 51,
    };
    const myBirthday = person;
    myBirthday.month = myBirthday.month - 1;
    //change let to const where possible
    const day = new Date();
    const birthdayDate = new Date(myBirthday.year, myBirthday.month, myBirthday.day, myBirthday.hour, myBirthday.minute, 0);
    const difference = day.getTime() - birthdayDate.getTime();
    const differenceInSeconds = difference / 1000;
    let myYears = differenceInSeconds / 31556952;
    const bodyClock = document.getElementById('bodyClockDec');
    bodyClock.innerHTML = myYears.toFixed(9).toString();
    setTimeout(printAgeDecimal, 100);
};*/
const printAgeFull = () => {
    const person = {
        'foreverYoung': 'false',
        'year': 2000,
        'month': '9',
        'day': 12,
        'hour': 12,
        'minute': 18,
    };
    const martinKotschmar = {
        'foreverYoung': 'false',
        'year': 1999,
        'month': '8',
        'day': 4,
        'hour': 9,
        'minute': 51,
    };
    const myBirthday = person;
    myBirthday.month = myBirthday.month - 1;
    const day = new Date();
    const birthdayDate = new Date(myBirthday.year, myBirthday.month, myBirthday.day, myBirthday.hour, myBirthday.minute, 0);
    const difference = day.getTime() - birthdayDate.getTime();
    let differenceInSeconds = difference / 1000;

    let myYears = Math.floor(differenceInSeconds / 31556952);
    let dif;

    if (myBirthday.foreverYoung !== "true") {
        dif = differenceInSeconds - myYears * 31556952;
    } else {    //read about it, found it hilarious, had to code it
        if (myYears > 18) {
            myYears = 18;
        }
        dif = differenceInSeconds - myYears * 31556952;
    }
    let myMonth = Math.floor(dif / 2628000);
    dif -= myMonth * 2628000;

    let myDays = Math.floor(dif / 86400);
    dif -= myDays * 86400;

    let myHours = Math.floor(dif / 3600);
    dif -= myHours * 3600;

    let myMinutes = Math.floor(dif / 60);
    dif -= myMinutes * 60;

    let mySeconds = Math.floor(dif);
    let myMilliSeconds = Math.floor((dif - mySeconds) * 100);
    //(myMonth<10)? myMonth = '0' + myMonth : myMonth;
    //(myDays<10)? myDays = '0' + myDays : myDays;
    (mySeconds < 10) ? mySeconds = '0' + mySeconds : mySeconds;
    //(myMinutes<10)? myMinutes = '0' + myMinutes : myMinutes;
    (myMilliSeconds < 10) ? myMilliSeconds = '0' + myMilliSeconds : myMilliSeconds;

    const bodyClock = document.getElementById('bodyClock');
    bodyClock.innerHTML = myHours + ':' + myMinutes + ':' + mySeconds + ':' + myMilliSeconds + '\xa0\xa0\xa0' + myDays + '.' + myMonth + '.' + myYears;
    bodyClock.innerHTML = myYears + 'y ' + myMonth + 'mo ' + myDays + 'd ' + '<br>' + myHours + 'h ' + myMinutes + 'm ' + mySeconds + 's ' + myMilliSeconds + 'ms';


    //bodyClock age in decimal number
    let myYearsDec = differenceInSeconds / 31556952;
    const bodyClockDec = document.getElementById('bodyClockDec');
    bodyClockDec.innerHTML = myYearsDec.toFixed(9).toString();


    setTimeout(printAgeFull, 100);
};



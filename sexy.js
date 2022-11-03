const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const AmPm = document.querySelector('#ampm');
let CurrentTime = document.querySelector('#currentTime');
const setAlarmBtn = document.querySelector('#setBtn');
const content = document.querySelector('.content');
let alarmTime , isAlarmSet = false;
const ringTone = new Audio('files/ringtone.mp3');
const secondBtn = document.querySelector('#secondBtn');

// Set hour values
for(let i = 12;i>0;i--){
    i = i<10?"0"+i:i;
    let option = ` <option value="${i}">${i}</option>`;
    hour.firstElementChild.insertAdjacentHTML("afterend",option);
}
// Set Minute values
for(let i = 59;i>0;i--){
    i = i<10?"0"+i:i;
    let option = ` <option value="${i}">${i}</option>`;
    minute.firstElementChild.insertAdjacentHTML("afterend",option);
}
// Set AM/PM values
for(let i = 2;i>0;i--){
    let am_pm = i==1 ? "AM" : "PM";
    let option = `<option value="${am_pm}">${am_pm}</option>`;
    AmPm.firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(() => {
    // Getting hour,minute,second
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if(h > 12){
        h = h-12;
        ampm = "PM";
    }

    // if hour value is 0 then set it to 12
    h = h==0 ? h = 12 : h;
    // Adding 0 before h , m ,s 
    h = h <10 ? "0" + h : h;
    m = m <10 ? "0" + m : m;
    s = s <10 ? "0" + s : s;

    currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

    // Play ringtone if alarm time mathces with current time
    if(alarmTime == `${h}:${m}:${ampm}`){
        ringTone.play();
        ringTone.loop = true;
    }

}, 1000);

const setAlarm = () => {

    if(isAlarmSet){
        alarmTime = "";
        ringTone.pause();
        // Enable selection of time
        content.classList.remove('disable');
        // change button text to "Set alarm"
        setAlarmBtn.textContent = "Set Alarm";
        return isAlarmSet = false;
    }

    // Getting alarm time from user
    let time = `${hour.value}:${minute.value}:${AmPm.value}`;   
    isAlarmSet = true;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        alert("Please select a valid time");
        return;
    }
    
    // Set to localstorage
    localStorage.setItem('LastAlarmTime',time);

    // set alarm time
    alarmTime = time;
    // Disable selection of time when alarm is set
    content.classList.add('disable');
    // Set button text to "Clear Alarm";
    setAlarmBtn.textContent = "Clear Alarm";
}

const getLastValue = () => {
    let value = localStorage.getItem('LastAlarmTime');
    console.log(value);
}


// Eventlisteners
setAlarmBtn.addEventListener('click',setAlarm);
secondBtn.addEventListener('click',getLastValue);
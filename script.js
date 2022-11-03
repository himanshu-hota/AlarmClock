const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const AmPm = document.querySelector('#ampm');
let CurrentTime = document.querySelector('#currentTime');
const setAlarmBtn = document.querySelector('#setBtn');
const content = document.querySelector('#content');
const ringTone = new Audio('files/ringtone.mp3');
const secondBtn = document.querySelector('#secondBtn');
const body = document.querySelector('body');
const resumeBtn = document.querySelector('#resumeBtn');


// CHeck if user has exited webpage
if(!localStorage.getItem('userExited')){
    localStorage.setItem('userExited','false');
}else{
    // Check if user has returned to webpage and had previously set an alarm then show him resume button
    if(localStorage.getItem('userExited') == 'true' && localStorage.getItem('isAlarmSet') == 'true'){
        resumeBtn.hidden = false;
    }
}


// Add class to content
if(!localStorage.getItem('contentClass')){
    localStorage.setItem('contentClass','content flex');
    content.className = localStorage.getItem('contentClass');
}else{
    content.className = localStorage.getItem('contentClass');
}

// Set button text
if(!localStorage.getItem('btnText')){
    localStorage.setItem('btnText','Set Alarm');
    setAlarmBtn.textContent = localStorage.getItem('btnText');
}else{
    setAlarmBtn.textContent = localStorage.getItem('btnText');
}

// Set defualt isAlarm
if(!localStorage.getItem('isAlarmSet')){
    localStorage.setItem('isAlarmSet','false');
}

// Set default alarm time
if(!localStorage.getItem('alarmTime')){
    localStorage.setItem('alarmTime','00:00:PM');
}

// Set hour values
for(let i = 12;i>0;i--){
    i = i<10?"0"+i:i;
    let option = ` <option value="${i}">${i}</option>`;
    hour.firstElementChild.insertAdjacentHTML("afterend",option);
}
// Set Minute values
for(let i = 59;i>=0;i--){
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

// Runs every Second
setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    // 12 Hour Format
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

    // Update time every second
    currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

    // Play ringtone if alarm time mathces with current time
    if(localStorage.getItem('alarmTime') == `${h}:${m}:${ampm}`){
        ringTone.play();
        ringTone.loop = true;
    }

}, 1000);

// Set alarm 
const setAlarm = () => {
   
    // Clear alarm
    if(localStorage.getItem('isAlarmSet') == 'true'){
        // Reset Alarm time
        localStorage.setItem('alarmTime',"00:00:AM");
        ringTone.pause();
        // Enable selection of time
        localStorage.setItem('contentClass', 'content flex')
        content.className = localStorage.getItem('contentClass');
        // change button text to "Set alarm"
        localStorage.setItem('btnText','Set Alarm')
        setAlarmBtn.textContent = localStorage.getItem('btnText');
        // Return
        return localStorage.setItem('isAlarmSet' , 'false');
    }

     // Getting alarm time from user
     let time = `${hour.value}:${minute.value}:${AmPm.value}`;   
     if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
         alert("Please select a valid time");
         return;
     }
 
    // Set alarm to true
    localStorage.setItem('isAlarmSet' , 'true');
    // Set alarm time
    localStorage.setItem('alarmTime',time);
    // Disable selection of time when alarm is set
    localStorage.setItem('contentClass', 'content flex disable');
    content.className = localStorage.getItem('contentClass');
    // Set button text to "Clear Alarm";
    localStorage.setItem('btnText','Clear Alarm')
    setAlarmBtn.textContent = localStorage.getItem('btnText');
}

// --------------------Eventlisteners-----------------------------

// Set Button
setAlarmBtn.addEventListener('click',setAlarm);
// Resume Button
resumeBtn.addEventListener('click',() => resumeBtn.hidden = true);

const beforeUnloadListener = (event) => {
    localStorage.setItem('userExited','true');
};
// Check if user has exited the page or refreshed
window.addEventListener("beforeunload", beforeUnloadListener);

console.log("SCRIPT START 1220.0");
/* =========================
FIREBASE
========================= */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
GoogleAuthProvider,
signInWithPopup
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCVQEclpiWemC2VaRpalNmuty9Pc8cXvAw",
authDomain: "silownia-c2593.firebaseapp.com",
databaseURL: "https://silownia-c2593-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "silownia-c2593",
storageBucket: "silownia-c2593.firebasestorage.app",
messagingSenderId: "831014782830",
appId: "1:831014782830:web:5d0fc41c465b78b6f8a37f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();
/* =========================
PLAN ZAJĘĆ
========================= */

const schedules = {

"Poniedziałek": [

"18:00 – Fat Burning Step (Ola)",

"19:00 – TBC (Ola)",

"20:00 – Taekwon-do (Darek)"

],

"Wtorek": [

"17:30 – Kobieta na siłowni (Piotr)",

"17:30 – Taekwon-do Junior (Darek)",

"20:00 – Boks (Mateusz)"

],

"Środa": [

"18:00 – Zdrowy kręgosłup / Stretching (Iwonka)",

"19:00 – ABT (Iwonka)",

"20:00 – Dance Fitness (Justyna)"

],

"Czwartek": [

"17:30 – Taekwon-do Junior (Darek)",

"17:30 – Kobieta na siłowni (Piotr)",

"18:45 – FBW (Piotr)",

"20:00 – Boks (Mateusz)"

],

"Piątek": [

"19:00 – Tabata (Iwonka)",

"20:00 – Taekwon-do (Darek)"

],

"Sobota": [

"10:00 – Kobieta na siłowni (Piotr)",

"12:00 – Taekwon-do Junior (Darek)"

],

"Niedziela": [

"10:00 – Hatha Joga (Emilia)"

]

};

function getTodayKey(){

    const now = new Date();

    return now.toISOString().split("T")[0];
}

function getCancelledLessons(day){

    const todayKey = getTodayKey();

    const data = JSON.parse(
        localStorage.getItem("cancelledLessons") || "{}"
    );

    if(!data[todayKey]){
        return [];
    }

    return data[todayKey][day] || [];
}

function toggleLessonCancellation(day,index){

    const todayKey = getTodayKey();

    const data = JSON.parse(
        localStorage.getItem("cancelledLessons") || "{}"
    );

    if(!data[todayKey]){
        data[todayKey] = {};
    }

    if(!data[todayKey][day]){
        data[todayKey][day] = [];
    }

    const exists = data[todayKey][day].includes(index);

    if(exists){

        data[todayKey][day] = data[todayKey][day]
            .filter(i => i !== index);

    }else{

        data[todayKey][day].push(index);
    }

    localStorage.setItem(
        "cancelledLessons",
        JSON.stringify(data)
    );
}

function showSchedule(day, element){

    selectedDay = day;
    generateStory();
    
    document.querySelectorAll(".day-btn").forEach(btn=>{
        btn.classList.remove("active");
    });

    if(element){
        element.classList.add("active");
    }

    const scheduleBox = document.getElementById("schedule-box");

    scheduleBox.innerHTML = "";

    const cancelledLessons = getCancelledLessons(day);

   if(!schedules[day]) return;

schedules[day].forEach((item,index)=>{

        const div = document.createElement("div");
        div.className = "schedule-item";

        const lessonText = document.createElement("div");
        lessonText.innerText = item;

        if(cancelledLessons.includes(index)){
            lessonText.classList.add("lesson-cancelled");
            lessonText.innerText += " ODWOŁANE";
        }

        const cancelBtn = document.createElement("button");

        cancelBtn.className = "cancel-lesson-btn";

        cancelBtn.innerText = cancelledLessons.includes(index)
            ? "PRZYWRÓĆ"
            : "ODWOŁAJ";

        cancelBtn.addEventListener("click",()=>{

    toggleLessonCancellation(day,index);

    showSchedule(day,element);

    generateStory();
});

        div.appendChild(lessonText);
        div.appendChild(cancelBtn);

        scheduleBox.appendChild(div);
    });
}


/* =========================
TASKI
========================= */

const eveningTasks = [

{ text:"1. Uprzątnąć biuro" },

{ text:"2. Wpisać godziny do ewidencji pracy" },

{ text:"3. Zebrać śmieci" },

{ text:"4. Wyrzucić śmieci" },

{ text:"5. Odłożyć sprzęty na miejsce" },

{ text:"6. Pozbierać zagubione rzeczy" },

{ text:"7. Wyłączyć telewizor" },

{ text:"8. Zamknąć okna" },

{ text:"9. Wyłączyć klimatyzację lub ustawić grzejniki" },

{ text:"10. Wyłączyć wentylatory" },

{ text:"11. Wyłączyć bieżnie i schody" },

{ text:"12. Dołożyć papieru" },

{ text:"13. Odkurzyć siłownię" },

{ text:"14. Wyłączyć światła" },

{ text:"15. Wymienić końcówkę mopa" },

{ text:"16. Wymienić wodę w wiadrze" },

{ text:"17. Wyczyścić sedesy" },

{
text:"18. Umyć podłogi jeśli nie ma ludzi",

subtasks:[

"A) Zostawić otwarte drzwi po myciu damskiej szatni",

"B) Zgasić światło po myciu męskiej toalety"

]

},

{ text:"19. Wyłączyć program magazynowy" },

{ text:"20. Wyłączyć komputer" },

{ text:"21. Policzyć pieniądze" },

{ text:"22. Zapisać kwotę" },

{
text:"23. Wykonać raport dobowy",

subtasks:[

"A) Kasa fiskalna",

"B) Terminal"

]

},

{ text:"24. Sprawdzić zgodność kwot" },

{ text:"25. Wyrzucić paragony" },

{ text:"26. Umyć podłogę recepcji" },

{ text:"27. Odłożyć mopa" },

{ text:"28. Wyłączyć komputer muzyki i monitoring" },

{ text:"29. Wyłączyć światło i wentylator w biurze" },

{ text:"30. Wyłączyć światła recepcji i dworu" },

{ text:"31. Schować klucz do biura" },

{ text:"32. Zamknąć drzwi na oba zamki" },

{ text:"33. Zasunąć bramę wyjściową" }

];

const morningTasks = [

{ text:"1. Włączyć komputer do muzyki" },

{ text:"2. Włączyć komputer recepcji" },

{ text:"3. Włączyć monitor z kamerami" },

{ text:"4. Włączyć bieżnie i schody" },

{ text:"5. Dołożyć papieru" },

{ text:"6. Sprawdzić stan podłóg i wyczyścić co trzeba" },

{ text:"7. Umyć lustra" },

{ text:"8. Umyć maty na sali fitness" },

{ text:"9. Dołożyć towaru" },

{ text:"10. Dołożyć wody na magazyn" },

{ text:"11. Wyprać mopy" },

{ text:"12. Umyć drzwi wejściowe" },

{ text:"13. Wyczyścić ekspres" },

{ text:"14. Wziąć pety i sprawdzić śmietnik na dworze" },

{ text:"15. Przetrzeć cardio z kurzu" },

{ text:"16. Wytrzepać poduszeczki pod dupsko" },

{ text:"17. Poczyścić zlewy i lustra" }

];

const todoList =
document.getElementById("todo-list");

const doneList =
document.getElementById("done-list");

const eveningBtn =
document.getElementById("eveningBtn");

const morningBtn =
document.getElementById("morningBtn");

let currentTasks = eveningTasks;
/* =========================
RENDER TASKÓW
========================= */

function renderTasks(tasks){

todoList.innerHTML = "";

doneList.innerHTML = "";

tasks.forEach(taskData => createTask(taskData));

}

function createTask(taskData){

const task =
document.createElement("div");

task.className = "task";

const header =
document.createElement("div");

header.className = "task-header";

const checkbox =
document.createElement("input");

checkbox.type = "checkbox";

const text =
document.createElement("div");

text.className = "task-text";

text.innerText = taskData.text;

header.appendChild(checkbox);

header.appendChild(text);

task.appendChild(header);

if(taskData.subtasks){

checkbox.disabled = true;

const subtasksContainer =
document.createElement("div");

subtasksContainer.className =
"subtasks";

const subChecks = [];

taskData.subtasks.forEach(sub=>{

const subtask =
document.createElement("div");

subtask.className = "subtask";

const subCheck =
document.createElement("input");

subCheck.type = "checkbox";

const subText =
document.createElement("span");

subText.innerText = sub;

subtask.appendChild(subCheck);

subtask.appendChild(subText);

subtasksContainer.appendChild(subtask);

subChecks.push(subCheck);

subCheck.addEventListener("change", ()=>{

const allDone =
subChecks.every(c=>c.checked);

if(allDone){

checkbox.checked = true;

moveTask(task,true);

}

});

});

task.appendChild(subtasksContainer);

}else{

checkbox.addEventListener("change", ()=>{

if(task.classList.contains("done")){

checkbox.checked = false;

moveTask(task,false);

}else{

moveTask(task,true);

}

});

}

task.addEventListener("click",(e)=>{

if(
task.classList.contains("done")
&&
e.target.tagName !== "INPUT"
){

const mainCheck =
task.querySelector(".task-header input");

mainCheck.checked = false;

task.querySelectorAll(".subtasks input")
.forEach(cb=>{

cb.checked = false;

});

moveTask(task,false);

}

});

todoList.appendChild(task);

}

function moveTask(task,done){

if(done){

task.classList.add("done");

doneList.appendChild(task);

}else{

task.classList.remove("done");

todoList.appendChild(task);

}

}

function resetChecklist(){

renderTasks(currentTasks);

}

eveningBtn.addEventListener("click", ()=>{

currentTasks = eveningTasks;

eveningBtn.classList.add("active");

morningBtn.classList.remove("active");

renderTasks(currentTasks);

});

morningBtn.addEventListener("click", ()=>{

currentTasks = morningTasks;

morningBtn.classList.add("active");

eveningBtn.classList.remove("active");

renderTasks(currentTasks);

});

let selectedDay = "Poniedziałek";

showSchedule(
"Poniedziałek",
document.querySelector(".day-btn")
);

renderTasks(currentTasks);

/* =========================
DNI PRACA
========================= */

/* =========================
DNI PRACA - FIRESTORE
========================= */

async function pobierzDniPracy(){

const user = auth.currentUser;

if(!user) return;

try{

const ref = doc(db,"workLogs",user.uid);

const snap = await getDoc(ref);

if(snap.exists()){

const data = snap.data();

document.getElementById("podglad").value =
data.content || "";

}else{

document.getElementById("podglad").value = "";

}

}catch(err){

console.error(err);

}

}

function dataDzisiaj(){

const d = new Date();

const dzien =
String(d.getDate()).padStart(2,'0');

const miesiac =
String(d.getMonth()+1).padStart(2,'0');

const rok = d.getFullYear();

return `${dzien}.${miesiac}.${rok}`;

}

async function dodajLinie(godziny,h){

const user = auth.currentUser;

if(!user){

alert("Musisz być zalogowany");

return;

}

try{

const ref = doc(db,"workLogs",user.uid);

const snap = await getDoc(ref);

let content = "";

if(snap.exists()){

content = snap.data().content || "";

}

content +=
`${dataDzisiaj()} | ${godziny} | ${h}h\n`;

await setDoc(ref,{
content:content
});

await pobierzDniPracy();

document.getElementById("podglad").value =
content;

}catch(err){

console.error(err);

alert("Błąd zapisu");

}

}

async function dodajPoranna(){

await dodajLinie("6-15",9);

}

async function dodajWieczorna(){

await dodajLinie("15-22",7);

}

async function wyczyscDniPracy(){

const user = auth.currentUser;

if(!user) return;

try{

await setDoc(
doc(db,"workLogs",user.uid),
{
content:""
}
);

document.getElementById("podglad").value = "";

alert("Historia wyczyszczona");

}catch(err){

console.error(err);

}

}
/* =========================
LOGIN
========================= */


/* =========================
AUTH SYSTEM
========================= */

async function registerUser(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

await createUserWithEmailAndPassword(
auth,
email,
password
);

document.getElementById(
"auth-status"
).innerText =
"Konto utworzone";

}catch(error){

document.getElementById(
"auth-status"
).innerText =
error.message;

}

}

async function loginUser(){

console.log("LOGIN START");

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

console.log("LOGIN OK");

}catch(error){

console.error(error);

alert(error.message);

document.getElementById(
"auth-status"
).innerText =
error.message;

}

}

async function googleLogin(){

try{

await signInWithPopup(
auth,
provider
);

}catch(error){

document.getElementById(
"auth-status"
).innerText =
error.message;

}

}

async function logout(){

await signOut(auth);

}

onAuthStateChanged(auth,(user)=>{

if(user){

document.getElementById(
"auth-screen"
).style.display = "none";

pobierzDniPracy();

}else{

document.getElementById(
"auth-screen"
).style.display = "flex";

}

});
window.registerUser = registerUser;
window.loginUser = loginUser;
window.googleLogin = googleLogin;
window.logout = logout;

window.showSchedule = showSchedule;
window.resetChecklist = resetChecklist;

window.dodajPoranna = dodajPoranna;
window.dodajWieczorna = dodajWieczorna;
window.wyczyscDniPracy = wyczyscDniPracy;
/* =========================
KALKULATOR PIENIĘDZY
========================= */


/* =========================
KALKULATOR PIENIĘDZY
========================= */

function policzKase(){

const coin5 =
Number(document.getElementById("coin5").value) || 0;

const coin2 =
Number(document.getElementById("coin2").value) || 0;

const coin1 =
Number(document.getElementById("coin1").value) || 0;

const coin50 =
Number(document.getElementById("coin50").value) || 0;

const bill10 =
Number(document.getElementById("bill10").value) || 0;

const bill20 =
Number(document.getElementById("bill20").value) || 0;

const bill50 =
Number(document.getElementById("bill50").value) || 0;

const bill100 =
Number(document.getElementById("bill100").value) || 0;

const bill200 =
Number(document.getElementById("bill200").value) || 0;

/* MONETY */

const sumaMonet =
(coin5 * 5) +
(coin2 * 2) +
(coin1 * 1) +
(coin50 * 0.5);

/* BANKNOTY */

const sumaBanknotow =
(bill10 * 10) +
(bill20 * 20) +
(bill50 * 50) +
(bill100 * 100) +
(bill200 * 200);

/* RAZEM */

const razem =
sumaMonet + sumaBanknotow;

document.getElementById("coinsResult")
.innerText = sumaMonet.toFixed(2);

document.getElementById("billsResult")
.innerText = sumaBanknotow.toFixed(2);

document.getElementById("totalResult")
.innerText = razem.toFixed(2);

}


const moneyBtn = document.getElementById("moneyBtn");

if(moneyBtn){
    moneyBtn.addEventListener("click", policzKase);
}
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn");

if(registerBtn){
    registerBtn.addEventListener("click", registerUser);
}

if(loginBtn){
    loginBtn.addEventListener("click", loginUser);
}

if(googleBtn){
    googleBtn.addEventListener("click", googleLogin);
}

/* =========================
INSTAGRAM STORY GENERATOR
========================= */

const storyImages = [
    "/stories/1.png",
    "/stories/2.png",
    "/stories/3.png",
    "/stories/4.png",
    "/stories/5.png",
    "/stories/6.png",
    "/stories/7.png",
];

const storyLogo = "/stories/logo.png";

const canvas = document.getElementById("storyCanvas");
const ctx = canvas.getContext("2d");

const generateStoryBtn = document.getElementById("generateStoryBtn");
const downloadStoryBtn = document.getElementById("downloadStoryBtn");

function getStoryTodayName(){

    const dni = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota"
    ];

    return dni[new Date().getDay()];
}
function getTodayName(){

    const dni = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota"
    ];

    return dni[new Date().getDay()];
}

function getTodaySchedule(){

    const lessons = schedules[selectedDay] || [];

    const cancelled = getCancelledLessons(selectedDay);

    return lessons.map((lesson,index)=>({
        text: lesson,
        cancelled: cancelled.includes(index)
    }));
}

function getRandomImage(){

    const lastImage = localStorage.getItem("lastStoryImage");

    let available = storyImages.filter(img => img !== lastImage);

    if(available.length === 0){
        available = [...storyImages];
    }

    const random = available[
        Math.floor(Math.random() * available.length)
    ];

    localStorage.setItem("lastStoryImage", random);

    return random;
}async function generateStory(){

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const imagePath = getRandomImage();

    const img = new window.Image();
    const logo = new window.Image();

    img.crossOrigin = "anonymous";
    logo.crossOrigin = "anonymous";

    img.src = imagePath;
    logo.src = storyLogo;

    Promise.all([
    new Promise((resolve,reject) => {
        img.onload = resolve;
        img.onerror = reject;
    }),
    new Promise((resolve,reject) => {
        logo.onload = resolve;
        logo.onerror = reject;
    })
]).then(() => {

        ctx.clearRect(0,0,canvas.width,canvas.height);

        /* TŁO */

        const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
        );

        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(
            img,
            x,
            y,
            img.width * scale,
            img.height * scale
        );

       
       /* LOGO */

const logoWidth = 930;
const logoHeight = (210 / 887) * logoWidth;

/* BIAŁA POŚWIATA */

ctx.shadowColor = "rgba(255,255,255,0.95)";
ctx.shadowBlur = 35;

ctx.drawImage(
    logo,
    (canvas.width / 2) - (logoWidth / 2),
    70,
    logoWidth,
    logoHeight
);

/* ŻÓŁTA MOCNA POŚWIATA */

ctx.shadowColor = "rgba(255,214,10,0.95)";
ctx.shadowBlur = 90;

ctx.drawImage(
    logo,
    (canvas.width / 2) - (logoWidth / 2),
    70,
    logoWidth,
    logoHeight
);

/* FINAL LOGO */

ctx.shadowBlur = 0;

ctx.drawImage(
    logo,
    (canvas.width / 2) - (logoWidth / 2),
    70,
    logoWidth,
    logoHeight
);

/* =========================
DZIEŃ + DATA
========================= */

ctx.textAlign = "center";

/* DZIEŃ */

ctx.font = "bold 102px Arial";

ctx.lineWidth = 8;
ctx.strokeStyle = "white";

ctx.fillStyle = "black";

ctx.strokeText(
    selectedDay.toUpperCase(),
    canvas.width / 2,
    385
);

ctx.fillText(
    selectedDay.toUpperCase(),
    canvas.width / 2,
    385
);

/* DATA */

const now = new Date();

const dateText = now.toLocaleDateString("pl-PL",{
    day:"2-digit",
    month:"2-digit"
});

ctx.font = "bold 102px Arial";

ctx.strokeText(
    dateText,
    canvas.width / 2,
    490
);

ctx.fillText(
    dateText,
    canvas.width / 2,
    490
);

ctx.shadowBlur = 0;

        

        /* PANEL */

        /* LISTA ZAJĘĆ */


const lessons = getTodaySchedule();


/* =========================
GLOBAL FONT SCALE
========================= */

/*
JEDNA ZMIENNA DO SKALOWANIA
1.0 = standard
1.2 = większe
0.8 = mniejsze
*/

const FONT_SCALE = 1.0;

/* =========================
BAZOWE FONTY
========================= */

const FONT_SIZE_2 = 132;
const FONT_SIZE_3 = 128;
const FONT_SIZE_4 = 120;
const FONT_SIZE_5 = 92;

/* =========================
AUTO DOBÓR
========================= */

const lessonCount = lessons.length;

let dynamicFontSize = FONT_SIZE_5;

if(lessonCount <= 2){

    dynamicFontSize = FONT_SIZE_2;

}else if(lessonCount === 3){

    dynamicFontSize = FONT_SIZE_3;

}else if(lessonCount === 4){

    dynamicFontSize = FONT_SIZE_4;

}else{

    dynamicFontSize = FONT_SIZE_5;
}

/* =========================
FINAL SCALE
========================= */

dynamicFontSize =
Math.round(dynamicFontSize * FONT_SCALE);

const lineHeight = dynamicFontSize + 18;

ctx.font = `ctx.font = dynamicFontSize + "px Audiowide";

const maxWidth = 940;

/* =========================
PRZYGOTOWANIE BLOKÓW
========================= */

const preparedLessons = [];

let totalHeight = 0;

lessons.forEach((lesson)=>{

    let cleanText =
        lesson.text.replace(/\s*\(.*?\)/g, "");

    if(lesson.cancelled){
        cleanText += " ODWOŁANE";
    }

    const words = cleanText.split(" ");

    const lines = [];

    let currentLine = words[0];

    for(let i = 1; i < words.length; i++){

        const testLine =
            currentLine + " " + words[i];

        const metrics =
            ctx.measureText(testLine);

        if(metrics.width > maxWidth){

            lines.push(currentLine);
            currentLine = words[i];

        }else{

            currentLine = testLine;
        }
    }

    lines.push(currentLine);

    let calculatedFontSize = dynamicFontSize;

const cancelledCount =
    lessons.filter(l => l.cancelled).length;

if(
    lessons.length > 3 &&
    lesson.cancelled
){

    if(cancelledCount > 2){

        calculatedFontSize =
    Math.round(dynamicFontSize * 0.82);

    }else if(cancelledCount > 1){

        calculatedFontSize =
            Math.round(dynamicFontSize * 0.86);
    }
}

const customLineHeight =
    calculatedFontSize + 18;

let lessonHeight =
(lines.length * customLineHeight) + 55;

    totalHeight += lessonHeight;

    preparedLessons.push({
        ...lesson,
        lines,
        lessonHeight
    });
});


/* =========================
PANEL + WYŚRODKOWANIE
========================= */

const panelPadding = 30;

const dynamicPanelHeight =
    totalHeight + (panelPadding * 2);

const panelY =
    (canvas.height / 2) -
    (dynamicPanelHeight / 2) + 200;

/* PANEL */

ctx.fillStyle = "rgba(0,0,0,0)";

roundRect(
    ctx,
    55,
    panelY,
    970,
    dynamicPanelHeight,
    42,
    true,
    false
);

/* START TEKSTU - IDEALNY ŚRODEK */

let yPos =
    panelY +
    (dynamicPanelHeight / 2) -
    (totalHeight / 2);

/* =========================
RENDER
========================= */

preparedLessons.forEach((lesson,index)=>{

    const offset =
        Math.sin(Date.now()/600 + index) * 3;

    ctx.textAlign = "center";

    let lessonFontSize = dynamicFontSize;

    const cancelledCount =
        lessons.filter(l => l.cancelled).length;

    if(
        lessons.length > 3 &&
        lesson.cancelled
    ){

        if(cancelledCount > 2){

            lessonFontSize =
                Math.round(dynamicFontSize * 0.82);

        }else if(cancelledCount > 1){

            lessonFontSize =
                Math.round(dynamicFontSize * 0.82);
        }
    }

    const customLineHeight =
        lessonFontSize + 18;

    ctx.font =
        lessonFontSize + "px Audiowide";

    /* KOLOR ZAJĘĆ */

ctx.lineWidth = 11;
ctx.strokeStyle = "white";

if(lesson.cancelled){

    ctx.fillStyle = "#ff2b2b";

}else{

    ctx.fillStyle = "black";
}

    /* TŁO POD ZAJĘCIAMI */

const longestLine =
    lesson.lines.reduce((a,b)=>
        a.length > b.length ? a : b
    );

const bgWidth =
    ctx.measureText(longestLine).width + 70;

const bgHeight =
    (lesson.lines.length * customLineHeight) + 25;

ctx.fillStyle = "rgba(255,255,255,0.99)";

roundRect(
    ctx,
    (canvas.width / 2) - (bgWidth / 2),
    yPos - lessonFontSize + 10,
    bgWidth,
    bgHeight,
    24,
    true,
    false
);

/* PRZYWRÓĆ KOLOR TEKSTU */

if(lesson.cancelled){

    ctx.fillStyle = "#ff2b2b";

}else{

    ctx.fillStyle = "black";
}
    lesson.lines.forEach((line,lineIndex)=>{

        const textY =
            yPos +
            (lineIndex * customLineHeight) +
            offset;

        ctx.strokeText(
            line,
            canvas.width / 2,
            textY
        );

        ctx.fillText(
            line,
            canvas.width / 2,
            textY
        );
    });

  
/* PRZYWRÓĆ KOLOR TEKSTU */

if(lesson.cancelled){

    ctx.fillStyle = "#ff2b2b";

}else{

    ctx.fillStyle = "black";
}

    yPos += lesson.lessonHeight;

});
        /* =========================
GRADIENT POD FOOTER
========================= */

const footerGradient =
    ctx.createLinearGradient(
        0,
        1450,
        0,
        canvas.height
    );

footerGradient.addColorStop(
    0,
    "rgba(0,0,0,0)"
);

footerGradient.addColorStop(
    1,
    "rgba(0,0,0,0.5)"
);

ctx.fillStyle = footerGradient;

ctx.fillRect(
    0,
    1450,
    canvas.width,
    canvas.height - 1450
);
        /* FOOTER */

        ctx.textAlign = "center";

        ctx.fillStyle = "rgba(255,255,255,0.92)";

        

        ctx.font = "bold 62px Arial";

ctx.lineWidth = 6;
ctx.strokeStyle = "white";

ctx.strokeText(
    "ZAPRASZAMY NA TRENING 🔥",
    canvas.width / 2,
    1715
);

ctx.fillStyle = "black";

ctx.fillText(
    "ZAPRASZAMY NA TRENING 🔥",
    canvas.width / 2,
    1715
);

        }).catch(err => {

        console.error("Story error:", err);

    });
}

function roundRect(ctx,x,y,width,height,radius,fill,stroke){

    if(typeof radius === 'number'){
        radius = {
            tl:radius,
            tr:radius,
            br:radius,
            bl:radius
        };
    }

    ctx.beginPath();

    ctx.moveTo(x + radius.tl, y);

    ctx.lineTo(x + width - radius.tr, y);

    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);

    ctx.lineTo(x + width, y + height - radius.br);

    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);

    ctx.lineTo(x + radius.bl, y + height);

    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);

    ctx.lineTo(x, y + radius.tl);

    ctx.quadraticCurveTo(x, y, x + radius.tl, y);

    ctx.closePath();

    if(fill){
        ctx.fill();
    }

    if(stroke){
        ctx.stroke();
    }
}

function downloadStory(){

    const link = document.createElement("a");

    const today = new Date().toISOString().split("T")[0];

    link.download = `story-${today}.png`;

    link.href = canvas.toDataURL("image/png",1.0);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

if(generateStoryBtn){

    generateStoryBtn.addEventListener("click",generateStory);

}

if(downloadStoryBtn){

    downloadStoryBtn.addEventListener("click",downloadStory);

}

window.addEventListener("load",()=>{

    setTimeout(()=>{
        generateStory();
    },500);

});

console.log("SCRIPT LOADED OK");

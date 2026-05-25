console.log("SCRIPT START 1-2-88");
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
    setTimeout(() => {
    if (typeof generateStory === "function") {
        generateStory();
    }
}, 50);
    
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

    if(typeof generateStory === "function"){
    generateStory();
}
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

let canvas;
let ctx;
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


function getStorySettings(){

    return {
        baseScale: Number(document.getElementById("fontScale")?.value || 1),
        scale3: Number(document.getElementById("scale3")?.value || 0.80),
        scale2: Number(document.getElementById("scale2")?.value || 0.86),
        scale1: Number(document.getElementById("scale1")?.value || 0.92),


        lineSpacing: Number(document.getElementById("lineSpacing")?.value || 18),
    };
}



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
    if (!canvas || !ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const imagePath = getRandomImage();

    const img = new Image();
    const logo = new Image();

    img.crossOrigin = "anonymous";
    logo.crossOrigin = "anonymous";

    img.src = imagePath;
    logo.src = storyLogo;

    await Promise.all([
        new Promise(res => img.onload = res),
        new Promise(res => logo.onload = res)
    ]);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* =========================
       BACKGROUND
    ========================= */

    const bgScale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
);

ctx.drawImage(
    img,
    (canvas.width - img.width * bgScale) / 2,
    (canvas.height - img.height * bgScale) / 2,
    img.width * bgScale,
    img.height * bgScale
);

    /* =========================
       LOGO
    ========================= */

    const logoWidth = 930;
    const logoHeight = (210 / 887) * logoWidth;

    ctx.shadowColor = "rgba(255,255,255,0.9)";
    ctx.shadowBlur = 30;

    ctx.drawImage(
        logo,
        (canvas.width - logoWidth) / 2,
        70,
        logoWidth,
        logoHeight
    );

    ctx.shadowBlur = 0;

    /* =========================
       HEADER
    ========================= */

    ctx.textAlign = "center";

    const now = new Date();
    const dateText = now.toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit"
    });

    ctx.font = "bold 100px Arial";

    ctx.strokeStyle = "white";
    ctx.lineWidth = 8;
    ctx.fillStyle = "black";

    ctx.strokeText(selectedDay.toUpperCase(), canvas.width / 2, 380);
    ctx.fillText(selectedDay.toUpperCase(), canvas.width / 2, 380);

    ctx.strokeText(dateText, canvas.width / 2, 480);
    ctx.fillText(dateText, canvas.width / 2, 480);

    /* =========================
       LESSON DATA
    ========================= */

    const lessons = getTodaySchedule();
    const cancelledCount = lessons.filter(l => l.cancelled).length;
    const settings = getStorySettings();

    /* =========================
       FONT SCALE (CLEAN)
    ========================= */

    const baseSizes = [132, 128, 120, 92];
    let dynamicFontSize = baseSizes[Math.min(lessons.length - 1, 3)] || 92;

    const scale =
        cancelledCount >= 3 ? settings.scale3 :
        cancelledCount === 2 ? settings.scale2 :
        cancelledCount === 1 ? settings.scale1 :
        settings.baseScale;

    const fontSize = Math.round(dynamicFontSize * scale);
    const lineHeight = fontSize + settings.lineSpacing;

    ctx.font = `${fontSize}px Audiowide`;

    /* =========================
       PREP LESSONS
    ========================= */

    const prepared = [];
    let totalHeight = 0;

    const maxWidth = 940;

    lessons.forEach(lesson => {

        const clean = lesson.text.replace(/\s*\(.*?\)/g, "") +
            (lesson.cancelled ? " ODWOŁANE" : "");

        const words = clean.split(" ");
        const lines = [];

        let line = words[0] || "";

        for (let i = 1; i < words.length; i++) {
            const test = line + " " + words[i];
            if (ctx.measureText(test).width > maxWidth) {
                lines.push(line);
                line = words[i];
            } else {
                line = test;
            }
        }

        lines.push(line);

        const height = lines.length * lineHeight + 50;

        totalHeight += height;

        prepared.push({ ...lesson, lines, height });
    });

    /* =========================
       PANEL
    ========================= */

    const panelHeight = totalHeight + 60;
    const panelY = (canvas.height - panelHeight) / 2 + 200;

    let y = panelY + 30;

    ctx.fillStyle = "rgba(0,0,0,0)";

    roundRect(ctx, 55, panelY, 970, panelHeight, 42, true, false);

    /* =========================
       RENDER LESSONS
    ========================= */

    prepared.forEach((lesson, i) => {

        const offset = Math.sin(Date.now() / 600 + i) * 2;

        const bgHeight = lesson.lines.length * lineHeight + 20;

        const longest = lesson.lines.reduce((a, b) =>
            a.length > b.length ? a : b
        );

        const bgWidth = ctx.measureText(longest).width + 70;

        ctx.fillStyle = "rgba(255,255,255,0.98)";

        roundRect(
            ctx,
            (canvas.width - bgWidth) / 2,
            y - fontSize,
            bgWidth,
            bgHeight,
            24,
            true,
            false
        );

        ctx.fillStyle = lesson.cancelled ? "#ff2b2b" : "black";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 10;

        lesson.lines.forEach((line, j) => {

            const ty = y + j * lineHeight + offset;

            ctx.strokeText(line, canvas.width / 2, ty);
            ctx.fillText(line, canvas.width / 2, ty);
        });

        y += lesson.height;
    });

    /* =========================
       FOOTER
    ========================= */

    ctx.font = "bold 62px Arial";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;

    const footer = "ZAPRASZAMY NA TRENING 🔥";

    ctx.strokeText(footer, canvas.width / 2, 1715);
    ctx.fillText(footer, canvas.width / 2, 1715);
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



console.log("SCRIPT LOADED OK");

window.generateStory = generateStory;

window.addEventListener("load", () => {
    canvas = document.getElementById("storyCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
});


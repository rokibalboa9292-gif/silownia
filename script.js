
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

"19:30 – Taekwon-do Junior (Darek)",

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

"18:00 – Taekwon-do (Darek)",

"19:00 – Tabata (Iwonka)"

],

"Sobota": [

"10:00 – Kobieta na siłowni (Piotr)",

"13:30 – Taekwon-do Junior (Darek)"

],

"Niedziela": [

"10:00 – Hatha Joga (Emilia)"

]

};

function showSchedule(day, element){

document.querySelectorAll(".day-btn").forEach(btn=>{

btn.classList.remove("active");

});

element.classList.add("active");

const scheduleBox =
document.getElementById("schedule-box");

scheduleBox.innerHTML = "";

schedules[day].forEach(item=>{

const div =
document.createElement("div");

div.className = "schedule-item";

div.innerText = item;

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

showSchedule(
"Poniedziałek",
document.querySelector(".day-btn")
);

renderTasks(currentTasks);

/* =========================
DNI PRACA
========================= */

let fileHandle = null;

async function wybierzPlik(){

try{

fileHandle =
await window.showSaveFilePicker({

suggestedName:"DniPraca.txt",

types:[{
description:"Plik tekstowy",

accept:{
"text/plain":[".txt"]
}
}]

});

document.getElementById("status")
.innerText =
"Nowy plik utworzony";

await odswiezPodglad();

}catch(err){

console.log(err);

}

}

async function zaladujPlik(){

try{

const [handle] =
await window.showOpenFilePicker({

types:[{
description:"Plik tekstowy",

accept:{
"text/plain":[".txt"]
}
}],

multiple:false

});

fileHandle = handle;

document.getElementById("status")
.innerText =
"Plik załadowany";

await odswiezPodglad();

}catch(err){

console.log(err);

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

async function dodajLinie(godziny, h){

if(!fileHandle){

alert("Najpierw wybierz lub załaduj plik TXT");

return;

}

try{

const file =
await fileHandle.getFile();

let content =
await file.text();

const nowaLinia =
`${dataDzisiaj()} | ${godziny} | ${h}h\n`;

content += nowaLinia;

const writable =
await fileHandle.createWritable();

await writable.write(content);

await writable.close();

await odswiezPodglad();

}catch(err){

console.log(err);

}

}

async function dodajPoranna(){

await dodajLinie("6-15",9);

}

async function dodajWieczorna(){

await dodajLinie("15-22",7);

}

async function odswiezPodglad(){

if(!fileHandle) return;

try{

const file =
await fileHandle.getFile();

const content =
await file.text();

document.getElementById("podglad")
.value = content;

}catch(err){

console.log(err);

}

}
/* =========================
PRZYCISKI CZYSZCZENIA PLIKU
========================= */

const clearContainer =
document.createElement("div");

clearContainer.style.display = "flex";
clearContainer.style.gap = "10px";
clearContainer.style.marginTop = "20px";
clearContainer.style.justifyContent = "center";
clearContainer.style.flexWrap = "nowrap";

const clearButtons = [];

for(let i=1;i<=4;i++){

const btn =
document.createElement("button");

btn.innerText = i;

btn.style.width = "60px";
btn.style.height = "60px";
btn.style.border = "none";
btn.style.borderRadius = "14px";
btn.style.fontSize = "22px";
btn.style.fontWeight = "bold";
btn.style.cursor = "pointer";
btn.style.background = "#d62828";
btn.style.color = "white";
btn.style.transition = "0.2s";

btn.dataset.active = "false";

btn.addEventListener("click", ()=>{

if(btn.dataset.active === "true"){
return;
}

btn.dataset.active = "true";

btn.style.background = "#666";

checkClearButtons();

});

clearButtons.push(btn);

clearContainer.appendChild(btn);

}

document.querySelector(".work-section")
.appendChild(clearContainer);

async function checkClearButtons(){

const allActive =
clearButtons.every(btn =>
btn.dataset.active === "true"
);

if(!allActive) return;

if(!fileHandle){

alert("Najpierw wybierz plik TXT");

resetClearButtons();

return;

}

try{

const writable =
await fileHandle.createWritable();

await writable.write("");

await writable.close();

await odswiezPodglad();

alert("Plik został wyczyszczony");

}catch(err){

console.log(err);

}

resetClearButtons();

}

function resetClearButtons(){

clearButtons.forEach(btn=>{

btn.dataset.active = "false";

btn.style.background = "#d62828";

});

}
/* =========================
LOGIN
========================= */

const USER_LOGIN = "admin";
const USER_PASSWORD = "1234";

function login(){

const login =
document.getElementById("login").value;

const password =
document.getElementById("password").value;

const error =
document.getElementById("login-error");

if(
login === USER_LOGIN
&&
password === USER_PASSWORD
){

localStorage.setItem(
"loggedIn",
"true"
);

document.getElementById(
"login-screen"
).style.display = "none";

}else{

error.innerText =
"Nieprawidłowy login lub hasło";

}

}

function checkLogin(){

const logged =
localStorage.getItem("loggedIn");

if(logged === "true"){

document.getElementById(
"login-screen"
).style.display = "none";

}

}

function logout(){

localStorage.removeItem("loggedIn");

location.reload();

}

checkLogin();

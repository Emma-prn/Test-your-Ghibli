const compteur = document.getElementById('number');
const questionText = document.getElementById('question');
const sumText = document.getElementById('sum');
const rep = document.getElementById('rep');
const img = document.getElementById('illu');
const start = document.getElementById('start');
const nextQ = document.getElementById('next');

let questionNumber = 0;
let currentQuestion;
let correctAnswers = 0;
let availableQuestions = [];
let availableAnswers = [];

function selectRandom(alreadySelected, list, f) {
    let i = aleatoire(list.length);
    let item = f(list[i]);
    while (alreadySelected.findIndex(i => i == item) != -1) {
        i = aleatoire(list.length);
        item = f(list[i]);
    }
    return item;
}
function genAnswers(len, question, data, good, f) {
    let ids = [];
    for (let i = 0; i < len; i++) {
        question.answers[i] = null;
        ids.push(i);
    }
    let goodId = aleatoire(len);
    ids.splice(goodId, 1);
    question.answers[goodId] = good;
    question.correctAnswer = goodId;
    for (let i = 0; i < ids.length; i++) {
        question.answers[ids[i]] = selectRandom(question.answers, data, f);
    }
}
function questionFilm(arg){
    for (let i = 0; i < 5; i++) {
        if (i == 0) {
            let num = aleatoire(arg.length);
            let film = arg[num];
            questions[i].question += film.title + " ?";
            genAnswers(4, questions[i], arg, film.release_date, f => f.release_date);
        }
        else if (i == 1) {
            let num = aleatoire(arg.length);
            let film = arg[num];
            questions[i].sum = film.description;
            genAnswers(4, questions[i], arg, film.title, f => f.title);
        }
        else if (i == 2) {
            let num = aleatoire(arg.length);
            let film = arg[num];
            questions[i].question += film.title + " ?";
            genAnswers(4, questions[i], arg, film.producer, function(f) {
                let n = aleatoire(2);
                return [f.director, f.producer][n];
            });
        }
        else if (i == 3) {
            let num = aleatoire(arg.length);
            let film = arg[num];
            questions[i].question += film.title + " ?";
            genAnswers(4, questions[i], arg, film.director, function(f) {
                let n = aleatoire(2);
                return [f.director, f.producer][n];
            });
        }
        else {
            let num = aleatoire(arg.length);
            let film = arg[num];
            const illu = 'img/' + film.title + '.jpg';
            questions[i].img = illu;
            genAnswers(4, questions[i], arg, film.title, f => f.title);
        }
    }
}
function questionPer(persons, films) {
    for (let i = 5; i < 8; i++) {
        let num = aleatoire(persons.length);
        const name = persons[num].name;
        const age = persons[num].age;
        const illu = "img/people/"+name+".jpg";
        const film = films[films.findIndex(f => f.url == persons[num].films)];
        if (i == 5) {
            questions[i].img = illu;
            genAnswers(4, questions[i], persons, name, p => p.name);
        }
        else if (i == 6) {
            questions[i].img = illu;
            genAnswers(4, questions[i], films, film.title, f => f.title);
        }
        else {
            questions[i].img = illu;
            genAnswers(4, questions[i], persons, age, p => p.age);
        }
    }
}
function questionLieux(arg, films){
    for (let i = 8; i < 10; i++) {
        let num = aleatoire(arg.length);
        const name = arg[num].name;
        const illu = "img/loc/"+name+".jpg";
        const film = films[films.findIndex(f => f.url == arg[num].films)].title;
        if (i == 8) {
            questions[i].img = illu;
            genAnswers(4, questions[i], arg, name, p => p.name);
        }
        else {
            questions[i].img = illu;
            genAnswers(4, questions[i], films, film, f => f.title);
        }
    }   
}
function questionVehicle(arg, films){
    for (let i = 10; i < 12; i++) {
        let num = aleatoire(arg.length);
        const name = arg[num].name;
        const illu = "img/veh/"+name+".jpg";
        const film = films[films.findIndex(f => f.url == arg[num].films)].title;
        if (i == 10) {
            questions[i].img = illu;
            genAnswers(3, questions[i], arg, name, v => v.name);
        }
        else {
            questions[i].img = illu;
            genAnswers(3, questions[i], films, film, f => f.title);
        }
    }   
}
function aleatoire(n){
    const nbRep = Math.floor(Math.random()*n);
    return nbRep;
}
function setAvailableQuestion(){
    const totalQuestions = questions.length;
    for (let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(questions[i]);
    }
}
function getNewQuestion(){
    compteur.innerHTML = "Question " + (questionNumber+1) + " of " + questions.length;
    const questionIndex = availableQuestions[aleatoire(availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.question;
    if (currentQuestion.sum != undefined) {
        sumText.innerHTML = currentQuestion.sum;
    }
    else {
        sumText.innerHTML = '';
    }
    if (currentQuestion.img != undefined) {
        img.setAttribute("src", currentQuestion.img);   
    }
    else {
        img.setAttribute("src", '');
    }
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    const ansLen = currentQuestion.answers.length;
    for (let i = 0; i < ansLen; i++) {
        availableAnswers.push(i);
    }
    rep.innerHTML = '';    
    for (let i = 0; i < ansLen; i++) {
        const ansIndex = availableAnswers[aleatoire(availableAnswers.length)];
        const index2 = availableAnswers.indexOf(ansIndex);
        availableAnswers.splice(index2,1);
        const answer = document.createElement("div");
        answer.innerHTML = currentQuestion.answers[ansIndex];
        answer.id = ansIndex;
        answer.classList.add("answer");
        rep.appendChild(answer);
        answer.setAttribute("onclick", "getResult(this)");
    }
    questionNumber++;
    if (questionNumber == 13) {
        nextQ.innerHTML = 'View Score';
    }
}
function getResult(e){
    const id = parseInt(e.id);
    if (id == currentQuestion.correctAnswer) {
        e.classList.add("vrai");
        correctAnswers++;
    }
    else{
        e.classList.add("faux");
        const ansLen = rep.children.length;
        for (let i = 0; i < ansLen; i++) {
            if (parseInt(rep.children[i].id) == currentQuestion.correctAnswer) {
                rep.children[i].classList.add("vrai");
            }
        }
    }
    dejAns();
}
function dejAns(){
    const ansLen = rep.children.length;
    for (let i = 0; i < ansLen; i++) {
        rep.children[i].classList.add("deja-rep");
    }
}
function next(){
    if (questionNumber == questions.length) {
        endQuiz();
    }
    else {
        getNewQuestion();
    }
}
async function apiPeople() {
    const reqf = await fetch('https://ghibliapi.herokuapp.com/films');
    const films = await reqf.json();
    const reqp = await fetch('https://ghibliapi.herokuapp.com/people');
    const persons = await reqp.json();
    questionPer(persons, films);
}
async function apiLoc() {
    const reqf = await fetch('https://ghibliapi.herokuapp.com/films');
    const films = await reqf.json();
    const request = await fetch('https://ghibliapi.herokuapp.com/locations');
    const response = await request.json();
    questionLieux(response, films);
}
async function apiVeh() {
    const reqf = await fetch('https://ghibliapi.herokuapp.com/films');
    const films = await reqf.json();
    const request = await fetch('https://ghibliapi.herokuapp.com/vehicles');
    const response = await request.json();
    questionVehicle(response, films);
}
async function apiFilm() {
    const request = await fetch('https://ghibliapi.herokuapp.com/films');
    const response = await request.json();

    questionFilm(response);
}
function startQuiz(){
    const deb = document.getElementById('deb');
    const quiz = document.getElementById('quiz');
    deb.classList.add('hide');
    quiz.classList.remove('hide');
    getNewQuestion();
}
function endQuiz(){
    const quiz = document.getElementById('quiz');
    const result = document.getElementById('results');
    const score = document.getElementById('result');
    quiz.classList.add('hide');
    result.classList.remove('hide');
    localStorage.setItem("mostRecentScore", correctAnswers);
    score.innerHTML = correctAnswers;
}
async function init() {
  await Promise.all([
    apiFilm(),
    apiPeople(),
    apiLoc(),
    apiVeh()
  ])
}
init().then(
// success callback
    function() {
        setAvailableQuestion();
        start.addEventListener('click', startQuiz);
        const deb = document.getElementById('deb');
        const load = document.getElementById('loading');
        load.classList.add('hide');
        deb.classList.remove('hide');
    }
)
.catch(
    function(e) {
        console.log(e);
        const load = document.getElementById('loading');
        const fail = document.getElementById('failed');
        load.classList.add('hide');
        fail.classList.remove('hide');
    }
);
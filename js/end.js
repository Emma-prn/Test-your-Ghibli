const username = document.getElementById('username');
const saveButton = document.getElementById('save');
const scoreSafe = document.getElementById('safe');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

username.addEventListener('keyup', () => {
    saveButton.disabled = !username.value;
});

function savingScore(e){
    e.preventDefault();
    const saveScore = localStorage.getItem('mostRecentScore');
    const score = {
        score: saveScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    scoreSafe.innerHTML = 'Score saved';
}
saveButton.addEventListener('click', savingScore);

function playAgain(){
    document.location.reload();
}
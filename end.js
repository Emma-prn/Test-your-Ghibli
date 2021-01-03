const username = document.getElementById('username');
const saveButton = document.getElementById('save');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

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
    console.log(highScores);
}
saveButton.addEventListener('click', savingScore);

function playAgain(){
    document.location.reload();
}
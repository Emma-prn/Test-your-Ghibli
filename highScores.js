const list = document.getElementById('list');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);
highScores.forEach(score => {
    const item = document.createElement('li');
    item.innerHTML = `${score.name} - ${score.score}`;
    list.appendChild(item);
});
// opentdbからJSONファイルを取得
function getQuiz() {
    return fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        return JSON.stringify(myJson);
    })
}

const quiz = getQuiz();
console.log(quiz);

// fetchで取得したPromiseの問題文(question)を表示したいができず
// undefinedになる
console.log(quiz.results);


// Fetch APIを使ってクイズデータを取得する
function fetchQuiz() {
    return fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    .then(response => {
        return response.json();
    })
    .then(myJson => {
        return JSON.stringify(myJson);
    });
}

// 返り値(promiseオブジェクト)から値を取得する
fetchQuiz().then(results => {
    console.log(results);
});
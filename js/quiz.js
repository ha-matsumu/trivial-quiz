// Fetch APIを使ってクイズデータを取得する
function fetchQuiz() {
    return fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    .then(response => {
        return response.json();
    });
}

// 取得したデータの確認
fetchQuiz().then(response => {
    console.log(response);
});
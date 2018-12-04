// Fetch APIを使ってクイズデータを取得する
function fetchQuiz() {
    return fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    .then(response => {
        return response.json();
    });
}

// 取得したデータの確認
/*fetchQuiz().then(response => {
    console.log(response);
});*/

// 配列内の値をシャッフルする関数
function shuffle(arr) {
    for(let i = 0; i < arr.length; i++) {
        // 0 ~ 配列の長さ-1の範囲でランダムな値を取得する
        const random = Math.floor(Math.random() * (i + 1));

        // 配列内をシャッフルする
        const tmp = arr[i];
        arr[i] = arr[random];
        arr[random] = tmp;
    }
    return arr;
}


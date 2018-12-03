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
    for(let i = arr.length - 1; i >= 0; i--) {
        // 0 ~ 配列の長さ-1の範囲でランダムな値を取得する
        let random = Math.floor(Math.random() * (i + 1));

        // 配列内をシャッフルする
        let tmp = arr[i];
        arr[i] = arr[random];
        arr[random] = tmp;
    }
    return arr;
}

// 関数shuffleの動作確認
let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(nums);
console.log(shuffle(nums));


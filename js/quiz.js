// Fetch APIを使ってクイズデータを取得する
function fetchQuiz() {
    return fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    .then(response => {
        return response.json();
    });
}

// 取得したデータの確認
const quizzesData = fetchQuiz().then(response => {
    return response;
});
console.log(quizzesData);

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
/*let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(nums);
console.log(shuffle(nums));*/

// 指定したインデックス番号に応じたクイズデータを取得してクイズ情報を生成する関数
let quizzes = [];
function acquireQuiz(index) {
    let quiz = {};

    // 問題文の追加
    quiz.question = quizzesData.then(response => {
        return response.results;
    }).then(response => {
        return response[index].question;
    });
    console.log(quiz.question);

    // シャッフルされた解答一覧の追加
    quiz.answer = [];
    // 正解を配列に追加
    quiz.answer.push(quizzesData.then(response => {
        return response.results;
    }).then(response => {
        return response[index].correct_answer;
    }));

    // 不正解を配列に追加
    quiz.answer = quiz.answer.concat(quizzesData.then(response => {
        return response.results;
    }).then(response => {
        return response[index].incorrect_answers;
    }));

    console.log(quiz.answer);
    quizzes.push(quiz);

}

acquireQuiz(0);
console.log(quizzes);


// Fetch APIを使ってクイズデータを取得する
function fetchQuiz() {
    return fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    .then(response => {
        return response.json();
    });
}

// 配列内の値をシャッフルする関数
function shuffleQuizAnswers(arr) {
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


const currentQuizIndex = 0;

// 指定したインデックス番号に応じたクイズデータを取得してクイズ情報を生成する関数
function acquireQuiz(quizIndex) {
    fetchQuiz().then(response => {
        console.log("クイズデータ : ", response.results);  // TODO:後で消す
        return response.results;
    }).then(quizDataList => {
        const currentQuiz = quizDataList[quizIndex];
        console.log("問題文 : ", currentQuiz.question);  // TODO:後で消す

        const quizAnswers = [];
        quizAnswers.push(currentQuiz.correct_answer);
        currentQuiz.incorrect_answers.forEach(incorrect_answer => {
            quizAnswers.push(incorrect_answer);
        });
        console.log("シャッフルした後のクイズの解答 : ", shuffleQuizAnswers(quizAnswers));  //TODO:後で消す

        // TODO:この後「問題文とシャッフルしたクイズの解答をHTMLにセットする(DOM操作)を行う関数」を実行する
    });
}

acquireQuiz(currentQuizIndex);


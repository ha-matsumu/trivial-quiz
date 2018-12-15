const divCurrentQuizQuestion = document.getElementById("currentQuizQuestion");
const ulCurrentQuizAnswers = document.getElementById("currentQuizAnswers");
const currentQuizIndex = 0;

acquireQuiz(currentQuizIndex);

// Fetch APIを使ってクイズデータを取得する
function fetchQuiz() {
    return fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    .then(response => {
        return response.json();
    });
}

// 配列内の値をシャッフルする関数
function shuffleQuizAnswers(_answers) {
    const copiedCurrentQuizAnswers = _answers.slice();
    for(let i = 0; i < copiedCurrentQuizAnswers.length; i++) {
        // 0 ~ 配列の長さ-1の範囲でランダムな値を取得する
        const random = Math.floor(Math.random() * (i + 1));

        // 配列内をシャッフルする
        const tmp = copiedCurrentQuizAnswers[i];
        copiedCurrentQuizAnswers[i] = copiedCurrentQuizAnswers[random];
        copiedCurrentQuizAnswers[random] = tmp;
    }
    return copiedCurrentQuizAnswers;
}

// 指定したインデックス番号に応じたクイズデータを取得してクイズ情報を生成する関数
function acquireQuiz(_quizIndex) {
    fetchQuiz().then(response => {
        console.log("クイズデータ : ", response.results);  // TODO:後で消す
        return response.results;
    }).then(quizDataList => {
        const currentQuiz = quizDataList[_quizIndex];
        console.log("問題文 : ", currentQuiz.question);  // TODO:後で消す

        const currentQuizAnswers = [];
        currentQuizAnswers.push(currentQuiz.correct_answer);
        currentQuiz.incorrect_answers.forEach(incorrect_answer => {
            currentQuizAnswers.push(incorrect_answer);
        });
        console.log("シャッフルした後のクイズの解答 : ", shuffleQuizAnswers(currentQuizAnswers));  //TODO:後で消す

        // TODO:この後「問題文とシャッフルしたクイズの解答をHTMLにセットする(DOM操作)を行う関数」を実行する
        divCurrentQuizQuestion.textContent = currentQuiz.question;
        appendAnswersToContainer(currentQuizAnswers);
    });
}

function appendAnswersToContainer(_quizAnswers) {
    // ulタグ内を空にする
    while(ulCurrentQuizAnswers.firstChild) {
        ulCurrentQuizAnswers.removeChild(ulCurrentQuizAnswers.firstChild);
    }

    // クイズの解答数に応じてliタグをulタグに追加する
    for(let i = 0; i < _quizAnswers.length; i++) {
        const liQuizAnswer = document.createElement("li");
        liQuizAnswer.textContent = _quizAnswers[i];
        ulCurrentQuizAnswers.appendChild(liQuizAnswer);
    }
}
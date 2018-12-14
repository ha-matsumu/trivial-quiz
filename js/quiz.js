// Fetch APIを使ってクイズデータを取得する
function fetchQuiz() {
    return fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
    .then(response => {
        return response.json();
    });
}

// 配列内の値をシャッフルする関数
function shuffleQuizAnswers(_arr) {
    for(let i = 0; i < _arr.length; i++) {
        // 0 ~ 配列の長さ-1の範囲でランダムな値を取得する
        const random = Math.floor(Math.random() * (i + 1));

        // 配列内をシャッフルする
        const tmp = _arr[i];
        _arr[i] = _arr[random];
        _arr[random] = tmp;
    }
    return _arr;
}

const fetchQuizJson = fetchQuiz();
console.log("クイズデータ : ", fetchQuizJson);  // TODO:後で消す
let currentQuizIndex = 0;

// 指定したインデックス番号に応じたクイズデータを取得してクイズ情報を生成する関数
function acquireQuiz(_quizIndex) {
    fetchQuizJson.then(response => {
        return response.results;
    }).then(quizDataList => {
        const currentQuiz = quizDataList[_quizIndex];
        console.log(_quizIndex+1, ".問題文 : ", currentQuiz.question);  // TODO:後で消す

        const quizAnswers = [];
        quizAnswers.push(currentQuiz.correct_answer);
        currentQuiz.incorrect_answers.forEach(incorrect_answer => {
            quizAnswers.push(incorrect_answer);
        });
        console.log(_quizIndex+1, ".シャッフルした後のクイズの解答 : ", shuffleQuizAnswers(quizAnswers));  //TODO:後で消す

        // TODO:この後「問題文とシャッフルしたクイズの解答をHTMLにセットする(DOM操作)を行う関数」を実行する
        const DivCurrentQuizQuestion = document.getElementById("currentQuizQuestion");
        DivCurrentQuizQuestion.textContent = currentQuiz.question;
        addLisToUl(quizAnswers);
    });
}

acquireQuiz(currentQuizIndex);

function addLisToUl(_quizAnswers) {
    const ulCurrentQuizAnswers = document.getElementById("currentQuizAnswers");

    // ulタグ内を空にする
    while(ulCurrentQuizAnswers.firstChild) {
        ulCurrentQuizAnswers.removeChild(ulCurrentQuizAnswers.firstChild);
    }

    // クイズの解答数に応じてliタグをulタグに追加する
    for(let i = 0; i < _quizAnswers.length; i++) {
        const liQuizAnswer = document.createElement("li");
        liQuizAnswer.textContent = _quizAnswers[i];
        liQuizAnswer.addEventListener("click", () => {
            currentQuizIndex++;
            acquireQuiz(currentQuizIndex);
        });
        ulCurrentQuizAnswers.appendChild(liQuizAnswer);
    }
}
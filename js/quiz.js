const divCurrentQuizQuestion = document.getElementById("currentQuizQuestion");
const ulCurrentQuizAnswers = document.getElementById("currentQuizAnswers");
let quizDataList;
let currentQuiz;
const currentQuizAnswers = [];
let currentQuizIndex = 0;

// Fetch APIを使ってクイズデータを取得する
// そして、１問目のクイズ情報を作成してHTMLにセットする
fetch('https://opentdb.com/api.php?amount=10')
    .then(response => {
        return response.json();
    }).then(response => {
        return response.results;
    }).then(data => {
        quizDataList = data;
        console.log("クイズデータ : ", quizDataList);  // TODO:後で消す  
            
        prepareCurrentQuiz(currentQuizIndex);
        setCurrentQuiz(currentQuizIndex);      
});

// 配列内の値をシャッフルする関数
function shuffleQuizAnswers(_answers) {
    const copiedCurrentQuizAnswers = _answers.slice();
    for(let i = 0; i < copiedCurrentQuizAnswers.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));

        // 配列内をシャッフルする
        const tmp = copiedCurrentQuizAnswers[i];
        copiedCurrentQuizAnswers[i] = copiedCurrentQuizAnswers[random];
        copiedCurrentQuizAnswers[random] = tmp;
    }
    return copiedCurrentQuizAnswers;
}

function appendAnswersToContainer(_quizAnswers) {
    // ulタグ内を空にする
    while(ulCurrentQuizAnswers.firstChild) {
        ulCurrentQuizAnswers.removeChild(ulCurrentQuizAnswers.firstChild);
    }

    // クイズの解答数に応じてliタグをulタグに追加する
    _quizAnswers.forEach((answer) => {
        const liQuizAnswer = document.createElement("li");
        liQuizAnswer.textContent = answer;
        liQuizAnswer.addEventListener("click", () => {
            currentQuizIndex++;
            prepareCurrentQuiz(currentQuizIndex);
            setCurrentQuiz(currentQuizIndex);
        });
        ulCurrentQuizAnswers.appendChild(liQuizAnswer);
    });
}

function prepareCurrentQuiz(_quizIndex) {
    currentQuiz = quizDataList[_quizIndex];

    currentQuizAnswers.splice(0, currentQuizAnswers.length);
    currentQuizAnswers.push(currentQuiz.correct_answer);
    currentQuiz.incorrect_answers.forEach(incorrect_answer => {
        currentQuizAnswers.push(incorrect_answer);
    });
}

function setCurrentQuiz(_quizIndex) {
    divCurrentQuizQuestion.textContent = currentQuiz.question;
    const shuffledAnswers = shuffleQuizAnswers(currentQuizAnswers);
    appendAnswersToContainer(shuffledAnswers);
}
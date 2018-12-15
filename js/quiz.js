const divCurrentQuizQuestion = document.getElementById("currentQuizQuestion");
const ulCurrentQuizAnswers = document.getElementById("currentQuizAnswers");
let quizDataList;
let currentQuiz;
const currentQuizAnswers = [];
let currentQuizIndex = 0;

acquireQuizDataList();

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
function acquireQuizDataList() {
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
            acquireCurrentQuiz(currentQuizIndex);
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
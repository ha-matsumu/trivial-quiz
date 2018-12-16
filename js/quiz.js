(() => {
    const divCurrentQuizQuestion = document.getElementById("currentQuizQuestion");
    const ulCurrentQuizAnswers = document.getElementById("currentQuizAnswers");
    const divNumberOfCorrectAnswers = document.getElementById("numberOfCorrectAnswers");
    let quizDataList;
    let currentQuizIndex = 0;
    let numberOfCorrectAnswers = 0;

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
                
            const currentQuiz = prepareCurrentQuiz(currentQuizIndex);
            appendCurrentQuizToContainer(currentQuiz);      
    });

    function prepareCurrentQuiz(_currentQuizIndex) {
        const currentQuiz = {};
        currentQuiz.question = quizDataList[_currentQuizIndex].question;
        currentQuiz.correctAnswer = quizDataList[_currentQuizIndex].correct_answer;

        const currentQuizAnswers = quizDataList[_currentQuizIndex].incorrect_answers;
        currentQuizAnswers.push(currentQuiz.correctAnswer);
        const shuffledCurrentAnswers = shuffleQuizAnswers(currentQuizAnswers);

        currentQuiz.answers = shuffledCurrentAnswers;

        return currentQuiz;
    }

    function shuffleQuizAnswers(_answers) {
        const copiedCurrentQuizAnswers = _answers.slice();
        for(let i = 0; i < copiedCurrentQuizAnswers.length; i++) {
            const random = Math.floor(Math.random() * (i + 1));

            const tmp = copiedCurrentQuizAnswers[i];
            copiedCurrentQuizAnswers[i] = copiedCurrentQuizAnswers[random];
            copiedCurrentQuizAnswers[random] = tmp;
        }
        return copiedCurrentQuizAnswers;
    }

    function appendCurrentQuizToContainer(_currentQuiz) {
        const currentQuestionText = "Q" + (currentQuizIndex + 1) + "." +  _currentQuiz.question;
        divCurrentQuizQuestion.textContent = currentQuestionText;

        const currentQuizCorrectAnswer = _currentQuiz.correctAnswer;
        const shuffledAnswers = _currentQuiz.answers;

        // ulタグ内を空にする
        while(ulCurrentQuizAnswers.firstChild) {
            ulCurrentQuizAnswers.removeChild(ulCurrentQuizAnswers.firstChild);
        }

        // クイズの解答数に応じてliタグをulタグに追加する
        shuffledAnswers.forEach((answer) => {
            const liQuizAnswer = document.createElement("li");
            liQuizAnswer.textContent = answer;

            liQuizAnswer.addEventListener("click", () => {
                if(liQuizAnswer.textContent === currentQuizCorrectAnswer){
                    numberOfCorrectAnswers++;
                }

                if(currentQuizIndex === quizDataList.length-1) {
                    const resultText = "Your score<br>" + numberOfCorrectAnswers + " / " + quizDataList.length;
                    divNumberOfCorrectAnswers.innerHTML = resultText;
                } else {
                    currentQuizIndex++;
                    const currentQuiz = prepareCurrentQuiz(currentQuizIndex);
                    appendCurrentQuizToContainer(currentQuiz);
                }
            });

            ulCurrentQuizAnswers.appendChild(liQuizAnswer);
        });
    }
})();
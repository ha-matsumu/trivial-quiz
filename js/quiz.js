(() => {
    const divCurrentQuizQuestion = document.getElementById("currentQuizQuestion");
    const ulCurrentQuizAnswers = document.getElementById("currentQuizAnswers");
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
        const quiz = quizDataList[_currentQuizIndex];
        const answers = quiz.incorrect_answers.slice();
        answers.push(quiz.correct_answer);
        const shuffledAnswers = shuffleQuizAnswers(answers);

        const currentQuiz = {
            question: quiz.question,
            correctAnswer: quiz.correct_answer,
            answers: shuffledAnswers
        };

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
        divCurrentQuizQuestion.textContent = _currentQuiz.question;

        // ulタグ内を空にする
        while(ulCurrentQuizAnswers.firstChild) {
            ulCurrentQuizAnswers.removeChild(ulCurrentQuizAnswers.firstChild);
        }

        // クイズの解答数に応じてliタグをulタグに追加する
        _currentQuiz.answers.forEach((answer) => {
            const liQuizAnswer = document.createElement("li");
            liQuizAnswer.textContent = answer;

            liQuizAnswer.addEventListener("click", () => {
                if(liQuizAnswer.textContent === _currentQuiz.correctAnswer){
                    numberOfCorrectAnswers++;
                }
                console.log("現在の正解数は", numberOfCorrectAnswers, "です!"); //TODO:あとで消す
                currentQuizIndex++;
                const currentQuiz = prepareCurrentQuiz(currentQuizIndex);
                appendCurrentQuizToContainer(currentQuiz);
            });

            ulCurrentQuizAnswers.appendChild(liQuizAnswer);
        });
    }
})();
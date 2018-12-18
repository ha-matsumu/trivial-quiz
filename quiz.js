(() => {
  const divCurrentQuizQuestion = document.getElementById("currentQuizQuestion");
  const ulCurrentQuizAnswers = document.getElementById("currentQuizAnswers");
  const divNumberOfCorrectAnswers = document.getElementById(
    "numberOfCorrectAnswers"
  );
  let quizDataList;
  let currentQuizIndex = 0;
  let numberOfCorrectAnswers = 0;

  // Fetch APIを使ってクイズデータを取得する
  // そして、１問目のクイズ情報を作成してHTMLにセットする
  fetch("https://opentdb.com/api.php?amount=10")
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response.results;
    })
    .then(data => {
      quizDataList = data;
      console.log("クイズデータ : ", quizDataList); // TODO:後で消す

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
    for (let i = 0; i < copiedCurrentQuizAnswers.length; i++) {
      const random = Math.floor(Math.random() * (i + 1));

      const tmp = copiedCurrentQuizAnswers[i];
      copiedCurrentQuizAnswers[i] = copiedCurrentQuizAnswers[random];
      copiedCurrentQuizAnswers[random] = tmp;
    }
    return copiedCurrentQuizAnswers;
  }

  function appendCurrentQuizToContainer(_currentQuiz) {
    const currentQuestionText = `Q${currentQuizIndex + 1}. ${
      _currentQuiz.question
    }`;
    divCurrentQuizQuestion.textContent = currentQuestionText;

    // ulタグ内を空にする
    while (ulCurrentQuizAnswers.firstChild) {
      ulCurrentQuizAnswers.removeChild(ulCurrentQuizAnswers.firstChild);
    }

    // クイズの解答数に応じてliタグをulタグに追加する
    _currentQuiz.answers.forEach(answer => {
      const liQuizAnswer = document.createElement("li");
      liQuizAnswer.textContent = answer;

      liQuizAnswer.addEventListener("click", () => {
        currentQuizIndex++;
        if (currentQuizIndex === quizDataList.length) {
          const resultText = `Your Score<br>${numberOfCorrectAnswers} / ${quizDataList.length}`;
          divNumberOfCorrectAnswers.innerHTML = resultText;
        } else {
          if (liQuizAnswer.textContent === _currentQuiz.correctAnswer) {
            numberOfCorrectAnswers++;
            alert("You got it right!!");
          } else {
            alert(`You got it wrong. The answer of this question is "${_currentQuiz.correctAnswer}".`
            );
          }
          const currentQuiz = prepareCurrentQuiz(currentQuizIndex);
          appendCurrentQuizToContainer(currentQuiz);
        }
      });

      ulCurrentQuizAnswers.appendChild(liQuizAnswer);
    });
  }
})();

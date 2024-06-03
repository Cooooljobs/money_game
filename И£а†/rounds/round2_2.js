document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.querySelector('.game-board');
  const shakeSound = new Audio('../sounds/false.mp3');
  const winSound = new Audio('../sounds/true.mp3');
  const riddles = [
    {
      question: 'Что можно потерять, не купив и не продавая?',
      options: ['Страховку', 'Деньги', 'Время', 'Кредитную карту'],
      answer: 'Время'
    },
    {
      question: 'Что растет, не имея корней и не оставаясь на месте?',
      options: ['Инфляция', 'Биржевой индекс', 'Кредитный лимит', 'Долг'],
      answer: 'Инфляция'
    },
    {
      question: 'Что приходит сначала мягким, потом твердым, а в конце раздражает каждого?',
      options: ['Ипотека', 'Кредит', 'Долг', 'Закон об обязательствах'],
      answer: 'Кредит'
    },
    {
      question: 'Что всегда приходит раньше, чем пенсия?',
      options: ['Старость', 'Долг', 'Пенсионный фонд', 'Страховка жизни'],
      answer: 'Долг'
    }
  ];

  function showCompletionMessage() {
    const completionMessage = document.createElement('div');
    completionMessage.classList.add('completion-message');
    completionMessage.innerHTML = `
      <div class="completion-content">
        <h2>Поздравляем!</h2>
        <img src="../media/man/lvl2.png" alt="Level 3" id="level-image" width="200px">
        <div class="progress-text">Прогресс: <span id="progress-percentage">42,9%</span></div>
        <p>Вы успешно завершили Раунд 3.<br>Вы можете перейти к следующему этапу.</p>
        <a href="round3.html" class="next-round-button">Перейти к следующему этапу</a>
      </div>
    `;
    document.body.appendChild(completionMessage);
    playSound(winSound);
  }

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }

  function createRiddleContainer(riddle, index) {
    const riddleContainer = document.createElement('div');
    riddleContainer.classList.add('riddle-container');

    const riddleCard = document.createElement('div');
    riddleCard.classList.add('riddle-card');
    riddleCard.textContent = `${index + 1}. ${riddle.question}`;

    const answerOptions = document.createElement('div');
    answerOptions.classList.add('answer-options');

    riddle.options.forEach(option => {
      const answerOption = document.createElement('div');
      answerOption.classList.add('answer-option');
      answerOption.textContent = option;
      answerOption.addEventListener('click', () => {
        if (option === riddle.answer) {
          answerOption.classList.add('correct');
          playSound(winSound);
          if (checkAllAnswered()) {
            showCompletionMessage();
          }
        } else {
          answerOption.classList.add('incorrect');
          playSound(shakeSound);
          setTimeout(() => {
            answerOption.classList.remove('incorrect');
          }, 400);
        }
      });
      answerOptions.appendChild(answerOption);
    });

    riddleContainer.appendChild(riddleCard);
    riddleContainer.appendChild(answerOptions);
    gameBoard.appendChild(riddleContainer);
  }

  function checkAllAnswered() {
    const answerOptions = document.querySelectorAll('.answer-option');
    const correctAnswers = [...answerOptions].filter(option => option.classList.contains('correct'));
    return correctAnswers.length === riddles.length;
  }

  riddles.forEach((riddle, index) => {
    createRiddleContainer(riddle, index);
  });
});

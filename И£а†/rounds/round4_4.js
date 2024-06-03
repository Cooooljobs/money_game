const scenarios = [
  {
    text: "Инвестиционная компания предлагает приобрести акции крупной публичной компании на фондовой бирже.",
    isReal: true
  },
  {
    text: "Компания предлагает \"эксклюзивную возможность\" инвестировать в разработку нового программного обеспечения с обещанием высокой отдачи при небольшом первоначальном взносе.",
    isReal: false
  },
  {
    text: "Успешный трейдер предлагает \"копировать его сделки\" с обещанием высоких прибылей без значительных усилий или знаний с вашей стороны.",
    isReal: false
  },
  {
    text: "Работодатель предлагает участие в пенсионном плане с соответствующими вкладами работника и работодателя.",
    isReal: true
  },
  {
    text: "Организация предлагает стать членом \"финансового клуба\" с ежемесячными взносами и возможностью получать часть прибыли от секретных инвестиционных стратегий.",
    isReal: false
  }
];

const selectedScenarios = [];

function createCards() {
  const gameBoard = document.querySelector('.game-board');
  gameBoard.innerHTML = '';

  // Перемешиваем массив сценариев
  const shuffledScenarios = scenarios.sort(() => Math.random() - 0.5);

  shuffledScenarios.forEach((scenario, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = scenario.text;
    card.addEventListener('click', () => {
      if (!document.querySelector('#confirm-selection-button').disabled) {
        selectScenario(scenario, card);
      }
    });
    gameBoard.appendChild(card);
  });
  
  const confirmButton = document.querySelector('#confirm-selection-button');
  confirmButton.addEventListener('click', () => {
    if (selectedScenarios.length === 2) {
      const allReal = selectedScenarios.every(s => s.isReal);
      showCompletionMessage(!allReal);
      confirmButton.disabled = true;
    }
  });
}

function selectScenario(scenario, card) {
  if (selectedScenarios.length < 2 && !card.classList.contains('selected')) {
    card.classList.add('selected');
    selectedScenarios.push(scenario);
    playClickSound(); // Вызываем функцию для проигрывания звука
  } else if (card.classList.contains('selected')) {
    card.classList.remove('selected');
    const index = selectedScenarios.indexOf(scenario);
    if (index > -1) {
      selectedScenarios.splice(index, 1);
    }
  } else if (selectedScenarios.length === 2) {
    const removedCard = selectedScenarios.shift();
    removedCard.classList.remove('selected');
    card.classList.add('selected');
    selectedScenarios.push(scenario);
    playClickSound(); // Вызываем функцию для проигрывания звука
  }
}

function playClickSound() {
  var audio = new Audio('../sounds/go.mp3');
  audio.play();
}


function resetSelections() {
  const selectedCards = document.querySelectorAll('.card.selected');
  selectedCards.forEach(card => {
    card.classList.remove('selected');
  });
  selectedScenarios.length = 0;
  document.querySelector('#confirm-selection-button').disabled = false;
}


function showCompletionMessage(hasErrors) {
  const completionMessage = document.createElement('div');
  completionMessage.classList.add('completion-message');

  if (hasErrors) {
    completionMessage.innerHTML = `
      <div class="completion-content">
        <h2>Раунд не пройден!</h2>
        <p>В одном из ответов допущена ошибка. Пожалуйста, перейдите к следующему раунду.</p>
        <a href="#" class="retry-round-button">Повторить раунд</a>
      </div>
    `;
    completionMessage.querySelector('.retry-round-button').addEventListener('click', () => {
      completionMessage.remove();
      resetSelections();
    });

    playFailSound();
  } else {
    completionMessage.innerHTML = `
      <div class="completion-content">
        <h2>Поздравляем!</h2>
        <img src="../media/man/lvl4.png" alt="Level 6" id="level-image" width="200px">
        <div class="progress-text">
          Прогресс: <span id="progress-percentage">85,8%</span>
        </div>
        <p>Вы успешно завершили Раунд 6.<br>Вы можете перейти к следующему этапу.</p>
        <a href="round5.html" class="next-round-button">Перейти к следующему этапу</a>
      </div>
    `;
    completionMessage.querySelector('.next-round-button').addEventListener('click', () => {
      completionMessage.remove();
    });

    playWinSound();
  }

  document.body.appendChild(completionMessage);
}

function playWinSound() {
  var audio = new Audio('../sounds/win.mp3');
  audio.play();
}

function playFailSound() {
  var audio = new Audio('../sounds/fail.mp3');
  audio.play();
}

document.addEventListener('DOMContentLoaded', createCards);

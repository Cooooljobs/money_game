const cards = document.querySelectorAll('.card');
const gameScreen = document.getElementById('gameScreen');


function openGameScreen() {
  gameScreen.style.display = 'flex'; 
  document.querySelector('.game-board').classList.add('hide'); 
}

function closeGameScreen() {
  gameScreen.style.display = 'none'; 
  document.querySelector('.game-board').classList.remove('hide'); 
}

const exitButton = document.createElement('span');
exitButton.classList.add('exit-game-button');
exitButton.innerHTML = '✖';
exitButton.addEventListener('click', closeGameScreen);
gameScreen.appendChild(exitButton);


const card1DefinitionWithErrors = `Деньги это игровые фишки, которые можно обменивать на разные вещи, такие как конфеты или игрушки.`;

const card1DefinitionWithoutErrors = `Деньги это средство обмена, которое используется для покупок товаров и услуг.`;

const card2DefinitionWithErrors = `Бюджет это игра, в которой мы ставим деньги и выигрываем больше, чем вложили.`;

const card2DefinitionWithoutErrors = `Бюджет это план расходов, который помогает контролировать, сколько денег мы тратим на разные вещи.`;

const card3DefinitionWithErrors = `Сбережения это деньги, которые мы тратим на развлечения и приятные мелочи, не задумываясь о будущем.`;

const card3DefinitionWithoutErrors = `Сбережения это деньги, которые мы откладываем на будущее, чтобы использовать их в случае неожиданных расходов или для достижения целей.`;

const card4DefinitionWithErrors = `Долги это сумма денег, которую мы получаем в качестве подарка и никогда не нужно возвращать.`;

const card4DefinitionWithoutErrors = `Долги это сумма денег, которую мы занимаем и должны вернуть в будущем, обычно с дополнительными процентами.`;



function shuffleDefinitions(definition1, definition2) {
  const randomOrder = Math.random() < 0.5;
  return randomOrder ? [definition1, definition2] : [definition2, definition1];
}

function displayDefinitions(cardId) {
  gameScreen.style.display = 'flex'; 
  document.querySelector('.game-board').classList.add('hide'); 

  let selectedDefinitionWithErrors = '';
  let selectedDefinitionWithoutErrors = '';

  switch (cardId) {
    case 'card1':
      [selectedDefinitionWithErrors, selectedDefinitionWithoutErrors] = shuffleDefinitions(card1DefinitionWithErrors, card1DefinitionWithoutErrors);
      break;
    case 'card2':
      [selectedDefinitionWithErrors, selectedDefinitionWithoutErrors] = shuffleDefinitions(card2DefinitionWithErrors, card2DefinitionWithoutErrors);
      break;
    case 'card3':
      [selectedDefinitionWithErrors, selectedDefinitionWithoutErrors] = shuffleDefinitions(card3DefinitionWithErrors, card3DefinitionWithoutErrors);
      break;
    case 'card4':
      [selectedDefinitionWithErrors, selectedDefinitionWithoutErrors] = shuffleDefinitions(card4DefinitionWithErrors, card4DefinitionWithoutErrors);
      break;
    default:
      break;
  }

  gameScreen.innerHTML = '';

  const definitionsContainer = document.createElement('div');
  definitionsContainer.innerHTML = `
    <p><strong>Выберите верное определение:</strong></p>
    <p>Вариант 1:</p>
    <p class="definition-with-errors">${selectedDefinitionWithErrors}</p>
    <p>Вариант 2:</p>
    <p class="definition-without-errors">${selectedDefinitionWithoutErrors}</p>
  `;

  gameScreen.appendChild(definitionsContainer);

  const definitionWithError = definitionsContainer.querySelector('.definition-with-errors');
  const definitionWithoutError = definitionsContainer.querySelector('.definition-without-errors');

  definitionWithError.addEventListener('click', () => {
    closeGameScreen();
    selectedDefinitions[cardId] = selectedDefinitionWithErrors;
    checkAllSelections(); // Проверить выборы для всех карточек
  });

  definitionWithoutError.addEventListener('click', () => {
    closeGameScreen();
    selectedDefinitions[cardId] = selectedDefinitionWithoutErrors;
    checkAllSelections(); // Проверить выборы для всех карточек
  });
}

function closeGameScreen() {
  gameScreen.style.display = 'none'; 
  document.querySelector('.game-board').classList.remove('hide'); 
}
let selectedDefinitions = {
  card1: null,
  card2: null,
  card3: null,
  card4: null,
};

function checkSelections() {
  selectedDefinitions.card1 = selectedDefinitions.card1 === card1DefinitionWithoutErrors;
  selectedDefinitions.card2 = selectedDefinitions.card2 === card2DefinitionWithoutErrors;
  selectedDefinitions.card3 = selectedDefinitions.card3 === card3DefinitionWithoutErrors;
  selectedDefinitions.card4 = selectedDefinitions.card4 === card4DefinitionWithoutErrors;

  if (selectedDefinitions.card1 && selectedDefinitions.card2 && selectedDefinitions.card3 && selectedDefinitions.card4) {
    showCompletionMessage(false);
  } else {
    showCompletionMessage(true);
  }
}


// Функция для отображения окна завершения или переигровки
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

    // Воспроизводим звук при неудачном прохождении раунда
    playFailSound();
  } else {
    completionMessage.innerHTML = `
      <div class="completion-content">
        <h2>Поздравляем!</h2>
        <img src="../media/man/lvl4.png" alt="Level 5" id="level-image" width="200px">
        <div class="progress-text">
          Прогресс: <span id="progress-percentage">71,5%</span>
        </div>
        <p>Вы успешно завершили Раунд 5.<br>Вы можете перейти к следующему этапу.</p>
        <a href="round4_4.html" class="next-round-button">Перейти к следующему этапу</a>
      </div>
    `;
    completionMessage.querySelector('.next-round-button').addEventListener('click', () => {
      completionMessage.remove();
      // Здесь вы можете добавить логику для перехода к следующему этапу
    });

    // Воспроизводим звук при успешном прохождении раунда
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




cards.forEach(card => {
  card.addEventListener('click', () => {
    displayDefinitions(card.id);
    checkAllSelections(); 
  });
});

function checkAllSelections() {
  // Проверить выборы для всех карточек
  if (selectedDefinitions.card1 && selectedDefinitions.card2 && selectedDefinitions.card3 && selectedDefinitions.card4) {
    checkSelections(); 
  }
}


// Обходим каждую карточку и добавляем обработчик события клика
cards.forEach(card => {
  card.addEventListener('click', () => {
    // Воспроизводим звук при клике
    playClickSound();
  });
});

// Функция для воспроизведения звука при клике
function playClickSound() {
  const clickSound = document.getElementById('click-sound');
  clickSound.play();
}

// Остальной ваш JavaScript код для этой страницы может быть добавлен здесь

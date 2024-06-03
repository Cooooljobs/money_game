document.addEventListener('DOMContentLoaded', () => {
  const termContainer = document.getElementById('term-container');
  const definitionContainer = document.getElementById('definition-container');

  const termsAndDefinitions = [
    { term: 'План денег на время для контроля и достижения целей', definition: 'Бюджет' },
    { term: 'Размещение денег для будущей прибыли, часто с риском', definition: 'Инвестиции' },
    { term: 'Потраченные деньги на товары, услуги и сбережения.', definition: 'Расходы' },
    { term: 'Деньги от разных источников, как зарплата, инвестиции', definition: 'Доходы' },
    { term: 'Суммы, которые нужно вернуть за полученные услуги или товары', definition: 'Долги' },
    { term: 'Деньги, отложенные на будущее', definition: 'Сбережения' },
    { term: 'Обязательные платежи в бюджет государства', definition: 'Налоги' },
    { term: 'Увеличение цен на товары и услуги со временем', definition: 'Инфляция' },
    { term: 'Возможность потери денег при инвестировании или других финансовых операциях', definition: 'Финансовый риск' }
  ];


  const numTermsToShow = 5; // Количество терминов для отображения (измените по необходимости)

  // Перемешивание терминов и определений
  shuffleArray(termsAndDefinitions);

  // Ограничение количества терминов
  const selectedTermsAndDefinitions = termsAndDefinitions.slice(0, numTermsToShow);

  selectedTermsAndDefinitions.forEach((item, index) => {
    const termCard = createCard(item.term, 'term');
    const definitionCard = createCard(item.definition, 'definition');
    termCard.setAttribute('data-term', item.term); // Добавляем data-атрибут для сопоставления
    definitionCard.setAttribute('data-term', item.term); // Добавляем data-атрибут для сопоставления

    termContainer.appendChild(termCard);
    definitionContainer.appendChild(definitionCard);
  });

  const termCards = document.querySelectorAll('.term');
  const definitionCards = document.querySelectorAll('.definition');

  termCards.forEach((termCard) => {
    termCard.addEventListener('dragstart', handleDragStart);
    termCard.addEventListener('dragend', handleDragEnd);
  });

  definitionCards.forEach((definitionCard) => {
    definitionCard.addEventListener('dragstart', handleDragStart);
    definitionCard.addEventListener('dragend', handleDragEnd);
    definitionCard.addEventListener('dragover', handleDragOver);
    definitionCard.addEventListener('dragenter', handleDragEnter);
    definitionCard.addEventListener('dragleave', handleDragLeave);
    definitionCard.addEventListener('drop', handleDrop);
  });

  function createCard(content, className) {
    const card = document.createElement('div');
    card.classList.add('card', className);
    card.setAttribute('draggable', true);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.textContent = content;

    card.appendChild(cardContent);

    return card;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function handleDragStart() {
    draggedItem = this;
    setTimeout(() => (this.style.display = 'none'), 0);
  }

  function handleDragEnd() {
    draggedItem.style.display = 'block';
    draggedItem = null;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragEnter(e) {
    e.preventDefault();
    if (this.classList.contains('definition')) {
      this.classList.add('drag-over');
    }
  }

  function handleDragLeave() {
    this.classList.remove('drag-over');
  }

  function handleDrop() {
    if (this.classList.contains('definition')) {
      this.classList.remove('drag-over');

      const term = draggedItem.getAttribute('data-term');
      const definition = this.getAttribute('data-term');

      if (term === definition) {
        draggedItem.classList.add('correct-match');
        this.classList.add('correct-match');
      } else {
        this.classList.add('shake');
        setTimeout(() => {
          this.classList.remove('shake');
        }, 500);
      }
    }
  }

  function shuffleAnswers() {
    const definitionCards = Array.from(document.querySelectorAll('.definition'));
    shuffleArray(definitionCards);
    definitionContainer.innerHTML = ''; // Очищаем контейнер определений
    definitionCards.forEach((definitionCard) => {
      definitionContainer.appendChild(definitionCard);
    });
  }
  
  shuffleAnswers();
  const shuffleAnswersButton = document.getElementById('shuffle-answers-button');

  shuffleAnswersButton.addEventListener('click', () => {
    shuffleAnswers();
  });
    

  function showCompletionMessage() {
    const completionMessage = document.createElement('div');
    completionMessage.classList.add('completion-message'); // Добавляем класс completion-message
  
    completionMessage.innerHTML = `
      <div class="completion-content"> 
        <h2>Поздравляем!</h2>
        <img src="../media/man/lvl1.png" alt="Level 0" id="level-image" width="200px">
        <div class="progress-text">
          Прогресс: <span id="progress-percentage">14,3%</span>
        </div>
        <p>Вы успешно завершили Раунд 1.<br>Вы можете перейти к следующему этапу.</p>
        <a href="round2.html" class="next-round-button">Перейти к следующему этапу</a>
      </div>
    `;
    document.body.appendChild(completionMessage);
  
    // Воспроизведение звука при завершении игры
    playWinSound();
  }
  
  function playWinSound() {
    var audio = new Audio('../sounds/win.mp3');
    audio.play();
  }
  

  // Создайте переменную для отслеживания количества правильных совпадений
let correctMatchesCount = 0;

// Создайте функцию для проверки успешного завершения задания
function checkCompletion() {
  // Получите все термины и определения
  const termCards = document.querySelectorAll('.term');
  const definitionCards = document.querySelectorAll('.definition');

  // Проверьте, сколько из них имеют правильные совпадения
  let matchedCount = 0;

  termCards.forEach((termCard) => {
    const term = termCard.getAttribute('data-term');
    const matchingDefinition = document.querySelector(`.definition[data-term="${term}"]`);

    if (termCard.classList.contains('correct-match') && matchingDefinition.classList.contains('correct-match')) {
      matchedCount++;
    }
  });

  // Если количество правильных совпадений равно общему количеству терминов, покажите всплывающее окно
  if (matchedCount === termCards.length) {
    showCompletionMessage(); // Показать всплывающее окно
  }
}

// Внутри обработчика drop, после проверки совпадения, вызовите функцию checkCompletion
function handleDrop() {
  if (this.classList.contains('definition')) {
    this.classList.remove('drag-over');

    const term = draggedItem.getAttribute('data-term');
    const definition = this.getAttribute('data-term');

    if (term === definition) {
      draggedItem.classList.add('correct-match');
      this.classList.add('correct-match');
      playTrueSound(); // Воспроизводим звук "true" при правильном ответе
    } else {
      this.classList.add('shake');
      setTimeout(() => {
        this.classList.remove('shake');
      }, 500);
      playFalseSound(); // Воспроизводим звук "false" при неправильном ответе
    }

    // После проверки совпадения, вызовите функцию checkCompletion
    checkCompletion();
  }
}

// Функция для воспроизведения звука "true"
function playTrueSound() {
  var audio = new Audio('../sounds/true.mp3');
  audio.play();
}

// Функция для воспроизведения звука "false"
function playFalseSound() {
  var audio = new Audio('../sounds/false.mp3');
  audio.play();
}


  if (correctMatchesCount === numTermsToShow) {
    showCompletionMessage(); // Показать всплывающее окно
  }
    
});

document.addEventListener('DOMContentLoaded', () => {

  const welcomePopup = document.getElementById('welcome-popup');
  const startButton = document.getElementById('start-button');

  welcomePopup.style.display = 'block'; 

  startButton.addEventListener('click', () => {
    welcomePopup.style.display = 'none'; 
  });
});

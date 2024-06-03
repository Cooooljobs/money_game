// Получите все элементы с классом "empty-box"
const emptyBoxes = document.querySelectorAll(".empty-box");

// Функция для перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


// Массив с пунктами
const items = [
  "Кардридер",
  "Денежное отделение",
  "Дисплей",
  "Принтер квитанций",
  "Клавиатура",
  "Камера",

];



// Создайте массив, который будет хранить выбранные элементы
const selectedItems = [];

// Создайте функцию для обработки клика на элементе "empty-box"
function showPopup(event) {
  // Получите ссылку на "empty-box"
  const emptyBox = event.target;

  // Создайте элемент div для всплывающего окна
  const popup = document.createElement("div");
  popup.className = "popup";

  // Создайте h4 для отображения выбранного пункта
  const h4 = document.createElement("h4");
  h4.textContent = "Выберите пункт:";
  popup.appendChild(h4);

  // Создайте список ul для отображения пунктов
  const ul = document.createElement("ul");

  // Создайте копию массива items, исключая выбранные элементы
  const availableItems = items.filter((item) => !selectedItems.includes(item));

  // Добавьте доступные пункты в список
  availableItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });

  // Добавьте список во всплывающее окно
  popup.appendChild(ul);

  // Разместите всплывающее окно рядом с "empty-box"
  const rect = emptyBox.getBoundingClientRect();
  const topOffset = rect.top + window.scrollY + rect.height / 2 - ul.clientHeight / 2;
  popup.style.left = rect.right + "px";
  popup.style.top = topOffset + "px"; // Центрирование по вертикали

  // Добавьте всплывающее окно в тело документа
  document.body.appendChild(popup);

  // Обработка клика за пределами всплывающего окна для закрытия
  document.addEventListener("click", (e) => {
    if (e.target !== emptyBox && !popup.contains(e.target)) {
      document.body.removeChild(popup);
    }
  });

  // Обработка выбора пункта из всплывающего окна
  ul.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const selectedText = e.target.textContent;
      emptyBox.textContent = selectedText;
      // Удалите выбранный пункт из массива availableItems
      const index = availableItems.indexOf(selectedText);
      if (index !== -1) {
        availableItems.splice(index, 1);
      }
      selectedItems.push(selectedText);
      document.body.removeChild(popup);
    }
  });
}

// Назначьте обработчик клика для каждого "empty-box"
emptyBoxes.forEach((box) => {
  box.addEventListener("click", showPopup);
});

function checkSelection() {
  const correctValues = [
    "Камера",
    "Принтер квитанций",
    "Денежное отделение",
    "Дисплей",
    "Кардридер",
    "Клавиатура"
  ];

  let isCorrect = true;

  for (let i = 0; i < emptyBoxes.length; i++) {
    if (emptyBoxes[i].textContent !== correctValues[i]) {
      isCorrect = false;
      break;
    }
  }

  const completionMessage = document.createElement('div');
  completionMessage.classList.add('completion-message');
  
  if (isCorrect) {
    completionMessage.innerHTML = `
      <div class="completion-content">
        <h2>Поздравляем!</h2>
        <img src="../media/man/lvl3.png" alt="Level 4" id="level-image" width="200px">
        <div class="progress-text">
          Прогресс: <span id="progress-percentage">57,2%</span>
        </div>
        <p>Вы успешно завершили Раунд 4.<br>Вы можете перейти к следующему этапу.</p>
        <a href="round4.html" class="next-round-button">Перейти к следующему этапу</a>
      </div>
    `;
  
    // Воспроизводим звук при успешном завершении раунда
    playWinSound();
  
    // Заменяем содержимое контейнера сообщениями об успешном завершении
    var container = document.querySelector('.container');
    container.innerHTML = '';
    container.appendChild(completionMessage);
  } else {
    completionMessage.innerHTML = `
      <div class="completion-content">
        <h2>Раунд не пройден!</h2>
        <p>В одном из ответов допущена ошибка. Пожалуйста, перейдите к следующему раунду.</p>
        <a href="round3.html" class="retry-round-button">Повторить раунд</a>
      </div>
    `;
  
    // Воспроизводим звук при ошибке в прохождении раунда
    playFailSound();
  
    // Заменяем содержимое контейнера сообщением об ошибке
    var container = document.querySelector('.container');
    container.innerHTML = '';
    container.appendChild(completionMessage);
  }
  
  function playWinSound() {
    var audio = new Audio('../sounds/win.mp3');
    audio.play();
  }
  
  function playFailSound() {
    var audio = new Audio('../sounds/fail.mp3');
    audio.play();
  }
  
}

function retryRound() {
  // Ваша логика для перезапуска раунда, если пользователь решит повторить его
}

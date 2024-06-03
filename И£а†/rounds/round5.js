document.addEventListener('DOMContentLoaded', () => {
  const rebusOptions = document.querySelectorAll('.rebus-option');
  let correctRebusCount = 0;

  rebusOptions.forEach(select => {
    select.addEventListener('change', checkRebusAnswer);
  });

  function checkRebusAnswer(event) {
    const selectedAnswer = event.target.value.toLowerCase();
    const correctAnswer = event.target.dataset.correct.toLowerCase(); // Получаем значение правильного ответа из атрибута data-correct
  
    const rebus = event.target.closest('.rebus');
    if (selectedAnswer === correctAnswer) {
      rebus.classList.add('correct');
      correctRebusCount++;
      // Воспроизводим звук true.mp3 при правильном ответе
      playSound('true.mp3');
    } else {
      rebus.classList.add('shake');
      setTimeout(() => {
        rebus.classList.remove('shake');
      }, 500);
      // Воспроизводим звук false.mp3 при неправильном ответе
      playSound('false.mp3');
    }
  
    if (correctRebusCount === 3) {
      showCompletionMessage();
    }
  }
  
  function playSound(soundName) {
    const audio = new Audio(`../sounds/${soundName}`);
    audio.play();
  }
  

  function showCompletionMessage() {
    const completionMessage = document.createElement('div');
    completionMessage.classList.add('completion-message');
  
    completionMessage.innerHTML = `
      <div class="completion-content">
        <h2>Поздравляем!</h2>
        <div class="celebration-container">
          <canvas id="fireworks-canvas" class="fireworks-canvas" width="640" height="480"></canvas>
          <img src="../media/man/lvl5.png" alt="Level 7" id="level-image" width="200px">
        </div>
        <div class="progress-text">
          Прогресс: <span id="progress-percentage">100%</span>
        </div>
        <p>Вы успешно прошли веб-игру "ФИНАНСИСТ".</p>
        <a href="../index.html" class="next-round-button">На начальный экран</a>
      </div>
    `;
    document.body.appendChild(completionMessage);
  
    // Воспроизводим звук "win"
    playWinSound();
  
    // Воспроизводим звук "firework"
    playFireworkSound();
  
    // Запускаем анимацию фейерверков
    const fireworksCanvas = document.getElementById('fireworks-canvas');
    const fireworksCtx = fireworksCanvas.getContext('2d');
  
    var firework = JS_FIREWORKS.Fireworks({
      id: 'fireworks-canvas',
      hue: 120,
      particleCount: 50,
      delay: 0,
      minDelay: 20,
      maxDelay: 40,
      boundaries: {
        top: 50,
        bottom: 240,
        left: 50,
        right: 590
      },
      fireworkSpeed: 2,
      fireworkAcceleration: 1.05,
      particleFriction: .95,
      particleGravity: 1.5
    });
    firework.start();
  }
  
  function playWinSound() {
    var audio = new Audio('../sounds/win.mp3');
    audio.play();
  }
  
  function playFireworkSound() {
    var audio = new Audio('../sounds/firework.mp3');
    audio.play();
  }
  
});

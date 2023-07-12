// Spelling.js

let storedQuestion = '';
let storedAnswer = '';
let score = 0;
let levelDisplayed = false;

function storeQuestion() {
  const questionInput = document.getElementById('questionInput');
  const answerInput = document.getElementById('answerInput');

  storedQuestion = questionInput.value.trim();
  storedAnswer = answerInput.value.trim();

  if (storedQuestion !== '' && storedAnswer !== '') {
    document.getElementById('questionSection').style.display = 'none';
    document.getElementById('messageSection').style.display = 'block';

    document.getElementById('questionDisplay').textContent = storedQuestion;
    clearInputValues([questionInput, answerInput]);
  } else {
    alert('Please enter both a question and an answer.');
  }
}

function giveAnswer() {
  const userAnswerInput = document.getElementById('userAnswerInput');
  const userAnswer = userAnswerInput.value.trim();

  if (userAnswer === storedAnswer || userAnswer === 'Plus5') {
    if (userAnswer === 'Plus5') {
      score += 5;
    } else {
      score++;
    }

    if (score === 5) {
      showLevel('Student');
      showAlert('You Leveled Up!', 'level-up');
    } else if (score === 10) {
      showLevel('Advanced Student');
      showAlert('You Leveled Up!', 'level-up');
    } else {
      showAlert('You got it right!', 'success');
    }
  } else {
    score = 0;
    hideLevel();
    showAlert('You got it wrong. Try again!', 'error');
  }

  updateScore();
  clearInputValues([userAnswerInput]);
}

function restart() {
  document.getElementById('messageSection').style.display = 'none';
  document.getElementById('questionSection').style.display = 'block';

  clearInputValues([
    document.getElementById('questionInput'),
    document.getElementById('answerInput'),
    document.getElementById('userAnswerInput')
  ]);

  storedQuestion = '';
  storedAnswer = '';

  updateScore();
}

function updateScore() {
  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
}

function showAlert(message, type) {
  const alert = document.createElement('div');
  alert.textContent = message;
  alert.className = `alert alert-${type}`;
  document.getElementById('messageSection').appendChild(alert);
  setTimeout(() => {
    document.getElementById('messageSection').removeChild(alert);
    restart();
  }, 2000);
}

function clearInputValues(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}

function showLevel(level) {
  const levelDisplay = document.getElementById('levelDisplay');
  levelDisplay.textContent = `Level: ${level}`;

  if (level === 'Student') {
    levelDisplay.classList.add('level-student');
    levelDisplay.classList.remove('level-advanced-student');
  } else if (level === 'Advanced Student') {
    levelDisplay.classList.remove('level-student');
    levelDisplay.classList.add('level-advanced-student');
  }

  levelDisplay.style.display = 'block';
  levelDisplayed = true;
}

function hideLevel() {
  const levelDisplay = document.getElementById('levelDisplay');
  levelDisplay.style.display = 'none';
  levelDisplayed = false;
}

// Store the question-answer pairs
var questionPairs = [];

// Track the current question index
var currentQuestionIndex = 0;

// Store the user's score
var score = 0;

// Store the total number of questions answered
var totalQuestionsAnswered = 0;

// Variable to track the current state
var currentState = 'storeQuestions';

// Function to store the questions and answers
function storeQuestions() {
  var questionInputs = document.getElementsByClassName('question-input');
  var answerInputs = document.getElementsByClassName('answer-input');

  questionPairs = [];

  for (var i = 0; i < questionInputs.length; i++) {
    var question = questionInputs[i].value.trim();
    var answer = answerInputs[i].value.trim();

    if (question !== '' && answer !== '') {
      questionPairs.push({ question: question, answer: answer });
    }
  }

  if (questionPairs.length > 0) {
    document.getElementById('questionSection').style.display = 'none';
    document.getElementById('messageSection').style.display = 'block';
    showRandomQuestion();
    currentState = 'giveAnswer';
  }
}

// Function to show random question
function showRandomQuestion() {
  if (questionPairs.length === 0) return;

  currentQuestionIndex = Math.floor(Math.random() * questionPairs.length);
  var currentQuestion = questionPairs[currentQuestionIndex].question;

  document.getElementById('questionDisplay').textContent = currentQuestion;
}

// Function to check user's answer
function giveAnswer() {
  var userAnswer = document.getElementById('userAnswerInput').value.trim();
  var currentAnswer = questionPairs[currentQuestionIndex].answer;

  if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
    score++;
    document.getElementById('scoreDisplay').textContent = 'You got it right!';
    addRowToQuestionTable(currentQuestionIndex, 'Correct');
  } else {
    document.getElementById('scoreDisplay').textContent = 'You got it wrong. Try again!';
    addRowToQuestionTable(currentQuestionIndex, 'Incorrect');
  }

  totalQuestionsAnswered++;
  document.getElementById('scorePercentage').textContent =
    'Score: ' + ((score / totalQuestionsAnswered) * 100).toFixed(2) + '%';

  updateLevel();

  // Remove the answered question from the array
  questionPairs.splice(currentQuestionIndex, 1);

  if (questionPairs.length === 0) {
    document.getElementById('messageSection').style.display = 'none';
    document.getElementById('scoreSection').style.display = 'block';
    document.getElementById('finalScoreDisplay').textContent = 'Final Score: ' + score;
    document.getElementById('restartButton').style.display = 'block';
    currentState = 'storeQuestions';
  } else {
    showRandomQuestion();
  }

  document.getElementById('userAnswerInput').value = '';
}

// Function to add a row to the question table
function addRowToQuestionTable(questionIndex, result) {
  var question = questionPairs[questionIndex].question;
  var answer = questionPairs[questionIndex].answer;

  var table = document.getElementById('questionTable');
  var row = table.insertRow(-1);

  var questionCell = row.insertCell(0);
  questionCell.textContent = question;

  var answerCell = row.insertCell(1);
  answerCell.textContent = answer;

  var resultCell = row.insertCell(2);
  resultCell.textContent = result;
}

// Function to update the level display based on the score percentage
function updateLevel() {
  var scorePercentage = (score / totalQuestionsAnswered) * 100;

  if (scorePercentage < 65) {
    document.getElementById('levelDisplay').textContent = 'Level: Novice';
  } else if (scorePercentage >= 65 && scorePercentage <= 75) {
    document.getElementById('levelDisplay').textContent = 'Level: Advanced Beginner';
  } else if (scorePercentage > 75 && scorePercentage <= 85) {
    document.getElementById('levelDisplay').textContent = 'Level: Competent';
  } else if (scorePercentage > 85 && scorePercentage <= 95) {
    document.getElementById('levelDisplay').textContent = 'Level: Proficient';
  } else {
    document.getElementById('levelDisplay').textContent = 'Level: Expert';
  }
}

// Function to restart the quiz
function restartQuiz() {
  document.getElementById('scoreSection').style.display = 'none';
  document.getElementById('questionSection').style.display = 'block';
  document.getElementById('restartButton').style.display = 'none';
  document.getElementById('levelDisplay').textContent = 'Level:';

  // Reset variables
  currentQuestionIndex = 0;
  totalQuestionsAnswered = 0;

  // Reset input fields
  var questionInputs = document.getElementsByClassName('question-input');
  var answerInputs = document.getElementsByClassName('answer-input');

  for (var i = 0; i < questionInputs.length; i++) {
    questionInputs[i].value = '';
    answerInputs[i].value = '';
  }

  // Reset question table
  var table = document.getElementById('questionTable');
  while (table.rows.length > 1) {
    table.deleteRow(-1);
  }

  currentState = 'storeQuestions';
}

// Event listener for Enter key press
document.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (currentState === 'storeQuestions') {
      storeQuestions();
    } else if (currentState === 'giveAnswer') {
      giveAnswer();
    }
  }
});

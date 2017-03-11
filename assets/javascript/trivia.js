/*display start page:
	introduction, and start button

trivia game
from an array of questionObjects {question: question, correctAnswer: correct answer, wrongAnswers:  [wrong answer, wrong answer, wrong answer]}
pick 10 questions to add to an array of activeQuestions


display question and possible answers
start countdown
collect user guess
stop countdown
check user guess // isCorrectAnswer();
if it is a correct answer then
	say right answer
	add to correct answers
else 
	say wrong answer
	add to wrong answers
display correct answer
if isLastQuestion()
	display summary 
else 
	run this question function again */


var triviaGame = {
	questionAndAnswerBank: [{q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}, {q: 'What is my name', ca: 'August', aa: ['Tony', 'Joe', 'Alligator']}],
	thisRound: [],
	question: undefined,
	correctAnswer: undefined,
	lastRoundLastQuestion: 0;

	// Get a certain number of questions returned as an array
	getThisRoundOfQuestions: function(numberOfQuestions) {
		if (questionAndAnswerBank.length < numberOfQuestions) {
			console.log("Error: You don't have enough objects in your questionAndAnswerBank. Some questions will repeat.");
		};
		for (var i = lastRoundLastQuestion; i < numberOfQuestions; i++) {
				var j = i % questionAndAnswerBank.length;
		};
		return questions;
	},

	// Start a round of trivia - is this necessary?
	startRound: function(numberOfQuestions) {
		triviaGame.thisRound = getThisRoundOfQuestions(numberOfQuestions);
	},
	getThisQuestion: function(qIndex){
		return triviaGame.thisRound[qIndex].q;
	},
	// Retrun the correct answer from the question answer object
	getCorrectAnswer: function(qIndex) {
		return triviaGame.thisRound[qIndex].ca
	},
	// Add the correct answer to the array of answers to display
	addToAllAnswers: function(qIndex, correctAnswer) {
		aIndex = Math.floor(Math.random() * 4);
		triviaGame.thisRound[qIndex].aa.splice(aIndex, 0, correctAnswer)
	},
	// Initialize the question to display
	initializeQuestion: function(qIndex) {
		triviaGame.question = getThisQuestion(qIndex);
		triviaGame.correctAnswer = getCorrectAnswer(qIndex);
		addToAllAnswers(qIndex, triviaGame.correctAnswer);
		// triviaDisplay.question();
		// triviaDisplay.answers();
	}, 
	// If the question is correct, return yes
	isCorrectAnswerString: function(userChoice) {
		if (userChoise === triviaGame.correctAnswer) {
			return 'Yup!';
		} else {
			return 'Nope.';
		};
	},
};



var triviaDisplay = {
	// The display div defaults to #display
	displayDiv: $('#display'),
	// Optional: Use setNewDisplayDiv before running the game to display trivia game in a div with a different selector
	setNewDisplayDiv: function(target) {
		triviaDisplay.displayDiv = $(target);
	},
	// Empties the display div and returns the display div
	getResetDisplay: function(){
		triviaDisplay.displayDiv.empty();
		return triviaDisplay.displayDiv;
	},
	// Appends question and answer divs to the display
	initializeQADivs: function() {
		var target = triviaDisplay.getResetDisplay();
		target.append('<div id="question"></div>');
		for (var i = 0; i < 4; i++){
			target.append('<div class="answerDiv" id="answer' + i + '"></div>');
		};
	},
	// Appends the current question, in an h3 tag, to the question div
	showQuestion: function(question) {
				$('#question').append('<h3>' + question + '</h3>');
	},
	// Appends each answer, in a p tag, to an answer div with a unique id
	showAnswers: function(answers) {
		for (var i = 0; i < 4; i++) {
			$('#answer' + i).append('<p>' + answers[i] + '</p>');
		};
	},
	// Appends divs for formatting feedback (right or wrong, correct answer, progress so far)
	initializeFeedbackDivs: function() {
		var target = triviaDisplay.getResetDisplay();
		target.append('<div id="feedback"></div>');
		target.append('<div id="#answer"></div>');
		target.append('<div id="progress"');
	},
	// Appends content to feedback divs
	showFeedback: function(isCorrectString, correctAnswer, progress) {
		$('#feedback').append('<h3>' + isCorrectString + '</h3>');
		$('#answer').append('<p>' + correctAnswer + '</p>');
		$('#progress').append('<p>' + progress + '</p>');
	},
	// Appends divs for fomatting results
	initializeResultsDivs: function() {
		var target = triviaDisplay.getResetDisplay();
		target.append('<div id="results"></div>');
		target.append('<div id="retry"></div>');
	}, 
	showResults: function() {
		$('#results').append()
	}
};
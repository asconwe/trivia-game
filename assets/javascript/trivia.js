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
	questionAndAnswerBank: [{q: 'The chipmunk\'s genus, Tamias, is greek for:', ca: 'Steward', aa: [], wa: ['Jester', 'Child of the Tree', 'Lord of War']}, {q: 'Chipmunks are:', ca: 'Omniverous', aa: [], wa: ['Carniverous', 'Herbiverous', 'Soul eaters of the nether realm']}, {q: 'Baby chipmunks emerge from the burrow they were born in after:', ca: '6 weeks', aa: [], wa: ['1,000 years', '20 weeks', '1 week']}, {q: 'Eastern chipmunks hibernate:', ca: 'In the winter', aa: [], wa: ['In the summer', 'On weekends', 'On the moon']}, {q: 'One chipmunk subgenus is named:', ca: 'Allen\'s chipmunk', aa: [], wa: ['Doug\'s chipmunk', 'Mr. Chipmunk', 'Alfred\'s chipmunk']}, {q: 'Chipmunks are an important vector for the dispersal of:', ca: 'sporocarps', aa: [], wa: ['corosparks', 'sorcoparps', 'roroskarks']}, {q: 'Chipmunks are:', ca: 'Mammals', aa: [], wa: ['Reptiles', 'Your worst nightmare', 'Androids']}, {q: 'Chipmunks carry food in their:', ca: 'Cheek pouches', aa: [], wa: ['Backpack', 'Briefcase', 'Purse']}, {q: 'The English word, "chipmunk", first appeared in:', ca: 'The early 19th century', aa: [], wa: ['2007', 'The early 16th century', 'The late 15th century']}, {q: 'Before chipmunk became a common word, they were also frequently called', ca: 'Striped Squirrels', aa: [], wa: ['Jerks', 'Tree Foxes', 'Leaf Sharks']}, {q: 'The chipmunk kingdom is:', ca: 'Animalia', aa: [], wa: ['Plantae', 'Fungi', 'Protista']}, {q: 'Neotamias is:', ca: 'An alternate classification for western chipmunks', aa: [], wa: ['The main character of \'The Chipmunk Matrix\'', 'A commander in the chipmunk empire army (BCE 1200)', 'An economic theory inspired by chipmunk food storage']}],
	thisRound: [],
	question: undefined,
	correctAnswer: undefined,
	nextRoundQuestionsStart: 0,
	rightAnswers: 0,
	numberOfQuestions: 6,

	// Get a certain number of questions returned as an array, set next round to start at next index
	getThisRoundOfQuestions: function(numberOfQuestions) {
		if (triviaGame.questionAndAnswerBank.length < numberOfQuestions) {
			console.log("Error: You don't have enough objects in your questionAndAnswerBank. Some questions will repeat.");
		};
		var questions = [];
		for (var i = triviaGame.nextRoundQuestionsStart; i < numberOfQuestions + triviaGame.nextRoundQuestionsStart; i++) {
				var j = i % triviaGame.questionAndAnswerBank.length;
				questions.push(triviaGame.questionAndAnswerBank[j]);
		};
		triviaGame.nextRoundQuestionsStart += questions.length;
		console.log(triviaGame.nextRoundQuestionsStart);
		return questions;
	},
	// If the round of questions is over, return true
	isRoundOver: function() {
		return (triviaGame.nextIndex >= triviaGame.thisRound.length);
	},
	// Return the active trivia question
	getThisQuestion: function(qIndex){
		return triviaGame.thisRound[qIndex].q;
	},
	// Retrun the correct answer from the question answer object
	getCorrectAnswer: function(qIndex) {
		return triviaGame.thisRound[qIndex].ca
	},
	// Add the correct answer to the array of answers to display
	getAllAnswers: function(qIndex, correctAnswer) {
		var aIndex = Math.floor(Math.random() * 4);
		$.extend(triviaGame.thisRound[qIndex].aa, triviaGame.thisRound[qIndex].wa); // Need to use $.extend() so that when the aa object is edited, it doesn't affect the wa object
		triviaGame.thisRound[qIndex].aa.splice(aIndex, 0, correctAnswer);
		return triviaGame.thisRound[qIndex].aa;
	},
	// Initialize the question to display
	initializeQuestion: function(qIndex) {
		triviaGame.question = triviaGame.getThisQuestion(qIndex);
		triviaGame.correctAnswer = triviaGame.getCorrectAnswer(qIndex);
		triviaGame.allAnswers = triviaGame.getAllAnswers(qIndex, triviaGame.correctAnswer);
		triviaDisplay.initializeQADivs();
		triviaDisplay.showQuestion(triviaGame.question);
		triviaDisplay.showAnswers(triviaGame.allAnswers);
	}, 
	// If the question is correct, increment rightAnswers and return Yup!, else Nope.
	isCorrectAnswerString: function(userChoice) {
		if (userChoice === triviaGame.correctAnswer) {
			triviaGame.rightAnswers++;
			return 'Yup!';
		} else {
			return 'Nope.';
		};
	},
	// Start question at qIndex and return next qIndex;
	thisQuestionNextIndex: function(qIndex) {
		triviaGame.initializeQuestion(qIndex);
		return qIndex + 1;
	},
	// Start a round of trivia
	startRound: function(numberOfQuestions) {
		triviaGame.rightAnswers = 0;
		triviaGame.thisRound = triviaGame.getThisRoundOfQuestions(numberOfQuestions);
		triviaGame.nextIndex = triviaGame.thisQuestionNextIndex(0);
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
	getResetDisplay: function() {
		triviaDisplay.displayDiv.empty();
		return triviaDisplay.displayDiv;
	},
	// timeoutFeedback: function() {
	// 	setTimeout(function(){
	// 		if (triviaGame.isRoundOver()) {
	// 			triviaDisplay.showResults(triviaGame.rightAnswers, triviaGame.thisRound.length);
	// 		} else {
	// 			triviaGame.nextIndex = triviaGame.thisQuestionNextIndex(triviaGame.nextIndex);
	// 		};
	// 	}, 200);
	// },
	// Add click handler to newly created answer divs
	setAnswerClickHandler: function() {
		$('.answerDiv').click(function() {
			clearInterval(triviaGame.countdownInterval)
			var isCorrectString = triviaGame.isCorrectAnswerString($(this).text());
			triviaDisplay.showFeedback(isCorrectString, triviaGame.question, triviaGame.correctAnswer, triviaGame.rightAnswers, triviaGame.nextIndex);
		});
	},
	// Appends question and answer divs to the display
	initializeQADivs: function() {
		var target = triviaDisplay.getResetDisplay();
		target.append('<div id="question"></div>');
		target.append('<div id="timeoutBar"></div>')
		for (var i = 0; i < 4; i++){
			target.append('<div class="answerDiv" id="answer' + i + '"></div>');
		};
		triviaDisplay.setAnswerClickHandler();
	},
	// Appends the current question, in an h3 tag, to the question div
	showQuestion: function(question) {
		$('#question').append('<h3>' + question + '</h3>');
		triviaDisplay.countdown();
	},
	// Appends each answer, in a p tag, to an answer div with a unique id
	showAnswers: function(answers) {
		for (var i = 0; i < 4; i++) {
			$('#answer' + i).append('<p>' + answers[i] + '</p>');
		};
	},
	// Set timer and display/update countdown bar
	countdown: function() {
		var width = 0;
		$('#timeoutBar').css('width', width + '%');
		triviaGame.countdownInterval = setInterval(function(){
			width += 10;
			if (width >= 110) {
				triviaDisplay.showFeedback('No answer is still a wrong answer, slacker.', triviaGame.question, triviaGame.correctAnswer, triviaGame.rightAnswers, triviaGame.nextIndex);
				clearInterval(triviaGame.countdownInterval);
			};
			$('#timeoutBar').css('width', width + '%');
		}, 1000);
	},
	// Appends divs for formatting feedback (right or wrong, correct answer, progress so far)
	initializeFeedbackDivs: function() {
		var target = triviaDisplay.getResetDisplay();
		target.append('<div id="feedback"></div>');
		target.append('<div id="questionFeedback"></div>');
		target.append('<div id="answer"></div>');
		target.append('<div id="progress"></div>');
		target.append('<div id="next"><h3>Next</h3></div>');
	},
	// Add a click handler to the newly created Next button
	setNextClickHandler: function() {
		$('#next').click(function(){
			if (triviaGame.isRoundOver()) {
				triviaDisplay.showResults(triviaGame.rightAnswers, triviaGame.thisRound.length);
			} else {
				triviaGame.nextIndex = triviaGame.thisQuestionNextIndex(triviaGame.nextIndex);
			};
		});
	},
	// Appends content to feedback divs
	showFeedback: function(isCorrectString, question, correctAnswer, rightAnswers, progress) {
		triviaDisplay.initializeFeedbackDivs();
		$('#feedback').append('<h1>' + isCorrectString + '</h1>');
		$('#questionFeedback').append('<h3>' + question + '</h3>');
		$('#answer').append('<p>' + correctAnswer + '</p>');
		$('#progress').append('<p>' + rightAnswers + ' / ' + progress + ' so far.</p>');
		triviaDisplay.setNextClickHandler();
	},
	// Appends divs for fomatting results
	initializeResultsDivs: function() {
		var target = triviaDisplay.getResetDisplay();
		target.append('<div id="results"></div>');
		target.append('<div id="retry"></div>');
	}, 
	// Add click handler to newly created Try Again button
	setTryAgainClickHandler: function() {
		$('#startRound').click(function(){
			triviaGame.startRound(triviaGame.numberOfQuestions)
		})
	},
	// Show the results of the quiz
	showResults: function(rightAnswers, progress) {
		triviaDisplay.initializeResultsDivs();
		$('#results').append('<h1>How\'d you do?</h1>')
		$('#results').append('<h2>' + rightAnswers + ' / ' + progress + '</h2>');
		$('#results').append('<div id="startRound"><h3>Try again?</h3></div>');
		triviaDisplay.setTryAgainClickHandler();
	}
};

// TODO reset rightAnswer on round reset, make sure correct answers don't double up in the answers arrays
$(document).ready(function() {
	$('#startRound').click(function(){
		triviaGame.startRound(triviaGame.numberOfQuestions)
	})
});

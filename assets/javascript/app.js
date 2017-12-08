$(document).ready(function(){ 
	var quizContainer = $("#quiz");
	var resultsContainer = $("#results");
	var submitButton = $("#submitquiz");

	var questions = [
	  {
	    question: " What is the name of Harry Potter's owl? ",
	    answers: {
	      a: "Hedwig",
	      b: "Errol",
	      c: "Crookshanks",
	      d: "Dobby",
	    },
	    correctAnswer: "a"
	  },
	  {
	    question: "What is the street address of the Dursley home?",
	    answers: {
	      a: "12 Grimmauld Place",
	      b: "4 Privet Drive",
	      c: "3 Little Hangleton",
	      d: "5 Godric's Hollow"
	    },
	    correctAnswer: "b"
	  },
	  {
	    question: "Which of the Hogwarts founders created the Chamber of Secrets?",
	    answers: {
	      a: "Neville Longbottom",
	      b: "Rowena Ravenclaw",
	      c: "Salazar Slytherin",
	      d: "Zacharias Smith"
	    },
	    correctAnswer: "c",
	  },
	  {
	  	question: "What Animagus form is taken by Sirius Black?",
	  	answers: {
		  	a: "Werewolf",
		  	b: "Stag",
		  	c: "Hippogriff", 
		  	d: "Dog"
	  	},
	  	correctAnswer: "d",
	  },
	  {
	  	question: "Which of these spells is used to unlock doors?",
	  	answers: {
	  		a: "Alohomora",
	  		b: "Accio",
	  		c: "Dissendium", 
	  		d: "Episkey"	
	  	},
	  	correctAnswer: "a",
	  },
	  {
	  	question: "Which of these objects is not a component of the Deathly Hallows?",
	  	answers: {
	  		a: "Elder Wand",
	  		b: "Cloak of Invisibility",
	  		c: "Sorcerer's Stone",
	  		d: "Resurrection Stone"
	  	},
	  	correctAnswer: "c",
	  },
	  {
	  	question: "What is the form of Hermione's patronus?",
	  	answers: {
	  		a: "Rabbit",
	  		b: "Otter",
	  		c: "Stag",
	  		d: "Doe",
	  	},
	  	correctAnswer: "b",
	  },
	  {
	  	question: "What color were the flames that came out of the Goblet of Fire?",
	  	answers: {
	  		a: "Purple",
	  		b: "Yellow",
	  		c: "Green",
	  		d: "Blue",
	  	},
	  	correctAnswer: "d",
	  },
	];

	var clock;
	var timeUp;
	$("#popup").hide();

	function buildQuiz() {
		var quizHTML = [];

		questions.forEach( function(question,questionNumber) {
			var answers = [];
			for (letter in question.answers) {
				answers.push(
		          	` <label><input type="radio" name="question${questionNumber}" value="${letter}">
				      ${letter} :
				      ${question.answers[letter]}</label>`
		        );
			}
			quizHTML.push(
				`<div class="question">
					<p class="bold">${question.question}</p>
					<div class="answers">
						${answers.join(" ")}
					</div>
				</div>`
		    );
		});


		timeInSeconds = 60;

		timeUp = setTimeout(function() {
			$(".timer").html("Time Is Up!");
	          showResults()
	    }, timeInSeconds*1000);

		$(".timer").html(
			`<p>Time left:
				<span></span>
			</p>`
		)
		$(".timer p span").html(clockify(timeInSeconds));

		function clockify(timeInSeconds) {
			var time = new Date(null);
		    time.setSeconds(timeInSeconds);
		   	time = time.toISOString().substr(14, 5);
		   	return time;
		}

		clock = setInterval(function() {
			timeInSeconds--;
			$(".timer p span").html(clockify(timeInSeconds));
		}, 1000);

		$(quizContainer).html(quizHTML.join(" "));
		$("#start").hide();
		$("#submitquiz").show();
		$(".timer").show();
		$(".container").css("padding-top","50px");
	};
	
		
	function showResults() {
		var answerContainers = $(".answers");
		var answers = [0,0,0];

		questions.forEach( function(question,questionNumber) {
			var answerContainer = answerContainers[questionNumber];
			var userChecked = "input[type='radio']:checked";

			//if there is an answer use that, otherwise define empty object
			var userAnswer = ($(answerContainer).find(userChecked) || {}).val();
		
			answers = check_if_correct(question,userAnswer,answers);
			var userAnswerDisplay = $(answerContainer).find(userChecked);
			$(userAnswerDisplay).parent().css("color","red");

			var correctAnswer = $(answerContainer).find("input[value='"+question.correctAnswer+"']");
			$(correctAnswer).parent().css("color","green");
		});
		$("#results").prepend(
			`<p>Correct: ${answers[1]}</p>
			<p>Inorrect: ${answers[2]}</p>
			<p>Skipped: ${answers[0]}</p>

		`);
		$("#results").show();
		$("input[type=radio]").attr('disabled', true);
		$("#popup").css("display","flex");
		clearInterval(clock);
		clearTimeout(timeUp);
	}

	function check_if_correct(question,userAnswer,answers) {
		if (userAnswer === undefined) {
			answers[0]++;
			return answers;
		}

		if (userAnswer===question.correctAnswer) { 
			answers[1]++;
			return answers;
		} else { 
			answers[2]++;
			return answers;
		};
	}
	
	function reset() {
		buildQuiz();
		$("#popup").hide();
		$("#results").empty();
	}


	// buildQuiz();
	$("#start").on("click",buildQuiz);

	$("#submitquiz").on("click",showResults);

	$("#reset").on("click",reset);

});
(function($) {

	$(document).ready(function() {
		$("#content").hide();
			//$("#mid").css({"margin-left":$(window).width()/3+100+"px"});
			$("#kids").click(function(){
			$("#loading").delay(300).fadeOut("medium");
			$("#content").delay(800).fadeIn("medium");	
		})
		$("#adults").click(function(){
			swal({
				title:"Sorry", 
				text: "<span style='font-size:30px;'>This section is still under construction!</span>", 
				type: "error",
				confirmButtonColor: "#000",
				html: true
			});	
		})

		var position = 0;
		var title = "Humpty Dumpty";
		// Remove apostrophes?
		//var story = ["In a field one summer\'s day,", "a Grasshopper was hopping about, chirping and singing to its heart\'s content.", "An Ant passed by,", "bearing along with great toil an ear of corn he was taking to the nest.", "\'Why not come and chat with me,\' said the Grasshopper,", "\'instead of toiling and moiling in that way?\'", "\'I am helping to lay up food for the winter,\'","said the Ant, \'and recommend you to do the same.\'", "\'Why bother about winter?\' said the Grasshopper;","We have got plenty of food at present.\'", "But the Ant went on its way and continued its toil.", "When the winter came, the Grasshopper had no food", "and found itself dying of hunger.","Meanwhile, it saw the ants distributing everyday", "corn and grain they had collected in the summer.", "Then the Grasshopper knew:", "It is best to prepare for days of need."];
		var story = ["Humpty Dumpty sat on a wall", "Humpty Dumpty had a great fall;", "All the king\'s horses and all the king\'s men", "Couldn\'t put Humpty together again."];
		//var story = ["Hello people of Earth","This Is a TEST","Good dogs"]
		var word = story[position];
		$("#title").append("<h1><i>"+title+"</i></h1>");
		$("#marks").append("<h1>"+(position+1)+" / "+story.length+"</i></h1>");
		$("#curWord").append("<p>"+word+"</p>");
		$("textarea").focus();

		try {
			var recognition = new webkitSpeechRecognition();
		} catch(e) {
			var recognition = Object;
		}

		recognition.continuous = true;
		recognition.interimResults = true;

		var interimResult = '';
		var textArea = $('#speech-page-content');
		var textAreaID = 'speech-page-content';

		$("#on").click(function(){
			$("#waiting").empty();
			$("#waiting").append("Listening<span class='one'>.</span><span class='two'>.</span><span class='three'>.</span></div>");
			recognition.start();
		})
		$("#off").click(function(){
			recognition.stop();
			$("#waiting").empty();
			$("#waiting").append("Waiting<span class='one'>.</span><span class='two'>.</span><span class='three'>.</span></div>");
			
			alert("Data Recieved.")

			if ($("textarea").val().toLowerCase().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") == story[position].toLowerCase().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")){
				$("textarea").val("");
				// If they are done the entire story
				if (position+1 == story.length){
					swal({
						title: "Great Job!",
						text: "<span style='font-size:30px;'>You read the entire story!</span>",
						type: "success",
						html: true,
						confirmButtonText: "Ok!",
					}, function(isConfirm){
						if (isConfirm){
							document.location.reload();
						} else {
							document.location.reload();
						}
					})
				// Just one question correct
				} else {
					$("textarea").val("");
					swal({
						title:"Nice!", 
						text: "<span style='font-size:30px;'>You passed that sentence!</span>", 
						type: "success",
						confirmButtonColor: "#000",
						confirmButtonText: "Keep Going!",
						html: true			
					})
					position += 1;
					$("#curWord").empty();
					$("#curWord").append("<p>"+story[position]+"</p>");
				}
			} else {
				$("textarea").val("");
				swal({
					title: "Sorry",
					text: "<span style='font-size:30px'>Looks like you messed up!</span>",
					type: "error",
					html: true,
					confirmButtonText: "Try Again?",
				})
			}
			$("#marks").empty();
			$("#marks").append("<h1>"+(position+1)+" / "+story.length+"</i></h1>");
		})

/*
		var startRecognition = function() {
			$('.speech-content-mic').removeClass('speech-mic').addClass('speech-mic-works');
				recognition.start();
		};

		$('.speech-mic').click(function(){
			startRecognition();
		});

		$('.speech-mic-works').click(function(){
			recognition.stop();
			alert("yejhsdj")
		});
*/
		recognition.onresult = function (event) {
			var pos = textArea.getCursorPosition() - interimResult.length;
			textArea.val(textArea.val().replace(interimResult, ''));
			interimResult = '';
			textArea.setCursorPosition(pos);
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					insertAtCaret(textAreaID, event.results[i][0].transcript);
				} else {
					isFinished = false;
					insertAtCaret(textAreaID, event.results[i][0].transcript + '\u200B');
					interimResult += event.results[i][0].transcript + '\u200B';
				}
			}
		};

		recognition.onend = function() {
			$('.speech-content-mic').removeClass('speech-mic-works').addClass('speech-mic');
		};
	});
})(jQuery);
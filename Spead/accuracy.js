/*
This was an algorithm we wrote to check the percentage
of accuracy when comparing the user's sentence to the 
correct sentence. There were some bugs so we didn't use it...
*/

function checkword(word1,word2){
	//var word1 = JSON.parse("["+word1.toLowerCase()+"]");
	//var word2 = JSON.parse("["+word2.toLowerCase()+"]");
	var word1 = word1.toLowerCase();
	var word2 = word2.toLowerCase();
	var counter = 0;
	for (var i=0; i<word1.length; i++){
		if (word2.length == 0){
			break;
		}
		if (word2.indexOf(word1[i])>-1){
			counter += 1;
			var index = word2.indexOf(word1[i]);
			if (index > -1){
				word2.splice(index, 1)
			}
		}
	}
	return counter/word1.length;
}

var punct = JSON.parse("["+'\";:!?$#&*()><,.\~'+"]");

function check(speech, sentance){
	speech = JSON.parse("["+speech+"]");
	sentance = JSON.parse("["+sentance+"]");
	for (var i=0; i<speech.length; i++){
		for (var k=0; k<punct.length; k++){
			speech[i] = speech[i].replace(punct[k],"");
		}
	}
	for (var i=0; i<sentance.length; i++){
		for (var k=0; k<sentance.length; k++){
			sentance[i] = sentance[i].replace(punct[k],"");
		}
	}
	var total = speech.length;
	var counter = 0;
	for (var i=0; i<speech.length; i++){
		for (var k=0; k<sentance.length; k++){
			if (checkword(speech[i],sentance[k])>=.8){
				counter += 1;
				break
			}
		}
	}
	if (counter/total>.8){
		return true;
	} else {
		return false;
	}
}
//check("a shepherd boy who just watched a flock of sheep near a village crossing the villagers be or four times by crying out Swope both ends when his neighbors came to help him laughed at them for their fish tanks","A shepherdboy, who watched a flock of sheep near a village, brought out the villagers three or four times by crying out,Wolf! Wolf! and when his neighbours came to help him, laughed at them for their pains!!,")
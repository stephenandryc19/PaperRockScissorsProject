//document.getElementById("name") is how to access a div within the HTML file

var player_name = localStorage.getItem("player_name");//locally stored player name
var player_results = [0,0,0];//counts number of times the player has clicked paper, rock, and scissors (respectively)
var computer_results = [0,0,0];//counts number of times b(r)owser has chosen paper, rock, and scissors (respectively)
var gamesWon = [0,0];//first element is number of games you have won, second element is number of games b(r)owser has won

makeToggable(document.getElementById("show_rules_button"), document.getElementById("rules"));//connects button to show rules to rules div
makeToggable(document.getElementById("show_stats_button"), document.getElementById("stats"));//connects button to show stats to stats div
document.getElementById("close_feedback_button").addEventListener("click", function() {
	showOrNot(document.getElementById("feedback"),false);
	showOrNot(document.getElementById("name_entered_feedback_text"),false);
	showOrNot(document.getElementById("nothing_entered_feedback_text"),false);
	showOrNot(document.getElementById("weapon_not_entered_feedback_text"),false);
});

document.getElementById("enter_name_button").addEventListener("click", function(){
	var p_name=document.getElementById("enter_name_input").value;//fetches typed in name
	console.log("old player name"+localStorage.getItem("player_name"));
	localStorage.setItem("player_name",p_name);//sets player_name variable to p_name input
	console.log("new player name"+localStorage.getItem("player_name"));
	showOrNot(document.getElementById("feedback"),true);
	if ((p_name.length==0)||!(p_name)) {//fix me
		console.log("No player name accepted");
		showOrNot(document.getElementById("enter_name"),true);
		showOrNot(document.getElementById("nothing_entered_feedback_text"),true);
		//reset if blank
	} else {
		console.log("Player name accepted");
		showOrNot(document.getElementById("enter_name"),false);
		showOrNot(document.getElementById("throw_choice"),true);
		showOrNot(document.getElementById("name_entered_feedback_text"),true);
		showOrNot(document.getElementById("nothing_entered_feedback_text"),false);
		document.getElementById("name").innerHTML = p_name;
		document.getElementById("name2").innerHTML = p_name;
		showOrNot(document.getElementById("show_rules_button"),true);
		//make rules and statistics visible now
	}
});//adds an anonymous function as an event lister to add the name

document.getElementById("play_move").addEventListener("click", function () {
	var choice = document.getElementById("player_choice").value;
	var opponentChoice = randomChoice(2);
	if (choice=="paper") {
		document.getElementById("your_image").src="images/Paper.jpg";
		console.log("Paper played");
		player_results[0] ++;
		if(opponentChoice < 1) {
			console.log("Opponent played rock");
			document.getElementById("opponent_image").src="images/Rock2.jpg";
			computer_results[1]++;
			gamesWon[0] ++;//you get win
			var output = "You played paper and your opponent played rock. Since paper beats rock, you win!";
			document.getElementById("game_summary").innerHTML = output;
		} else {
			console.log("Opponent played scissors");
			document.getElementById("opponent_image").src="images/Scissors2.jpg";
			computer_results[2]++;
			gamesWon[1] ++;//opponent gets win
			var output = "You played paper and your opponent played scissors. Since scissors beats paper, you lost!";
			document.getElementById("game_summary").innerHTML = output;
		}
		updateStats();
	} else if (choice=="rock") {
		document.getElementById("your_image").src="images/Rock.jpg";
		console.log("Rock played");
		player_results[1] ++;
		if(opponentChoice < 1) {
			console.log("Opponent played paper");
			document.getElementById("opponent_image").src="images/Paper2.jpg";
			computer_results[0]++;
			gamesWon[1] ++;//opponent gets win
			var output = "You played rock and your opponent played paper. Since paper beats rock, you lost!";
			document.getElementById("game_summary").innerHTML = output;
		} else {
			console.log("Opponent played scissors");
			document.getElementById("opponent_image").src="images/Scissors2.jpg";
			computer_results[2]++;
			gamesWon[0] ++;//you get win
			var output = "You played rock and your opponent played scissors. Since rock beats scissors, you win!";
			document.getElementById("game_summary").innerHTML = output;
		}
		updateStats();
	} else if (choice=="scissors") {
		document.getElementById("your_image").src="images/Scissors.png";
		console.log("Scissors played");
		player_results[2] ++;
		if(opponentChoice < 1) {
			console.log("Opponent played paper");
			document.getElementById("opponent_image").src="images/Paper2.jpg";
			computer_results[0]++;
			gamesWon[0] ++;//you get win
			var output = "You played scissors and your opponent played paper. Since scissors beats paper, you win!";
			document.getElementById("game_summary").innerHTML = output;
		} else {
			console.log("Opponent played rock");
			document.getElementById("opponent_image").src="images/Rock2.jpg";
			computer_results[1]++;
			gamesWon[1] ++;//opponent gets win
			var output = "You played scissors and your opponent played rock. Since rock beats scissors, you lost!";
			document.getElementById("game_summary").innerHTML = output;
		}
		updateStats();
	} else {
		showOrNot(document.getElementById("weapon_not_entered_feedback_text"),true);
		showOrNot(document.getElementById("feedback"),true);
	}
});

document.getElementById("play_again").addEventListener("click", function(){
	showOrNot(document.getElementById("play_move"),true);
	showOrNot(document.getElementById("player_choice"),true);
	showOrNot(document.getElementById("play_again"),false);
	showOrNot(document.getElementById("play_weapon_message"),true);
	document.getElementById("player_choice").value = "";
});

function showOrNot (div_element/*name of div*/, show/*boolean as whether or not you want it to be seen*/) {
	if (show && div_element.classList.contains("hidden")) {
	    div_element.classList.remove("hidden");
	    div_element.classList.add("visible");
	} else if (!show && div_element.classList.contains("visible")){
	    div_element.classList.remove("visible");
	    div_element.classList.add("hidden");
	}
}//takes a div and makes it either hidden or visible, depending on preferences

function randomChoice (choices) {
	return choices*Math.random();
}//returns a random integer given a number of choices

function updateStats () {
	var sum = gamesWon[0]+gamesWon[1]
	document.getElementById("total_games_played").innerHTML = sum;
	document.getElementById("total_player_wins").innerHTML = gamesWon[0];
	var ratio = parseInt(100*gamesWon[0]/(gamesWon[0]+gamesWon[1]));
	var outputRatio = ratio+"%";
	document.getElementById("winning_percentage").innerHTML = outputRatio;//if this funciton is called, a game has been played, cannot be zero
	var totalGames = gamesWon[0]+gamesWon[1];
	
	var p0 = parseInt(100*player_results[0]/totalGames);
	var p1 = parseInt(100*player_results[1]/totalGames);
	var p2 = parseInt(100*player_results[2]/totalGames);
	var o0 = parseInt(100*computer_results[0]/totalGames);
	var o1 = parseInt(100*computer_results[1]/totalGames);
	var o2 = parseInt(100*computer_results[2]/totalGames);

	p0 = p0 + "%";
	p1 = p1 + "%";
	p2 = p2 + "%";
	o0 = o0 + "%";
	o1 = o1 + "%";
	o2 = o2 + "%";

	document.getElementById("your_paper_stats").innerHTML = p0;
	document.getElementById("your_rock_stats").innerHTML = p1;
	document.getElementById("your_scissors_stats").innerHTML = p2;
	document.getElementById("opponent_paper_stats").innerHTML = o0;
	document.getElementById("opponent_rock_stats").innerHTML = o1;
	document.getElementById("opponent_scissors_stats").innerHTML = o2;

	console.log("Player:"+player_results);
	console.log("Opponent:"+computer_results);
	console.log("Game split:"+gamesWon);

	showOrNot(document.getElementById("weapon_not_entered_feedback_text"),false);
	showOrNot(document.getElementById("play_move"),false);
	showOrNot(document.getElementById("player_choice"),false);
	showOrNot(document.getElementById("play_again"),true);
	showOrNot(document.getElementById("game_results"),true);
	showOrNot(document.getElementById("show_stats_button"),true);
	showOrNot(document.getElementById("play_weapon_message"),false);
	/*
	<p id="total_games_played"></p>
    <!--Total games played-->
    <p id="total_player_wins"></p>
    <!--Total wins from player-->
    <p id="winning_percentage"></p>
    <!--Win/loss ratio-->
    <p id="your_throw_stats"></p>
    <!--Individual throw statistics-->
    <p id="opponent_throw_stats">
    <!--B(r)owser throw statistics-->
	*/
}

function makeToggable (button_element, div_element){
	button_element.addEventListener("click", function(){
		if (div_element.classList.contains("hidden")){//if one of the properties of the div is "hidden"
			div_element.classList.remove("hidden");//remove "hidden" status
			div_element.classList.add("visible");//insert "visible" status
		}else{//if one of the properties of the div is "visible"
			div_element.classList.remove("visible");//remove the "visible" status
			div_element.classList.add("hidden");//insert the "hidden" status
		}
		console.log(div_element.id+" button toggled in makeToggable() function");//console feedback that button was toggled
	});//adds function
}//makes a button able to toggle visibility for a div

/*
document.getElementById("blank").addEventListener("click", function () {
	console.log("Redo move, no weapon chosen");
});

document.getElementById("paper").addEventListener("click", function () {
	console.log("Paper played");
	player_results[0] ++;
	console.log(player_results);
	var opponentChoice = randomChoice(2);
	if(opponentChoice < 1) {
		console.log("rock");
		gamesWon[1] ++;//opponent gets win
	} else {
		console.log("scissors");
		gamesWon[0] ++;//you get win
	}
	updateStats();
});

document.getElementById("rock").addEventListener("click", function () {
	console.log("Rock played");
	player_results[1] ++;
	console.log(player_results);
	var opponentChoice = randomChoice(2);
	if(opponentChoice < 1) {
		console.log("paper");
		gamesWon[1] ++;//opponent gets win
	} else {
		console.log("scissors");
		gamesWon[0] ++;//you get win
	}
	updateStats();
});

document.getElementById("scissors").addEventListener("click", function () {
	console.log("Scissors played");
	player_results[2] ++;
	console.log(player_results);
	var opponentChoice = randomChoice(2);
	if(opponentChoice < 1) {
		console.log("paper");
		gamesWon[0] ++;//you get win
	} else {
		console.log("rock");
		gamesWon[1] ++;//opponent gets win
	}
	updateStats();
});
*/
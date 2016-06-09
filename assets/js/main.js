model = {
	// turnedOn : false,
	// turn : {
	// 	computer: true,
	// 	player: false,
	// },
	colors: ["green", "red", "yellow", "blue"],
	count: 0,
	strict: false,
	winningNumber:20,

	// strict: false,
	
	computer: {
		colorSequence:[],
		colorCount:0,
		turnStatus: true,
	},

	// colorSequence: [],
	// colorCount: 0,

	player: {
		colorCount:-1,
		colorSequence:[],
		turnStatus: false,
	},

	// playerMovesCount: -1,
	// playerColorSequence:[],

};

controller = {
	init: function(){

	},

	count : {
		get: function(){
			return model.count;
		}
	},

	colorCount: {
		addTo: function(){
			model.computer.colorCount++;
		},
		get: function(){
			return model.computer.colorCount;
		},
		reset: function(){
			model.computer.colorCount=0;
		}
	},

	turn: {
		getStatus : function(playerOrComp){
			return model[playerOrComp].turnStatus;
		},
		set: function(computerOrPlayer){
			if(computerOrPlayer==="computer"){
				model.player.turnStatus=false;
				model.player.computer=true;
			} else if(computerOrPlayer==="player"){
				model.player.turnStatus=true;
				model.player.computer=false;
			}
			
		}
	},

	strict: {
		get: function(){
			return model.strict;
		},
		set: function(onOrOff){
			if(onOrOff==="on"){
				model.strict=true;
			} else if(onOrOff==="off"){
				model.strict=false;
			} 
			// if(model.strict===false){
			// 	model.strict=true;
			// } else {
			// 	model.strict=false;
			// }
			// }
		}
	},

	colorSequence: {
		get: function(){
			return model.computer.colorSequence;
		},
		addto: function(color){

		},
		addNewColorTo: function(){
			var num = Math.floor((Math.random() * 4));
			var color = model.colors[num];
			model.computer.colorSequence.push(color);
		}
	},

	checkColor: function(color){
		console.log("*****controller.checkColor start");
		// if(model.player.turnStatus){
			model.player.colorSequence.push(color);
			console.log("player count is "+model.player.colorCount);
			console.log("player's color sequence is: " + model.player.colorSequence);
			console.log("computer's color sequence is: " + model.computer.colorSequence);
			console.log("model.player.colorSequence[model.player.colorCount] is: "+model.player.colorSequence[model.player.colorCount]);
			console.log("model.computer.colorSequence[model.player.colorCount] is: "+ model.computer.colorSequence[model.player.colorCount]);

			if (model.player.colorSequence[model.player.colorCount]===model.computer.colorSequence[model.player.colorCount]){
				console.log("heck yeah");
				view.colorSound(color);
				if(model.player.colorCount===model.computer.colorCount-2 && model.player.colorCount===model.winningNumber-1){
					console.log("last turn");
					console.log(model.computer.colorCount-2);
					view.winnerSoundAndDisplay(color);
					setTimeout(function(){
						controller.resetGame();
						controller.computerTurn("new");
					},1300);
					
				} else if(model.player.colorCount===model.computer.colorCount-2){
					controller.computerTurn("new");
				}
			} else {
				view.errorSoundAndDisplay();
			if(!model.strict){
				controller.computerTurn("repeat");
			} else if(model.strict){
			setTimeout(function () {
        		controller.resetGame();
				controller.computerTurn("new");
    		}, 500);


			}
			// controller.computerTurn("repeat");
			// model.player.colorCount=-1;
			// model.computer.colorCount=0;
			// model.player.colorSequence=[];
			// controller.turn.switch();

			// controller.newComputerTurn();

			// controller.colorSequence.addNewColorTo();
			// view.displayColorSequence();
			}
		// }

		

		console.log("*****controller.checkColor end");
		// console.log("============================");
	},

	computerTurn: function(repeatOrNew){
		view.colorCursor.remove();
		model.player.colorCount=-1;
		model.computer.colorCount=0;
		model.player.colorSequence=[];
		controller.turn.set("computer");
		view.displayTurn("computer");
		if(repeatOrNew==="new"){
			controller.colorSequence.addNewColorTo();
			model.count++;
			view.displayCount();
		}
		view.displayColorSequence();
	},

	redoComputerSequence: function(){
		model.player.colorCount=-1;
		model.computer.colorCount=0;
	},

	turnGameOnOrOff: function(){
		if (model.turnedOn===false){
			model.turnedOn=true;

		}
	},

	resetGame: function(){
		view.colorCursor.remove();
		model.computer.colorSequence=[];
		model.computer.colorCount=0;
		model.player.colorSequence=[];
		model.player.colorCount=-1;
		model.count=0;
		view.displayTurn("computer");
	},



	displayColor: function(color){
		setTimeout(function () {
        		$("#"+color).addClass(color+"-bg-active");
    		}, 1000);

		$("#"+color).removeClass(color+"-bg-active");
	}
}; //end controller

view = {

	startButtonHandler : function(){
		$("#start").on("click", function(){
			// model.computer.colorCount=0;
			controller.resetGame();
			controller.computerTurn("new");
		});
	},

	strictButtonHandler: function(){
		$("#strict").on("click",function(){
			if(controller.strict.get()){
				$("#strictDisplay").text("Off");
				$("#strictLightDisplay").css("background-color", "#2e050b");
				controller.strict.set("off");
			} else if(!controller.strict.get()){
				$("#strictDisplay").text("On");
				controller.strict.set("on");
				$("#strictLightDisplay").css("background-color", "#f10e2c");
				
			}
		});
	},

	colorHandler: function(){
			
			$(".color-outer").on("mousedown", ".color", function(){
				console.log("============================");
				console.log("*****colorHandler mousedown start");
				var status = controller.turn.getStatus("player");
				console.log("the status is "+model.player.turnStatus);
				console.log("you pressed "+$(this).attr('id'));

				if(controller.turn.getStatus("player")){

					var color = $(this).attr('id');
					
					$(this).addClass(color+"-bg-active");
					// view.colorSound(color);
					// var audio = document.getElementById(color+"Audio");
					// audio.play();
					model.player.colorCount++;
					controller.checkColor(color);
				}
				$(this).unbind();
				console.log("*****colorHandler mousedown end");
				
			});

			//when the mouse is released, the color turns off,
			$(window).on("mouseup",function(){
				$(".color").removeClass("green-bg-active red-bg-active yellow-bg-active blue-bg-active");
			});

		// }
	},

	colorCursor: {
		add: function(){
			$("#green, #red, #blue, #yellow").css("cursor", "pointer");
		},
		remove: function(){
			$("#green, #red, #blue, #yellow").css("cursor", "default");
		}
	},

	colorSound: function(color){
		var audio = document.getElementById(color+"Audio");
		audio.play();
	},

	errorSoundAndDisplay: function(){
		var audio = document.getElementById("errorAudio");
		audio.play();	   
	    $("#count").text("!!").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
		setTimeout(function () { 
			view.displayCount();
			view.displayTurn("computer");
		}, 550);
	},

	winnerSoundAndDisplay : function(color){
		var colorArray = ["green","red","yellow","blue"];
		var index = colorArray.indexOf(color);
		colorArray.splice(index,1);
		var audio1 = document.getElementById(color+"Audio");
		var audio2 = document.getElementById(colorArray[0]+"Audio");
		var audio3 = document.getElementById(colorArray[1]+"Audio");
		var audio4 = document.getElementById(colorArray[2]+"Audio");

		console.log(audio1+","+audio2+","+audio3+","+audio4);
		var audio = document.getElementById("winnerAudio");
		// audio.play();	
	   	setTimeout(function () {    
	      	$("#red").addClass("red-bg-active");
	      	$("#green").addClass("green-bg-active");
	      	$("#yellow").addClass("yellow-bg-active");
	      	$("#blue").addClass("blue-bg-active");                       
	   	});
	   	setTimeout(function () {    
	      	$("#red").removeClass("red-bg-active");
	      	$("#green").removeClass("green-bg-active");
	      	$("#yellow").removeClass("yellow-bg-active");
	      	$("#blue").removeClass("blue-bg-active");	  
	      	audio1.play();                      
	   	},200 );
	   	setTimeout(function () {    
	      	$("#red").addClass("red-bg-active");
	      	$("#green").addClass("green-bg-active");
	      	$("#yellow").addClass("yellow-bg-active");
	      	$("#blue").addClass("blue-bg-active");  
	      	audio2.play();                     
	   	},400 );
	   	setTimeout(function () {    
	      	$("#red").removeClass("red-bg-active");
	      	$("#green").removeClass("green-bg-active");
	      	$("#yellow").removeClass("yellow-bg-active");
	      	$("#blue").removeClass("blue-bg-active");
	      	audio3.play();                       
	   	},600 );
	   	setTimeout(function () {    
	      	$("#red").addClass("red-bg-active");
	      	$("#green").addClass("green-bg-active");
	      	$("#yellow").addClass("yellow-bg-active");
	      	$("#blue").addClass("blue-bg-active");  
	      	audio4.play();                       
	   	},800 );
	   	setTimeout(function () {    
	      	$("#red").removeClass("red-bg-active");
	      	$("#green").removeClass("green-bg-active");
	      	$("#yellow").removeClass("yellow-bg-active");
	      	$("#blue").removeClass("blue-bg-active");
	      	                       
	   	},1000 );
		$("#count").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
		$("#turnDisplay").text("WINNER").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	},


	displayCount: function(){
		var count = controller.count.get();
		if (count>=0 && count<10){
			count="0"+count;
		}
		$("#count").text(count);
	},

	displayTurn: function(playerOrComp){
		if(playerOrComp==="player"){
			$("#turnDisplay").text("YOU");
		} else if (playerOrComp==="computer"){
			$("#turnDisplay").text("COMP");
		}
	},


	displayColorSequence: function(){
		
		var x= setTimeout(function () {    
	      	$(".color").removeClass("green-bg-active red-bg-active yellow-bg-active blue-bg-active");
	      	                       
	   }, 1000);

		var y =setTimeout(function () {    
	      	var colorCount = controller.colorCount.get();
	      	var colorSequence = controller.colorSequence.get();
	      	if(colorCount<colorSequence.length){
	      		var color = colorSequence[colorCount];
	      		var audio = document.getElementById(color+"Audio");
				audio.play();
	      		$("#"+color).addClass(color+"-bg-active");
	      	} else if (colorCount===colorSequence.length){
	      		controller.turn.set("player");
	      		// setTimeout(function () {    
	      			view.displayTurn("player");
	      			view.colorCursor.add();
	      	                 
	   			// }, 1000);
	      		
	      	}     
	      	
	      	controller.colorCount.addTo();
	      	//colorCount must be established again because of the addTo above
	      	colorCount = controller.colorCount.get();                     
	      	if (colorCount <= colorSequence.length) {          
	         	view.displayColorSequence();           
	      	}                       
	   }, 1500);

		$("#start").on("click",function(){
			clearTimeout(x);
			clearTimeout(y);
		});
			
	},

};

view.startButtonHandler();
view.colorHandler();
view.displayCount();
view.strictButtonHandler();
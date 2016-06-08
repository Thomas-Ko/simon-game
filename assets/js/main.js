model = {
	// turnedOn : false,
	// turn : {
	// 	computer: true,
	// 	player: false,
	// },
	colors: ["green", "red", "yellow", "blue"],
	count: 0,
	strict: false,

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
				if(model.player.colorCount===model.computer.colorCount-2){
					console.log("last turn");
					controller.computerTurn("new");
				}
			} else {
				view.errorSoundAndDisplay();
			if(!model.strict){
				controller.computerTurn("repeat");
			} else if(model.strict){
				controller.resetGame();
				controller.computerTurn("new");
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
		
		model.player.colorCount=-1;
		model.computer.colorCount=0;
		model.player.colorSequence=[];
		controller.turn.set("computer");
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
		model.computer.colorSequence=[];
		model.computer.colorCount=0;
		model.player.colorSequence=[];
		model.player.colorCount=-1;
		model.count=0;
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
				controller.strict.set("off");
			} else if(!controller.strict.get()){
				$("#strictDisplay").text("On");
				controller.strict.set("on");
			}
		});
	},

	colorHandler: function(){
		//if player's turn is true
			
			
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
		}, 550);
	},


	displayCount: function(){
		var count = controller.count.get();
		$("#count").text(count);
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
	      		// view.colorHandler();
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
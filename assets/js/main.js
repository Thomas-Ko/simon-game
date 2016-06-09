/*====================
	MODEL
====================*/
model = {
	//DO NOT CHANGE ANYTHING except for winningNumber if you wish.
	colors: ["green", "red", "yellow", "blue"],
	count: 0,
	strict: false,
	winningNumber:20,
	
	computer: {
		colorSequence:[],
		colorCount:0,
		turnStatus: true,
	},

	player: {
		colorCount:-1,
		colorSequence:[],
		turnStatus: false,
	},

};


/*====================
	CONTROLLER
====================*/
controller = {
	init: function(){
		view.init();
	},

	count : {
		get: function(){
			return model.count;
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
		}
	},

	//all of these interact with the 
	computer: {
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

		colorSequence: {
			get: function(){
				return model.computer.colorSequence;
			},
			addTo: function(){
				var num = Math.floor((Math.random() * 4));
				var color = model.colors[num];
				model.computer.colorSequence.push(color);
			}
		},
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

	checkColor: function(color){
		model.player.colorSequence.push(color);
		
		if (model.player.colorSequence[model.player.colorCount]===model.computer.colorSequence[model.player.colorCount]){
			view.colorSound(color);
			if(model.player.colorCount===model.computer.colorCount-2 && model.player.colorCount===model.winningNumber-1){
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
		}	
	},

	computerTurn: function(repeatOrNew){
		view.colorCursor.remove();
		model.player.colorCount=-1;
		model.computer.colorCount=0;
		model.player.colorSequence=[];
		controller.turn.set("computer");
		view.displayTurn("computer");
		if(repeatOrNew==="new"){
			controller.computer.colorSequence.addTo();
			model.count++;
			view.displayCount();
		}
		view.displayColorSequence();
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

}; //end controller


/*====================
	VIEW
====================*/
view = {

	init: function(){
		view.startButtonHandler();
		view.colorHandler();
		view.strictButtonHandler();
	},

	startButtonHandler : function(){
		$("#start").on("click", function(){
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
			var status = controller.turn.getStatus("player");

			if(controller.turn.getStatus("player")){
				var color = $(this).attr('id');
				$(this).addClass(color+"-bg-active");
				model.player.colorCount++;
				controller.checkColor(color);
			}
			$(this).unbind();
		});

		//when the mouse is released, the color turns off,
		$(window).on("mouseup",function(){
			$(".color").removeClass("green-bg-active red-bg-active yellow-bg-active blue-bg-active");
		});
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

	//this is a really messy way of making a flashing animation, but it get's the job done, plus it only runs when the user wins
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
	      	var colorCount = controller.computer.colorCount.get();
	      	var colorSequence = controller.computer.colorSequence.get();
	      	if(colorCount<colorSequence.length){
	      		var color = colorSequence[colorCount];
	      		var audio = document.getElementById(color+"Audio");
				audio.play();
	      		$("#"+color).addClass(color+"-bg-active");
	      	} else if (colorCount===colorSequence.length){
	      		controller.turn.set("player");   
	      		view.displayTurn("player");
	      		view.colorCursor.add();
	      	}     
	      	
	      	controller.computer.colorCount.addTo();
	      	colorCount = controller.computer.colorCount.get();                     
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


/*====================
	INITIALIZATION
====================*/
controller.init();
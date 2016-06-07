model = {
	turnedOn : false,
	turn : {
		computer: true,
		player: false,
	},
	colors: ["green", "red", "yellow", "blue"],

	strict: false,
	
	computer: {
		colorSequence:[],
		colorCount:0,
	},

	// colorSequence: [],
	// colorCount: 0,

	player: {
		colorCount:-1,
		colorSequence:[],
	},

	// playerMovesCount: -1,
	// playerColorSequence:[],

};

controller = {
	init: function(){

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
		console.log("check color star");
		model.player.colorSequence.push(color);
		console.log(color);
		console.log(model.player.colorSequence);
		console.log(model.player.colorCount);
		console.log(model.player.colorSequence[model.player.colorCount]);
		console.log(model.computer.colorSequence[model.player.colorCount]);
		if (model.player.colorSequence[model.player.colorCount]===model.computer.colorSequence[model.player.colorCount]){
			console.log("heck yeah");
		} else {
			console.log("nooo");
		}

		console.log("check color end");
	},

	turnGameOnOrOff: function(){
		if (model.turnedOn===false){
			model.turnedOn=true;

		}
	},

	resetGame: function(){
		model.computer.colorSequence=0;
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
			controller.colorCount.reset();

			controller.colorSequence.addNewColorTo();
			view.displayColorSequence();
		});
	},

	colorHandler: function(){
		$(".color-outer").on("mousedown", ".color", function(){
			// console.log("hello");
			var color = $(this).attr('id');
			var audio = document.getElementById(color+"Audio");
			// console.log(color);
			$(this).addClass(color+"-bg-active");
			audio.play();
			model.player.colorCount++;
			controller.checkColor(color);

	
		});

		// .on("mouseup",".color",function(){
		// 	console.log("up");
		// 	var color = $(this).attr('id');
		// 	$(this).removeClass(color+"-bg-active");
		// });

		//when the mouse is released, the color turns off,
		$(window).on("mouseup",function(){
			$(".color").removeClass("green-bg-active red-bg-active yellow-bg-active blue-bg-active");
		});

		// $(".color-outer").on("mouseup", ".color", function(){
		// 	var color = $(this).attr('id');
		// 	$(this).removeClass(color+"-bg-active");
		// });

		
	},

	displayColorSequence: function(){
		
		setTimeout(function () {    
	      	$(".color").removeClass("green-bg-active red-bg-active yellow-bg-active blue-bg-active");
	      	                       
	   }, 1000);



		setTimeout(function () {    
	      	var colorCount = controller.colorCount.get();
	      	var colorSequence = controller.colorSequence.get();
	      	if(colorCount<colorSequence.length){
	      		var color = colorSequence[colorCount];
	      		var audio = document.getElementById(color+"Audio");
				audio.play();
	      		$("#"+color).addClass(color+"-bg-active"); 

	      	}       
	      	
	      	controller.colorCount.addTo();
	      	//colorCount must be established again because of the addTo above
	      	colorCount = controller.colorCount.get();                     
	      	if (colorCount <= colorSequence.length) {          
	         	view.displayColorSequence();           
	      	}                       
	   }, 1500);
			
	},

};

view.startButtonHandler();
view.colorHandler();
model = {
	turn : {
		computer: true,
		player: false,
	},
	colors: ["green", "red", "yellow", "blue"],

	strict: false,
	count: null,
	colorSequence: [],
	colorCount: 0,

};

controller = {
	init: function(){

	},

	colorCount: {
		addTo: function(){
			model.colorCount++;
		},
		get: function(){
			return model.colorCount;
		},
		resetToZero: function(){
			model.colorCount=0;
		}
	},

	colorSequence: {
		get: function(){
			return model.colorSequence;
		},
		addto: function(color){

		},
		addNewColorTo: function(){
			var num = Math.floor((Math.random() * 4));
			var color = model.colors[num];
			model.colorSequence.push(color);
		}
	},

	// chooseColor: function(){
	// 	var num = Math.floor((Math.random() * 4));
	// 	var color = model.colors[num];
	// 	model.colorSequence.push(color);
	// },


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
			controller.colorCount.resetToZero();
			controller.colorSequence.addNewColorTo();
			view.displayColorSequence();
		});
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
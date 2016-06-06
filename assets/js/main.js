model = {
	turn : {
		computer: true,
		player: false,
	},
	colors: ["green", "red", "yellow", "blue"],

	strict: false,
	count: null,
	colorSequence: [],

};

controller = {
	init: function(){

	},

	chooseColor: function(){
		var num = Math.floor((Math.random() * 4));
		var color = model.colors[num];
		// console.log(color);
		model.colorSequence.push(color);
	},


	// displayColor: function(color){
	// 	setTimeout(function () {
 //        		$("#"+color).addClass(color+"-bg-active");
 //    		}, 1000);

	// 	$("#"+color).removeClass(color+"-bg-active");
	// }
}; //end controller

view = {

	startButtonHandler : function(){
		$("#start").on("click", function(){
			controller.chooseColor();
			controller.chooseColor();
			controller.chooseColor();
			controller.chooseColor();
			controller.chooseColor();
			view.displayColorSequence();
		});
	},

	displayColorSequence: function(){
		for (i=0; i<model.colorSequence.length; i++){
			
			
			console.log(model.colorSequence[i]);
				
			
		}
			
	},

};

view.startButtonHandler();
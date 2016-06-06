model = {
	turn : {
		computer: true,
		player: false,
	},
	colors: ["green", "red", "yellow", "blue"],

	strict: false,
	count: null,
	colorSequence: [],
	i: 0,

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
			model.i=0;
			controller.chooseColor();
			view.displayColorSequence();
		});
	},

	displayColorSequence: function(){
		
		setTimeout(function () {    
	      	$(".color").removeClass("green-bg-active red-bg-active yellow-bg-active blue-bg-active");
	      	                       
	   }, 1000);



		setTimeout(function () {    
	      	// $(".color").removeClass("green-bg-active red-bg-active yellow-bg-active blue-bg-active");
	      	if(model.i<model.colorSequence.length){
	      		var color = model.colorSequence[model.i];
	      		$("#"+color).addClass(color+"-bg-active"); 
	      	}       
	      	
	      	model.i++;                     
	      	if (model.i <= model.colorSequence.length) {          
	         	view.displayColorSequence();           
	      	}                       
	   }, 1500);
			
	},

};

view.startButtonHandler();
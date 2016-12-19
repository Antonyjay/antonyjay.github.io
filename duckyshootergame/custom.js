var screenWidth = $(document).width()

$(document).ready(function() {
	createDucks (50)
})

function createDucks (count) {
	var delay = 0
	for (var i = 0; i < count ; i++) {
		var duck = $('<img src="ducky.png">') 
		duck.css({
			position: 'absolute',
			left: 0,
			top: '30%',
			width: '150px'
		})
		duck.appendTo("#duck")
		delay = delay + 800
		duck.hide().delay(delay).show(1).animate({"left": screenWidth}, {
			duration: 5000,
			easing: "linear",
			complete: function (){
				$(this).remove()
			}

		})
		duck.click(function () {
			$(this).remove()
		})
		
	}
}
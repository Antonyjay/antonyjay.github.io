// $.post('/comments', { name: "Mentor" }, function(data) {
// 	$(".result").html(data)
// })

$( 'form').submit(function(event){
	event.preventDefault()
	console.log(event)
	console.log (event.target[0].value)
	$.post('/comments', {
		comment: event.target[0].value,
		post_id: event.target[1].value
	}, function(data, status) {
		console.log (status)
		if(status == 'success') {
			console.log (data)
			console.log(event.target.id)
			$( '#' + event.target.id )
			.prev('.commentsection')
			.append(" <p> " + data + "</p>")
		}
	})
})


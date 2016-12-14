


$( '#commentform').submit(function(event){
	event.preventDefault()
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


/*
 *Initializes the UI containers and its contents
 * */
function initUI() {
	renderModalContainers();
	renderMainContainers();
	renderTitleBar();
	renderControllers();
}
/*
 *Render Main containers with titles and labels
 * */
function renderMainContainers() {
	$('#root').append(
		"<div class='container' style='margin-top: 30px;'>"
			+"<div class='row'>"
				+"<div class='col' id='title_bar'>"
				+"</div>"
			+"</div>"
			+"<div class='row'>"
				+"<div class='col-3'>"
					+"<div class='card'>"
						+"<div class='card-header'>"
							+"<h6> <i class='fab fa-twitter fa-2x' style='color: #1DA1F2;'></i> Twitter API Controls</h6>"
						+"</div>"
						+"<div class='card-body' id='controllers'>"
						+"</div>"
					+"</div>"
				+"</div>"
				+"<div class='col-9'>"
					+"<div class='card'>"
						+"<div class='card-header'>"
							+"<h6> <i class='fab fa-twitter fa-2x' style='color: #1DA1F2;'></i> Twitter API Responses</h6>"
						+"</div>"
						+"<div class='card-body' id='results_display' style='min-height: 175px;'>"
						+"</div>"
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}
/*
 *Adds title to #title_bar
 * */
function renderTitleBar() {
	$('#title_bar').append(
		"<h2>"
			+"CMPE-272 HW#2 - Twitter <i class='fab fa-twitter fa-lg' style='color: #1DA1F2;'></i>"
		+"</h2>"
		+"<hr>"
		+"<p>By: Ramya Kandasamy, Raymond Ho, Jed Villanueva</p>"
		+"<p>Group: Cereal Killers</p>"
	);
}
/*
 * Adds buttons for Twitter API demo POST, GET, and DELETE to #controllers
 * */
function renderControllers() {
	$('#controllers').append(
		"<div class='container-fluid'>"
			+"<div class='row'>"
				+"<div class='col'>"
					+"<button type='button' class='btn btn-block btn-primary' data-toggle='modal' data-target='#my_modal' onclick='renderPostForm();'>"
						+"Post A Tweet"
					+"</button>"	
				+"</div>"
			+"</div>"
		+"</div>"
		+"<div class='container-fluid' style='margin-top: 10px; margin-bottom: 10px;'>"
			+"<div class='row'>"
				+"<div class='col'>"
					+"<button type='button' class='btn btn-block btn-primary' data-toggle='modal' data-target='#my_modal' onclick='renderGetForm();'>"
						+"Read A Tweet"
					+"</button>"	
				+"</div>"
			+"</div>"
		+"</div>"
		+"<div class='container-fluid'>"
			+"<div class='row'>"
				+"<div class='col'>"
					+"<button type='button' class='btn btn-block btn-primary' data-toggle='modal' data-target='#my_modal' onclick='renderDeleteForm();'>"
						+"Delete A Tweet"
					+"</button>"	
				+"</div>"
			+"</div>"
		+"</div>"
	);
}
/*
 *Render blank modal for use later when buttons are pressed.
 *Initializes as hidden.
 * */
function renderModalContainers() {
	$('#root').append(
		"<div class='modal fade' id='my_modal' tabindex='-1' role='dialog' aria-labelledby='my_modal_label' aria-hidden='true'>"
			+"<div class='modal-dialog' role='document'>"
				+"<div class='modal-content'>"
					+"<div class='modal-header'>"
						+"<h4 class='modal-title' id='my_modal_label'></h4>"
						+"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
							+"<span aria-hidden='true'>&times</span>"
						+"</button>"
					+"</div>"
					+"<div class='modal-body' id='my_modal_body'>"
					+"</div>"
					+"<div class='modal-footer' id='my_modal_footer'>"
						
					+"</div>"
				+"</div>"
			+"</div>"
		+"</div>"
	);
}
/*
 *Delete contents of modal for use of other functions
 * */
function clearModalContents() {
	$('#my_modal_label').empty();
	$('#my_modal_body').empty();
	$('#my_modal_footer').empty();
}
/*
 *Render the form for posting tweets on to the modal window.
 * */
function renderPostForm() {
	clearModalContents(); //Clear modal first of stale data.
	$('#my_modal_label').append("Post A Tweet");
	$('#my_modal_body').append(
		"<div class='form-group'>"
			+"<label for='tweetTextArea'>Enter your tweet:</label>"
			+"<textarea class='form-control rounded-6' id='tweetTextArea' rows=6></textarea>"
		+"</div>"
	);
	$('#my_modal_footer').append(
		"<button type='button' class='btn btn-primary' onclick='postTweet();' data-dismiss='modal'>"
			+"Post Tweet"
		+"</button>"
		+"<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"
	);

}
/*
 *Render the form for reading tweets on to the modal window.
 * */
function renderGetForm() {
	clearModalContents(); //Clear modal first of stale data.
	$('#my_modal_label').append("Read A Tweet");
	$('#my_modal_body').append(
		"<div class='form-group'>"
			+"<label for='tweetGet'>Enter a Tweet ID:</label>"
			+"<input type='text' class='form-control rounded-6' id='tweetGet' placeholder='Tweet id_str'>"
		+"</div>"
	);
	$('#my_modal_footer').append(
		"<button type='button' class='btn btn-primary' onclick='getTweet();' data-dismiss='modal'>"
			+"Get Tweet"
		+"</button>"
		+"<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"
	);
}
/*
 *Render the form for deleting tweets on to the modal window.
 * */
function renderDeleteForm() {
	clearModalContents(); //Clear modal first of stale data.
	$('#my_modal_label').append("Delete A Tweet");
	$('#my_modal_body').append(
		"<div class='form-group'>"
			+"<label for='tweetDelete'>Enter a Tweet ID:</label>"
			+"<input type='text' class='form-control rounded-6' id='tweetDelete' placeholder='Tweet id_str'>"
		+"</div>"
	);
	$('#my_modal_footer').append(
		"<button type='button' class='btn btn-primary' onclick='deleteTweet();' data-dismiss='modal'>"
			+"Delete Tweet"
		+"</button>"
		+"<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"
	);
}
/*
 *Make a POST request to local API with content of textarea as value. 
 * */
function postTweet() {
	let tweet = document.getElementById('tweetTextArea').value;

	$.ajax({
		url: "http://54.166.188.110:8000/newtweet",
		type: "POST",
		data: {tweet:tweet},
		dataType: "json"
	}).done(function(data, stat) {
		console.log(data);
		if (data.id !== undefined) {
			updateResponseDisplay(data,'p');
		} else {
			alert(JSON.stringify(data));
		}
	});

}
/*
 *Make a GET request to local API with id_str as value from Twitter response.
 * */
function getTweet() {
	let tweet_id = document.getElementById('tweetGet').value;

	$.ajax({
		url: "http://54.166.188.110:8000/gettweet",
		type: "POST",
		data: {tweet:tweet_id},
		dataType: "json"
	}).done(function(data, stat) {
		if (data.id !== undefined) {
			updateResponseDisplay(data,'g');
		} else {
			alert(JSON.stringify(data));
		}
	});
}
/*
 *Make a POST request to local API with id_str as value from Twitter response.
 * */
function deleteTweet() {
	let tweet_id = document.getElementById('tweetDelete').value;

	$.ajax({
		url: "http://54.166.188.110:8000/deletetweet",
		type: "POST",
		data: {tweet:tweet_id},
		dataType: "json"
	}).done(function(data, stat) {
		console.log(data);
		if (data.id !== undefined) {
			updateResponseDisplay(data,'d');
		} else {
			alert(JSON.stringify(data));
		}
	});
}
/*
 *Update reponse display window with relevant messages, link to the Tweet and
 *stringified JSON response from Twitter.
 * */
function updateResponseDisplay(res, method) {
	let msg;
	switch(method) {
		case 'p':
			msg = "<h3>Successfully posted tweet!</h3>";
			break;
		case 'g':
			msg = "<h3>Successfully read tweet!</h3>";
			break;
		case 'd':
			msg = "<h3>Successfully deleted tweet!</h3>";
			break;
		default:
			msg = "<h3>Not sure what happened</h3>";
	}

	$('#results_display').empty();
	$('#results_display').append(
		msg
		+"Check it out <a href='https://twitter.com/JedVillanueva6' target='_blank'>HERE</a><br/>"
		+"Use this ID to use with other methods: <strong><i>"+res.id_str+"</i></strong>"
		+"<pre>"+JSON.stringify(res,null,2)+"</pre>"
	);
}

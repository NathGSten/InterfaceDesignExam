
(function($) {
	// admin logins
	var username = "admin@codify.com";
	var pass = "123";

	var newUserEmail;
	var newPassword;


// registering new admin
	$("#btn-new-admin").click(function(){
		newUserEmail = $("#new-userEmail").val();
		newPassword = $("#new-password").val();
		localStorage.newUserEmail = newUserEmail;
		localStorage.newPassword = newPassword;
	});

	// login as admin
	$("#btn-admin-login").click(function(){
		loginUserEmail = $("#login-userEmail").val();
		loginPassword = $("#login-password").val();
		login = performLogin(loginUserEmail, loginPassword);
		if(login){
			// sweetalert success and redirect
			console.log("you're in");
			console.log(localStorage.firstName);
			console.log(loginUserEmail);
			console.log(loginPassword);
			window.location.href = 'index.html';
		}else{
			// sweetalert error try again
			console.log("you're OUT");
			console.log(localStorage.firstName);
			console.log(loginUserEmail);
			console.log(loginPassword);

			swal(
			  'Login failed!',
			  'The login combination was wrong. <br>Try again!',
			  'error'
			)
		}
	});

	// logout 
	$(".logOut").click(function(){
		localStorage.firstName = null;
		console.log("licked logout");
		console.log(localStorage.firstName);
		redesignMenu();
		// document.location = "index.html";
	});

	// timepicker 

	$(function() {
		$('input.timepicker').timepicker({
			timeFormat: 'HH:mm p',
			minTime: '7',
			maxTime: '23'
		});
	});

	// datepicker

	$( "#new-event-datepicker" ).datepicker({
	  showWeek: true,
	  firstDay: 1
	});
	$( "#new-event-datepicker" ).datepicker( "option", "dateFormat", "d MM yy" );

	$(".admin-add-event").click(function(){
		document.location = "new-event.html";

	});

	// adding new event

	$("#new-event-btn").click(function(){

		var title = $("#new-event-title").val();
		var coverImage = $("#new-event-cover-image").val();
		var date = $("#new-event-datepicker").val();
		var startTime = $("#new-event-start-time").val();
		var endTime = $("#new-event-end-time").val();
		var address = $("#new-event-address").val();
		var shortDescription = $("#new-event-short-description").val();
		var description = $("#new-event-description").val();


		var aDate = date.split(' ');
		var day = aDate[0];
		var month = aDate[1].toUpperCase();
		var year = aDate[2];
		
		var aTags = newEventTagsArray();

		var jEvent = {
		 	title: title,
		 	coverImage: coverImage,
		 	day: day,
		 	month: month,
		 	year: year,
		 	startTime: startTime,
		 	endTime: endTime,
		 	address: address,
		 	shortDescription: shortDescription,
		 	description: description,
		 	tags: aTags
		 }

		 var sEvent = JSON.stringify(jEvent);
		 localStorage.newEvent = sEvent;
		 console.log(sEvent);

	});



	if(localStorage.newEvent){
		var jEvent = JSON.parse(localStorage.newEvent);
		console.log(jEvent);
		buildNewEventDiv(jEvent);
	}

	function buildNewEventDiv(jEvent){
		var sDivTemplate = '<div class="single-event">\
					<div class="upperHalf">\
						<div class="event-head">\
							<h2>{{day}}</h2>\
							<h5>{{month}}</h5>\
							<h5>{{year}}</h5>\
						</div>\
						<div class="title-img">\
							<div class="event-img">\
								<img src="{{coverImage}}">\
							</div>\
						</div>\
					</div>\
					<div class="lowerHalf">\
						<div class="event-info-container">\
							<h1>{{title}}</h1>\
							<h3>{{startTime}} - {{endTime}}</h3>\
							<h5>{{address}}</h5>\
							<p>{{description}}</p>\
							<div class="event-tags" id="new-event-tags-container">\
							</div>\
							<button class="btn-event"><a href="individual_event.html">READ MORE</a></button>\
						</div>\
					</div>\
				</div>'

		var sTagsTemplate = '';

		sDivTemplate = sDivTemplate.replace("{{day}}", jEvent.day);
		sDivTemplate = sDivTemplate.replace("{{month}}", jEvent.month);
		sDivTemplate = sDivTemplate.replace("{{year}}", jEvent.year);
		sDivTemplate = sDivTemplate.replace("{{coverImage}}", jEvent.coverImage);
		sDivTemplate = sDivTemplate.replace("{{title}}", jEvent.title);
		sDivTemplate = sDivTemplate.replace("{{startTime}}", jEvent.startTime);
		sDivTemplate = sDivTemplate.replace("{{endTime}}", jEvent.endTime);
		sDivTemplate = sDivTemplate.replace("{{address}}", jEvent.address);
		sDivTemplate = sDivTemplate.replace("{{description}}", jEvent.shortDescription);

		$(".event-row").append(sDivTemplate);

		$.each( jEvent.tags, function(iIndex, sTag){

			$("#new-event-tags-container").append("<div>"+ sTag +"</div>");

		});
	}

	function newEventTagsArray(){
		var aTags = [];
		$(".new-event-tag:checked").each(function(index,element){
			aTags.push($(this).val());

		});
		return aTags;
	}

	function performLogin(email, password){
		if( (email == username && password == pass) || (email == localStorage.newUserEmail && password == localStorage.newPassword) ){
			localStorage.firstName = "admin";
			redesignMenu();
			return true;
		}else {
			return false;
		}
	}

	function redesignMenu(){
		var checkUser = localStorage.getItem("firstName");

		if (checkUser !== null){

			var changeNameTemplate =
				'<ul>\
					<li class="event-page"><a href="index.html">Events</a></li>\
					<li class="volunteer-page"><a href="volunteer.html">Get Involved</a></li>\
					<li class="volunteer-page"><a href="partners.html">Partners</a></li>\
					<li class="aboutUs-page"><a href="about.html">About Us</a></li>\
					<li class="makeAdmin-page"><a href="new-admin.html">Make new admin</a></li>\
					<li class="logOut"><a >Log out</a></li>\
				</ul>';

			// the one between these brackets are not for the menu but for the admin extra
			$(".admin-new-event").show();
			// the one between these brackets are not for the menu but for the admin extra

			$(".nav-right-ul").html(changeNameTemplate);

			$(".makeAdmin-page").show();
			$(".logOut").show();
		} else {
			$(".makeAdmin-page").hide();
			$(".logOut").hide();
		}
	}



})(jQuery);

(function($) {

	$(".admin-new-event-indi").hide();
	$(".admin-new-event").hide();
	$(".makeAdmin-page").hide();
	$(".admin-new-event-partner").hide();

	$(".calender-view-text2").hide();
	$(".event-calendar").hide();
	$(".calender-view-img2").hide();


	// admin logins
	var username = "admin@codify.com";
	var pass = "123";

	var newUserEmail;
	var newPassword;

	redesignMenu();

	$(".nav-right-ul ul li a").click(function(){
		redesignMenu();
	});


  // registering new admin    // registering new admin    // registering new admin    // registering new admin    // registering new admin    
	$("#btn-new-admin").click(function(){
		newUserEmail = $("#new-userEmail").val();
		newPassword = $("#new-password").val();
		localStorage.newUserEmail = newUserEmail;
		localStorage.newPassword = newPassword;
	});

	// login as admin   // login as admin   // login as admin   // login as admin   // login as admin   // login as admin   // login as admin   
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
			document.location = "index.html";

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

	// logout    // logout    // logout    // logout    // logout    // logout    // logout    // logout    // logout    // logout    // logout    
	$(".logOut a").click(function(){
		localStorage.firstName = null;
		console.log("licked logout");
		console.log(localStorage.firstName);
		// document.location = "index.html";
		redesignMenu();
	});

	// timepicker    // timepicker    // timepicker    // timepicker    // timepicker    // timepicker    // timepicker    // timepicker    // timepicker    

	$(function() {
		$('input.timepicker').timepicker({
			timeFormat: 'HH:mm p',
			minTime: '7',
			maxTime: '23'
		});
	});

	// datepicker   // datepicker   // datepicker   // datepicker   // datepicker   // datepicker   // datepicker   // datepicker   

	$( "#new-event-datepicker" ).datepicker({
	  showWeek: true,
	  firstDay: 1
	});
	$( "#new-event-datepicker" ).datepicker( "option", "dateFormat", "d MM yy" );

	// ADDING NEW EVENT   // ADDING NEW EVENT   // ADDING NEW EVENT   // ADDING NEW EVENT   // ADDING NEW EVENT   // ADDING NEW EVENT   // ADDING NEW EVENT   

	$(".admin-add-event").click(function(){
		document.location = "new-event.html";

	});

	

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
		 window.location.href = 'index.html';

	});

	// APPENDING NEW EVENT TO INDEX   // APPENDING NEW EVENT TO INDEX   // APPENDING NEW EVENT TO INDEX   // APPENDING NEW EVENT TO INDEX      



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

		$("#index-event-row").append(sDivTemplate);

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

	// LOGIN FOR BOTH ADMIN AND NEW ADMIN   // LOGIN FOR BOTH ADMIN AND NEW ADMIN   // LOGIN FOR BOTH ADMIN AND NEW ADMIN   

	function performLogin(email, password){
		if( (email == username && password == pass) || (email == localStorage.newUserEmail && password == localStorage.newPassword) ){
			localStorage.firstName = "admin";
			redesignMenu();
			return true;
		}else {
			return false;
		}
	}

	// REDESIGN MENU   // REDESIGN MENU   // REDESIGN MENU   // REDESIGN MENU   // REDESIGN MENU   // REDESIGN MENU   // REDESIGN MENU   

	function redesignMenu(){
		var checkUser = localStorage.getItem("firstName");
		console.log(checkUser);
		if (checkUser !== "null"  && checkUser !== null ){
			console.log("user is not null")
			var changeNameTemplate =
				'<ul>\
					<li class="event-page"><a href="index.html">Events</a></li>\
					<li class="volunteer-page"><a href="volunteer.html">Get Involved</a></li>\
					<li class="volunteer-page"><a href="partners.html">Partners</a></li>\
					<li class="aboutUs-page"><a href="about.html">About Us</a></li>\
					<li class="makeAdmin-page"><a href="new-admin.html">Make new admin</a></li>\
					<li class="logOut"><a href="index.html" >Log out</a></li>\
				</ul>';

			// the one between these brackets are not for the menu but for the admin extra
			$(".admin-new-event").show();
			$(".admin-new-event-partner").show();
			$(".admin-new-event-indi").show();
			// the one between these brackets are not for the menu but for the admin extra

			$(".nav-right-ul").html(changeNameTemplate);

			$(".makeAdmin-page").show();
			$(".logOut").show();
		} else {
			console.log("user is null");
			$(".makeAdmin-page").hide();
			$(".admin-new-event").hide();
			$(".admin-new-event-partner").hide();
			$(".admin-new-event-indi").hide();
			$(".logOut").hide();
		}
	}

	// ADDING NEW PARTNER  // ADDING NEW PARTNER   // ADDING NEW PARTNER   // ADDING NEW PARTNER   // ADDING NEW PARTNER   // ADDING NEW PARTNER

	$(".admin-add-partner").click(function(){
		document.location = "new-partner.html";

	});

	// adding new event

	$("#new-partner-btn").click(function(){

		var pName = $("#new-partner-name").val();
		var pImage = $("#new-partner-image").val();


		var jPartner = {
		 	pName: pName,
		 	pImage: pImage
		 }

		 var sPartner = JSON.stringify(jPartner);
		 localStorage.newPartner = sPartner;
		 console.log(sPartner);
		 window.location.href = 'partners.html';

	});


	if(localStorage.newPartner){
		var jPartner = JSON.parse(localStorage.newPartner);
		console.log(jPartner);
		buildNewPartnerDiv(jPartner);
	}

	function buildNewPartnerDiv(jPartner){
		var sDivTemplate = '<img src="{{coverImage}}">'

		var sTagsTemplate = '';

		sDivTemplate = sDivTemplate.replace("{{coverImage}}", jPartner.pImage);

		$(".p-partners").append(sDivTemplate);

	}

	// DELETING PARTNER   // DELETING PARTNER   // DELETING PARTNER   // DELETING PARTNER   // DELETING PARTNER   // DELETING PARTNER   

	$(".admin-delete-partner").click(function(){
		swal({
		  title: 'Delete a partner',
		  type: 'info',
		  html:
		    '<p>Choose a partner to delete</p><br>\
		    <select id="delete-partner" name="delete-partner">\
                <option value="kea">KEA</option>\
                <option value="ibm">IBM</option>\
                <option value="tdc">TDC</option>\
                <option value="html5">Html5</option>\
                <option value="steels">Stellseries</option>\
                <option value="ibm">IBM</option>\
                <option value="dell">Dell</option>\
                <option value="mobilepay">MobilePay</option>\
            </select>',
		  showCloseButton: true,
		  showCancelButton: true,
		  confirmButtonText:
		    '<i class="fa fa-trash-o"></i> Delete it!',
		  cancelButtonText:
		    'Cancel'
		}).then(function () {
		  swal(
		    'Deleted!',
		    'Your file has been deleted.',
		    'success',
		    chosenOne = document.getElementById("delete-partner"),
			strPartner = chosenOne.options[chosenOne.selectedIndex].value,
			console.log(strPartner),
		    deleteChosenPartner(strPartner)
		  )
		})
	});

	function deleteChosenPartner(sPartner){
		console.log(sPartner);

		switch(sPartner) {
		    case "kea":
		        console.log("Haps lapee");
		        $("#kea").hide();
		        break;
		    case "steels":
		        $("#steelseries").hide();
		        break;
		    case "ibm":
		        $("#ibm").hide();
		        break;
		    case "tdc":
		         $("#tdc").hide();
		        break;
		    case "html5":
		         $("#html5").hide();
		        break;
		    case "dell":
		         $("#dell").hide();
		        break;
		    case "mobilepay":
		         $("#mobilepay").hide();
		        break;
		}



	}

	// DELETE EVENT   // DELETE EVENT   // DELETE EVENT   // DELETE EVENT   // DELETE EVENT   // DELETE EVENT   // DELETE EVENT   // DELETE EVENT   

	$(".admin-delete-event").click(function(){
		swal({
		  title: 'Are you sure you want to delete?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, delete it!'
		}).then(function () {
		  swal(
		    'Deleted!',
		    'Your file has been deleted.',
		    'success'
		  ).then (function(){
		  	document.location = "index.html";
		  })
		})
	});


	// REDIRECT FROM CONTACT BTN   // REDIRECT FROM CONTACT BTN   // REDIRECT FROM CONTACT BTN   // REDIRECT FROM CONTACT BTN   

	$(".mail-view-container").click(function(){
        document.location = "volunteer.html";
    });

    // CALENDER / LIST TOGGLE   // CALENDER / LIST TOGGLE   // CALENDER / LIST TOGGLE   // CALENDER / LIST TOGGLE   // CALENDER / LIST TOGGLE   

		$(".calender-view-text").click(function(){
			$(".calender-view-img").hide();
			$(".event-row").hide();
			$(".calender-view-text").hide();
			$(".event-calendar").show();
			$(".event-calendar img").css("visibility", "visible");
			$(".calender-view-text2").show();
			$(".calender-view-img2").show();
			$(this).addClass("calender-view-container2");
			$(this).removeClass("calender-view-container2");
		});

		$(".calender-view-text2").click(function(){
			$(".calender-view-img2").hide();
			$(".event-row").show();
			$(".calender-view-text2").hide();
			$(".event-calendar").hide();
			$(".event-calendar img").css("visibility", "hidden");
			$(".calender-view-text").show();
			$(".calender-view-img").show();
			$(this).addClass("calender-view-container2");
			$(this).removeClass("calender-view-container2");
		});
	
	

		// SHOW CALENDAR FOR SPECIFIC MONTHS 

		$(".july").hide();
		$(".august").hide();
		$(".previous-month-text").hide();
		$(".next-month-text").hide();
		$(".previous-month").hide();

		$(".next-month").click(function(){
				$(".june").hide();
				$(".july").show();
				$(".previous-month").show();
				$(".next-month").hide();
		});

	$(".previous-month").click(function(){
		$(".june").show();
		$(".july").hide();
		$(".previous-month").hide();
		$(".next-month").show();
	});



	// ATTEND EVENT ON EACH EVENT   // ATTEND EVENT ON EACH EVENT   // ATTEND EVENT ON EACH EVENT   // ATTEND EVENT ON EACH EVENT   // ATTEND EVENT ON EACH EVENT   
	$(".btn-attend").click(function(){

		console.log("hej");

		swal({
		  title: 'Write your email to sign up for this event.',
			text: 'We cant wait to see you!',
		  input: 'email',
		  showCancelButton: true,
		  confirmButtonText: 'Submit',
		  showLoaderOnConfirm: true,
		  preConfirm: function (email) {
			return new Promise(function (resolve, reject) {
			  setTimeout(function() {
				if (email === 'taken@example.com') {
				  reject('This email is already taken.')
				} else {
				  resolve()
				}
			  }, 2000)
			})
		  },
		  allowOutsideClick: false
		}).then(function (email) {
		  swal({
			type: 'success',
			title: 'You are now attending!',
			html: 'We will send information to: ' + email
		  })
		})

	});


	// REMIND OF EVENT ON EACH EVENT   // REMIND OF EVENT ON EACH EVENT   // REMIND OF EVENT ON EACH EVENT   // REMIND OF EVENT ON EACH EVENT   // REMIND OF EVENT ON EACH EVENT   
	$(".btn-remind").click(function(){

		console.log("hej");

		swal({
		  title: 'Not sure if you can make it?',
			text: 'We will remind you when the event approaches. Submit your email!',
		  input: 'email',
		  showCancelButton: true,
		  confirmButtonText: 'Submit',
		  showLoaderOnConfirm: true,
		  preConfirm: function (email) {
			return new Promise(function (resolve, reject) {
			  setTimeout(function() {
				if (email === 'taken@example.com') {
				  reject('This email is already taken.')
				} else {
				  resolve()
				}
			  }, 2000)
			})
		  },
		  allowOutsideClick: false
		}).then(function (email) {
		  swal({
			type: 'success',
			title: 'We will remind you of this event!',
			html: 'We will send the reminder to: ' + email
		  })
		})

	});



	

})(jQuery);
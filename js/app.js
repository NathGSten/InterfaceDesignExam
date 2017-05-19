
(function($) {
	$(function() {
		$('input.timepicker').timepicker({
			timeFormat: 'HH:mm p',
			minTime: '7',
			maxTime: '23'
		});
	});

	$( "#new-event-datepicker" ).datepicker({
	  showWeek: true,
	  firstDay: 1
	});
	$( "#new-event-datepicker" ).datepicker( "option", "dateFormat", "d MM yy" );

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
		var description = $("#new-event-description").val();


		var aDate = date.split(' ');
		var day = aDate[0];
		var month = aDate[1].toUpperCase();
		var year = aDate[2];
		
		 var jEvent = {
		 	title: title,
		 	coverImage: coverImage,
		 	day: day,
		 	month: month,
		 	year: year,
		 	startTime: startTime,
		 	endTime: endTime,
		 	address: address,
		 	description: description
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
							<div class="event-tags">\
								<div>Html</div>\
								<div>css</div>\
								<div>JavaScript</div>\
							</div>\
							<button class="btn-event"><a href="individual_event.html">READ MORE</a></button>\
						</div>\
					</div>\
				</div>'

		sDivTemplate = sDivTemplate.replace("{{day}}", jEvent.day);
		sDivTemplate = sDivTemplate.replace("{{month}}", jEvent.month);
		sDivTemplate = sDivTemplate.replace("{{year}}", jEvent.year);
		sDivTemplate = sDivTemplate.replace("{{coverImage}}", jEvent.coverImage);
		sDivTemplate = sDivTemplate.replace("{{title}}", jEvent.title);
		sDivTemplate = sDivTemplate.replace("{{startTime}}", jEvent.startTime);
		sDivTemplate = sDivTemplate.replace("{{endTime}}", jEvent.endTime);
		sDivTemplate = sDivTemplate.replace("{{address}}", jEvent.address);
		sDivTemplate = sDivTemplate.replace("{{description}}", jEvent.description);

		$(".event-row").append(sDivTemplate);
	}


})(jQuery);
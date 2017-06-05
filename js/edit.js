$(function() { 

	$( "#edit-event-datepicker" ).datepicker({
		showWeek: true,
		firstDay: 1
	});
	$( "#edit-event-datepicker" ).datepicker( "option", "dateFormat", "d MM yy" );

	var jEvent = JSON.parse(localStorage.eventToEdit);
	console.log(jEvent);
	var aBackground = jEvent.background.split('"');
	var aTime = jEvent.time.split(" - ");

	var sDate = jEvent.date;  // format JULY 23 2017
	var aDate = sDate.split(" ");
	var month = aDate[0];
	var day = aDate[1];
	var year = aDate[2];
	var sFormattedDate = day + " " + month + " " + year;

	$("#edit-event-title").val(jEvent.title);
	$("#edit-event-datepicker").val(sFormattedDate);
	$("#edit-event-cover-image").val(aBackground[1]);
	$("#edit-event-start-time").val(aTime[0]);
	$("#edit-event-end-time").val(aTime[1]);
	$("#edit-event-address").val(jEvent.address);
	$("#edit-event-description").val(jEvent.body);

	$.each(jEvent.aTags, function(iIndex, sTag){
		$(".single-event-tag #event-" + sTag).prop("checked", true );

	});

	$(".save-event-btn").click(function(){
		
		var title = $("#edit-event-title").val();
		var coverImage = $("#edit-event-cover-image").val();
		var date = $("#edit-event-datepicker").val();
		var startTime = $("#edit-event-start-time").val();
		var endTime = $("#edit-event-end-time").val();
		var address = $("#edit-event-address").val();
		var shortDescription = $("#edit-event-short-description").val();
		var description = $("#edit-event-description").val();
		var aTags = editEventTagsArray();

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
		 	shortDescription: shortDescription,
		 	description: description,
		 	tags: aTags
		 }

		 var sEvent = JSON.stringify(jEvent);
		 localStorage.editedEvent = sEvent;

		swal(
			'Successfull adding!',
			'The event is now edited',
			'success'
		)

		setTimeout(function () {
			document.location = 'edited-event.html';
		}, 2000);
		 //window.location.href = 'edited-event.html';

	});



	function editEventTagsArray(){
		var aTags = [];
		$(".edit-event-tag:checked").each(function(index,element){
			aTags.push($(this).val());

		});
		return aTags;
	}


});

	
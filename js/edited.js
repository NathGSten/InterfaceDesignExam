$(function() { 
	var jEvent = JSON.parse(localStorage.editedEvent);
	console.log(jEvent);

	var sDate = jEvent.month + " " + jEvent.day + " " + jEvent.year;
	var sTime = jEvent.startTime + " - " + jEvent.endTime;

	$("#header-container h1").html(jEvent.title);
	$("#event-date-container p").html(sDate);
	$(".event-place-container p").html(jEvent.address);
	$("#event-time-container p").html(sTime);
	$(".event-info h4").html(jEvent.title);
	$(".event-info p").html(jEvent.description);
	$(".individual-event-tags").html("");

	$.each(jEvent.tags, function(iIndex, sTag){
		$(".individual-event-tags").append('<div class="individual-event-filters '+ sTag +'">'+sTag+'</div>');
	});

});
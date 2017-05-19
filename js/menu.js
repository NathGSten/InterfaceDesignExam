	///////////// RELEVANT FOR MENU --    START    -- ALL SHOULD HAVE THIS  /////////////

		$(".toggleNav").click( function(){
			$(".flex-nav ul").toggleClass("open");
		});

		var localTest = localStorage.setItem("firstName", "sofie");

		var checkUser = localStorage.getItem("firstName");

		console.log(checkUser);

		if (checkUser !== null){

			var changeNameTemplate =
				'<ul>\
					<li class="event-page"><a href="index.html">Events</a></li>\
					<li class="volunteer-page"><a href="volunteer.html">Get Involved</a></li>\
					<li class="volunteer-page"><a href="partners.html">Partners</a></li>\
					<li class="aboutUs-page"><a href="about.html">About Us</a></li>\
					<li class="makeAdmin-page"><a href="new-admin.html">Make new admin</a></li>\
					<li class="logOut"><a href="logout.html">Log out</a></li>\
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

		 ///////////// RELEVANT FOR MENU --    END    -- ALL SHOULD HAVE THIS  /////////////
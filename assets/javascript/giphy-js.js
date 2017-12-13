// Initial array of artists
	var artists = ["Camila Cabello", "Kygo", "Guns N Roses", "Klingande", "The Weeknd", "Drake", "Rihanna", "Nirvana"];

// display displayArtistGif function re-renders the HTML to display the appropriate content
	function displayArtistGif () {
		var artists = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artists + "&limit=10&api_key=RPxQK6gdY7RI33Zyt9U3jnUf9aZOocKu";
		console.log("Artist: " + artists);
		console.log("queryURL: " + queryURL);

// AJAX call for the specific button being clicked 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

// div to hold all the gifs 
	dAll = $("<div>");

// For loop to append a button for each string in the array
	for (var i = 0; i < 10; i++) {

// div to hold the gif 
	dTag = $("<div class='gifs'>");

// Create div to hold and display the rating 
	dRating = $("<div>");
	dRating.append ("Rating:" + response.data[i].rating);

//Create div to hold and display the gif
	dGif = $("<div>");

	var image = $("<img class='gif' data-state='still'>");
		image.attr("src", response.data[i].images.fixed_height_still.url);
		image.attr("data-still", response.data[i].images.fixed_height_still.url);
		image.attr("data-animate", response.data[i].images.fixed_height.url)

	dGif.append(image)

			
//put the div dTag together
	dTag.append(dRating);
	dTag.append(dGif);
	dAll.append(dTag);

	}

		$("#gifDiv").html(dAll);

	}); // ends AJAX call

} // ends displayArtistGif function


//Function to render buttons
	function renderButtons() {

//Empties the div
	$("#buttons-view").empty();

//Loops through the array of artists
	for (var i = 0; i < artists.length; i++) {
		var a = $("<button class='artist'>");
		a.attr("data-name", artists[i]);
		a.text(artists[i]);
		$("#buttons-view").append(a);
	}

} //end of renderButtons function


//Function for add artist button
$("#add-artist").on("click", function(event) {

	event.preventDefault();
	var artist = $("#artist-input").val().trim();
	artists.push(artist);
	renderButtons();

}); // ends add artist button


//  click event listener 
$(document).on("click", ".artist", displayArtistGif);


//animate on click
$(document).on("click", ".gif", function() {

	var state = $(this).attr("data-state");
	var animateUrl = $(this).attr("data-animate");
	var stillUrl = $(this).attr("data-still");

	if (state === "still") {
		$(this).attr("src", animateUrl);
		$(this).attr("data-state", "animate");
	}

	if (state === "animate") {
		$(this).attr("src", stillUrl);
		$(this).attr("data-state", "still")
	}

}); // ends animate on click


//renders buttons on load
renderButtons();
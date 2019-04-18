// Initial array of reactions
var reactions = ["excited", "confused", "omg", "ouch", "aww", "nervous", "lol"]
// Create a function that re-renders HTML to have appropriate content
function displayReactionGifs() {
    $("#reactions-go-here").empty();
    var reaction = $(this).attr("reaction-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response.data;
        console.log(response);
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var newP = $("<p>").text("Rating: " + rating);
            var reactionImage = $("<img>");
            reactionImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(newP);
            gifDiv.append(reactionImage);

            $("#reactions-go-here").append(gifDiv);

        }

    });

}

function renderButtons() {
    // added to avoid repeat buttons
    $("#reaction-buttons").empty();
    // creating for loop generating buttons for each reaction in the array, adding class, attribute, text, and appending to page
    for (var i = 0; i < reactions.length; i++) {
        var button = $("<button>");
        button.addClass("reaction-btn");
        button.attr("reaction-name", reactions[i]);
        button.text(reactions[i]);
        $("#reaction-buttons").append(button)
    }
}



// Create a function that events when someone submits a reaction
$("#find-gifs").on("click", function(event) {
    // prevent default
    event.preventDefault();
    // Grab input from textbox
    var reaction = $("#reaction-input").val().trim();
    // Add movie from textbox into array
    reactions.push(reaction);
    // call renderButtons which handles the processing of our movie array
    renderButtons();
});

// Add an event listener to all the elements with a class of "reaction-btn"
$(document).on("click", ".reaction-btn", displayReactionGifs)
// call renderButtons to display initial buttons
renderButtons();
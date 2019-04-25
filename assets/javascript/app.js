// Initial array of reactions
var reactions = ["excited", "confused", "omg", "ouch", "aww", "nervous", "lol"]
// Create a function that re-renders HTML to have appropriate content
function displayReactionGifs() {
    // empties any previous gifs on the page
    $("#reactions-go-here").empty();
    var reaction = $(this).attr("reaction-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=qmkqohWJ6egnDPXUnYEw9vsuunWnzqHH&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // creating a variable for the info we care about
        var results = response.data;
        console.log(response.data);
        for (var i = 0; i < results.length; i++) {
            // creating divs for each gif and adding attributes
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var newP = $("<p>").text("Rating: " + rating);
            var reactionImage = $("<img>");
            reactionImage.attr("src", results[i].images.fixed_height_still.url);
            reactionImage.attr("data-still", results[i].images.fixed_height_still.url);
            reactionImage.attr("data-animate", results[i].images.fixed_height.url);
            reactionImage.attr("data-state", "still");
            reactionImage.addClass("gif");

            gifDiv.append(newP);
            gifDiv.append(reactionImage);

            $("#reactions-go-here").append(gifDiv);

        }

    });

}

// function that puts reaction buttons on the page
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


// Function that creates a new button when user submits a reaction
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

// Adds gif divs to page on click of reaction button
$(document).on("click", ".reaction-btn", displayReactionGifs)
// call renderButtons to display initial buttons
renderButtons();

// Toggles between still and animate on click of gif
$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
        if (state === "still") {
            var animateValue = $(this).attr("data-animate")
             $(this).attr("src", animateValue);
             $(this).attr("data-state", "animate")
        }
        if (state === "animate") {
            var animateValue = $(this).attr("data-still")
            $(this).attr("src", animateValue);
            $(this).attr("data-state", "still")
        }
})
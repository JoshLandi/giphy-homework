//Button generation on page load and by user
    //Initial genre array
    var genres = ["Country", "Heavy Metal", "Pop"];

    function createButtons() {

        $("#buttonDiv").empty();

        for (var i = 0; i < genres.length; i++){

            var b = $("<button>");

            b.addClass("genreClass");
            b.addClass("btn btn-dark");
            b.attr("data-genre", genres[i] + " music");
            b.text(genres[i]);
            $("#buttonDiv").append(b);

            console.log(b.data("genre"));
        };

    };
    //Connecting HTML Add button to JS function
    $("#add-genre").on("click", function(event){

        event.preventDefault();

        var genre = $("#genre-input").val().trim();

        genres.push(genre);

        createButtons();
    });

createButtons();

//_______________________________________________________________________________________________________________

//AJAX call to retrieve gifs from GIPHY
$(".genreClass").on("click", function(){

    var bGenre = $(this).attr("data-genre");
    console.log(this);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    bGenre + "&api_key=dc6zaTOxFJmzC&limit=10";
//AJAX call to GIPHY
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {

        console.log(queryURL);
        console.log(response);

        var results = response.data;
//Creating and appending each gif
        for (var i = 0; i < results.length; i++) {

            var genreImage = $("<img style='margin:2px;'>");

            genreImage.attr("src", results[i].images.fixed_height.url);

            $("#gifDiv").prepend(genreImage);
        };
      });

});
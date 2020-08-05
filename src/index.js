/**
 * es6 modules and imports
 */
const $ = require('jquery');
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
$(function () {
    let $title = $("#title");
    let $rating = $("#rating");
    let $genre = $("#genre");
//Changed the Single quotes to double quotes from Lines 13-15

//Movie List
    getMovies().then((movies) => {
        $("#display").html('Here are all the movies:');

        //Added "genre" to the end of the forEach on Line 23, in order for it to be defined and show on the HTML
        movies.forEach(({title, rating, id, genre}) => {
            $("#results").append(`<li>${id} - ${title} - ${rating} - ${genre} </li>`);
            $("#results").css('color', 'red');
        });
    })
    //     .catch((error) => {
    //     alert('Oh no! Something went wrong.\nCheck the console for details.')
    //     console.log(error);
    // });
//Function for Form & Submit Event
    $("#submit").on('click', (function () {

            let movie = {
                title: $title.val(),
                rating: $rating.val(),
                genre: $genre.val(),
            };
            $.ajax({
                type: 'POST',
                url: '/api/movies',
                data: movie,
                success: function (newMovie) {
                    $("#results").append('<li>' + 'Movie: ' + "-" + newMovie.title + "-" + newMovie.rating + "-" + newMovie.genre + '</li>');
                },
                error: function () {
                    alert('error saving movie');
                }
            })
    })
    );

// Function for Loading GIF
    $(function () {
        $(".preload").fadeOut(2000, function () {
            $("#content").fadeIn(1000);
        });
    });

});
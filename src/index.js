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
    let $title = $("#title").val();
    let $rating = $("#rating").val();
    let $genre = $("#genre").val();
//Movie List
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id, genre}) => {
            $("#movieList").append(`<tr><td>${title}</td><td>${genre}</td><td>${rating}</td></tr>`);
            $("#movieList").css('color', 'green');
        });
    })
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
                    $("#movieList").append('<tr><td>' + 'Movie: </td>' + "-" + '<td> newMovie.title</td> '+ "-" + '<td>newMovie.rating </td>'+ "-" + '<td>newMovie.genre</td>' + '</tr>');
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
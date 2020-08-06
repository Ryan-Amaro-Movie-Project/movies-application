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

function loadMovies() {
    let $title = $("#title");
    let $rating = $("#rating");
    let $genre = $("#genre");
//Movie List
    $("#movieList").empty();
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id, genre}) => {
            $("#movieList").append(`<tr><td>${title}</td><td>${genre}</td><td>${rating}</td><td><button id="delete-${id}">Delete</button></td></tr>`);
            $("#movieList").css('color', 'green');
            $(`#delete-${id}`).click(() => deleteMovie(id));
        });

    })
}

loadMovies();
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
                $("#movieList").append(`<tr><td>${newMovie.title}</td><td>${newMovie.genre}</td><td>${newMovie.rating}</td><td>${newMovie.id}</td></tr>`);
            },
            error: function () {
                alert('error saving movie');
            }
        })
    })
);

function deleteMovie(id) {
    $.ajax({
        url: '/api/movies/' + id,
        method: 'DELETE',
        success: function () {
            alert("You have deleted successfully");
            loadMovies();
        },
        error: function () {
            alert('error deleting movie');
        }
    });
}


// Function for Loading GIF
$(function () {
    $(".preload").fadeOut(2000, function () {
        $("#content").fadeIn(1000);
    });
});


/**
 * es6 modules and imports
 */
const $ = require('jquery');
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
let $title = $("#title");
let $rating = $("#rating");
let $genre = $("#genre");

function loadMovies() {
//Movie List
    $("#movieList").empty();
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id, genre}) => {
            $("#movieList").append(`<tr><td>${title}</td><td>${genre}</td><td>${rating}</td><td><button type="button" class="btn btn-danger btn-sm" id="delete-${id}"><i class="fas fa-trash-alt"></i></button><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" id="edit-${id}"data-target="#myModal"><i class="fas fa-edit"></i></button></td></tr>`);
            $(`#delete-${id}`).click(() => deleteMovie(id));
            $(`#edit-${id}`).click(() => {
                $("#editTitle").val(title);
                $("#editRating").val(rating);
                $("#editGenre").val(genre);
                $("#editId").val(id)
            });
        });
    })
}

loadMovies();
//Function for Form & Submit Event
$("#submit").on('click', function (e) {
        e.preventDefault()
        let movie = {
            title: $title.val(),
            rating: $rating.val(),
            genre: $genre.val(),
        };
        fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        }).then(resp => resp.json()).then(
            function (newMovie) {
                loadMovies();
            }).catch(error => {
            alert('Could not submit, please contact Administrator')
        })
    }
);

//Delete Function
function deleteMovie(id) {
    $.ajax({
        url: '/api/movies/' + id,
        method: 'DELETE',
        success: function () {
            alert("You have deleted the movie successfully");
            loadMovies();
        },
        error: function () {
            alert('error deleting movie');
        }
    });
}

//Edit Function
function editMovie(movie) {
    fetch('/api/movies/' + movie.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    }).then(resp => resp.json()).then(
        function (newMovie) {
            loadMovies();
        }).catch(error => {
        alert('Could not Edit Successfully')
    })
}

$("#editMovie").on('click', function (e) {
        e.preventDefault()
        let movie = {
            title: $("#editTitle").val(),
            rating: $("#editRating").val(),
            genre: $("#editGenre").val(),
            id: $("#editId").val()
        };
        editMovie(movie);
    }
);
// Function for Loading GIF
$(".preload").fadeOut(2000, function () {
    $("#content").fadeIn(5000);
});



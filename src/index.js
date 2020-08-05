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
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
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

            // $("#delete").on('click', (function () {

            // let movie = {
            //     title: $title.val(),
            //     rating: $rating.val(),
            //     genre: $genre.val(),
            // };
            $("#delete").click(function (e) {
                e.preventDefault();
                let removeId = $(this).movies.id
                // This is how you get id of the file from same element using data attribute.
                $.ajax({
                    url: '/api/movies',
                    type: 'DELETE',
                    success: function (deleteMovie) {
                        ('#comment-'+id'').hide();
                        $(#comment-'+id'').css('display','none');
                    }
                });
            });


//Star Rating Function
            $(function () {
                $("div.star-rating > s, div.star-rating-rtl > s").on("click", function (e) {
                    // remove all active classes first, needed if user clicks multiple times
                    $(this).closest('div').find('.active').removeClass('active');
                    $(e.target).parentsUntil("div").addClass('active'); // all elements up from the clicked one excluding self
                    $(e.target).addClass('active');  // the element user has clicked on
                    var numStars = $(e.target).parentsUntil("div").length + 1;
                    $('.show-result').text(numStars + (numStars == 1 ? " star" : " stars!"));
                });
            });
        })
    );

// Function for Loading GIF
    $(function () {
        $(".preload").fadeOut(2000, function () {
            $(".content").fadeIn(1000);
        });
    });

});
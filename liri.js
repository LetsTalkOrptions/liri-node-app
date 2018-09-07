require("dotenv").config();

var request = require("request");
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");


var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// concert-this command
if (process.argv[2] === 'concert-this') {

    var artist = process.argv.slice(3).join(" ");
    var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    request(url, function (error, response, body) {

        var output = JSON.parse(body)[0];
        
        console.log("Name of Venue: " + output.venue.name);
        console.log("Location of Venue: " + output.venue.city);
        console.log("Date of Event: " + moment(output.datetime).format("MM/DD/YYYY"));
        
        if (error) { console.log("Error") }
    })

} else if (process.argv[2] === 'spotify-this-song') {

    // spotify-this-song command
    var song = process.argv.slice(3).join(" ");

    if (song === undefined) {
        song = "The Sign by Ace of Base";
    }

    spotify.search({ type: 'track', query: song, limit: 5 }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        // creating an array to store the data in
        var songArray = [];

        for (var x = 0; x < data.tracks.items.length; x++) {
            var songData = {

                artist: data.tracks.items[x].album.artists[0].name,
                name: data.tracks.items[x].name,
                preview: data.tracks.items[x].preview_url,
                album: data.tracks.items[x].album.name
            }
            songArray.push(songData);
        }
        console.log(songData);
    });
} else if (process.argv[2] === "movie-this") {

    // Movie-this command
  

    if (movie === undefined) {
        movie = "Mr. Nobody";
    }

    var movieUrl = "http://www.omdbapi.com/?apikey=ad3cb21a&t=" + movie + "&y=&tomatoes=true"

    request(movieUrl, function (error, response, body) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        var movie = process.argv.slice(3).join(" ");
        var movieData = JSON.parse(body);

        console.log("Title: " + movieData.Title);
        console.log("Release Year: " + movieData.Year);
        console.log("IMDB Rating: " + movieData.imdbRating);
        console.log("Rotten Score: " + movieData.tomatoRating);
        console.log("Production Country: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
    })

} else if (process.argv[2] === "do-what-it-says") {

    // Do what it says command
   
    

    fs.readFile("random.txt", "utf-8", function(error, data) {

        if (error) {
            return console.log('Error occurred: ' + error);
        }

        var randomResults = data.split(",");
        // Array where random data is stored
        var randomArray = [];
        // command being used in random.txt
        var command = randomArray[0];
        // data being pushed to command
        var randomData = randomArray[1];

        randomArray.push(command, randomData);

        console.log(randomResults)

    } )

}


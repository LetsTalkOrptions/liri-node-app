require("dotenv").config();

var request = require("request");
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

// concert-this command
if(process.argv[2] === 'concert-this') {

var artist = process.argv.slice(3).join(" ");
var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

request(url, function(error, response, body) {
    var output = JSON.parse(body)[0];
    console.log("Name of Venue: " + output.venue.name);
    console.log("Location of Venue: " + output.venue.city);
    console.log("Date of Event: " + moment(output.datetime).format("MM/DD/YYYY"));
    if(error) {console.log("Error")}
})


}
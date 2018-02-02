const dbConnection = require("../config/mongoConnection");
const user = require("../data/users");
const tracks = require("../data/tracks");
const artists = require("../data/artists"); 
const albums = require("../data/albums"); 
const request = require('request');



var SpotifyWebApi = require('spotify-web-api-node');

/**
 * This example retrives an access token using the Client Credentials Flow. It's well documented here:
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

/*
 * https://developer.spotify.com/spotify-web-api/using-scopes/
 */

 /**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */
var spotifyApi = new SpotifyWebApi({
  clientId : 'a83fad3952264dbc9a14516d9fa9ccd9',
  clientSecret : 'bb3b6f8c237f4e9ba43d12d232cd0da3',
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  }).then(() => {


spotifyApi.searchAlbums('Love')
  .then(function(data) {
    //console.log('Search artists by "Love"', data.body);
    albums.addAllAlbum(data.body.albums.items);
  }, function(err) {
    console.error(err);
  });  




spotifyApi.searchArtists('j')
  .then(function(data) {
    //console.log('Search artists by "Love"', data.body);
    artists.addAllArtist(data.body.artists.items)
  }, function(err) {
    console.error(err);
  });
    


  spotifyApi.searchTracks('x')
  .then(function(data) {
    //console.log('Search by "Love"', data.body.tracks.items);

    //body = JSON.parse(data.body.tracks.items);

    tracks.addAllTracks(data.body.tracks.items);

  }, function(err) {
    console.error(err);
  }).then(()=>{
            console.log("done");
        });
})
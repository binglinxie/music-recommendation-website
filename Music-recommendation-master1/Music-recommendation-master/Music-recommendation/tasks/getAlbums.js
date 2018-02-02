const dbConnection = require("../config/mongoConnection");
const user = require("../data/users");
const tracks = require("../data/tracks");
const artists = require("../data/artists"); 
const albums = require("../data/albums"); 
const request = require('request');

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQBksA_hz1vx98JzomCPoDGWYBZ1jcEyNVthgYDTGL4ZIgkClM8HRZDJb1slTfPs2V-wGrwhEJ655RHHdlsoOEaB0wPC4zBk2PxOBRbx2Vu8dR9jbFGPL2jndYZotzT7N_qF4gsJLpsy6TzZgoHXVAwgyJT02KvdZQ');







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
const express = require('express');
const router = express.Router();
const data = require("../data");
const trackData = data.tracks;
const request = require('request');
const passport = require('passport');
const SpotifyWebApi = require('spotify-web-api-node');


router.get("/:keyword", function(req, res) {
  //After clicking submit the data in the form will be packaged and send in req.body;
  console.log("search");
  var spotifyApi = new SpotifyWebApi({
    clientId: 'a83fad3952264dbc9a14516d9fa9ccd9',
    clientSecret: 'bb3b6f8c237f4e9ba43d12d232cd0da3',
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
    })
    .then(() => {
      let keyWord = req.params.keyword;
      // let keyWord = req.sanitize(req.params.keyword);
      //let keyWord = req.body.keyword;
      console.log(typeof(keyWord));
      let promise1 = spotifyApi.searchAlbums(keyWord);

      let promise2 = spotifyApi.searchArtists(keyWord);

      let promise3 = spotifyApi.searchTracks(keyWord);

      Promise.all([promise1, promise2, promise3])
        .then(function(datas) {
          //console.log(datas);
          let result = [];
          albumsArray = datas[0].body.albums.items.slice(0, 2);
          artistsArray = datas[1].body.artists.items.slice(0, 2);
          tracksArray = datas[2].body.tracks.items.slice(0, 2);
          result = albumsArray.concat(artistsArray).concat(tracksArray);
          res.send(result);
        });

    });
});

module.exports = router;
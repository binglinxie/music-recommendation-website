const express = require('express');
const router = express.Router();
const data = require('../data');
const artistData = data.artists;
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');
const passport = require('passport');


ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated())
		return next();
	console.log("Not authenticate");
	req.flash('error', 'You have to login first!');
	res.redirect('/login');
}

router.get("/:id", ensureAuthenticated, (req, res) => { //need to login
	//let url = 'https://api.spotify.com/v1/artists/'+req.params.id;
	let relate = [];

	var spotifyApi = new SpotifyWebApi({
		clientId: 'a83fad3952264dbc9a14516d9fa9ccd9',
		clientSecret: 'bb3b6f8c237f4e9ba43d12d232cd0da3',
	});

	// Retrieve an access token
	spotifyApi.clientCredentialsGrant()
		.then(function(data) {

			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body['access_token']);
		}, function(err) {
			console.log('Something went wrong when retrieving an access token', err.message);
		}).then(() => {

			spotifyApi.getArtistRelatedArtists(req.params.id)
				.then((data) => {
					data.body.artists.forEach((ele) => {
						relate.push(ele);
					});
					return relate;
				}, (err) => {
					done(err);
				})
				.then((relate) => {
					spotifyApi.getArtist(req.params.id)
						.then(function(data) {
							//console.log('Artist information', data.body);
							res.render('artist/single', {
								artist: data.body,
								relateartist: relate
							}); //art details as above
						}, function(err) {
							console.error(err);
						});
				});
		})

});

/*
artists: an array of artists

to get a single artist     artists.forEach(function(art)){...}


Each artist, we can obtain the data as follow:

art:
    art["_id"],                           //we don't use this property
    art["external_urls"]["spotify"]
    art["followers"]["href"]              //we don't use this property
    art["genres"]     //the result is an array of genres, 
                        to get each genre use  art["genres"][0], art["genres"][1]...

    art["href"]                           //we don't use this property
    art["id"]         //this is the id we use for searching and displaying artist
    art["images"]     //the result is an array of images, 
                        to get each image use  art["images"][0]["url"], art["images"][1]["url"],art["images"][2]["url"]  

    art["names"]     //artist name
    art["populartity"]           //this is the property we use to recommend  unlogged user
    art["type"]                           //we don't use this property
    art["uri"]                            //we don't use this property


each artist example:

{ _id: 584a6410d393b1a63376f52d,
    external_urls: { spotify: 'https://open.spotify.com/artist/6L7a6wPGpvLtTwOsMLnF1z' },
    followers: { href: null, total: 30076 },
    genres: [ 'deep big room', 'deep hardstyle', 'hardstyle' ],
    href: 'https://api.spotify.com/v1/artists/6L7a6wPGpvLtTwOsMLnF1z',
    id: '6L7a6wPGpvLtTwOsMLnF1z',
    images: [ [Object], [Object], [Object] ],
    name: 'D-Block & S-Te-Fan',
    popularity: 49,
    type: 'artist',
    uri: 'spotify:artist:6L7a6wPGpvLtTwOsMLnF1z' } ]
*/


/*
router.get("/:id", (req, res) =>{
    let url ='https://api.spotify.com/v1/artists/' +req.params.id;
	request(url, function(error, response, body) {
            if(error) console.log(error);
            console.log(body);
            if (!error && response.statusCode == 200) {
            	//body is a string
                body = JSON.parse(body);
                res.render('artist/single', { artist: body });//art details as above

            }
        })
});*/

module.exports = router;
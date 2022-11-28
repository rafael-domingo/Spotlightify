require('dotenv').config();
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const router = express.Router();

router.get('/authorizeSpotify', async (req, res) => {
    console.log('authorize')
    // const state = generateRandomString(16);
    const url = 'https://accounts.spotify.com/authorize?'
    const scope = 'user-read-private user-read-email user-top-read';        

    const redirectUrl = (url + querystring.stringify({
        response_type: 'code',
        client_id: process.env.client_id,
        scope: scope,
        redirect_uri: process.env.redirect_uri,
        dialog: 'true',
        // state: state
    }));
    
    res.json(redirectUrl);
    // next()
})

router.get('/callback', async (req, res) => {
    console.log('callback')
    console.log(req.query.code);
    console.log(req.query.state);
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: req.query.code,
            redirect_uri: process.env.redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
        },  
        json: true
    }

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            var refresh_token = body.refresh_token;

            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                json: true
            }
            request.get(options, function (error, response, body) {
                console.log(body)
            })
        }
    })
    // next();
})

module.exports = router;
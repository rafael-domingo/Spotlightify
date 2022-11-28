require('dotenv').config();
const express = require('express');
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
    next();
})

module.exports = router;
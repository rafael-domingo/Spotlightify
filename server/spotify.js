require('dotenv').config();
const express = require('express');
const QueryString = require('qs');
const router = express.Router();

router.get('/authorizeSpotify', async (req, res) => {
    console.log('authorize')
    // const state = generateRandomString(16);
    const url = 'https://accounts.spotify.com/authorize?'
    const scope = 'user-read-private user-read-email user-top-read';        

    const redirectUrl = (url + QueryString.stringify({
        response_type: 'code',
        client_id: process.env.client_id,
        scope: scope,
        redirect_uri: process.env.redirect_uri,
        dialog: 'true',
        // state: state
    }));
    res.json(redirectUrl);
})

module.exports = router;
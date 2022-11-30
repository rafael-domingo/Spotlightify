require('dotenv').config();
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const { response } = require('express');
const router = express.Router();

// get login from user
router.get('/authorizeSpotify', async (req, res) => {
    console.log('authorize')
    // const state = generateRandomString(16);
    const url = 'https://accounts.spotify.com/authorize?'
    const scope = 'user-read-private user-read-email user-top-read user-library-read';        

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

// obtain access and refresh tokens
router.get('/callback', async (req, res) => {
    console.log('callback')
    console.log(req.query.code);
    console.log(req.query.state);
    if (req.query.code) {
        const url = 'https://accounts.spotify.com/api/token';

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Basic ' + (new Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
        };

        fetch(url, {
            method: 'POST',
            headers,
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': req.query.code,
                'redirect_uri': process.env.redirect_uri,
            })            
        })
        .then(res => res.json())
            .then(credentials => {
                // pass tokens back to front-end through URL
                /* TO DO: store tokens as cookies */
             res.redirect(`${process.env.auth_redirect_uri}/?` +
                new URLSearchParams({
                    access_token: credentials.access_token,
                    refresh_token: credentials.refresh_token
            }));   
        })
    }

})

// get user profile
router.post('/user', async (req, res) => {
    console.log('user profile');
    const url = 'https://api.spotify.com/v1/me';
    const headers = {
        'Authorization': 'Bearer ' + req.body.access_token,
        'Content-Type': 'application/json'
    }

    fetch(url, {
        method: 'GET',
        headers,        
    })
        .then(response => response.json())
        .then(data => res.json(data))        
})

// get user top items
router.post('/userTopItems', async (req, res) => {
    console.log('user top items');
    const url = `https://api.spotify.com/v1/me/top/${req.body.type}?` + querystring.stringify({
        time_range: req.body.time_range,
        limit: req.body.limit        
    });
    const headers = {
        'Authorization': 'Bearer ' + req.body.access_token,
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'GET',
        headers,
    })
        .then(response => response.json())
        .then(data => res.json(data))
})

// get user's albums
router.post('/userLibrary', async (req, res) => {
    console.log('user albums');
    const url = `https://api.spotify.com/v1/me/${req.body.type}?` + querystring.stringify({
        limit: req.body.limit
    })
    const headers = {
        'Authorization': 'Bearer ' + req.body.access_token,
        'Content-Type': 'application/json'
    }
    console.log(url);
    fetch(url, {
        method: 'GET',
        headers
    })
        .then(response => response.json())
        .then(data => res.json(data))    
})



module.exports = router;
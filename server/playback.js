require('dotenv').config();
const express = require('express');
const querystring = require('querystring');
const router = express.Router();

// get user's queue
router.post('/queue', async (req, res) => {
    console.log('get queue');
    const url = 'https://api.spotify.com/v1/me/player/queue';
    const headers = {
        'Authorization': 'Bearer ' + req.body.access_token,
        'Content-Type': 'application/json'
    }
    
    fetch(url, {
        method: 'GET',
        headers
    })
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => console.log(error));
    
})

module.exports = router;
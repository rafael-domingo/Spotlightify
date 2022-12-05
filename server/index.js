// server/index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const path = require('path');
const spotify = require('./spotify');
const playback = require('./playback');

app.use(cors());

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res, next) => {
  console.log('hello');
  next()
})
app.use('/Spotify', spotify);
app.use('/SpotifyPlayback', playback);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
# Spotlightify

## What is it?

Spotlightify is what Spotify would look like if it shipped with a light-mode; or at lesat that's the idea. A web app that recreates the basic functionality of the Spotify desktop app but gives it a lighter color palette. It allows you to login with your Spotify account and gives you access to your library, recently played tracks, recommendations based on your listening history, and featured Spotify playlists. It also allows you to initiate playback on your Spotify account.

## Tell me more...

This project taps into the Spotify Web API to provide a new user experience that's different than the existing Spotify desktop application. It presents a lighter and brighter color palette with some interesting ideas around animations and user interface. The existing Spotify application is pretty utilitarian and this attempts to explore a more stylized version of the existing application.

# Project Status

This project is complete and no further updates will be made. It is not intended for production or third-party use.

# Screenshots

<p float="left">
<img src="/spotlightify/public/spotlightify-screenshot.png" width="400" height="300"/>
<img src="/spotlightify/public/spotlightify-screenshot-1.png" width="400" height="300"/>
<img src="/spotlightify/public/spotlightify-screenshot-2.png" width="400" height="300"/>
<img src="/spotlightify/public/spotlightify-screenshot-3.png" width="400" height="300"/>
</p>

# Installation and Setup Instructions

## Installation:

`npm install`

## To start server:

`npm start`

## To start React App:

`cd spotlightify`
`npm start`

# Tech Stack

## Front-end

- [React](https://create-react-app.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/en/main)
- [MD Bootstrap](https://mdbootstrap.com/docs/react/)
- [Sass](https://sass-lang.com/)
- [React Spotify Web Playback](https://github.com/gilbarbara/react-spotify-web-playback#readme)

## APIs

- [Spotify](https://developer.spotify.com/documentation/web-api/)

# Personal Comments

This project helped me practice calls to external APIs using the `NodeJS` runtime and also gave me an opportunity to practice using `Sass`; previously I had only used inline JSX styles when styling components. The reason I picked the Spotify API to practice on was because of its clean and easy-to-read documentation which meant I could focus on the concepts and syntax of `NodeJS`. I was able to get a better undertanding of how the `fetch` API works especially with regards to queries and searchParams. I also explored the nuances between `GET` and `POST` and obtained a better understanding of user authentication and the use of access tokens.

## Things I'm proud of

- The general look and feel of the application; it provides the levity and playfulness that I was going for.
- The structure and set-up of the `ExpressJS` code to call the Spotify API.
- The use of animations to indicate which elements can be interacted with (particularly the Play Button interface on album art and the header element on the details panel which changes on user behvaior).
- The landing page which provides a dynamic way to make a first impression on a new user.

## Things that could be improved

- The application is limited in the user's ability to access all aspects of the Spotify API. It provides at a minimum a limited selection of the user's Artists, Albuns, Tracks, and Playlists and there is no Search functionality. This was primarily due to the desire to provide a minimum shippable product and the intended purpose was to explore the Spotify API and play around with new user interface concepts. Given more time, I would like to add additional functionality to fully re-create the existing Spotify desktop experience.
- The component that handles the Spotify playback API was taken from the `React Spotify Web Playback` package. Given more time, I would have preferred to create a component from scratch so I could create a full-page Now Playing screen that has full-screen cover art and can show the user's queue.
- Since this was my first personal project that utilized `Sass`, the naming and layout of the various stylesheets were a little haphazard; improvements can be made to the naming conventions of the classNames to conform to best practices.
- Currently, the application doesn't remember whether a user has already logged in so the user has to log in everytime they reload the webpage. Ideally I would've implemented cookies to help remember a user's access and refresh tokens so they wouldn't have to do this.

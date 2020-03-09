This project was made for the University of Arkansas Spring 2020 JB Hunt Hackathon.

It was originally intended to be a Discord bot that recorded a user's voice in a voice channel, but that proved to be too difficult to accomplish, so we switched to a website to do the same thing. As a result, there's a lot of useless files and code leftover.

The idea of the project was to record a user's voice, calculate their vocal range, and then return a list of songs that they could reasonably sing. The final result did exactly that in the form of a webpage, however it wasn't very pretty.

To host this project locally, run `npm install` and then `npm start`. It should be launched on your localhost on port `env.PORT`. If you want to specify a port without setting an environment variable, you can change it in `index.js`. It was done like this to allow it to run in Heroku.

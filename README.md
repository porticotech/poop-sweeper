# Poop sweeper

Avoid the poop emoji. This project is for the workshop on Functional programming with immutable.js. The app
has been written using Reactjs with redux, however because this workshop is not about those, you
shouldn't have to worry too much if you are not familiar with them. Ask for help!

We are mostly concerned with interactions happening on the state of the game.

Please download the app, then run 

    npm install
    npm start

After a while, your browser should open with the app running

## Part 1

Find the file: 

    src/state/commands.js

Then try to use Immutable.js to write out functions:

    initializeTile
    idEachTile
    revealPoop
    revealAllPoops

## Part 2

The game is a bit sluggish, we need to speed it up. It has been intentionally slowed down in the file

    src/components/Tile.js

This should simulate the app running on a sluggish machine. Try to speed up the game by making sure tiles
are only rendered if they need to be.

## Part 3

Let's get that Undo button working!

You will need to make some changes to the way that the state is modelled


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

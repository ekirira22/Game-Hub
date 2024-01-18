# Game-Hub Phase 1 Project

### Author
Eric Maranga - Moringa School

### Installation
   1. Git clone this repository to your working directory
   2. Download tailwind dependencies. This project runs on tailwind css and vanilla JS
   3. <code>npm install tailwindcss</code> to install tailwind on your root directory
   4. Launch project from  live server to use
      #### NB:
      Whenever you make a change to css remember to compile it using <code> npm run build-css</code> . See tailwind.config.js for more

### User Stories
 1. As a user you can be able to see all available live games in  database

    <code>GET https://www.mmobomb.com/api1/games </code>
 2. As a user you can search games by platform eg. PC or Browser Platform
 
    <code>GET https://www.mmobomb.com/api1/games?platform=pc </code>
 3. A user can return details from a specific game selected from the available display of existing games
 
    <code>GET https://www.mmobomb.com/api1/game?id=452 </code>
 4. A user can see live MMO Giveaways and capacity remaining
 
    <code>GET https://www.mmobomb.com/api1/giveaways </code>
 5. A user can see like and unlike a game
 
    <code>GET https://www.mmobomb.com/api1/latestnews </code>

6. A user add a pre-order a game and it reduces pre-orders reamining
7. A user can dismiss a game from the featured game and a new randomized game is displayed

### API URL
Click here to see the API URL [API URL link](https://www.mmobomb.com/api1/games)
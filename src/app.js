//ALGORITHMIC PROCESS
const apiURL = 'https://mmo-games.p.rapidapi.com/'
const localAPI = 'http://127.0.0.1:3000/games'

const init = () =>{
        //STEP 1
        //FETCH ALL THE GAMES FROM URL AND DISPLAY THEM
    displayGameCards()
        //STEP 2 - FETCH AND DISPLAY ALL THE GIVEAWAYS
        //Fetch all the give-aways and display them
    giveAways()
        //STEP 3 - FETCH AND DISPLAY ALL GAMES FROM API URL - DISPLAY A RANDOM GAME AT FIRST, WHEN A USER SELECTS VIEW DISPLAY THAT GAME
        //STEP 4 - POST THAT DATA TO LOCAL DB.JSON ALONG WITH THE AVAILABLE PRE-ORDERS AND CURRENT ORDERS
        //STEP 5 - STORE THE GAME TO SESSIONSTORAGE TO PREVENT DATA FROM BEING LOST AFTER REFRESH AND DISPLAY THE 
        //          GAME ON THE FEATURED GAME SESSION -- PATCH,DELETE,POST WILL BE DONE ON LOCAL JSON
        //STEP 6 - ADD EVENT LISTENERS TO PRE-ORDER AND DELETE BUTTONS AND PERSIST WITH DATABASE
    featuredGame()
    

}
function featuredGame(){
        //Display a random game from the API
        //If sessionStorage is '' display random game . If it is set - Display that selected by user
    const url = `${apiURL}games`
    const method = 'GET'
    const randomNumber = Math.floor(Math.random() * 396)
    const featured = document.querySelector('div#game')

    const response = processData(url,method)
        //Display random game on page
    response.then(res => {
        const fGame = document.createElement('div')
        fGame.className = 'featured-game'
        fGame.innerHTML = `
            <img src="${res[randomNumber].thumbnail}" alt="image" class="w-full">
            <div class="m-4 relative">
                <p class="text-center">Game Details:</p>
                <p class="font-bold">${res[randomNumber].title}</p>
                <p class=" text-gray-500 text-sm">${res[randomNumber].platform} </p> <br>
                <p>Description: ${res[randomNumber].short_description}</p><br>
                <div class="text-sm text-cyan-500 space-y-2">
                    <p>Publisher: ${res[randomNumber].publisher}</p>
                    <p>Developer: ${res[randomNumber].developer}</p>
                    <p>Release Date: ${res[randomNumber].release_date}</p>
                </div>
                <div class="flex justify-between mt-4">
                <button class="play-btn" id="play"><a href="">PRE-ORDER : <span id="count">${randomNumber}</span></a></button><span class="text-gray-500 text-sm">Limited Time Offer!!</span>
                <button class="delete-btn" id="delete"><a href="">Not Interested</a></button>
                </div>
            </div>
        `
        
        featured.appendChild(fGame)

    })
}

function displayGameCards(){
    //Display 12 random games in the main html
    const url = `${apiURL}games`
    const method = 'GET'
        // let idsArray = [] = randomizer(url,method)
        // console.log(idsArray.length)

        //Display games on the main page
    const gameCard = document.querySelector('div#gamecard')
    const gamesList = processData(url,method)
    gamesList.then(games => {
        games.forEach(game => {
            const card = document.createElement('div')
            card.className = 'inner-card'
            card.innerHTML = `
                <img src="${game.thumbnail}" alt="image" class="thumbnail">
                <div class="m-4 relative">
                      <span class="font-bold">${game.title}</span>
                    <span class="block text-gray-500 text-sm">${game.platform}</span><span class="heart">&#9825;&#128147;</span>

                    <button class="card-button" id="view"><a href="">VIEW</a></button>
                </div>
                <div class="game-date">
                    <span>${game.release_date}</span>
                </div>
            `
            gameCard.appendChild(card)
            // console.log(game)
        })
    })
}
    //This function gets all give aways from api URL and displays them  
function giveAways(){
    const url = `${apiURL}giveaways`
    const method = 'GET'

    const giveaways = processData(url,method)
        //Promise returns. Display the giveaways on side menu
    const givecards = document.querySelector('div#giveaways')
    giveaways.then(res => {
        res.forEach(game => {
            const card = document.createElement('div')
            card.innerHTML = `
                <div class="give-card">
                <img src="${game.thumbnail}" alt="img1" class="w-1/4">
                <p class="truncate p-2">
                    <a href="${game.giveaway_url}">${game.title} target="_blank"</a>
                    </p>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width:${game.keys_left}"></div>
                </div>
            `
            givecards.appendChild(card)
        })
    })
}

/************** REUSABLE FUNCTIONS ****************************/
    //FUNCTION THAT FETCHES API DATA and returns 
async function processData(url,method,options=null){
    const config = {
        method : method,
        headers : {
            'X-RapidAPI-Key': 'cb2c8570d8mshe4a953cd81637f3p13b222jsn2da2a37cafb8',
		    'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
        }
    }
    try{
        const results = await fetch(url,config)

        if(!results.ok){
            console.error(results.error)
        }
        return results.json()
    }catch(error){
        console.error(error.message)
    }
}/*********************** EVENT LISTENER FUNCTIONS *************/


/******************** MAIN EVENT LISTENER *********************/

document.addEventListener('DOMContentLoaded', init)
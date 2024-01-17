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
        //STEP 3 - FETCH AND DISPLAY ALL GAMES FROM API URL
        //STEP 4 - POST THAT DATA TO LOCAL DB.JSON ALONG WITH THE AVAILABLE PRE-ORDERS AND CURRENT ORDERS
        //STEP 5 - STORE THE GAME TO SESSIONSTORAGE TO PREVENT DATA FROM BEING LOST AFTER REFRESH AND DISPLAY THE 
        //          GAME ON THE FEATURED GAME SESSION -- PATCH,DELETE,POST WILL BE DONE ON LOCAL JSON
        //STEP 6 - ADD EVENT LISTENERS TO PRE-ORDER AND DELETE BUTTONS AND PERSIST WITH DATABASE
    featuredGame()
    

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
    //FUNCTION THAT FETCHES DATA and returns 
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
}

/******************** MAIN EVENT LISTENER *********************/

document.addEventListener('DOMContentLoaded', init)
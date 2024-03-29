//ALGORITHMIC PROCESS
        //STEP 1
        //FETCH ALL THE GAMES FROM URL AND DISPLAY THEM
        //STEP 2 - FETCH AND DISPLAY ALL THE GIVEAWAYS
        //STEP 3 - FETCH AND DISPLAY ALL GAMES FROM API URL - DISPLAY A RANDOM GAME AT FIRST, WHEN A USER SELECTS VIEW DISPLAY THAT GAME
        //STEP 4 - POST THAT DATA TO LOCAL DB.JSON ALONG WITH THE AVAILABLE PRE-ORDERS AND CURRENT ORDERS
        //STEP 5 - STORE THE GAME TO SESSIONSTORAGE TO PREVENT DATA FROM BEING LOST AFTER REFRESH AND DISPLAY THE 
        //          GAME ON THE FEATURED GAME SESSION -- PATCH,DELETE,POST WILL BE DONE ON LOCAL JSON
        //STEP 6 - ADD EVENT LISTENERS TO PRE-ORDER AND DELETE BUTTONS AND PERSIST WITH DATABASE
        
const apiURL = 'https://mmo-games.p.rapidapi.com/'
const init = () =>{
        //Fetch all games and append them to cards
    displayGameCards()
        //Fetch all the give-aways and display them
    giveAways()
        //Display the feature game, or user-selected game on the featured game section
    featuredGame()
}
    /* Game Cards that display individual games */
    /* This function will display game cards, and also sort according to platform */
function displayGameCards(platform=null,category=null){
        //By default this function displays all games from index 0 - 395 in the main DOM
    const method = 'GET'
    let url
    let gamesList
        //If platform or category is null or if bothe have a value, allow it to fetch all games from index 0 - 395
    if(platform !== null && category === ''){
        let options = platform
        url = `${apiURL}games?platform=${platform}`
        gamesList = processData(url,method,options)
    }else if(category !== null && platform === ''){
        url = `${apiURL}games?category=${category}`
        gamesList = processData(url,method)
    }else if(platform !== null && category !== null){
        url = `${apiURL}games?platform=${platform}&category=${category}`
        gamesList = processData(url,method)
    }else{
        url = `${apiURL}games`
        gamesList = processData(url,method)
    }
        //Display games on the main page
    const gameCard = document.querySelector('div#gamecard')
    gamesList.then(games => {
        games.forEach(game => {
            const card = document.createElement('div')
            card.className = 'inner-card'
            card.innerHTML = `
                
                <img src="${game.thumbnail}" alt="image" class="thumbnail">
                <div class="m-4 relative">
                    <span class="font-bold">${game.title}</span>
                    <span class="block text-gray-500 text-sm">Platform: ${game.platform}</span>
                    <span class="block text-gray-500 text-sm">Category: ${game.genre}</span>
                    <span class="heart" id="heart">♡</span>

                    <button class="card-button" id="view"><a href="#game">VIEW</a></button>
                </div>
                <div class="game-date">
                    <span>${game.release_date}</span>
                </div>
            `
            /* Event Listeners */
            card.querySelector('button#view').addEventListener('click', () => {
                    ///Pass the id to featured game to post the id
                const id = game.id
                    //Remove existing card and pass it to the function
                document.querySelector('div.featured-game').remove()
                featuredGame(id)
            })
                //Swicth hearts when user selects
            card.querySelector('span#heart').addEventListener('click', e => {
                let heartSwitcher = {
                    "♡" : "❤",
                    "❤" : "♡",
                    '' : 'red',
                    'red' : ''
                }
                e.target.textContent = heartSwitcher[e.target.innerText]
                e.target.style.color = heartSwitcher[e.target.style.color]
            })
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
    //This function first displays a random game, it also handles a game that the user has selected
async function featuredGame(id=null){
    let indx
        //Display a random game from the API
    let url = `${apiURL}games`
    const method = 'GET'
    if(id!==null){
            //Search for the index of the game and save it to indx
        const url = `${apiURL}games`
        const method = 'GET'
        const response = await processData(url,method)
        const obj = response.find(game => {
            return game.id === id
        })
        indx = response.indexOf(obj)
    }else{
        indx = Math.floor(Math.random() * 396) //Theres a total of 396 games
    }
    const featured = document.querySelector('div#game')

    const response = processData(url,method)
        //Display random game on page
    response.then(res => {
        const fGame = document.createElement('div')
        fGame.className = 'featured-game'
        fGame.innerHTML = `
            <img src="${res[indx].thumbnail}" alt="image" class="w-full">
            <div class="m-4 relative">
                <p class="text-center">Game Details:</p>
                <p class="font-bold">${res[indx].title}</p>
                <p class=" text-gray-500 text-sm">Platform: ${res[indx].platform} </p> <br>
                <p>Description: ${res[indx].short_description}</p><br>
                <div class="text-sm text-cyan-500 space-y-2">
                    <p>Publisher: ${res[indx].publisher}</p>
                    <p>Developer: ${res[indx].developer}</p>
                    <p>Release Date: ${res[indx].release_date}</p>
                </div>
                <div class="flex justify-between mt-4">
                <button class="play-btn" id="play">PRE-ORDER : <span id="count">${indx}</span></button><span class="text-gray-500 text-sm">Limited Time Offer!!</span>
                <button class="delete-btn" id="delete"><a href="#game">Not Interested</a></button>
                </div>
            </div>
        `
            /* Event Listeners */
                //Checks if orders are below 0 to disable
        fGame.querySelector('button#play').addEventListener('click', e => {
            let orders = parseInt(e.target.children[0].innerText)
                //Gray out button and display sold out for orders at 0
                if(orders <= 0){
                    e.target.textContent = 'SOLD-OUT'
                    e.target.setAttribute('disabled', '')
                    e.target.style.opacity = 0.5
                }else{
                orders-=1
                e.target.children[0].innerText = orders
                alert('Thank you for Pre-Ordering with GameHub')  
                }          
        })

        fGame.querySelector('button#delete').addEventListener('click', () => {
            fGame.remove()
            featuredGame()
        })
        featured.appendChild(fGame)
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
        //Check if options value has a value. If it has add to headers section
        if(options !== null){
            config.headers.platform = options
        }
        const results = await fetch(url,config)

        if(!results.ok){
            console.error(results.error)
        }
        return results.json()
    }catch(error){
        console.error(error.message)
    }
}/*********************** EVENT LISTENER FUNCTIONS *************/
document.querySelector('form#myform').addEventListener('submit', e => {
    e.preventDefault()
    const platform = e.target.platform.value
    const category = e.target.category.value
        //Clear the existing display
    document.querySelector('div#gamecard').innerHTML = ''
        //Pass the value to our displayCards()
    displayGameCards(platform,category)
    document.querySelector('form#myform').reset()
})
/******************** MAIN EVENT LISTENER *********************/
document.addEventListener('DOMContentLoaded', init)
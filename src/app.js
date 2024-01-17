//ALGORITHMIC PROCESS
const apiURL = 'https://mmo-games.p.rapidapi.com/games'
const init = () =>{
    //STEP 1
    //FETCH ALL THE GAMES FROM URL AND DISPLAY THEM
    displayGames()

}

function displayGames(){
    fetch(apiURL, {
        method : 'GET',
        headers: {
            'X-RapidAPI-Key': 'cb2c8570d8mshe4a953cd81637f3p13b222jsn2da2a37cafb8',
            'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
        }
    }).then(res =>res.json()).then(resp => console.log(resp[1]))
}

/************** REUSABLE FUNCTIONS ****************************/
    //FUNCTION THAT FETCHES DATA
async function processData(url,method,obj=null){
    try{
        const config = {
            method : method,
            headers : {
                'Content-Type' : 'applicatin/json',
                Accept : 'application/json'
            }
    
        }

        const result = await fetch(url,config)

        if(!result.ok){
            console.error(result.error)
        }

        return result.json()
    }catch(error){
        console.error(error.message)
    }
}

/******************** MAIN EVENT LISTENER *********************/

document.addEventListener('DOMContentLoaded', init)
//ALGORITHMIC PROCESS
const apiURL = 'https://mmo-games.p.rapidapi.com/'
const init = () =>{
    //STEP 1
    //FETCH ALL THE GAMES FROM URL AND DISPLAY THEM
    displayGames()

}

function displayGames(){
   
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
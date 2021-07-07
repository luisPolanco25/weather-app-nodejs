require('dotenv').config();


const { readInput, inquirerMenu, pause, listPlaces } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async() => {

    const searches = new Searches();
    let opt;
    
    
    do {
        
        opt = await inquirerMenu();

        switch(opt) {
            case 1:
                // Show message
                const searchedTerm = await readInput('City: ');

                // Search place
                const places = await searches.city(searchedTerm);
                
                // Select place
                const id = await listPlaces(places);
                if (id === '0') continue;

                const selectedPlace = places.find(p => p.id === id);
                
                // Save in DB
                searches.addToHistory(selectedPlace.name);
                
                // Weather
                const weather = await searches.cityWeather(selectedPlace.lng, selectedPlace.lat);
                
                // Show result
                console.clear();
                console.log('\nCity\'s information\n'.green);
                console.log('City:', selectedPlace.name);
                console.log('Lat:', selectedPlace.lat);
                console.log('Lng:', selectedPlace.lng);
                console.log('Temperature:', weather.temp);
                console.log('Min:', weather.min);
                console.log('Max:', weather.max);
                console.log('How the weather is:', weather.desc);
            break;

            case 2:
                searches.historyCapitalized.forEach((place, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${place}`);
                });
            break;
        }
        

        if (opt !== 0) await pause();

    } while (opt !== 0);

}

main();
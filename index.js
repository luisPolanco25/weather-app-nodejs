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
                const selectedPlace = places.find(p => p.id === id);
                
                // Weather

                // Show result

                console.log('\nCity\'s information\n'.green);
                console.log('City:', selectedPlace.name);
                console.log('Lat:', selectedPlace.lat);
                console.log('Lng:', selectedPlace.lng);
                console.log('Temperature:', );
                console.log('Min:', );
                console.log('Max:', );
            break;
        }
        

        if (opt !== 0) await pause();

    } while (opt !== 0);

}

main();
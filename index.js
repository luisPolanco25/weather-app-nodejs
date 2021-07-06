require('dotenv').config();


const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async() => {

    const searches = new Searches();
    let opt;
    
    
    do {
        
        opt = await inquirerMenu();

        switch(opt) {
            case 1:
                // Show message
                const place = await readInput('City: ');
                await searches.city(place);

                // Search place

                // Select place
                
                // Weather

                // Show result

                console.log('\nCity\'s information\n'.green);
                console.log('City:', );
                console.log('Lat:', );
                console.log('Lng:', );
                console.log('Temperature:', );
                console.log('Min:', );
                console.log('Max:', );
            break;
        }
        

        if (opt !== 0) await pause();

    } while (opt !== 0);

}

main();
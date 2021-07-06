const inquirer = require('inquirer');
require('colors');


const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.yellow} Search city`
            },
            {
                value: 2,
                name: `${'2.'.yellow} History`
            },
            {
                value: 0,
                name: `${'0.'.yellow} Exit`
            }

        ]
    }
];


const inquirerMenu = async() => {
    console.clear();

    console.log('=========================='.green);
    console.log('    Select an option    '.yellow);
    console.log('==========================\n'.green);

    const {option} = await inquirer.prompt(questions);

    return option;

}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `To continue press ${'ENTER'.green}`

        }
    ]; 
    
    console.log(`\n`);
    await inquirer.prompt(question);

    
}


const readInput = async (message) => {
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please type the name of a city'
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
    
}

const listPlaces = async(places = []) => {

    const choices = places.map((place, i) => {
        
        const index = `${i + 1}.`.green;
        
        return {
            value: place.id,
            name: `${index} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancel'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select city',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;

}

const confirm = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;

}

const showChecklist = async(tasks = []) => {

    const choices = tasks.map((task, i) => {
        
        const index = `${i + 1}.`.green;
        
        return {
            value: task.id,
            name: `${index} ${task.desc}`,
            checked: (task.completedIn) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(questions);
    return ids;

}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showChecklist
}
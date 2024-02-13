const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const inquirer_import = import("inquirer");
// const inquirer = inquirer_import.default
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let teamData

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const getTeamManager = async () => {
    const data = await inquirer.prompt([
        {
            message: "What is the team manager's name?",
            type: 'input',
            name: 'name'
        },
        {
            message: "What is their employee ID?",
            type: 'input',
            name: 'id'
        },
        {
            message: "What is their email address?",
            type: 'input',
            name: 'email'
        },
        {
            message: "What is their office number?",
            type: 'input',
            name: 'officeNumber'
        },
    ])
    const manager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
    )
    teamData.push(manager)
}

const menu = {
    'Add an engineer': async () => {
        let data = await inquirer.prompt([
            {
                message: "What is the engineer's name?",
                type: 'input',
                name: 'name'
            },
            {
                message: "What is their employee ID?",
                type: 'input',
                name: 'id'
            },
            {
                message: "What is their email address?",
                type: 'input',
                name: 'email'
            },
            {
                message: "What is their github username?",
                type: 'input',
                name: 'github'
            },
        ])
        let engineer = new Engineer(
            data.name,
            data.id,
            data.email,
            data.github
        )
        teamData.push(engineer)
        addMenu()
    },
    'Add an intern': async () => {
        let data = await inquirer.prompt([
            {
                message: "What is the intern's name?",
                type: 'input',
                name: 'name'
            },
            {
                message: "What is their employee ID?",
                type: 'input',
                name: 'id'
            },
            {
                message: "What is their email address?",
                type: 'input',
                name: 'email'
            },
            {
                message: "What is their school?",
                type: 'input',
                name: 'school'
            },
        ])
        let intern = new Intern(
            data.name,
            data.id,
            data.email,
            data.school
        )
        teamData.push(intern)
        addMenu()
    },
    'Finish building the team': async () => {
        const html = render(teamData)
        fs.writeFileSync(outputPath, html)
        console.log("All done!")
    }
}

const addMenu = async () => {
    const data = await inquirer.prompt([
        {
            message: 'What would you like to do?',
            type: 'list',
            name: 'choice',
            choices: [
                'Add an engineer',
                'Add an intern',
                'Finish building the team'
            ]
        }
    ])
    menu[data.choice]()
}

const start = async () => {
    teamData = []
    const inquirer_import = await import("inquirer");
    globalThis.inquirer = inquirer_import.default
    await getTeamManager()
    await addMenu()
}

start()

/*
        node index

        
*/


const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require ('./lib/questions');
const chalk = require('chalk'); //outputs color
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");
const team = []; // array to contain all employees

// Function to ask questions to collect data + pass it to render function
const askForTeamInfo = async () => {
    //Ask what type of employee want to add to team
    return await inquirer.prompt(questions.role)
    .then(type => {
        if(type.role !== 'generate'){ //if generate option selected then call render function
            // if not then ask employee based questions
            askEmployeeInfo(type);
        } else {
            // Ask if user wants to add Team Name
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'yesNo',
                    message: 'Would you like to add team Name? ',
                },
                {
                    type: 'input',
                    name: 'teamName',
                    message: `What is your team's Name? `,
                    when: (answer) => {
                        return answers.yesNo;
                    },
                }
            ])
            .then(answer => {
                console.log(chalk.yellow(`\nGenerating Team's Web page...`));
                let teamName = '';
                if (answer.teamName) {
                    team = ' - ' + answer.teamName;
                }
            // Call render function to generate html page
            const html = render(team, teamName);
            saveFile(html); // save rendered html to file    
            });
        }
    });
}

// Function to ask more questions based on employee type
const askEmployeeInfo = async (type) => {
    console.log(chalk.yellow('-').repeat(60)); // Print yellow divider line in console
    return await inquirer.prompt(questions.employee)
    .then(employeeInfo => {
        // Ask additional questions based on role
        inquirer.prompt(questions[type.role])
        .then(roleAnswer => {
            let allAnswers = {...employeeInfo, ...roleAnswer};
            console.log('\n');
            // Based on role, create an Employee object with it's respective class
            // Push all employee objects into team array
            const { name, id, email, officeNumber, github, school} = allAnswers;
            switch (type.role) {
                case 'manager':
                    team.push(new Manager(name, id, email, officeNumber));
                    askForTeamInfo();
                    break;
                case 'engineer':
                    team.push(new Engineer(name, id, email, github));
                    askForTeamInfo();
                    break;
                case 'intern':
                    team.push(new Intern(name, id, email, school));
                    askForTeamInfo();
                    break;
            }
            return allAnswers;
        })
    })
}

// Function to save generated html to hdd
const saveFile = (html) => {
    // Check if output directory exists and create one if it doesn't
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, html, (err) =>
        err ? console.error(chalk.red(err)) : console.log(chalk.green('file successfully saved ') + chalk.cyan('team.html') + chalk.green(' to output directory :)'))
    );
}

//Start app 
console.log(chalk.cyan('\n=== Welcome to your ') + chalk.cyan.bold('Team Profile Summary ') + chalk.cyan('web page generator ===\n'));
askForTeamInfo();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

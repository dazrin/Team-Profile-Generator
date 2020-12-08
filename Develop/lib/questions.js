const inquirer = require('inquirer');

module.exports = questions = {
    role: [
        {
            type: 'list',
            name: 'role',
            message: 'Which role Employee would you like to add or finish?',
            choices: [
                {
                    name: "Manager",
                    value: "manager"
                },
                {
                    name: "Engineer",
                    value: "engineer"
                },
                {
                    name: "Intern",
                    value: "intern"
                },
                {
                    name: "Finish = Generate Web page",
                    value: "generate"
                }
            ],
        }
    ],
    
    employee: [
        {
            type: "input",
            name: "name",
            message: "Please enter Employee Name: ",
            validate: (answer) => {
                if(!answer) {
                    return "Name input value is required. Please enter Employee name: "
                }
                return true;
            },
        },
        {
            type: "input",
            name: "id",
            message: "Please provide the Employee's ID",
            // Check if ID exists / equals a number
            validate: (value) => {
                if(/\d/.test(value)) {
                    return true;
                }
                return "Employee ID value must be a number. Please enter Employee ID";
            },
        },
        {
            type: "input",
            name: "email",
            message: "Please provide the Employee's email",
            // validate that email is entered in correct email format
            validate: (value) => {
                var pass = value.match(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
                if (pass) {
                    return true;
                }
                return "Employee email value is required. Please enter a valid email.";
            },
        },
    ],
    manager: [
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's Office Number? ",
            validate: (value) => {
                if(/\d/.test(value)) {
                    return true;
                }
                return "Office Number value must be a number. Please enter the Manager's Office number: ";
            },
        },
    ],
    engineer: [
        {
            type: "input",
            name: "github",
            message: "What is the Engineer's Github profile name?",
            validate: (answer) => {
                if(!answer){
                    return "Engineer github profile name is required. Please enter the engineer's github profile name: ";
                }
                return true;
            },
        },
    ],
    intern: [
        {
            type: "input",
            name: "school",
            message: "What is the name of the Intern's School?",
            validate: (answer) => {
                if (!answer) {
                    return "Intern School Name is required. Please enter name of the Intern's School: ";
                }
                return true;
            },
        },
    ],
}
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "lionheart56!",
    database: "management_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startManagement();
});

function startManagement() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "CREATE a Department",
                "VIEW a single Department",
                "VIEW All Departments",
                "CREATE an Employee",
                "VIEW an Employee",
                "VIEW all Employees",
                "VIEW the Role of an Employee",
                "UPDATE the Role of an Employee",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {

                case "CREATE a Department":
                    createDepartmentPrompt();
                    break;

                case "VIEW a single Department":
                    readDepartment();
                    break;

                case "VIEW All Departments":
                    readAllDepartments();
                    break;

                case "CREATE an Employee":
                    createEmployeePrompt();
                    break;

                case "VIEW an Employee":
                    readEmployee();
                    break;

                case "VIEW all Employees":
                    readAllEmployees();
                    break;

                case "VIEW the Role of an Employee":
                    readEmployeeRole();
                    break;

                case "UPDATE the Role of an Employee":
                    updateRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function createDepartmentPrompt() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "What is the name of your department?"
    })
        .then(function (answer) {
            console.log("Inserting a new department...\n");
            const query = connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " department inserted!\n");
                })
        }),

        console.table(department);

}


function readDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What department would you like to view?"
        })
        .then(function (answer) {
            const query = "";

            connection.query(query, [""],
                function (err, res) {
                    console.table(answer.department);

                    startManagement();
                });
        });
};

function readAllDepartments(answer) {

    const query = "";
    connection.query(query, { department: answer.department }, function (err, res) {
        console.table(query)

        startManagement();
    });
    ;
};



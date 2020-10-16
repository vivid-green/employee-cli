const queries = require("./config/queries");
const questions = require("./questions");
const inquirer = require("inquirer");
require("console.table");
let helloMsg = true;

const askAction = () => {
    return inquirer.prompt(questions.actions);
}

const askTable = ({action} = actions) => {
    return new Promise((resolve,reject) => {
        if(action === "exit") return resolve(action);
        const answers = {action: action};
        questions.tables.message = `What would you like to ${action}?`;
        inquirer.prompt(questions.tables).then(({table} = tables) => {
           answers.table = table;
           resolve(answers);
        }).catch(err => console.log(err));
    })
}

const tableAction = (data) => {
    return new Promise((resolve,reject) => {
        if(data === "exit") return resolve(data);
        const {table,action} = data;

        if(action === "view") {
            if(table === "employee") {
                return new Promise((resolve,reject) => {
                    queries.viewTable("employee_info")
                    .then(data => resolve(data))
                    .catch(err => reject(err));
                }).then(results => resolve(results)).catch(error => reject(error));
            } else {
                return new Promise((resolve,reject) => {
                    queries.viewTable(table)
                    .then(data => resolve(data))
                    .catch(err => reject(err));
                }).then(results => resolve(results)).catch(error => reject(error));
            }
        }
        
        if(action === "add" && table === "employee") {
            return new Promise((resolve,reject) => {
                queries.viewEmployees()
                .then(data => {
                    const managers = data.map(({name} = person) => name);
                    queries.viewRoles()
                    .then(data => {
                        const roles = data.map(({title} = row) => title);
                        resolve({managers: managers, roles: roles});
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            }).then(({roles, managers} = results) => {
                inquirer.prompt(questions.addEmployee(roles,managers)).then(answers => {
                    let name = answers.manager_id.split(" ");
                    queries.employeeIdByName(name[0],name[1]).then(data => {
                        // console.log(data[0].id);
                        answers.manager_id = data[0].id;
                        queries.roleIdByTitle(answers.role_id).then(data => {
                            answers.role_id = data[0].id;
                            queries.add(table,answers).then(results => {
                                if(!results.affectedRows) reject("No Rows have been Inserted.");
                                resolve(action);
                            }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                }).catch(error => reject(error));
            }) 
        }

        if(action === "add" && table === "role") {
            return new Promise((resolve,reject) => {
                queries.viewDepartments()
                .then(data => {
                    const departments = data.map(({name} = row) => name);
                    resolve(departments);
                }).catch(err => reject(err));
            }).then(departments => {
                inquirer.prompt(questions.addRole(departments)).then(answers => {
                    queries.deptIdByName(answers.department_id).then(data => {
                        answers.department_id = data[0].id;
                        queries.add(table,answers).then(results => {
                            if(!results.affectedRows) reject("No Rows have been Inserted.");
                            resolve(action);
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }).catch(error => reject(error));
        }

        if(action === "add" && table === "department") {
            inquirer.prompt(questions.addDepartment).then(answers => {
                queries.add(table,answers).then(results => {
                    if(!results.affectedRows) reject("No Rows have been Inserted.");
                    resolve(action);
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
        if(action === "delete" && table === "employee") {
            return new Promise((resolve,reject) => {
                queries.viewEmployees()
                .then(data => {
                    // console.log(data);
                    const employees = data.map(({name} = person) => name);
                    // console.log(employees);
                    resolve(employees);
                }).catch(err => reject(err));
            }).then(results => {
                // console.log(results);
                inquirer.prompt(questions.delete(results)).then(answers => {
                    let name = answers.name.split(" ");
                    return queries.employeeIdByName(name[0],name[1]).then(data => {
                        // console.log(data[0].id);
                        answers.name = data[0].id;
                        queries.delete(table,"id",answers.name).then(results => {
                            if(!results.affectedRows) reject("No Rows have been Inserted.");
                            resolve(action);
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                }).catch(error => reject(error));
            }).catch(err => console.log(err));
        } else if(action === "delete") {
            return new Promise((resolve,reject) => {
                let column;
                switch (table) {
                    case "department":
                        column = "name";
                        break;
                    case "role":
                        column = "title";
                    default:
                        break;
                }
                queries.viewField(column,table).then(data => {
                    resolve({column: column, data: data});
                })
            }).then(results => {
                return new Promise((resolve) => {
                    const list = results.data.map(row => {
                        return row[results.column];
                    });
                    resolve({column: results.column, list: list});
                })
            }).then(data => {
                inquirer.prompt(questions.delete(data.list))
                .then(answers => {
                   queries.viewIdByField(table,data.column,answers.name)
                   .then(data => {
                       queries.delete(table,"id",data.data[0].id)
                       .then(results => {
                       }).catch(err => console.log(err));
                       resolve(action);
                   }).catch(err => console.log(err));
                })
            });
        }
    }).catch(err => console.log(err));
}

const runPrompt = () => {
    if(helloMsg) {
        console.log("\nHELLO!\n");
    }
    askAction()
    .then(askTable)
    .then(tableAction)
    .then(results => {
        switch (results) {
            case "add":
                runPrompt();
                break;
            case "exit":
                console.log("\nGOODBYE!\n");
                break;
            case "delete":
                runPrompt();
                break;

            default:
                console.log("\n")
                console.table(results);
                console.log("\n");
                runPrompt()
                break;
        }
    }).catch(err => console.log(err));
    helloMsg = false;
}

runPrompt();

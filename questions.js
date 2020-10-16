const action = ["View","Add","Delete","Exit"];
const tables = ["Employee", "Role", "Department"];

const questions = {
    actions: {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: action,
        filter: function (val) {
            return val.toLowerCase().trim();
        },
    },
    tables: {
        type: "list",
        name: "table",
        choices: tables,
        filter: function (val) {
            return val.toLowerCase().trim();
        },
    },
    addEmployee: function(roles,managers) {
        const questions = [
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "role_id",
                choices: roles,
                message: "What is the employee's role?"
            },
            {
                type: "list",
                name: "manager_id",
                choices: managers,
                message: "Who is the employee's manager?"
            }
        ];
        return questions;
    },
    addRole: function(departments) {
        const questions = [
            {
                type: "input",
                name: "title",
                message: "What is the role title?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the role salary?"
            },
            {
                type: "list",
                name: "department_id",
                choices: departments,
                message: "What is the role department?"
            }
        ];
        return questions;
    },
    addDepartment: {
            type: "input",
            name: "name",
            message: "What is the department name?"
    },
    delete: function(list) {
        const questions = [
            {
                type: "list",
                name: "name",
                choices: list,
                message: "Which record should be deleted?"
            },
        ];
        return questions;
    },
    update: function(employees,roles) {
        const questions = [
            {
                type: "list",
                name: "employee",
                choices: employees,
                message: "Which employee would you like to update?"
            },
            {
                type: "list",
                name: "role",
                choices: roles,
                message: "What is the new employee role?"
            },
        ];
        return questions;
    }
}

module.exports = questions;




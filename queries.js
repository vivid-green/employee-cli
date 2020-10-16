const connection = require("./connection");

const queries = {
    viewTable: function(table) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT * FROM ??"
            connection.query(queryString,[table], (err, data) => {
              if (err) reject(err);
              resolve(data);
            });
        })
    },
    viewIdByField: function(table,column,value) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT id FROM ?? WHERE ?? = ?";
            connection.query(queryString,[table,column,value], (err, data) => {
              if (err) reject(err);
              resolve(data);
            });
        })
    },
    viewField: function(column,table) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT ?? FROM ??"
            connection.query(queryString,[column,table], (err, data) => {
              if (err) reject(err);
              resolve(data);
            });
        })
    },
    viewEmployees: function() {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT CONCAT(first_name,' ',last_name) as name FROM employee"
            connection.query(queryString, (err, data) => {
              if (err) reject(err);
              resolve(data);
            });
        })
    },
    viewRoles: function() {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT title FROM role"
            connection.query(queryString, (err, data) => {
              if (err) reject(err);
              resolve(data);
            });
        })
    },
    viewDepartments: function() {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT name FROM department"
            connection.query(queryString, (err, data) => {
              if (err) reject(err);
              resolve(data);
            });
        })
    },
    employeeIdByName: function(firstName,lastName) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT id FROM employee WHERE first_name = ? AND last_name = ?";
            const query = connection.query(queryString,[firstName,lastName],(err, data) => {
              if (err) reject(err);
              resolve(data);
            });
            // console.log(query.sql);
        })
    },
    roleIdByTitle: function(title) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT id FROM role WHERE title = ?";
            const query = connection.query(queryString,[title],(err, data) => {
              if (err) reject(err);
              resolve(data);
            });
            // console.log(query.sql);
        })
    },
    deptIdByName: function(name) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT id FROM department WHERE name = ?";
            const query = connection.query(queryString,[name],(err, data) => {
              if (err) reject(err);
              resolve(data);
            });
            // console.log(query.sql);
        })
    },
    add: function(table,data) {
        return new Promise((resolve, reject) => {
            const queryString = "INSERT INTO ?? SET ?";
            const query = connection.query(queryString,[table,data],(err, data) => {
              if (err) reject(err);
              resolve(data);
            });
            // console.log(query.sql);
        })
    },
    update: function(table,data) {
        return new Promise((resolve, reject) => {
            const queryString = "UPDATE ?? SET ?";
            const query = connection.query(queryString,[table,data],(err, data) => {
              if (err) reject(err);
              resolve(data);
            });
            // console.log(query.sql);
        })
    },
    delete: function(table,field,value) {
        return new Promise((resolve, reject) => {
            const queryString = "DELETE FROM ?? WHERE ?? = ?";
            const query = connection.query(queryString,[table,field,value],(err, data) => {
              if (err) reject(err);
              resolve(data);
            });
            // console.log(query.sql);
        })
    },
}

module.exports = queries;
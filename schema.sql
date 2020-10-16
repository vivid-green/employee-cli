DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT DEFAULT NULL,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

CREATE VIEW employee_info AS 
SELECT
    e.id as ID,
    concat(e.first_name," ",e.last_name) as Employee,
    r.title as Title,
    d.name as Department,
    r.salary as Salary,
    concat(m.first_name, " ", m.last_name) as Manager
FROM
    employee e
LEFT JOIN employee m ON m.id = e.manager_id
LEFT JOIN role r on r.id = e.role_id
LEFT JOIN department d on r.department_id = d.id;
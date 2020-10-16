USE employee_tracker;

INSERT INTO department (name)
VALUES
("IT"),
("QA"),
("CNOC"),
("Product"),
("Engineering");

INSERT INTO role (title,salary,department_id)
VALUES
("Intern", 30000.00,5),
("Senior Dev", 100000.00,4),
("Director", 150000.0,3),
("Manager", 120000.00,2),
("Lead Engineer", 120000.00,1);

INSERT INTO employee(first_name,last_name,role_id) 
VALUES("George","Orwell",3);

INSERT INTO employee(first_name,last_name,role_id) 
VALUES("Uncle","Iroh",2);

INSERT INTO employee(first_name,last_name,role_id) 
VALUES("Darth","Vader",1);

INSERT INTO employee(first_name,last_name,role_id,manager_id) 
VALUES("Bob","Barker",5,2);

INSERT INTO employee(first_name,last_name,role_id,manager_id) 
VALUES("Jim","Harper",4,3);

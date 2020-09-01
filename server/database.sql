CREATE DATABASE deskapp;

CREATE TABLE desks (
	entry_id SERIAL PRIMARY KEY,
	desk_num VARCHAR(10) UNIQUE NOT NULL,
	i_num VARCHAR(10),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	manager_name VARCHAR(255),
	intern BOOLEAN, 
	vacancy BOOLEAN NOT NULL,
	notes VARCHAR(255)
);

INSERT INTO desks (desk_num, i_num, first_name, last_name, manager_name, intern, vacancy)
VALUES ('3.A101', 'I123456', 'Bob', 'Smith', 'John Apple', TRUE, FALSE)
RETURNING *; 


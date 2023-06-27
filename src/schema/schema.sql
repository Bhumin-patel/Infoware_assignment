-- create schema
create database employee_details;
use employee_details;

-- create Employee table
-- contains the information about employees
CREATE TABLE Employee
(
  full_name VARCHAR(100) NOT NULL,
  job_title VARCHAR(50) NOT NULL,
  country_code INT NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  email VARCHAR(62) NOT NULL,
  address VARCHAR(95) NOT NULL,
  city VARCHAR(35) NOT NULL,
  state VARCHAR(35) NOT NULL,

  PRIMARY KEY (email)
);

-- create Contacts table
-- contains the information about emergency contants of employees
CREATE TABLE Contacts
(
  emergency_contact_type VARCHAR(10) NOT NULL,
  emergency_contact_name VARCHAR(100) NOT NULL,
  country_code INT NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  realtionship VARCHAR(50) NOT NULL,
  email VARCHAR(62) NOT NULL,

  PRIMARY KEY (email,emergency_contact_type),
  FOREIGN KEY (email) REFERENCES Employee(email)
  on delete cascade,
  check (emergency_contact_type in ('Primary','Secondary'))
);
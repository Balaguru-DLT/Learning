*****   CREATE TABLE   *****
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE student;


CREATE TABLE student (
    student_id INT   AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    major VARCHAR(30) NOT NULL
-- PRIMARY KEY(student_id)
);
ALTER TABLE student ADD  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE student ADD gpa DECIMAL(4,2);


ALTER TABLE student DROP COLUMN gpa;


*****   INSERT  TABLE   *****


INSERT INTO student(name,major) VALUES('bala',' Science');
INSERT INTO student(name,major) VALUES('guru',' Sports');
INSERT INTO student(name,major) VALUES('John','Computer Science');
INSERT INTO student(name) VALUES('Milga');
INSERT INTO student(name,major) VALUES('anupam',"physics");
INSERT INTO student(name,major) VALUES('anupam',"Geo");


***** CONSTRAINTS  *****

CREATE TABLE student (
    student_id INT   AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    major VARCHAR(30) UNIQUE DEFAULT 'Undecided'
);

INSERT INTO student(name,major) VALUES('bala',' Science');
INSERT INTO student(name,major) VALUES('guru',' Sports');
INSERT INTO student(name,major) VALUES('John','Computer Science');
INSERT INTO student(name) VALUES('Milga');
INSERT INTO student(name,major) VALUES('anupam',"physics");
INSERT INTO student(name,major) VALUES('uvi',"Geo");
INSERT INTO student(name,major) VALUES('abi',"Biology");


***** UPDATE AND DELETE  *****

UPDATE student SET major="bio" WHERE major="Biology";
UPDATE student SET major="CS" WHERE major="Computer Science";
UPDATE student SET major="BioScience" WHERE major="Science" OR major="bio";
UPDATE student SET name="raghu" WHERE student_id="3";

DELETE FROM student WHERE student_id = 7;
DELETE FROM student WHERE major = 'Undecided';


***** BASIC QUERIES   *****

SELECT * FROM student;
SELECT name,major FROM student;

SELECT name,major FROM student ORDER BY name;
SELECT name,major FROM student ORDER BY name  DESC;
SELECT name,major FROM student ORDER BY major  DESC;
SELECT * FROM student ORDER BY student_id  DESC;
SELECT * FROM student ORDER BY student_id;
SELECT * FROM student ORDER BY major,student_id;


SELECT name,major FROM student LIMIT 2;
SELECT * FROM student ORDER BY major,student_id LIMIT 1;


SELECT name,major FROM student WHERE major != "physics";
SELECT name,major FROM student WHERE student_id != 1;
SELECT name,major FROM student WHERE student_id >2;
SELECT * FROM student WHERE student_id IN (2,4,5);
SELECT * FROM student WHERE student_id IN (2,4,5) AND student_id >2;

SHOW TABLES;
-- DROP SCHEMA test;
-- DROP DATABASE test;

******************************************

CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    continent VARCHAR(20) NOT NULL,
    population INT DEFAULT 0
);

INSERT INTO countries(name,continent,population) VALUES('India',' Asia',14000000),('Angola',' Africa',334244),('England',' Europe',44656),
('Spain',' Europe',7777855),
('Brazil',' S.America',54667656),
('Uruguay',' S.America',5460),
('Egypt',' Africa',5577731),
('Australia',' Australia',234566);
ALTER TABLE countries ADD economicstatus VARCHAR(20);
INSERT INTO countries(name,continent,population,economicstatus) VALUES('USA',' N.America',234555,"Developed");


********  operators  **************8888
SELECT name,population FROM countries WHERE population > 20000;
SELECT name,population FROM countries WHERE population <234566;
SELECT  name,population FROM countries WHERE population >= 234566;
SELECT  name,population FROM countries WHERE population >= 234566;
SELECT * FROM countries WHERE population = 234566;
SELECT * FROM countries WHERE population != 234566;
SELECT * FROM countries WHERE population <> 234566;
SELECT * FROM countries WHERE population > 234566 AND continent = 'Asia';
SELECT * FROM countries WHERE population > 5577731 OR population < 54667656;
SELECT * FROM countries WHERE population BETWEEN 234566 AND 5577731;
SELECT * FROM countries WHERE continent IN (' Asia', 'Europe');


 ***** LIKE and wildcards *****
-- starts with
SELECT * FROM countries WHERE name LIKE 'B%';
-- ends with
SELECT * FROM countries WHERE name LIKE '%a';
-- checks if it contains
SELECT * FROM countries WHERE name LIKE '%ndi%';
SELECT * FROM countries WHERE name LIKE 'A%' OR name LIKE 'B%';
SELECT * FROM countries WHERE name LIKE 'U%' OR name LIKE '%l' AND population BETWEEN 5460 AND 500000000;

SELECT name FROM countries WHERE name LIKE "_a";
SELECT name FROM countries WHERE name LIKE "__a";


***** count *****

SELECT COUNT(*) FROM countries WHERE continent = ' Asia' OR continent = 'Europe';
SELECT COUNT(*) FROM countries WHERE continent = ' Asia' AND population > 5577731;
SELECT COUNT(*) FROM countries WHERE continent = ' Asia' OR population > 5577731;
SELECT COUNT(*) FROM countries WHERE (continent = ' Asia' OR continent = 'Europe') AND population > 100000000;


***** GroupBy *****
SELECT continent, COUNT(*) FROM countries GROUP BY continent;
SELECT continent, COUNT(*) FROM countries GROUP BY population;
SELECT continent,economicstatus ,COUNT(*) FROM countries GROUP BY economicstatus;

SELECT continent, COUNT(*) FROM countries WHERE continent = ' Asia' OR continent = ' Europe' GROUP BY continent;
SELECT continent, COUNT(*) FROM countries WHERE economicstatus = 'Developed' AND economicstatus = 'Poor' GROUP BY continent;
SELECT continent, COUNT(*) FROM countries WHERE economicstatus = 'Developed' OR  economicstatus = 'Poor' GROUP BY continent;
SELECT continent, COUNT(*) FROM countries WHERE continent = ' Asia' AND population > 100005 GROUP BY continent;
SELECT continent, COUNT(*) FROM countries WHERE (continent = ' Asia' OR continent = ' Europe') AND population > 10000 GROUP BY continent;


SELECT continent, COUNT(*) FROM countries GROUP BY continent HAVING COUNT(*) > 1; 

-- EXISTS
SELECT * 
FROM countries c1
WHERE EXISTS (
    SELECT *
    FROM countries c2 
    WHERE c2.continent = ' Europe' 
    AND c1.id = c2.id
);


-- ANY
SELECT * FROM countries WHERE population > ANY (SELECT population FROM countries WHERE continent = ' Asia');
SELECT * FROM countries WHERE population > ANY (SELECT population FROM countries WHERE continent = ' Africa');


-- ALL
SELECT * FROM countries WHERE population > ALL (SELECT population FROM countries WHERE continent= ' Africa'); 

INSERT INTO countries(name,continent,population,economicstatus) VALUES('Tanzania',' Africa',23455,"Poor"),
('SA',' Africa',353234,"Developing"),('Crrotia',' Europe',234553,"Developing"),('Japan',' Asia',1234455,"Dveloped"),('Uzbek',' Asia',2666455,"Poor");

ALTER TABLE countries ADD COLUMN rank INT NOT NULL;
ALTER TABLE countries DROP  rank ;

UPDATE countries SET rank = 1 WHERE id < 5;
UPDATE countries SET rank = 2 WHERE id < 10 AND id>5;
UPDATE countries SET rank = 3 WHERE id < 25 AND id>10;
UPDATE countries SET rank = 4 WHERE id >35;

UPDATE countries SET economicstatus ="developing" WHERE id IN(1,4,5,7) ;
UPDATE countries SET economicstatus ="poor" WHERE id IN(2,6) ;
UPDATE countries SET economicstatus ="developed" WHERE id IN(3,8) ;


-- select distinct

SELECT DISTINCT economicstatus FROM countries;
SELECT DISTINCT continent FROM countries ;
SELECT COUNT(DISTINCT economicstatus) FROM countries;
SELECT DISTINCT rank FROM countries;
SELECT rank, COUNT(*) AS count_of_ranks FROM countries GROUP BY rank;


-- ORDERBY 

SELECT * FROM countries ORDER BY id DESC;
SELECT * FROM countries ORDER BY population DESC;
SELECT * FROM countries ORDER BY continent,population;
SELECT * FROM countries ORDER BY continent ASC,population DESC;
SELECT * FROM countries ORDER BY continent ,rank,population DESC ;

SELECT * FROM countries WHERE NOT continent=" Asia";
SELECT * FROM countries WHERE  continent!=" Asia";


ALTER TABLE countries ADD COLUMN HDI INT ;
UPDATE countries SET HDI=1 WHERE id=1;
SELECT * FROM countries WHERE HDI IS NULL;
SELECT * FROM countries WHERE HDI IS NOT  NULL;

-- LIMIT

SELECT  * FROM countries  LIMIT 3 ;
SELECT  * FROM countries  LIMIT 3 OFFSET 2 ;
SELECT  * FROM countries  LIMIT 2, 3 ;
SELECT  * FROM countries WHERE id>15  LIMIT 3 ;
SELECT  * FROM countries WHERE id>15 ORDER BY continent LIMIT 3;
SELECT * FROM countries ORDER BY continent  LIMIT 3 ;

-- Aggregate functions

SELECT MAX(population) FROM countries;
SELECT MIN(population) FROM countries;
SELECT SUM(population)FROM countries WHERE id>5;
SELECT SUM(population)FROM countries WHERE id>25;
SELECT SUM(population), AVG(population),COUNT(*) FROM countries WHERE continent=" Africa";

--  IN,  BETWEEN

SELECT * FROM countries WHERE continent  IN (" Europe");
SELECT * FROM countries WHERE continent NOT  IN (" Asia");
SELECT * FROM countries WHERE population  BETWEEN  100000  AND  2345566;
SELECT * FROM countries WHERE id  BETWEEN  2  AND  22;
SELECT * FROM countries WHERE(rank IN (2,4)) AND (population  BETWEEN  100000  AND  2345566) AND (id BETWEEN 1 AND 30);


-- Group by, order by

SELECT COUNT(*),continent FROM countries GROUP BY continent;
SELECT * FROM countries ORDER  BY continent;

SELECT COUNT(*),rank FROM countries GROUP BY rank;
SELECT * FROM countries ORDER BY rank;


-- HAVING

SELECT continent,SUM(population),count(name), AVG(population) AS avg_population FROM countries GROUP BY continent HAVING AVG(population) > 10000022;
SELECT continent, count(name),SUM(population) AS SUM  FROM countries GROUP BY continent HAVING SUM(population) > 10000022;

CREATE TABLE studentcopy( student_id INT   AUTO_INCREMENT PRIMARY KEY,  name VARCHAR(30) NOT NULL, major VARCHAR(30) NOT NULL)

-- JOINS

CREATE TABLE branch (
branch_id INT PRIMARY KEY AUTO_INCREMENT,
br_name VARCHAR(30) NOT NULL,
addr VARCHAR(200) );

CREATE TABLE employee (
emp_id INT PRIMARY KEY AUTO_INCREMENT,
empname VARCHAR(30) NOT NULL,
job_desc VARCHAR(20),
salary INT,
branch_id INT,
CONSTRAINT FK_branchId FOREIGN KEY(branch_id) REFERENCES branch(branch_id)
);

INSERT INTO branch VALUES(1,"Chennai","16 ABC Road"),(2,"Coimbatore","16 ABC Road"),(3,"Mumbai","25 XYZ Road"),(4,"Hydrabad","25 XYZ Road");

DROP TABLE employee;

INSERT INTO employee VALUES(1,'Ram','ADMIN',1000000,2),(2,'Harini','MANAGER',2500000,2),(3,'George','SALES',2000000,1),
(4,'Ramya','SALES',1300000,2),(5,'Meena','HR',2000000,3),(6,'Ashok','MANAGER',3000000,1),(7,'Abdul','HR',2000000,1),(8,'Ramya','ENGINEER',1000000,2),(9,'Raghu','CEO',8000000,3),(10,'Arvind','MANAGER',2800000,3),(11,'Akshay','ENGINEER',1000000,1),(12,'John','ADMIN',2200000,1),(13,'Abinaya','ENGINEER',2100000,2),(14,'Vidya','ADMIN',2200000,NULL),(15,'Ranjani','ENGINEER',2100000,NULL);

select * from employee;
select * from branch;

-- innerjoin

SELECT employee.emp_id,employee.empname,employee.job_desc,branch.br_name
FROM employee  JOIN branch
ON employee.branch_id=branch.branch_id ORDER BY emp_id;

SELECT employee.emp_id,employee.empname,employee.job_desc,branch.br_name
FROM employee INNER JOIN branch
ON employee.branch_id=branch.branch_id ORDER BY emp_id;

-- Right join 

SELECT employee.emp_id,employee.empname,employee.job_desc,branch.br_name
FROM employee RIGHT JOIN branch
ON employee.branch_id=branch.branch_id ORDER BY emp_id;

-- Left join 

SELECT employee.emp_id,employee.empname,employee.job_desc,branch.br_name
FROM employee LEFT JOIN branch
ON employee.branch_id=branch.branch_id ORDER BY emp_id;

-- Cross join 
SELECT employee.emp_id,employee.empname,employee.job_desc,branch.br_name
FROM employee
CROSS JOIN branch;

-- check

CREATE TABLE countries1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    continent VARCHAR(20) NOT NULL,
    population INT DEFAULT 0
    CHECK (population>1000)
);
INSERT INTO countries1(name,continent,population) VALUES('India',' Asia',14000000);
INSERT INTO countries1(name,continent,population) VALUES('Angola',' Africa',144);
INSERT INTO countries1(name,continent,population) VALUES('Angola',' Africa',1442);
select * from countries1;
DROP TABLE countries1;

--  CASE

 SELECT name,population,
  CASE
  WHEN population>100000000 THEN "VERYHIGH"
  WHEN population BETWEEN 1000000 AND 100000000 THEN "HIGH"
  WHEN population BETWEEN 10000 AND 1000000 THEN "MEDIUM"
  ELSE"LOW"
  END AS DENSITY 
  FROM countries;

















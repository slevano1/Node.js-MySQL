DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2),
stock_quantity INT NOT NULL,
PRIMARY KEY (id)
);

SHOW TABLES;

SELECT*FROM products;

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Nintendo Switch','Electronics',299.99,5);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Xbox One','Electronics',299.99,2);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ('Mario Kart 8','Electronics',58.99,20),('Overwatch','Electronics',39.99,30);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('Espresso Machine','Home and Kitchen',70.00,10),('Ninja Coffee Bar','Home and Kitchen',95.45,50);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('Dawn of the Dead Blu-ray','Movies',12.99,5),('Goodfellas Blu-ray','Movies',12.99,10),
('Laptop','Electronics',99.99,2),('Roomba','Home and Kitchen',699.99,10);

TRUNCATE TABLE products;

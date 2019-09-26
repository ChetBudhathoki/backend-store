/* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mySQL2019'; */
/* database */
create database bamazon;

use bamazon;
/* Create table */
CREATE TABLE products (
	id INT auto_increment,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,4),
    stock_quantity int not null,
	primary key(id)
);

/* Add products in the table */
use bamazon;
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
         ('iPhone11', 'electronics', 1000, 20),
         ('iPhone11Case', 'electronics', 100, 20),
         ('iPhoneX', 'electronics',999, 100),
         ('iPhoneCharger', 'electronics', 99, 500),
         ('microFiber', 'clothing', 10, 1000),
         ('batteryPack', 'electronics', 100, 500),
         ('macBook', 'electronics', 2000, 10),
         ('macBookCharger', 'electronics', 200, 50),
         ('charger', 'electronics', 10, 20);
         
/*delete all from the table */
         
	delete from products;
         
         
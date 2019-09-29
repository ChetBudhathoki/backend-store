var mysql = require("mysql");
var inquirer = require("inquirer");
// var table = require("console.table");
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "mySQL2019",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWelcome to Backend Store BAmazon! Seasons Sale!\n");
   
    allProducts();
});
var allProducts = function() {
    // query the database for all items for sale
    connection.query("SELECT * from products;", function(err, results) {
        if (err) throw err;
       
        // console log all products
        console.table(results);
    
      pickProduct();
     
    }
    
)}
function pickProduct() {
    
    inquirer
        .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the product_id you would like to buy?",
          validate: function(value) {
            if(isNaN(value) === false) return true;
            else return false
        }
        },
        {
          name: "quantity",
          type: "number",
          message: "How many?",
          validate: function(value) {
              if(isNaN(value) === false) return true;
              else return false
          }
        }
        ])
        .then(function(answer) {
            
            
            var product = answer.product;
            var quantity = answer.quantity;
            // console.log(product);
            // console.log(quantity);
            var queryProducts = "SELECT * FROM products WHERE ?";
            
            connection.query(queryProducts, {id: answer.product}, function(err, data) {
                if (err) throw err;                
                // console.log(data);
                // console.log(data[0].product_name);
                var productInfo = answer;
                if (quantity > data[0].stock_quantity) {
                    console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("I'm sorry we don't have enough in stock, choose a smaller quantity!");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                    allProducts()
                }
                
                 else {
                   
                    if (quantity <= data[0].quantity) {
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log("We have " + quantity + " " + productInfo.product + "s in stock for your order!")
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log("Thank you for your order! Please wait while we process your order!");
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                    } 
                    if (cost = quantity * productInfo.price) {
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log("The total cost of your order is $" + cost + ".00");
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                    }
                   
            var queryUpdate = "UPDATE products SET ? WHERE ?"
            connection.query(queryUpdate, [{stock_quantity: data[0].stock_quantity - answer.quantity},{id: product}], function(err, res) {
                 if (err) throw err;
                 else  {   
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");  
                    console.log("Inventory has been updated!");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                                   
                  
                   inquirer
                   .prompt({
                    name: 'next',
                    type: "input",
                    message: 'Would you like to place another order (Yes/No)?',
                    })
                  .then(function(answer) {
                      if (answer.next === "Yes") {
                          allProducts();
                      } else {
                        connection.end()
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log("Thank you for shopping with us! Come back soon!")
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
                      }
                    
                  });
                   
                    
                      }
                })
                    }
                
            })
         
        })
        
        }
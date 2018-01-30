var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');
var Table = require('cli-table');
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  // Your username
  user: "devuser",
  // Your password
  password: "Number09!!",
  database: "bamazon"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  //console log to make sure there's a connection
  console.log("Connected as id: " + connection.threadId);
  if (err) throw err;
  //creates a welcome message with some color using the npm color module
    console.log('--------------------------------------------------------------------------------'.rainbow)
    console.log('Welcome to Bamazon'.cyan)
    console.log('New and Interesting Products!'.cyan)
    console.log('--------------------------------------------------------------------------------'.rainbow)
    //
 showAllProducts();
  });
//prompt to interact with customer
function productInfo() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Item ID of the product you would like to buy?".cyan,
            name: "product_name",    
        },

        {
            type: "input",
            name: "stock_quantity",
            message: "How many units of this product would you like to buy?".cyan,    
        } 
    ])
    //
    .then(function (res) {
        var itemid = res.product_name;
        var quantity = res.stock_quantity;

        connection.query("SELECT * FROM products WHERE ?", { id: itemid }, function (err, response) {
            if (err) throw err;

            if (response.length === 0) {
                console.log('ERROR: Select a valid Item ID from the Products list.');
                showAllProducts();
            } else {
                // Response if the quantity requested by the user is in stock
                var productRes = response[0];
                if (quantity <= productRes.stock_quantity) {
                    console.log('Items in Stock. Your order consisting of ' + quantity  + " " + productRes.product_name + ' from our ' + productRes.department_name + ' Department \nis now being prepared.');

                    // // Update the inventory
                    var updateInventory = 'UPDATE products SET stock_quantity = ' + (productRes.stock_quantity - quantity) + ' WHERE id = ' + itemid;

                    connection.query(updateInventory, function (err, data) {
                        if (err) throw err;

                        console.log('\nYour order has been placed! Your total is $' + productRes.price * quantity);
                        console.log('\nThank you for shopping with us!');
                        console.log("--------------------------------------------------------------------------------\n".rainbow);
                        keepShopping();
                    })
                } else {
                    console.log("Sorry, that item is not in stock.\n" +
                        "Please select another item.\n" +
                        "You selected " + productRes.product_name + " and it has " + productRes.stock_quantity + " left in stock.");
                    keepShopping();//directs to the 'Keep Shopping' function if user wishes to continue
                }
            }
        })
    })
}

// inquirer prompt asking if user wants to keep shopping - calls showAllProducts if 'yes'; if 'no' connection ends
function keepShopping() {
    inquirer.prompt([
        //'confirm' is from the npm inquirer module. Boolean value returning yes or no.
        //I updated the module changing 'Y/n' to 'Y/N' for aesthetics
        {
            type: "confirm",
            message: "Would you like to keep shopping?".red,
            name: "confirm"
        }
    ]).then(function (res) {
        if (res.confirm) {
            console.log("--------------------------------------------------------------------------------\n".rainbow);
            //brings back the shopping options since customer wants to continue shopping
            showAllProducts();
          //end the progran since customer selected 'no'  
        } else {
            console.log("\nThank you for shopping Bamazon!".cyan);
            console.log("--------------------------------------------------------------------------------\n".rainbow);
            connection.end();
        }
    })
}

//shows all products
function showAllProducts(){
  connection.query('SELECT*FROM products', function(err,res){
    //bringing in the display table template from cli-table module
       var theDisplayTable = new Table({
            //declare the value categories for table header
            head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
            //set widths 
            colWidths: [10, 30, 18, 10, 10]
        });

    for(var i = 0; i < res.length; i++){
      //push caategories from mySQL to display table
      theDisplayTable.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
                );
    }
    console.log(theDisplayTable.toString());
    //takes this back up to productInfo for purchase prompts
    productInfo(); 
  });
}






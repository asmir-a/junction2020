var unirest = require("unirest");
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 8080;
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log("the server is listening");
    console.log(`the server port is ${port}`);
}
// Initialize all route with a callback function
//app.get('/all', getCallbackFunction);

let wishlistItemsDict = [];


let wishlistItemsArray = [];
let wishlistItemsASINArray = [];

let wishlistItemString;
let wishlistItemASIN;
let wishlistItemAmazonPrice;


var product_array = [];
var product_prices_array = [];
var stock_prices = [];

app.post('/allStock', postStockCallbackFunction);

async function postStockCallbackFunction(req, res){
    let string = req.body.stockName;
    let api_result = await getStockData("AAPL");
    for (let i = 0; i < 36; i++){
        stock_prices.push(api_result.body[i].grossProfit);
    }
    res.send(stock_prices);
}

async function getStockData(companyName){
    return new Promise((resolve, reject) => {
        unirest.get("https://financial-modeling-prep.p.rapidapi.com/income-statement/"+companyName+"?apikey=demo")
        .header("X-RapidAPI-Key", "f9ef32a0afmsh60e4814fe11c32fp1cb7d2jsn0d8da5deff1c")
        .end(function (result) {
            api_result1 = result;
            resolve(result);
        //console.log(result.body.list);
    });
    })
}



app.post('/all', postCallbackFunction);  

async function postCallbackFunction(req, res) {
    const req_data = req.body; //TO-DO: this part needs to be changed or modified cause I am not sure how the data will be structured on the client side
    wishlistItemsArray.push(req_data.wishInp);
    wishlistItemString = req_data.wishInp;
    console.log(`THE INPUT IS: ${req_data.wishInp}`);
    //getAmazonASIN(wishlistItemString);
    let final_result = await getProductData(wishlistItemString);
    console.log("DONE EXECUTING THE getBarFunction");
    console.log(final_result.items.lowest_pricing);
    console.log(final_result.items.highest_price);
    console.log(final_result.items.images[1]);
    projectData = {name : req_data.wishInp, lowestPrice : final_result.items.lowest_pricing, highestPrice : final_result.items.highest_price, image : final_result.items.images[1]};
    console.log(projectData);
    res.send(projectData);
}


async function getAmazonASIN(product_string_holder){
    return new Promise((resolve, reject) => {
        unirest.get("https://amazon-price1.p.rapidapi.com/search?keywords="+ product_string_holder +"&marketplace=US")
        .header("X-RapidAPI-Key", "f9ef32a0afmsh60e4814fe11c32fp1cb7d2jsn0d8da5deff1c")
        .end(function (result) {
            console.log("THIS IS AMAZON API");
            console.log(result.status);
            product_array.push(result.body[0]);
            console.log(result.body[0].price);
            wishlistItemAmazonPrice = product_prices_array.push(parseInt(result.body[0].price.substring(1)));
            wishlistItemASIN = result.body[0].ASIN;
            console.log(wishlistItemASIN);
            wishlistItemsASINArray.push(wishlistItemASIN);
            resolve(wishlistItemASIN);
        });
    })
}
//because javascript is asynchronous, the array will be empty even after the response arrives because it will be set before the response arrives


async function getBarcode(getBarcodeString){
    let asin = await getAmazonASIN(getBarcodeString);
    return new Promise((resolve, reject) => {
        let temp_var;
        unirest.get("https://barcode-lookup.p.rapidapi.com/v2/products?asin=" + asin)
        .header("X-RapidAPI-Key", "b79880269cmsh5bb312c0bb1524ap10c653jsndc7bf941ec90")
        .end(function (result) {
        //console.log("These are the barcode API resuts");
            console.log(result.status, result.body);
            temp_var = result.body[0].barcode_number;
            resolve(result.body[0].barcode_number);
    });
    })
}

async function getProductData(getProductDataString){  
    let barcode = await getBarcode(getProductDataString);
    return new Promise((resolve, reject) => {
        unirest.get("https://product-data1.p.rapidapi.com/lookup?upc=735078024190")
        .header("X-RapidAPI-Key", "f9ef32a0afmsh60e4814fe11c32fp1cb7d2jsn0d8da5deff1c")
        .end(function (result) {
            console.log("These are the barcode Product resuts");
            console.log(result.status, result.body);
            resolve(result.body);
        //console.log(result.body.list);
    });
    })
    
}



//   unirest.get("https://amazon-price1.p.rapidapi.com/search?keywords="+ "phone" +"&marketplace=US")
//     .header("X-RapidAPI-Key", "f9ef32a0afmsh60e4814fe11c32fp1cb7d2jsn0d8da5deff1c")
//     .end(function (result) {
//     console.log(result.status);

//     product_array.push(result.body[0]);
//     console.log(result.body[0].price);
//     wishlistItemAmazonPrice = product_prices_array.push(parseInt(result.body[0].price.substring(1)));
//     wishlistItemASIN = result.body[0].ASIN;
//     wishlistItemsASINArray.push(wishlistItemASIN);
//     });




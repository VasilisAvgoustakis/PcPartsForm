
var singlePrices = [];


function addProductToTable(){
    var tbodyRef = document.getElementById('order_table').getElementsByTagName('tbody')[0];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();

    // Insert a cell at the end of the row
    //var newCell = newRow.insertCell();

    //get cell values as text
    var quantityValue = document.createTextNode(document.getElementById('quantity').value)
    var productText = document.createTextNode(document.getElementById('parts').value);

    //generate random value for price
    var randomPrice = generateRandomPrice()
    var totalPrice = roundToTwo(
                    parseInt(document.getElementById('quantity').value)
                    *
                    parseFloat(randomPrice))
    var priceValue = document.createTextNode(randomPrice);
    var totalPriceObj = document.createTextNode(totalPrice);

    // Insert a cell at the end of the row
    var quantityCell = newRow.insertCell();
    var productCell = newRow.insertCell();
    var ppPrice = newRow.insertCell();
    var tpPrice = newRow.insertCell();

    //append values to cells
    quantityCell.appendChild(quantityValue);
    productCell.appendChild(productText);
    ppPrice.appendChild(priceValue);
    tpPrice.appendChild(totalPriceObj);
    
    //append total price to prices list
    singlePrices.push(parseFloat(totalPrice));
    //console.log(singlePrices);

    //reset quantity
    document.getElementById('quantity').value = '1';
    //update sum value
    var sum = roundToTwo(singlePrices.reduce(function(a, b){
        return a + b;
    }, 0));

    var sumString = "<h2> Total: " + sum;
    document.getElementById('sum').innerHTML = sumString;


}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function generateRandomPrice(){
    return roundToTwo(Math.random() * (1000 - 50 + 1));
}

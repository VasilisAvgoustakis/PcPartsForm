
/* 
This Script runs on the client side and dynamically manipulates the HTML content 
available to the user while also adds hidden inputs to the order table
in order to be able to send the the table data to the server for further manipulation.
*/


/*Global Scope Variables*/
// a list containing the total price for each line in the order table
var singlePrices = [];
// a simple counter used to dynamically define IDs for rows and specific input elements
var rowId = 0;


/* 
Function is called everytime the "Add to List" button is pressed.
it puts the currently selected product, quantity an price in the order table.
Since this project is for demonstration pusrposes only the prices for each product
which, normally i.e. could be aquired from a Database, are being randomly generated.
*/
function addProductToTable(){

    //incremate itemID
    rowId++;
    //get table body 
    var tbodyRef = document.getElementById('order_table').getElementsByTagName('tbody')[0];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();

    //set new rows id
    newRow.id = rowId;

    //get cell values as text
    var quantityValue = document.createTextNode(document.getElementById('quantity').value);
    var productText = document.createTextNode(document.getElementById('parts').value);

    //generate random value for price
    var randomPrice = generateRandomPrice()
    var totalPrice = roundToTwo(parseInt(document.getElementById('quantity').value)
                     * parseFloat(randomPrice))
    var priceValue = document.createTextNode(randomPrice);
    var totalPriceObj = document.createTextNode(totalPrice);

    // Insert cells to row
    var checkBoxCell = newRow.insertCell();
    var quantityCell = newRow.insertCell();
    var productCell = newRow.insertCell();
    var ppPrice = newRow.insertCell();
    var tpPrice = newRow.insertCell();


    /*Set Values and content of all cells*/

    //place delete button in Delete Product Column
    checkBoxCell.innerHTML = "<button type='button' id='rem"+rowId+"' value='Remove' \
                               style='width: 25px; margin: 0 auto;' onclick='deleteSelectedItem(this)'> \
                               <img src= './delete.jpg' height='15px' width='15px' ></button>";
    
    //set value of hidden inputs in the cells that POST the data to the server
    quantityCell.innerHTML= "<input type='hidden' name='quant"+rowId+"' value= '"
                            +document.getElementById('quantity').value+"'>";
    productCell.innerHTML= "<input type='hidden' name='product"+rowId+"' value= '"
                            +document.getElementById('parts').value+"'>";
    ppPrice.innerHTML= "<input type='hidden' name='ppPrice"+rowId+"' value= '"
                            +randomPrice+"'>";
    tpPrice.innerHTML= "<input type='hidden' name='tpPrice"+rowId+"' value= '"
                            +totalPrice+"'>";

    // set values for cell visible to user of the page                         
    quantityCell.appendChild(quantityValue);
    productCell.appendChild(productText);
    ppPrice.appendChild(priceValue);
    tpPrice.appendChild(totalPriceObj);
    
    //append total price to prices list
    singlePrices.push(parseFloat(totalPrice));

    //reset quantity
    document.getElementById('quantity').value = '1';

    //update sum value
    updateSumVal();
}

/*
A custom function which rounds a float number to 2 decimals
 */
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

/*
Generates a random float (price) in a certain range.
 */
function generateRandomPrice(){
    return roundToTwo(Math.random() * (500 - 50 + 1));
}

/*
Function is called whenever the button in the "Delete Product" column is pressed.
It removes this row from the table and thus the product from the order.
*/
function deleteSelectedItem(callerEle){
    //get the callers id
    var id = callerEle.id;
    //match to rows id
    var rowIdToRemove = id.slice(-1);
    //get the row to be removed
    var rowToRemove = document.getElementById(rowIdToRemove);
    //get the total price of the row to be deleted from the sum
    var rowsTotalPrice = rowToRemove.getElementsByTagName('td').item(4).textContent;

    //remove total price of selected row from single Prices
    for( i in singlePrices){
        if(singlePrices[i] == rowsTotalPrice){
            var index = singlePrices.indexOf(singlePrices[i])
            if(index > -1) singlePrices.splice(index, 1);
        };
    }

    //update the sum value
    updateSumVal();

    //remove row
    rowToRemove.parentNode.removeChild(rowToRemove);
}

/*
Function updates the "Sum Total" value after 
the current sum of the elements in singlePrices list.
 */
function updateSumVal(){
    //calculate total sum 
    var sum = roundToTwo(singlePrices.reduce(function(a, b){
        return a + b;
            }, 0));
    
    //update total sum in sum total cell
    document.getElementById('sum').innerHTML = sum +
                            //add hidden input with the total sum for the server
                            "<input type='hidden' name='hiddenSum' value= '"+sum+"'>";
    //set value of hidden input for the server
}
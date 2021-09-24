
var singlePrices = [];
var rowId = 0;


function addProductToTable(){

    //incremate itemID
    rowId++;

    var tbodyRef = document.getElementById('order_table').getElementsByTagName('tbody')[0];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    //set new rows
    newRow.id = rowId;


    //get cell values as text
    var quantityValue = document.createTextNode(document.getElementById('quantity').value);
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

    // set value of quantity cell appearing on form for user                          
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
    updateSumVal();
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function generateRandomPrice(){
    return roundToTwo(Math.random() * (500 - 50 + 1));
}

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
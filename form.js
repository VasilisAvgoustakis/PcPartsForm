
//declare constants when page has loaded
function onLoad(){
    window.partMenu = document.getElementById('part');
}


function getType(){
    //get selected value
    var selectedValue = part.value;
    //get select list with id == selected value
    var selectedDropdown = document.getElementById(selectedValue);
    
    //set select list visible
    selectedDropdown.style.visibility = 'visible';
    
    if(selectedDropdown.style.visibility == 'visible'){
        //show type label
        document.getElementById('type_label').style.visibility = 'visible';
        
    }

    //console.log(selectedValue);
} 
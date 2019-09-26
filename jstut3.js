// Canvas tutorial for JS - part 3
/*
    The file "expenditures.json" contains example of json type data - that is the array of data with key-value pairs that have each individual object-strings that are linked to its percentage - in this case a typical us household expenditures
    In .json type files there is no way to comment or put anthing apart from the data itself.
    The created array in .json format will be then used for filling of pie chart

    The .json data object is bascily putting the data into JS by a simple class that works around it's data (looking more or less like this):

    class Expenditures{
        constructor(type, percent){
            this.type = type;
            this.percent = percent;
        }
    }

*/

// array that will hold json data from text area
let data;
// array that will hold objects from json data
let expendituresArray = [];
// array that will store precentage values in special way to use it in pie chart
let percentArray = [];
// create a color array
let colorArray = [];

// main function that will draw chart - the one linked in html
function drawChart(){
    // get the data from text area within web page
    data = document.getElementById('json-data').value;
    // edit the percent array using custom function
    percentArray = createPercentArray();
    // create a color array with custom function
    colorArray = createRandomColorArray();
    // convert json data into array off object
    populateArray(data);
    // draw all pie pieces of the chart
    drawPie();
}

// function to populate the array with json data
function populateArray(jsonData){
    // read the json data into expense array using the parse method of JSON object
    let expenseArray = JSON.parse(jsonData);
    // loop through the expense array to put the data inside the expenditureArray
    // loop it through the lenght of expenditures array from json
    for(i = 0; i < expenseArray.expenditures.lenght; i++){
        // use the additional variable to take a single data from json data array
        let expense = expenseArray.expenditure[i];
        // put the data in new expenditure array
        expendituresArray[i] = expense;
    }
}

// function to operate on percentage values from input array
function createPercentArray(){
    // create a new array for adjusted % - the sum has to be 2 (instead of 100)
    let perArr = [];
    // loop through all of the % values, ajust and store in array
    for(i=0; i < expendituresArray.length; i++){
        perArr[i] = expendituresArray[i] * .02;
    }
    return perArr;
}

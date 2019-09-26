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

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
    for(i = 0; i < expenseArray.expenditures.length; i++){
        // use the additional variable to take a single data from json data array
        let expense = expenseArray.expenditures[i];
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
        perArr[i] = expendituresArray[i].percent * .02;
    }
    return perArr;
}

// function to create random colors for pie pices of chart
function createRandomColorArray(){
    // setup the random color array
    let randColArr = [];
    // loop through all pieces of pie chart (expenditures)
    for(i = 0; i < expendituresArray.length; i++){
        // populate the array of random colors using the 16-based number system for color definition (for example #FFFFFF is a code for black color) that has a max value of 16777215 in decimal - hence use the random function (that generates value between 0 and 1) and multiply it by max value, round it up to integer and change to 16-based system adding "#" before
        randColArr[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
        // floor - for rounding up to integer, random - for generating random number between 1 and 0, toString - to change the result of math operation to string and with parameter "16" it will change to 16-based value (color)
    }
    return randColArr;
    // TODO: consider adding pallete of colors (like ENDESGA32) and looping/randommizing the colors from that pallet as colors for pie pieces of the chart
}

// function to draw a pie chart in canvas
function drawPie(){
    // get a canvas refrence
    var canvas = document.getElementById('canvas');
    // create a "context" for a 2D chart - like "x" and "y" coordinates
    var context = canvas.getContext('2d');
    // set a starting and ending angle for single pie piece
    var startAngle = 0;
    var endAngle = 0;
    // loop for drawing as many slices as there is different percentages
    for(i = 0; i < percentArray.length; i++){
        // for start reset the start and end angle to be identical - in case it's the next slice the new start well be the old end
        startAngle = endAngle;
        // new end angle is calculated using the percentage of the precent array that is already adjusted to take the correct piece of circular pie chart
        endAngle = endAngle + (percentArray[i] * Math.PI);
        // separate function called to draw single slice - with the canvas 2d context as input, setting the size of the chart with x and y points for the circle of the chart - 300 and 200, the radius of the chart - 150, passing the start and end angles as well as the color from the color array
        drawSlice(context, 300, 200, 150, startAngle, endAngle, colorArray[i])
    }
}

// function to draw a single slice of pie chart
function drawSlice(ctx, sliceCenterX, sliceCenterY, radius, startAngle, endAngle, color){
    // define fill color setup for context
    ctx.fillStyle = color;
    // start drawing
    ctx.beginPath();
    // draw from the starting point
    ctx.moveTo(sliceCenterX, sliceCenterY);
    // draw an arc
    ctx.arc(sliceCenterX, sliceCenterY, radius, startAngle, endAngle);
    // close the slice
    ctx.closePath();
    // fill the shape drawn
    ctx.fill();
}

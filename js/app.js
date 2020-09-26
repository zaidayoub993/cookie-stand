'use strict';
console.log('JS loaded');

//Constructor to create each location
function SalmonCookies(loc, minCust, maxCust, avrg) {
  this.loc = loc,
  this.minCust = minCust,
  this.maxCust = maxCust,
  this.avrg = avrg;
  SalmonCookies.allLocs.push(this);
  this.totalPerHour = [];
}
SalmonCookies.allLocs = [];

//All location objects being created by the constructor
var $1np = new SalmonCookies('1st and Pike', 23, 65, 6.3);
var $sta = new SalmonCookies('SeaTac Airport', 3, 24, 1.2);
var $seaC = new SalmonCookies('Seattle Center', 11, 38, 3.7);
var $capHill = new SalmonCookies('Capitol Hill', 20, 38, 2.3);
var $alki = new SalmonCookies('Alki', 2, 16, 4.6);

//giving the 'rendering to table' function to all location objects
SalmonCookies.prototype.showData = compile;

var cookiesTable = document.getElementById('cookiesTable');
// RNG function
function getAvrgCookies(location) {
  var randNum = Math.floor(Math.random() * (location.maxCust - location.minCust + 1) + location.minCust);
  var total = location.avrg * randNum;
  return Math.round(total);
}

//function to display time in 12hour format - yay google
function makeTime(hour) {
  var date = new Date(`August 06, 2018 ${hour}:00:00`);
  var dateOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return date.toLocaleString('en-US', dateOptions);
}

// creating the table head row (6am - 8pm)
var timeOnTableRow = document.getElementById('times-row');

for (var i = 6; i <= 20; i++) {
  var timesOnTable = document.createElement('th');
  timesOnTable.textContent = makeTime(i);
  timeOnTableRow.appendChild(timesOnTable);
}

// 'Total' row header
var totalHeader = document.createElement('th');
totalHeader.textContent = 'Total';
timeOnTableRow.appendChild(totalHeader);

//function to be used as method to render cookie data to table
function compile() {
  var sum = 0;
  var locationRow = document.getElementById('locations-and-data');
  var locationName = document.createElement('tr');
  locationName.textContent = this.loc;
  locationName.className = 'column1';

  // adds an array to the object with all numbers per hour
  for (var i = 6; i <= 20; i++) {
    var averageCookies = getAvrgCookies(this);
    sum += averageCookies;
    this.totalPerHour.push(averageCookies);
    var locationData = document.createElement('td');
    locationData.textContent = averageCookies;
    locationName.appendChild(locationData);
    locationRow.appendChild(locationName);
  }

  var showTotal = document.createElement('td');
  showTotal.textContent = sum;
  locationName.appendChild(showTotal);
  console.log(`${this.loc}'s total is ${sum}`);
  finalCompiler();
}

// rendering cookie data for all locations
$1np.showData();
$sta.showData();
$seaC.showData();
$capHill.showData();
$alki.showData();

function formNewLoc(e) {
  e.preventDefault();
  console.log('Form submitted with new item' + e);
  var locFromForm = new SalmonCookies(e.target.locName.value, parseInt(e.target.locMin.value), parseInt(e.target.locMax.value), parseInt(e.target.locAvrg.value));
  locFromForm.showData();
}

var formElement = document.getElementById('new-location');
formElement.addEventListener('submit', formNewLoc);

//function to create the dynamic footer
function finalCompiler() {
  cookiesTable.deleteTFoot();
  var newFoot = document.createElement('tfoot');
  cookiesTable.appendChild(newFoot);
  var footRow = document.createElement('tr');
  newFoot.appendChild(footRow);
  var footTotalTitle = document.createElement('th');
  footTotalTitle.textContent = 'Total';
  footRow.appendChild(footTotalTitle);
  var calcGrandTotal = 0;
  for (var r = 0; r < 15; r++){
    var dailySum = 0;
    for (var j = 0; j < SalmonCookies.allLocs.length; j++) {
      dailySum += SalmonCookies.allLocs[j].totalPerHour[r];
    }
    var hourlyTotal = document.createElement('td');
    hourlyTotal.textContent = dailySum;
    footRow.appendChild(hourlyTotal);
    calcGrandTotal += dailySum;
  }
  var grandTotal = document.createElement('td');
  grandTotal.textContent = `Grand Total: ${calcGrandTotal}`;
  footRow.appendChild(grandTotal);
}

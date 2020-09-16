'use strict';

var OpenHour = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', 'Daily Location Total'];

var Locations = [];
var colSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var mainid = document.getElementById('main');     
var table = document.createElement('table');      
mainid.appendChild(table);

var DataRow = document.createElement('tr');       
table.appendChild(DataRow);

var emptycol = document.createElement('th');    
emptycol.textContent = ' ';                       
DataRow.appendChild(emptycol);



function LocationsHope(name, max, min, average_cookies_per_customer) {
  this.name = name;
  this.max = max;
  this.min = min;
  this.average_cookies_per_customer = average_cookies_per_customer;
  this.random_customers_per_hour1 = [];
  this.cookies_purchased_Hour = [];
  Locations.push(this);
}

LocationsHope.prototype.getRandomCustomerPerHours = function () {
  for (var i = 0; i < OpenHour.length; i++) {
    this.random_customers_per_hour1[i] = generateRandomNumber(this.min, this.max);
  }
};
LocationsHope.prototype.getcookies_purchased_Hour = function () {
  var iteration = 0;
  var sum = 0;
  for (var i = 0; i < OpenHour.length - 1; i++) {
    iteration = Math.floor(this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
    this.cookies_purchased_Hour[i] = iteration;
    sum += iteration;
    colSum[i] += iteration;
  }
  this.cookies_purchased_Hour.push(sum);
  colSum[colSum.length - 1] += sum;

};
LocationsHope.prototype.render = function () {

  var DataRow = document.createElement('tr');
  table.appendChild(DataRow);

  var ListItemLocation = document.createElement('td');
  ListItemLocation.textContent = this.name;
  DataRow.appendChild(ListItemLocation);
  for (var j = 0; j < OpenHour.length - 1; j++) {
    ListItemLocation = document.createElement('td');

    ListItemLocation.textContent = this.cookies_purchased_Hour[j];

    DataRow.appendChild(ListItemLocation);

  } 
  ListItemLocation = document.createElement('td');
  ListItemLocation.textContent = this.cookies_purchased_Hour[this.cookies_purchased_Hour.length - 1];
  DataRow.appendChild(ListItemLocation);

};
var Seattle = new LocationsHope('Seattle', 65, 23, 6.3, [], []);
var Tokyo = new LocationsHope('Tokyo', 24, 3, 1.2, [], []);
var Dubai = new LocationsHope('Dubai', 38, 11, 3.7, [], []);
var Paris = new LocationsHope('Paris', 38, 20, 2.3, [], []);
var Lima = new LocationsHope('Lima', 16, 2, 4.6, [], []);

for (var i = 0; i < Locations.length; i++) {

  Locations[i].getRandomCustomerPerHours();
  Locations[i].getcookies_purchased_Hour();
}
addHeader();
for (var t = 0; t < Locations.length; t++) {

  Locations[t].render();
}
addFooter();

function addHeader() {

  for (var out = 0; out < OpenHour.length; out++) {
    var ListItemLocation = document.createElement('th');
    ListItemLocation.textContent = OpenHour[out];
    DataRow.appendChild(ListItemLocation);
  }

}

function addFooter() {
  DataRow = document.createElement('tr');
  table.appendChild(DataRow);

  emptycol = document.createElement('td');
  emptycol.textContent = 'Total';
  DataRow.appendChild(emptycol);

  for (var tot = 0; tot < colSum.length; tot++) {

    var TotalRow = document.createElement('td');
    TotalRow.textContent = colSum[tot];
    DataRow.appendChild(TotalRow);
  }

}
function generateRandomNumber(min, max) {

  var random = Math.random();
  random = (random * (max - min + 1)) + min;
  random = Math.floor(random);
  return random;

}
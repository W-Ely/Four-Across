'use strict';

//board is 6 high and 7 long. X index is x coord. Y index is y coord
var boardCoords = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
];

var bChips = [];
var rChips = [];
var choices = ['column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7'];
function Chip(color){
  this.color = color;
  this.neighborPositiveSlope = [];
  this.neighborNegativeSlope = [];
  this.neighborVertical = [];
  this.neighborHorizontal = [];
}
Chip.prototype.findLandingLocation = function(yCoord) {
  for (var xCoord = 0; xCoord < boardCoords.length; xCoord++) {
    if (boardCoords[xCoord][yCoord] === '' ){
      boardCoords[xCoord][yCoord] = 'b';
      this.location = {'x': xCoord, 'y': yCoord};
      break;
    }
  }
};
Chip.prototype.findNeighbors = function(){
  for (var i = 0; i < bChips.length; i++) {
    var otherXCoord = bChips[i].location.x;
    var otherYCoord = bChips[i].location.y;
    var thisXCoord = this.location.x;
    var thisYCoord = this.location.y;
    if ((Math.abs(otherXCoord - thisXCoord) === 1 && Math.abs(otherYCoord === thisYCoord) === 1) || (otherXCoord - thisXCoord === 0 && Math.abs(otherYCoord - thisYCoord === 1)) || (otherYCoord - thisYCoord === 0 && Math.abs(otherXCoord - thisXCoord === 1 ))){
      console.log('That seems a bit much! But ' + otherXCoord + ':' + bChips[i].location.y + ' is next to ' + thisXCoord + ':' + thisYCoord);
    };
  }
};
function addEvents(choices){
  for (var i = 0; i < choices.length; i++) {
    var choiceBox = document.getElementById(choices[i]);
    choiceBox.addEventListener('click', handleClick);
  }
}
function handleClick(event){
  event.preventDefault();
  event.stopPropagation();
  var yCoord = choices.indexOf(event.currentTarget.id);
  if (boardCoords[5][yCoord] === '') {
    var chip = new Chip('b');
    chip.findLandingLocation(yCoord);
    console.log('This chip is at x:y ' + chip.location.x + ':' + chip.location.y);
  } else {
    console.log('Looks like that column is full!');
  }
  bChips.push(chip);
  chip.findNeighbors();
  checkChipsForWinner(chip);
}
function checkChipsForWinner(chip){

}
addEvents(choices);
//finds x:y coords or matched color
// function scanBoard(color) {
//   console.log('scanBoard is called');
//   for (var xCoord = 0; xCoord < boardCoords.length; xCoord++) {
//     for (var yCoord = 0; yCoord < boardCoords[xCoord].length; yCoord++) {
//       if(boardCoords[xCoord][yCoord] === color){
//         console.log('x:y Coords are ' + xCoord + ':' + yCoord );
//       } else {
//         console.log('Nothing to see here.');
//       }
//     }
//   }
// }
// scanBoard('b');

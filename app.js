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
  this.neighborVerticalSlope = [];
  this.neighborHorizontalSlope = [];
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
    //does the chip have a neighbor.
    if ((Math.abs(otherXCoord - thisXCoord) === 1 && Math.abs(otherYCoord === thisYCoord) === 1) || (otherXCoord - thisXCoord === 0 && Math.abs(otherYCoord - thisYCoord === 1)) || (otherYCoord - thisYCoord === 0 && Math.abs(otherXCoord - thisXCoord === 1 ))){
      // console.log('That seems a bit much! But ' + otherXCoord + ':' + bChips[i].location.y + ' is next to ' + thisXCoord + ':' + thisYCoord);
      //Which neighbor is it?
      if( (otherYCoord - thisYCoord) / (otherXCoord - thisXCoord) === 1 ) {
        this.neighborPositiveSlope.push(bChips[i]);
        bChips[i].neighborPositiveSlope.push(this.chip);
        console.log('This chip', this, 'and this chip', bChips[i], 'are now PositiveSlope neighbors');
      } else if ((otherYCoord - thisYCoord) / (otherXCoord - thisXCoord) === -1) {
        this.neighborNegativeSlope.push(bChips[i]);
        bChips[i].neighborNegativeSlope.push(this.chip);
        console.log('This chip', this, 'and this chip', bChips[i], 'are now NegativeSlope neighbors');
      } else if ((otherYCoord - thisYCoord) / (otherXCoord - thisXCoord) === 0) {
        this.neighborHorizontalSlope.push(bChips[i]);
        bChips[i].neighborHorizontalSlope.push(this.chip);
        console.log('This chip', this, 'and this chip', bChips[i], 'are now Horizontal neighbors');
      } else {
        this.neighborVerticalSlope.push(bChips[i]);
        bChips[i].neighborVerticalSlope.push(this.chip);
        console.log('This chip', this, 'and this chip', bChips[i], 'are now Vertical neighbors');
      }
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

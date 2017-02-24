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
  this.neighbor = {};
  this.neighbor.positiveSlope = [];
  this.neighbor.negativeSlope = [];
  this.neighbor.horizontalSlope = [];
  this.neighbor.verticalSlope = [];
  this.hasTwoPositiveNeighbors = false;
  this.hasTwoNegativeNeighbors = false;
  this.hasTwoHorizontalNeighbors = false;
  this.hasTwoVerticalNeighbors = false;
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
    //does the chip have a neighbor. 7 case 0:0 with X1:-1, X0:-1, X-1,-1, X-1,0, X-1,1, X0,1, X1,1 X0:-1

      // passing 0:0 and 1:-1, -1:-1, -1:1, 1:1 diagonals
    if ((Math.abs(thisXCoord - otherXCoord) === 1 && Math.abs(thisYCoord - otherYCoord) === 1) ||
      //passing 0:0 and 0:1, 0:-1, horizontal
      (thisXCoord - otherXCoord === 0 && Math.abs(thisYCoord - otherYCoord) === 1) ||
      //passing -1:0, below
      (Math.abs(thisXCoord - otherXCoord) === 1 && thisYCoord - otherYCoord === 0)){
      console.log('Chip ' + thisXCoord + ':' + thisYCoord + ' is next to chip ' + otherXCoord + ':' + otherYCoord);
      console.log('The slope is ((ThisY - OtherY)/(ThisX - OtherX))', ((thisYCoord - otherYCoord) / (thisXCoord - otherXCoord)));
      //Which neighbor is it?
      if( ((thisYCoord - otherYCoord) / (otherXCoord - otherXCoord)) === 1 ) {
        this.neighbor.positiveSlope.push(i);
        bChips[i].neighbor.positiveSlope.push(bChips.length);
        console.log('This new chip: ' + thisXCoord + ':' + thisYCoord, this, 'and this chip ' + otherXCoord + ':' + otherYCoord, bChips[i], 'are now PositiveSlope neighbors');
        if (bChips[i].neighbor.positiveSlope.length === 2) {
          bChips[i].hasTwoPositiveNeighbors = true;
          console.log('The other chip ' + otherXCoord + ':' + otherYCoord + ' now has 2 Positive Slope neighbors');
        }
        if (this.neighbor.positiveSlope.length === 2) {
          this.hasTwoPositiveNeighbors = true;
          console.log('This chip ' + thisXCoord + ':' + thisYCoord + ' now has 2 Positive  Slope neighbors');
        }
      } else if (((thisYCoord - otherYCoord) / (thisXCoord - otherYCoord)) === -1) {
        this.neighbor.negativeSlope.push(i);
        bChips[i].neighbor.negativeSlope.push(bChips.length + 1);
        console.log('This new chip: ' + thisXCoord + ':' + thisYCoord, this, 'and this chip ' + otherXCoord + ':' + otherYCoord, bChips[i], 'are now NegativeSlope neighbors');
        if (bChips[i].neighbor.negativeSlope.length === 2) {
          bChips[i].hasTwoNegativeNeighbors = true;
          console.log('The other chip ' + otherXCoord + ':' + otherYCoord + ' now has 2 Negative Slope neighbors');
        }
        if (this.neighbor.negativeSlope.length === 2) {
          this.hasTwoNegativeNeighbors = true;
          console.log('This chip ' + thisXCoord + ':' + thisYCoord + ' now has 2 Negative Slope neighbors');
        }
      } else if (thisXCoord - otherXCoord === 0) {
        this.neighbor.horizontalSlope.push(i);
        bChips[i].neighbor.horizontalSlope.push(bChips.length);
        console.log('This new chip: ' + thisXCoord + ':' + thisYCoord, this, 'and this chip ' + otherXCoord + ':' + otherYCoord, bChips[i], 'are now Horizontal neighbors');
        if (bChips[i].neighbor.horizontalSlope.length === 2) {
          bChips[i].hasTwoHorizontalNeighbors = true;
          console.log('The other chip ' + otherXCoord + ':' + otherYCoord + ' now has 2 Horizontal Slope neighbors');
        }
        if (this.neighbor.horizontalSlope.length === 2) {
          this.hasTwoHorizontalNeighbors = true;
          console.log('This chip ' + thisXCoord + ':' + thisYCoord + ' now has 2 Horizontal Slope neighbors');
        }
      } else {
        this.neighbor.verticalSlope.push(i);
        bChips[i].neighbor.verticalSlope.push(bChips.length);
        console.log('This new chip: ' + thisXCoord + ':' + thisYCoord, this, 'and this chip ' + otherXCoord + ':' + otherYCoord, bChips[i], 'are now Vertical neighbors');
        if (bChips[i].neighbor.verticalSlope.length === 2) {
          bChips[i].hasTwoVerticalNeighbors = true;
          console.log('The other chip ' + otherXCoord + ':' + otherYCoord + ' now has 2 Vertical Slope neighbors');
        }
        if (this.neighbor.verticalSlope.length === 2) {
          this.hasTwoVerticalNeighbors = true;
          console.log('This chip ' + thisXCoord + ':' + thisYCoord + ' now has 2 Vertical Slope neighbors');
        }
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
    console.log('This new chip is at x:y ' + chip.location.x + ':' + chip.location.y);
    chip.findNeighbors();
    bChips.push(chip);
  } else {
    console.log('Looks like that column is full!');
  }
  checkChipsForWinner(chip);
}
function checkChipsForWinner(chip){
  for (var i = 0; i < bChips.length; i++) {
    if (bChips[i]) {
      // bChip[i]
    }
  }
}
addEvents(choices);

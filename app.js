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
var boardHeight = 6;
var boardWidth = 7;
var bChips = [];
var rChips = [];
var choices = ['column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7'];
var checkWinner = false;
function Chip(color){
  this.color = color;
  this.neighbors = {};
  this.neighbors.positiveSlope = [];
  this.neighbors.negativeSlope = [];
  this.neighbors.horizontalSlope = [];
  this.neighbors.verticalSlope = [];
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
Chip.prototype.findNeighbors = function(chips){
  checkWinner = false;
  for (var i = 0; i < chips.length; i++) {
    var otherXCoord = chips[i].location.x;
    var otherYCoord = chips[i].location.y;
    var thisXCoord = this.location.x;
    var thisYCoord = this.location.y;
    //does the chip have a neighbors. 7 case 0:0 with X1:-1, X0:-1, X-1,-1, X-1,0, X-1,1, X0,1, X1,1 X0:-1
    // passing 0:0 with 1:-1, -1:-1, -1:1, 1:1 diagonals
    if ((Math.abs(thisXCoord - otherXCoord) === 1 && Math.abs(thisYCoord - otherYCoord) === 1) ||
      //passing 0:0 with 0:1, 0:-1, horizontal
      (thisXCoord - otherXCoord === 0 && Math.abs(thisYCoord - otherYCoord) === 1) ||
      //passing 0:0 with -1:0, down below
      (Math.abs(thisXCoord - otherXCoord) === 1 && thisYCoord - otherYCoord === 0)){
      console.log('Chip ' + thisXCoord + ':' + thisYCoord + ' is next to chip ' + otherXCoord + ':' + otherYCoord);
      console.log('The slope is ((ThisY - OtherY)/(ThisX - OtherX))', ((thisYCoord - otherYCoord) / (thisXCoord - otherXCoord)));
      //Which neighbors is it?
      if (thisYCoord - otherYCoord === 0){
        this.neighbors.verticalSlope.push(i);
        chips[i].neighbors.verticalSlope.push(chips.length);
        console.log('This new chip: ' + thisXCoord + ':' + thisYCoord, this, 'and this chip ' + otherXCoord + ':' + otherYCoord, chips[i], 'are now Vertical neighbors');
        if (chips[i].neighbors.verticalSlope.length === 2) {
          chips[i].hasTwoVerticalNeighbors = true;
          checkWinner = true;
          console.log('The other chip ' + otherXCoord + ':' + otherYCoord + ' now has 2 Vertical Slope neighbors');
        }
        if (this.neighbors.verticalSlope.length === 2) {
          this.hasTwoVerticalNeighbors = true;
          checkWinner = true;
          console.log('This chip ' + thisXCoord + ':' + thisYCoord + ' now has 2 Vertical Slope neighbors');
        }
      } else if (thisXCoord - otherXCoord === 0) {
        this.neighbors.horizontalSlope.push(i);
        chips[i].neighbors.horizontalSlope.push(chips.length);
        console.log('This new chip: ' + thisXCoord + ':' + thisYCoord, this, 'and this chip ' + otherXCoord + ':' + otherYCoord, chips[i], 'are now Horizontal neighbors');
        if (chips[i].neighbors.horizontalSlope.length === 2) {
          chips[i].hasTwoHorizontalNeighbors = true;
          checkWinner = true;
          console.log('The other chip ' + otherXCoord + ':' + otherYCoord + ' now has 2 Horizontal Slope neighbors');
        }
        if (this.neighbors.horizontalSlope.length === 2) {
          this.hasTwoHorizontalNeighbors = true;
          checkWinner = true;
          console.log('This chip ' + thisXCoord + ':' + thisYCoord + ' now has 2 Horizontal Slope neighbors');
        }
      } else if( ((thisYCoord - otherYCoord) / (thisXCoord - otherXCoord)) === 1 ) {
        this.neighbors.positiveSlope.push(i);
        chips[i].neighbors.positiveSlope.push(chips.length);
        console.log('This new chip: ' + thisXCoord + ':' + thisYCoord, this, 'and this chip ' + otherXCoord + ':' + otherYCoord, chips[i], 'are now PositiveSlope neighbors');
        if (chips[i].neighbors.positiveSlope.length === 2) {
          chips[i].hasTwoPositiveNeighbors = true;
          checkWinner = true;
          console.log('The other chip ' + otherXCoord + ':' + otherYCoord + ' now has 2 Positive Slope neighbors');
        }
        if (this.neighbors.positiveSlope.length === 2) {
          this.hasTwoPositiveNeighbors = true;
          checkWinner = true;
          console.log('This chip ' + thisXCoord + ':' + thisYCoord + ' now has 2 Positive  Slope neighbors');
        }
      } else if (((thisYCoord - otherYCoord) / (thisXCoord - otherXCoord)) === (-1)) {
        this.neighbors.negativeSlope.push(i);
        chips[i].neighbors.negativeSlope.push(chips.length + 1);
        console.log('This new chip: ' + thisXCoord + ':' + thisYCoord, this, 'and this chip ' + otherXCoord + ':' + otherYCoord, chips[i], 'are now NegativeSlope neighbors');
        if (chips[i].neighbors.negativeSlope.length === 2) {
          chips[i].hasTwoNegativeNeighbors = true;
          checkWinner = true;
          console.log('The other chip ' + otherXCoord + ':' + otherYCoord + ' now has 2 Negative Slope neighbors');
        }
        if (this.neighbors.negativeSlope.length === 2) {
          this.hasTwoNegativeNeighbors = true;
          checkWinner = true;
          console.log('This chip ' + thisXCoord + ':' + thisYCoord + ' now has 2 Negative Slope neighbors');
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
  console.log('--------Begin New Chip-----------');
  event.preventDefault();
  event.stopPropagation();
  var yCoord = choices.indexOf(event.currentTarget.id);
  if (boardCoords[boardHeight - 1][yCoord] === '') {
    var chip = new Chip('b');
    chip.findLandingLocation(yCoord);
    console.log('This new chip is at x:y ' + chip.location.x + ':' + chip.location.y);
    chip.findNeighbors(bChips);
    bChips.push(chip);
    changeBoardColors(chip);
  } else {
    console.log('Looks like that column is full!');
  }
  if(checkWinner){
    checkChipsForWinner(bChips);
  }
  computersTurn();
}
//obviously could be DRYer
function checkChipsForWinner(chips){
  console.log('Checking for winner.....');
  for (var i = 0; i < chips.length; i++) {
    if (chips[i].hasTwoPositiveNeighbors){
      for (var j = 0; j < chips[i].neighbors.positiveSlope.length; j++){
        if(chips[chips[i].neighbors.positiveSlope[j]].hasTwoPositiveNeighbors){
          console.log('Yup we\'ve got four in a row');
          declareWinner(chips[0].color);
          i = chips.length;
        }
      }
    }
    if (chips[i].hasTwoNegativeNeighbors){
      for (var j = 0; j < chips[i].neighbors.negativeSlope.length; j++){
        if(chips[chips[i].neighbors.negativeSlope[j]].hasTwoNegativeNeighbors){
          console.log('Yup we\'ve got four in a row');
          declareWinner(chips[0].color);
          i = chips.length;
        }
      }
    }
    if (chips[i].hasTwoHorizontalNeighbors){
      for (var j = 0; j < chips[i].neighbors.horizontalSlope.length; j++){
        if(chips[chips[i].neighbors.horizontalSlope[j]].hasTwoHorizontalNeighbors){
          console.log('Yup we\'ve got four in a row');
          declareWinner(chips[0].color);
          i = chips.length;
        }
      }
    }
    if (chips[i].hasTwoVerticalNeighbors){
      for (var j = 0; j < chips[i].neighbors.verticalSlope.length; j++){
        if(chips[chips[i].neighbors.verticalSlope[j]].hasTwoVerticalNeighbors){
          console.log('Yup we\'ve got four in a row');
          declareWinner(chips[0].color);
          i = chips.length;
        }
      }
    }
  }
}
function changeBoardColors(chip){
  var chipLocation = document.getElementById('x' + chip.location.x + 'y' + chip.location.y);
  console.log('Checking Chip location for color change ' + 'x' + chip.location.x + 'y' + chip.location.y);
  if (chip.color === 'b') {
    chipLocation.setAttribute('style', 'background-color: blue');
  } else {
    chipLocation.setAttribute('style', 'background-color: red');
  }
}
function computersTurn(){
  console.log('-------Computer Turn--------');
  var chip = new Chip('r');
  console.log('brand new computer chip', chip);
  chip.findLandingLocation(getRandomDropColumn());
  console.log('This new computer chip is at x:y ' + chip.location.x + ':' + chip.location.y);
  chip.findNeighbors(rChips);
  rChips.push(chip);
  changeBoardColors(chip);
  if(checkWinner){
    checkChipsForWinner(rChips);
  }
}
function getRandomDropColumn(){
  var randomNum;
  while (boardCoords[boardHeight - 1][randomNum] !== ''){
    randomNum = Math.floor(Math.random() * boardWidth);
  }
  return randomNum;
}
function declareWinner(color){
  var winningText = document.createElement('span');
  if (color === 'b') {
    winningText.textContent = 'You Win!!!';
  } else {
    winningText.textContent = 'Computer Wins!!!';
  }
  document.getElementById('winner').appendChild(winningText);
  removeEvents();
}
function removeEvents(){
  for (var i = 0; i < choices.length; i++) {
    var choiceBox = document.getElementById(choices[i]);
    choiceBox.removeEventListener('click', handleClick);
  }
}
addEvents(choices);

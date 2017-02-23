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

var bCHips = [];
var rChips = [];
var choices = ['column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7'];
function Chip(color){
  this.color = color;
}
Chip.prototype.findLocation = function(dropColumn) {
  this.location = dropColumn;// <-------need logic
};
Chip.prototype.neighbors = function(){

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
  var chip = new Chip('b', choices.indexOf(event.currentTarget.id));
  console.log('This is the new chip', chip);
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

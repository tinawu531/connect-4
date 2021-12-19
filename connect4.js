/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;// X
const HEIGHT = 6; //Y

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// board = [
//   [null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null]
// ];

/** Status setting the background board NOT visual: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  //Y is the vert axis, loop through Y using the HEIGHT (6), 
  //each time pushing an empty array:
  for (let y = 0; y < HEIGHT; y++) {
    board.push([]);
    //Inner loop, assign each value inside of the Y array to null(placeholder), 
    //using the length of WIDTH that gives the X horizontal line
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(null);
    }
  }
}

//Gray's makeBoard function
// for (let i = 0; i < HEIGHT; i++) {
//   board[i] = [];
//   for (let j = 0; j < WIDTH; j++) {
//     board[i][j] = null;
//   }
// }

/** makeHtmlBoard: make Top Row HTML table. THIS IS WHAT USERS SEE*/

function makeHtmlBoard() {
  // select the table element in HTML by id name found.
  const htmlBoard = document.getElementById("board")
  // create the first row of cells in a table using tr（table row）, and name it top
  const top = document.createElement("tr");
  //apply column-top id to use it in css.
  top.setAttribute("id", "column-top");
  //add a click event listener to the top row, which triggers the handleClick func()
  top.addEventListener("click", handleClick);
  //loop through the first horizontal X axis line using the length of WIDTH 
  for (let x = 0; x < WIDTH; x++) {
    //each time, create a Table Data Cell ,aka 'td' name it headCell
    let headCell = document.createElement("td");
    //give the head cell a id x which are 0-6;
    headCell.setAttribute("id", x);
    //append the head cells (each squares) to the table row element 
    top.append(headCell);
  }
  //append the top table row to the whole html board table element.
  htmlBoard.append(top);

  // Creating The Actual Board, using the HEIGHT, Y axis to loop 6 times and create rows
  for (let y = 0; y < HEIGHT; y++) {
    //create rows by creating a table row element
    let row = document.createElement("tr");
    //In the inner loop, using WIDTH (X axis)
    for (let x = 0; x < WIDTH; x++) {
      //create the individual square cells in that row
      let cell = document.createElement("td");
      //give the cells an id attribute with y axis and x axis combo
      cell.setAttribute("id", `${y}-${x}`);
      //append the cells to the row
      row.append(cell);
    }
    //append row to the entire visual game board, aka htmlBoard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: Checking if there is any pieces in the column x that the player clicked cell. 
 * This function is being used inside of handle Click function */

function findSpotForCol(x) {
  //looping through from the bottom row to top (index 5 to 0)
  for (let y = HEIGHT - 1; y >= 0; y--) {
    //if in row y, cell x does not exist, return the index y
    if (board[y][x] === null) {
      return y;
    }
  }
  //otherwise, return null
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  //create a div and call it piece
  let piece = document.createElement("div");
  //add a classlist element called piece to use in css
  piece.classList.add('piece');
  //add another classlist with p and the current player 1 or 2, 
  //use that to style colors of the pieces
  piece.classList.add(`p${currPlayer}`);
  //the piece relation to the table cell. 
  piece.style.top = -50 * (y + 2);
  //grab the cell's X and Y location id with and call it spot 
  const spot = document.getElementById(`${y}-${x}`);
  //add the piece to the cell on html board, 
  //now the piece is inside of the selected cell with unique id
  spot.append(piece);
}

/** endGame: announce game end */
function endGame(msg) {
  return alert(msg)
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // x represents the column on the clickable top row (index 0-6)
  const x = +evt.target.id;
  // get next spot in column using findSpotForCol func (if none, ignore click)
  const y = findSpotForCol(x);  
   if (y === null) {
    alert('You dumbass! It\'s Fucking Full!')
    return;
  }

  // assign current selected cell to the current player's piece
  board[y][x] = currPlayer;
  //update the current y and x in the placeInTable
  // function which affects the visual HTML table
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  //Tina's interpretation of check for tie:
  //inside of the board, check every row, then check every cell, 
  //see if they are occupied, aka true.
  const checkAllCells = (board.every(function(row){
    row.every(function(cell){cell}
              )
            }
            ))
    if(checkAllCells){
      //if they are occupied, return Tie.
      return endGame ("Tie!")
    }

  // switch players, see if current player is 1, if it is use a 
  //ternary way to choose 2, otherwise which to 1. It should start with player 1 
  currPlayer = currPlayer === 1 ? 2 : 1;

  //tina's way:
 
    // if(currPlayer === 1){
    //   currPlayer = 2;
    //   } else {
    //     currPlayer = 1
    //     }
    }
  
  


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(fourCells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
 
    return fourCells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  //The Array board, not HTML
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

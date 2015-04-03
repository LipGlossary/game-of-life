$(document).ready( function () {

  // Initialize the grid
  gridInit();

  // click: queue a cell to be toggled
  $( 'li' ).find( 'li' ).click( function (e) {
    $( this ).toggleClass( 'toggle' );
  } );

  // button: pause/unpause animation
  $( '#pause' ).click( function (e) {
    paused = !paused;
    if ( paused ) { $( this ).text( 'PLAY' ); }
    else { $( this ).text( 'PAUSE' ); }
  } );

  // button: add column
  $( '#w-plus' ).click( function (e) { addCol(); } );

  // button: remove column
  $( '#w-minus' ).click( function (e) { 
    if ( w > 1 ) { removeCol(); }
  } );

  // button: add row
  $( '#h-plus' ).click( function (e) { addRow(); } );

  // button: remove row
  $( '#h-minus' ).click( function (e) { 
    if ( h > 1 ) { removeRow(); }
  } );

  // button: attempts to clear the board
  $( '#clear' ).click( function (e) {
    $( '.live' ).addClass( 'toggle' );
  } );

  // Trigger the animation every 250 milliseconds
  setInterval( animate, 250 );

} );

/***************************    DATA AND HELPERS    ***************************/

var w = 16;  // grid width
var h = 16;  // grid height

// world data
var grid = [];

// optional initial grid pattern
var gridStart = [
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '                ',
  '    0           ',
  '      0         ',
  '   00  000      ',
  '                ',
  '                ',
  '                ',
  '                '
];

var paused = false;

// colors
var hot = [ 244, 24, 123 ];
var cold = [ 14, 73, 211 ];

/*      Utility for replacing a character in a string
str   - the base string
index - the character to change
cha   - the replacement character
mutates nothing
returns a new string
*/
var replaceAt = function ( str, index, cha ) {
  return str.substr(0, index) + cha + str.substr(index + 1);
};

var animate = function () {
  if ( !paused ) { stepGen(); }
};

/********************    CALCULATE THE NEXT GENERATION    *********************/
// Also draws the grid

var stepGen = function () {

  var step = new Array();  // start with a blank grid
  for ( var i = 0; i < h; i++ ) {
    step.push( '' );  // add a row
    for ( var j = 0; j < w; j++ ) {

      var nb = neighbours( i, j );  // get the number of live neighbours

      // live cell cases
      if ( grid[i][j].match(/\d/) ) {

        // 1. Any live cell with fewer than two live neighbours
        //    dies, as if caused by under-population. (SEE BELOW)

        // 2. Any live cell with two or three live neighbours
        //    lives on to the next generation.
        if ( nb === 2 || nb === 3 ) { 
          step[i] += Math.min( +grid[i][j] + 1, 9 );
        }

        // 3. Any live cell with more than three live neighbours
        //    dies, as if by overcrowding. (SEE BELOW)

        else { step[i] += ' '; }  // kill the cell

      // dead cell cases
      } else if ( nb === 3 ) {
        // 4. Any dead cell with exactly three live neighbours
        //    becomes a live cell, as if by reproduction.
        step[i] += '0';
      }

      else { step[i] += ' '; }  // cell stays dead

    }
  }
  grid = step;  // new grid is now canonical
  drawGrid();   // draw it

};

/********************    COUNT A CELL'S LIVE NEIGHBOURS    ********************/

var neighbours = function ( row, col ) {

  var nb = '';

  // row above
  if ( row > 0 ) {
    nb += col > 0 ? grid[row-1].substr(col-1, 3) : grid[row-1].substr(col, 2);
  }

  // inline
  nb += col > 0 ? grid[row].substr(col-1, 3) : grid[row].substr(col, 2);

  // row below
  if ( row < h-1 ) {
    nb += col > 0 ? grid[row+1].substr(col-1, 3) : grid[row+1].substr(col, 2);
  }

  nb = nb.match(/\d/g);                        // find the live neighbours
  if ( nb === null ) { return 0; }            // nothing alive
  nb = nb.length;                             // count 'em
  return grid[row][col].match(/\d/) ? nb-1 : nb;  // don't count yourself

};

/****************************    DRAW THE GRID    *****************************/

var drawGrid = function () {

  for ( var i = 0; i < h; i++ ) {
    for ( var j = 0; j < w; j++ ) {

      // create the selector string
      var selection = $( 'li:nth-of-type(' + (i+1) + ')' ).find( ' li:nth-of-type(' + (j+1) + ')' );
      
      // propagate the toggle to the grid
      if ( selection.hasClass('toggle') ) {
        grid[i] = grid[i][j].match(/\d/) ? replaceAt( grid[i], j, ' ' ) : replaceAt( grid[i], j, '0' );
        selection.removeClass( 'toggle' );
      }

      // reset cell
      selection.removeClass( 'live' );
      selection.css( 'background-color', '' );
      
      // paint live cells
      if ( grid[i][j].match(/\d/) ) { 
        selection.addClass( 'live' );
        var color = 'rgb('
          + Math.trunc( hot[0] - ( ( hot[0] - cold[0] ) / 10 * grid[i][j] ) )
          + ','
          + Math.trunc( hot[1] - ( ( hot[1] - cold[1] ) / 10 * grid[i][j] ) )
          + ','
          + Math.trunc( hot[2] - ( ( hot[2] - cold[2] ) / 10 * grid[i][j] ) )
          + ')';
        selection.css( 'background-color', color );
      }

    }
  }

};

/*****************    INITIALIZE THE GRID IN HTML AND HERE    *****************/
// Also draws the grid the first time

var gridInit = function () {

  // Draw the grid in HTML
  $( '#grid' ).append( '<ul></ul>' );
  for ( var i = 0; i < h; i++ ) {
    $( '#grid' ).children( 'ul' ).append( '<li><ul></ul></li>' );
    grid.push( '' );
  }
  for ( var j = 0; j < w; j++ ) {
    $( 'ul' ).find( 'ul' ).append( '<li></li>' );
    grid[i]
  }

  // Populate the controls
  $( '#width' ).find( 'p' ).text( 'width: ' + w );
  $( '#height' ).find( 'p' ).text( 'height: ' + h );

  // Initialize the world data
  if ( gridStart ) { grid = gridStart; }  // Use starting pattern
  else {                                  // Or make a blank grid
    grid = new Array();
    for ( var i = 0; i < h; i++ ) {
      grid.push( '' );
      for ( var j = 0; j < w; j++ ) {
        grid[i] += ' ';
      }
    }
  }

  drawGrid();

};

/*******************    ADD AND REMOVE COLUMNS AND ROWS    ********************/

//    ADD A COLUMN    ================
var addCol = function () {

  $( 'li' ).find( 'ul' ).append( '<li></li>' );
  for ( var i = 0; i < h; i++ ) {
    grid[i] += ' ';
  }
  w++;

  $( 'li' ).find( 'li:last-of-type' ).click( function (e) {
    $( this ).addClass( 'toggle' );
  } );

  $( '#width' ).find( 'p' ).text( 'width: ' + w );

};

//    REMOVE A COLUMN    =============
var removeCol = function () {

  // DOM elements
  $( 'li' ).find( 'li:last-of-type' ).remove();

  // grid data
  for ( var i = 0; i < h; i++ ) {
    grid[i] = grid[i].slice(0, -1);
  }
  w--;

  // control panel
  $( '#width' ).find( 'p' ).text( 'width: ' + w );

};

//    ADD A ROW    ===================
var addRow = function () {

  $( '#grid' ).children( 'ul' ).append( '<li><ul></ul></li>' );   // DOM elements
  grid.push( '' );                                    // grid data
  for ( var i = 0; i < w; i++ ) {
    $( 'li:last-of-type' ).find( 'ul' ).append( '<li></li>' );  // DOM elements
    grid[h] += ' ';                                   // grid data
  }
  h++;

  // bind click handler
  $( 'li:last-of-type' ).find( 'li' ).click( function (e) {
    $( this ).addClass( 'toggle' );
  } );

  // control panel
  $( '#height' ).find( 'p' ).text( 'height: ' + h );

};

//    REMOVE A ROW    ================
var removeRow = function () {

  // DOM elements
  $( '#grid' ).children( 'ul' ).children( 'li:last-of-type' ).remove();

  // grid data
  grid.pop();
  h--;

  // control panel
  $( '#height' ).find( 'p' ).text( 'height: ' + h );

};

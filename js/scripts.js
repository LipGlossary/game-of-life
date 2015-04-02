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
  '    #           ',
  '      #         ',
  '   ##  ###      ',
  '                ',
  '                ',
  '                ',
  '                '
];

var paused = false;

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
      if ( grid[i][j] === '#') {

        // 1. Any live cell with fewer than two live neighbours
        //    dies, as if caused by under-population. (SEE BELOW)

        // 2. Any live cell with two or three live neighbours
        //    lives on to the next generation.
        if ( nb === 2 || nb === 3 ) { 
          step[i] += '#';
        }

        // 3. Any live cell with more than three live neighbours
        //    dies, as if by overcrowding. (SEE BELOW)

        else { step[i] += ' '; }  // kill the cell

      // dead cell cases
      } else if ( nb === 3 ) {
        // 4. Any dead cell with exactly three live neighbours
        //    becomes a live cell, as if by reproduction.
        step[i] += '#';
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

  nb = nb.match(/#/g);                        // find the live neighbours
  if ( nb === null ) { return 0; }            // nothing alive
  nb = nb.length;                             // count 'em
  return grid[row][col] === '#' ? nb-1 : nb;  // don't count yourself

};

/****************************    DRAW THE GRID    *****************************/

var drawGrid = function () {

  for ( var i = 0; i < h; i++ ) {
    for ( var j = 0; j < w; j++ ) {

      // create the selector string
      var selection = $( 'li:nth-of-type(' + (i+1) + ')' ).find( ' li:nth-of-type(' + (j+1) + ')' );
      
      // propagate the toggle to the grid
      if ( selection.hasClass('toggle') ) {
        grid[i] = grid[i][j] === '#' ? replaceAt( grid[i], j, ' ' ) : replaceAt( grid[i], j, '#' );
        selection.removeClass( 'toggle' );
      }

      // reset cell
      selection.removeClass( 'live' );
      // paint live cells
      if ( grid[i][j] === '#' ) { selection.addClass( 'live' ); }

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

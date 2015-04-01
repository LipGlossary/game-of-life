$(document).ready( function () {

  // Initialize the grid
  gridInit();

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

/****************************    DRAW THE GRID    *****************************/

var drawGrid = function () {

  for ( var i = 0; i < h; i++ ) {
    for ( var j = 0; j < w; j++ ) {

      // create the selector string
      var selection = $( 'li:nth-of-type(' + (i+1) + ')' ).find( ' li:nth-of-type(' + (j+1) + ')' );
      
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

$(document).ready( function () {

  // Initialize the grid
  gridInit();

} );

/***************************    DATA AND HELPERS    ***************************/

var w = 16;  // grid width
var h = 16;  // grid height

// world data
var grid = [];

/*****************    INITIALIZE THE GRID IN HTML AND HERE    *****************/

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
  grid = new Array();
  for ( var i = 0; i < h; i++ ) {
    grid.push( '' );
    for ( var j = 0; j < w; j++ ) {
      grid[i] += ' ';
    }
  }

};

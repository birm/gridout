/**
 *  @fileoverview Grid layout helper tool.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 */


/**
 *A GridOut Object
 *@constructor
 *@param {int} x - number of grids to draw in the x dimension
 *@param {int} y - number of grids to draw in the y dimension
 *@param {float} margin - ratio of margin size to grid size (between 0 and 1)
 *@param {float} size - size of the object
 */
class GridOut{
  constructor (x, y, margin, size){
    this.x = x;
    this.y = y;
    this.margin = margin;
    this.size = size;
  }

  /**
  Each grid cell has a top and left margin, and has an indirect bottom and right margin in the left and top margins of other squares.
  The bottom row contains additional bottom margins, and each row has an additional right margin, to complete the grid.
  _______________
  |  _________  |
  | |         | |
  | |         | |
  | |         | |
  | |         | |
  |  _________  |
  _______________

  */

  /** Generate a SVG from x, y, and margin sizes.
  */
  function draw(){
    var x = this.x;
    var y = this.y;
    var margin = this.margin;
    var size = this.size;
    // put in a square div
    var svg = "<svg style='width:" + size + ";height:" + size + ";'>"
    // determine sizes in percent
    var outer_height = 100*(1./x) * size;
    var inner_height = (1 - margin)* outer_height * size;
    var offset = (margin * outer_height)/2 * size;

    for each in y{
      for each in x{
        var name = "grid" + x + y;
        // draw left margin box
        name+"left";
        // draw top margin box
        name+"top";
      }
      // draw right margin box
    }
    for each in x{
      // draw bottom margin box
    }
    svg = svg + "</svg>"
    return svg;
  }

  /** Generate a SVG from x, y, and margin sizes.
  *@param {int} xpos - in-element x position of the touched area in pixels
  *@param {int} ypos - in-element y position of the touched area in pixel
  */
  function where(xpos, ypos){
    Empty
  }

}

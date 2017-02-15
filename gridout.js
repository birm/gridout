/**
 *  @fileoverview Grid layout helper tool.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 */

/** Generate a SVG from x, y, and margin sizes.
*@param {int} x - number of grids to draw in the x dimension
*@param {int} y - number of grids to draw in the y dimension
*@param {float} margin - ratio of margin size to grid size (between 0 and 1)
*/
/**
 *A GridOut Object
 *@constructor
 *@param {int} x - number of grids to draw in the x dimension
 *@param {int} y - number of grids to draw in the y dimension
 *@param {float} margin - ratio of margin size to grid size (between 0 and 1)
 */
class GridOut{
  constructor (x, y, margin){
    this.x = x;
    this.y = y;
    this.margin = margin;
  }

  /** Generate a SVG from x, y, and margin sizes.
  */
  function grid(){
    var x = this.x;
    var y = this.y;
    var margin = this.margin;
    // put in a square div
    var svg = "<svg style='width:100%;height:100%;'>"
    // determine sizes in percent
    var outer_height = 100*(1./x);
    var inner_height = (1 - margin)* outer_height;
    var offset = (margin * outer_height)/2;
    for each in x{
      // draw top margin box
    }
    for each in y{
      for each in x{
        // draw left margin box
        // draw bottom margin box
      }
      // draw right margin box
    }
    svg = svg + "</svg>"
    return svg;
  }

}

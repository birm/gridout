/**
 *  @fileoverview Grid layout helper tool.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 */

drawRect(name, x, y, width, height){
  return "<rect id=" + name + "x="+ x + " y="+ y  + " width="+ width + " height="+ height + "/>";
}

/**
 *A GridOut Object
 *@constructor
 *@param {int} x - number of grids to draw in the x dimension
 *@param {int} y - number of grids to draw in the y dimension
 *@param {float} margin - ratio of margin size to grid size (between 0 and 1)
 *@param {float} size - size of the object
 */
class gridout{
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
    var outer_size = 100*(1./x) * size;
    var inner_size = (1 - margin)* outer_size * size;
    var margin_size = (margin * outer_size)/2 * size;

    for each in y{
      // get the baseline y position
      var ypos =
      for each in x{
        // get the baseline x position
        var xpos = ;
        var name = "grid" + x + y;
        // draw left margin box
        drawRect(name+"left", xpos, ypos, margin_size, outer_size);
        // draw top margin box
        drawRect(name+"top", xpos , ypos + margin_size + inner_size, outer_size, margin_size);
        // draw the grid element box
        drawRect(name, xpos + margin_size, ypos+margin_size, inner_size, inner_size);
      }
      // draw right margin box
      drawRect(name+"right", xpos + margin_size + inner_size, ypos, margin_size, outer_size);
    }
    for each in x{
      drawRect(name+"bottom", xpos , ypos, outer_size, margin_size);
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

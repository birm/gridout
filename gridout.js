/**
 *  @fileoverview Grid layout helper tool.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 */

function drawRect(name, xelem, yelem, width, height){
  return "<rect id=" + name + "x="+ x + " y="+ y  + " width="+ width + " height="+ height + "/>";
}

/**
 *A GridOut Object
 *@constructor
 *@param {int} xelem - number of grids to draw in the x dimension
 *@param {int} yelem - number of grids to draw in the y dimension
 *@param {float} margin - ratio of margin size to grid size (between 0 and 1)
 *@param {float} size - size of the object
 */
class gridout{
  constructor (x, y, margin, size){
    this.x = x;
    this.y = y;
    this.margin = margin;
    this.size = size;
    // calcualted attributes
    this.outer_size = 100*(1./x) * size;
    this.inner_size = (1 - margin)* outer_size * size;
    this.margin_size = (margin * outer_size)/2 * size;
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
  draw(){
    // put in a square div
    var svg = "<svg style='width:" + size + ";height:" + size + ";'>"
    for (y=0; y < this.yelem; y++){
      // get the baseline y position
      var ypos = y * this.outer_size;
      for (x=0; x < this.xelem; x++){
        // get the baseline x position
        var xpos = x * this.outer_size; // MAY need to invert with outer_size*xelem - (x*outer_size)
        var name = "grid" + x + y;
        // draw left margin box
        drawRect(name+"left", xpos, ypos, this.margin_size, this.outer_size);
        // draw top margin box
        drawRect(name+"top", xpos , ypos + this.margin_size + this.inner_size, this.outer_size, this.margin_size);
        // draw the grid element box
        drawRect(name, xpos + this.margin_size, ypos + this.margin_size, this.inner_size, this.inner_size);
      }
      // draw right margin box
      drawRect(name+"right", xpos + this.margin_size + this.inner_size, ypos, this.margin_size, this.outer_size);
    }
    for (x=0; x < this.xelem; x++){
      drawRect(name+"bottom", xpos , ypos, this.outer_size, this.margin_size);
    }
    svg = svg + "</svg>"
    return svg;
  }

  /** Generate a SVG from x, y, and margin sizes.
  *@param {int} xpos - in-element x position of the touched area in pixels
  *@param {int} ypos - in-element y position of the touched area in pixel
  */
  find(xpos, ypos){
    return null;
  }

}

module.exports = gridout;

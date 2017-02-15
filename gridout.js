/**
 *  @fileoverview Grid layout helper tool.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 */
function drawRect(name, x, y, width, height) {
    return "<rect id='" + name + "' x='" + x + "' y='" + y + "' width='" + width + "' height='" + height + "' fill='rgba(255,255,255,0)' style='stroke-width:3; stroke:rgb(0,0,0)'/>";
}

/**
 *A GridOut Object
 *Each grid cell has a top and left margin, and has an indirect bottom and right margin in the left and top margins of other squares.
 *The bottom row contains additional bottom margins, and each row has an additional right margin, to complete the grid.
 *@constructor
 *@param {int} xelem - number of grids to draw in the x dimension
 *@param {int} yelem - number of grids to draw in the y dimension
 *@param {float} margin - ratio of margin size to grid size (between 0 and 1)
 *@param {float} size - size of the object
 */
class gridout {
    constructor(x, y, margin, size) {
        this.x = x;
        this.y = y;
        this.margin = margin;
        this.size = size;
        // calcualted attributes
        this.outer_size = (1. / x) * size;
        this.inner_size = (1 - margin) * this.outer_size;
        this.margin_size = (margin * this.outer_size);
        // pick colors to define regions
        this.colors = [
            "#8C1A6A", "#5AFF15", "#FF3562", "#9CB380", "#343A1A",
            "#63372C", "#ACD8AA", "F4E950", "rgba(255,255,255,0)"
        ];
    }



    /** Generate a SVG from x, y, and margin sizes. */
    draw() {
        // put in a square div
        var size_w_margin = parseInt(this.size, 10) + parseInt(this.margin_size, 10);
        size_w_margin = size_w_margin.toString();
        var svg = "<svg id='grid_workspace' style='width:" + size_w_margin + ";height:" + size_w_margin + ";'>"
        for (var y = 0; y < this.y; y++) {
            // get the baseline y position
            var ypos = y * this.outer_size;

            for (var x = 0; x < this.x; x++) {
                // get the baseline x position
                var xpos = x * this.outer_size; // MAY need to invert with outer_size*xelem - (x*outer_size)
                var name = "grid" + x + "x" + y;

                // draw left margin box
                svg += drawRect(name + "left", xpos, ypos, this.margin_size, this.outer_size);

                // draw top margin box
                svg += drawRect(name + "top", xpos, ypos, this.outer_size, this.margin_size);

                // draw the grid element box
                svg += drawRect(name, xpos + this.margin_size, ypos + this.margin_size, this.inner_size, this.inner_size);

                // place draggable element for painting on each square
                this.create_dragable(xpos, ypos, name)
            }
            // draw right margin box
            svg += drawRect(name + "right", xpos + this.margin_size + this.inner_size, ypos, this.margin_size, this.outer_size);
        }
        // draw the bottom
        for (x = 0; x < this.x; x++) {
            var xpos = x * this.outer_size;
            var ypos = this.y * this.outer_size;
            svg += drawRect(name + "bottom", xpos, ypos, this.outer_size, this.margin_size);
        }
        svg += "</svg>"
        document.body.insertAdjacentHTML('afterbegin', svg);
        return svg;
    }

    /**
     *Create a dragable object for painting the grid
     *@constructor
     *@param {int} xpos - x position in pixels
     *@param {int} ypos - y position in pixels
     *@param {float} name - name of rect to place on
     */
    create_dragable(xpos, ypos, name) {
        var style = "position:relative; left: "
        style += xpos + "; top: "
        style += ypos + "; height: "
        style += this.outer_size + " ; width: " + this.outer_size + ";";
        var drag = document.createElement("drag" + name)
        drag.setAttribute("style", style)
        drag.setAttribute("draggable", true);
    }

    /** Get the id of a box given its position.
     *@param {int} xpos - in-element x position of the touched area in pixels
     *@param {int} ypos - in-element y position of the touched area in pixel
     */
    find(xpos, ypos) {
        var xind = Math.floor(xpos / this.outer_size).toString();
        var yind = Math.floor(ypos / this.outer_size).toString();
        return "grid" + xind + yind;
    }

    /** Change square color on tap
     *@param {int} xpos - in-element x position of the touched area in pixels
     *@param {int} ypos - in-element y position of the touched area in pixel
     */
    tap(xpos, ypos) {
        // find which square was tapped
        var tapped = find(xpos, ypos);
        var square = document.getElementById(tapped);
        // get color index of current square
        var current = this.colors.indexOf(square.getAttribute("fill"));
        // set to next one
        square.setAttribute("fill", this.colors((current + 1) % (this.colors.length)));
    }

    /** Change square when dragged over
     *@param {int} xpos - in-element x position of the touched area in pixels
     *@param {int} ypos - in-element y position of the touched area in pixels
     *@param {int} parent - the square of the drag start
     */
    drag(xpos, ypos, parent) {
        var tapped = find(xpos, ypos);
        var square = document.getElementById(tapped);
        var parent = document.getElementById(parent.substr(4));
        // set color
        var color = parent.getAttribute("fill");
        document.getElementById(square).setAttribute("fill", color);

        // TODO ensure element snaps back when done
    }
    /** Serialize the object as an xml */
    get_xml() {
        // get svg
        var grid = document.getElementById('grid_workspace').outerHTML;
        // make xml
        xmlout = "<gridout>";
        xmlout += "  <xelem>" + this.x + "</xelem>";
        xmlout += "  <yelem>" + this.x + "</yelem>";
        xmlout += "  <margin>" + this.margin + "</margin>";
        xmlout += "  <grid>" + grid + "</grid>";
        xmlout += "  <size>" + this.size + "</size>"
        xmlout += "</gridout>"
        return xmlout;
    }

    /** Serialize the object as a JSON */
    get_json() {
        var json_obj = {
            "gridout": {
                "xelem": this.x,
                "yelem": this.y,
                "margin": this.margin,
                "grid": document.getElementById('grid_workspace').outerHTML,
                "size": this.size
            }
        }
        return json_obj
    };



    /** Color a square when dragged over
     *@param {object} event - passed event information
     */
    static dragover(event) {
        event.preventDefault();
        // TODO MAy need to contextualize clientX and clientY for svg coords
        this.drag(event.clientX, event.clientY, event.currentTarget);
    }

    /** Color  margins when a drag ends
     *@param {object} event - passed event information
     */
    static dragend(event) {
        return null;
        //this.color_margins();
    }

    /** Load from a JSON object (get_json generates this)
     *@constructor
     *@param {object[]} loaded - the object to load
     */
    static load(loaded) {
        var gridout_obj = new this(loaded['x'], loaded['y'], loaded['margin'], loaded['size']);
        document.body.insertAdjacentHTML('afterbegin', loaded['grid']);
        return gridout_obj;
    }

}

module.exports = gridout;

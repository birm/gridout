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
 *@param {int} dimension - number of grids to draw in the x and y dimensions
 *@param {float} margin - ratio of margin size to grid size (between 0 and 1)
 *@param {float} size - size of the object
 */
class gridout {
    constructor(dimension, margin, size) {
        this.x = dimension;
        this.y = dimension;
        this.margin = margin;
        this.size = size;
        // calcualted attributes
        this.outer_size = (1. / dimension) * size;
        this.inner_size = (1 - margin) * this.outer_size;
        this.margin_size = (margin * this.outer_size);
        // pick colors to define regions
        this.colors = [
            "#8C1A6A", "#5AFF15", "#FF3562", "#9CB380", "#343A1A",
            "#63372C", "#ACD8AA", "F4E950", "rgba(255,255,255,0)"
        ];
    }



    /** Generate a SVG from dimension, and margin sizes. */
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
        var gridspace = document.getElementById('gridarea');
        gridspace.innerHTML = svg;
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
        var style = "position:absolute; left: "
        style += xpos + "; top: "
        style += ypos + "; height: "
        style += this.outer_size + " ; width: " + this.outer_size + ";";
        var drag = document.createElement("div")
        drag.id = ("drag" + name)
        drag.setAttribute("style", style)
        drag.setAttribute("draggable", true);
        drag.setAttribute("onClick", "gridout.tap('" + name + "');");
        drag.setAttribute("onDragStart", "gridout.dragstart(event);");
        drag.setAttribute("onDragEnter", "gridout.dragover(event);");
        drag.addEventListener("touchmove", function(e){
            gridout.touchmove(e)
        }, false);
        document.getElementById("dragarea").appendChild(drag);
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
    static tap(tapped) {
        // pick colors to define regions
        var colors = [
            "#8C1A6A", "#5AFF15", "#FF3562", "#9CB380", "#343A1A",
            "#63372C", "#ACD8AA", "F4E950", "rgba(255,255,255,0)"
        ];
        // find which square was tapped
        var square = document.getElementById(tapped);
        // get color index of current square
        var current = colors.indexOf(square.getAttribute("fill"));
        // set to next one
        square.setAttribute("fill", colors[(current + 1) % (colors.length)]);
    }

    /** Serialize the object as an xml */
    get_xml() {
        // get svg
        var grid = document.getElementById('gridarea').outerHTML;
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
                "grid": document.getElementById('gridarea').innerHTML,
                "size": this.size
            }
        }
        return json_obj
    };


    /** Save color to drag event
     *@param {object} event - passed event information
     */
    static dragstart(event) {
        var color = document.getElementById(event.currentTarget.id.substr(4)).getAttribute("fill").toString();
        document.getElementById('hiddencolor').setAttribute("class", color);
        event.dataTransfer.setData("text/plain", color);
        event.effectAllowed = "copy";
    }

    /** Color a square when dragged over
     *@param {object} event - passed event information
     */
    static dragover(event) {
        event.preventDefault();
        var color = document.getElementById('hiddencolor').getAttribute("class");
        document.getElementById(event.currentTarget.id.substr(4)).setAttribute("fill", color);
    }

    // touch events too
    /** Save color to touch event
     *@param {object} event - passed event information
     */
    static touchmove(event) {
        var color = document.getElementById(event.targetTouches.item(0).target.id.substr(4)).getAttribute("fill").toString();
        document.getElementById('hiddencolor').setAttribute("class", color);
        var over = document.elementFromPoint(event.targetTouches.item(0).pageX, event.targetTouches.item(0).pageY)
        document.getElementById(over.id.substr(4)).setAttribute("fill", color);
    }


    /** Color  margins when a drag ends
     *@param {object} event - passed event information
     */
    static dragend(event) {
        return null;
        //this.color_margins();
    }

    static draw_here() {
        var width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        var height = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        var len = Math.min(width * 0.9, (height  - 100));
        var gridx = document.getElementById('grid_num_x').value;
        // margin is between 0 and 10
        var margin = document.getElementById('margin').value;
        var margin = margin * 0.02;
        var a = new gridout(gridx, margin, len);
        a.draw();
    }

    /** Load from a JSON object (get_json generates this)
     *@constructor
     *@param {object[]} loaded - the object to load
     */
    static load(loaded) {
        var gridout_obj = new this(loaded['x'], loaded['y'], loaded['margin'], loaded['size']);
        var gridspace = document.getElementById('gridarea');
        gridspace.innerHTML = loaded['grid'];
        return gridout_obj;
    }

}

module.exports = gridout;

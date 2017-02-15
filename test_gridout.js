/**
 *  @fileoverview Grid layout test commands.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 */

var test = require('tape');
var GridOut = require("./GridOut");

test( 'initialization tests', function(t) {
    t.plan(1);

    t.doesNotThrow( function() {
        onetwothreefour = new Gridout(5, 5, 0.1, 200);
    }, '*', "new GridOut() construction");
});

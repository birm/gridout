/**
 *  @fileoverview Grid layout test commands.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 */

var test = require('tape');
var gridout = require("./gridout");

test( 'initialization tests', function(t) {
    t.plan(1);

    t.doesNotThrow( function() {
        basic = new gridout(5, 5, 0.1, 200);
    }, '*', "new GridOut() construction");
});

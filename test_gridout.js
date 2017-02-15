/**
 *  @fileoverview Grid layout test commands.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 */

var test = require('tape');
var gridout = require("./gridout");

var { jsdom } = require('jsdom');

function createDocument() {
  const document = jsdom(undefined);
  const window = document.defaultView;
  global.document = document;
  global.window = window;

  Object.keys(window).forEach((key) => {
    if (!(key in global)) {
      global[key] = window[key];
    }
  });

  return document;
}

document = createDocument();

test( 'initialization test', function(t) {
    t.plan(1);

    t.doesNotThrow( function() {
        var basic = new gridout(5, 5, 0.1, 200);
    }, '*', "new GridOut() construction");
});


test( 'unit tests', function(t) {
    t.plan(2);

    t.doesNotThrow( function() {
      var a = new gridout(5,5,0.1,200);
      a.draw()
    }, '*', "GridOut() svg drawing");

    t.doesNotThrow( function() {
      var a = new gridout(5,5,0.1,200);
      a.draw()
      var b = gridout.load(a.get_json());
    }, '*', "GridOut() json input and output");
});

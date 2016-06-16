//The root client javascript file that helps render APP.js into the document.
//This is the first javascript file that will run in the browser.

var React = require('react');
var ReactDom = require('react-dom');
var APP = require('./components/APP');

//Renders the APP component into the #react-container in index.html
ReactDom.render(<APP />, document.getElementById('react-container'));
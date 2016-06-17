//The root client javascript file that helps render APP.js into the document.
//This is the first javascript file that will run in the browser.

var React = require('react');
// var ReactDom = require('react-dom');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var APP = require('./components/APP');
var Audience = require('./components/Audience');
var Speaker = require('./components/Speaker');
var Board = require('./components/Board');
var Whoops404 = require('./components/Whoops404');

var routes = (
    //The APP component's children will be what changes, APP is our route handler.
    //React components always have a handler property set which component handles that route.
    <Route handler={APP}>
        <DefaultRoute handler={Audience} />
        <Route name="speaker" path="speaker" handler={Speaker}></Route>
        <Route name="board" path="board" handler={Board}></Route>
        <NotFoundRoute handler={Whoops404}/>
    </Route>
);

// Renders the desired component into the #react-container in index.html based on route.
// Handler parameter is Speaker, Board or Audience based on what user inputs into URL.

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('react-container'));
});






// ReactDom.render((
//     <Router>
//         <Route component={APP}>
//             <Route path="/" component={Audience} />
//             <Route path="/speaker" component={Speaker} />
//             <Route path="/board" component={Board} />
//         </Route>
//     </Router>
//     ), document.getElementById('react-container'));


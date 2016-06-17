var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Whoops404 = React.createClass({
    render() {
        return (
            <div id="not-found">
                <h1>Whoopsie Daisy!</h1>
                <p>The requested page is not found :(</p>
                <p>Try these links: </p>
                <Link to="/">Join as Audience</Link>
                <Link to="/speaker">Start a Presentation</Link>
                <Link to="/board">View the Board</Link>
            </div>
        );
    }
    
});

module.exports = Whoops404;
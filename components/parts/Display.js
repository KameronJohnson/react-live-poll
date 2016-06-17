var React = require('react');

var Display = React.createClass({
   render() {
       //if the if property is true, display all children in the div, else null
       return (this.props.if) ? <div>{this.props.children}</div> : null;
       
   } 
});

module.exports = Display;
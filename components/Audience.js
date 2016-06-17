var React = require('react');
var Display = require('./parts/Display');

var Audience = React.createClass({
    //display if socket's status is connected.
   render() {
       return (
           <div>
          
                <Display if={this.props.status === 'connected' }>
                    <h1>Join the session</h1>
                </Display>
           </div>
        );
   } 
});

module.exports = Audience;
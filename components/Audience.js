var React = require('react');
var Display = require('./parts/Display');
var Join = require('./parts/Join')

var Audience = React.createClass({
    //display if socket's status is connected.
    //Join form added
   render() {
       return (
           <div>
          
                <Display if={this.props.status === 'connected' }>
                    <h1>Join the session</h1>
                    <Join />
                </Display>
           </div>
        );
   } 
});

module.exports = Audience;
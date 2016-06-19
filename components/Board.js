var React = require('react');
var Display = require('./parts/Display');

var Board = React.createClass({
   render() {
       return (
           <div id="scoreboard">
           
                <Display if={this.props.status === 'connected' && this.props.currentQuestion}>
                    <h3>{this.props.currentQuestion.q}</h3>
                    <p>{JSON.stringify(this.props.results)}</p>
                </Display>
                
                <Display if={this.props.status === 'connected' && !this.props.currentQuestion}>
                    <h3>Awaiting a Question...</h3>
                </Display>
           </div>
        );
   } 
});

module.exports = Board;
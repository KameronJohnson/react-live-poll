var React = require('react');
var Display = require('./parts/Display');
var Join = require('./parts/Join');
var Ask = require('./parts/Ask');

var Audience = React.createClass({
    //display if socket's status is connected.
    //Join form added
   render() {
       return (
           <div>
          
                <Display if={this.props.status === 'connected' }>
                
                    <Display if={this.props.member.name}>
                    
                        <Display if={!this.props.currentQuestion}>
                            <h2>Welcome {this.props.member.name}!</h2>
                            <div className="col-sm-6">
                                <p>{this.props.audience.length} in the audience:</p>
                            </div>
                            <div className="col-sm-6">
                                <ul className="list-group">
                                    {this.props.audience.map(function(audienceMembers){
                                        return <li className="list-group-item text-center">{audienceMembers.name}</li>;
                                    })}
                                </ul>
                            </div>    
                            <p>Questions will appear here...</p>
                        </Display>
                        
                        <Display if={this.props.currentQuestion}>
                            <Ask question={this.props.currentQuestion} emit={this.props.emit} />
                        </Display>
                        
                    </Display>
                    
                    <Display if={!this.props.member.name}>
                        <h1>Please join the session</h1>
                        <Join emit={this.props.emit} />                    
                    </Display>

                </Display>
           </div>
        );
   } 
});

module.exports = Audience;
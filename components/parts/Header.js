var React = require('react');

var Header = React.createClass({
    
    //make a string title required
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    
    //React method for returning default properties
    getDefaultProps() {
        return {
            status: 'disconnected'
        }
    },
    
    // Default status is disconnected for connection-status styling, changed in APP
    render() {
        return (
            <header className="row">
                <div className="col-xs-10">
                    <h1>{this.props.title}</h1>
                    <h3>Speaker: {this.props.speaker}</h3>
                </div>
                <div className="col-xs-2">
                    <span id="connection-status" className={this.props.status}></span>
                </div>
            </header>
        );
    }
});

module.exports = Header;
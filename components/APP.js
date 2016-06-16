var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
    
    //React method for setting initial state, this is passed to Header component as a prop
    getInitialState() {
        return {
            status: 'disconnected'
        }
    },
    
    componentWillMount() {
        this.socket = io('https://react-live-poll-ossomepossum.c9users.io' || 'http://localhost:3000');
        this.socket.on('connect', this.connect);
    },
    
    //setting a state with make render() fire again when connected.
    connect() {
        this.setState({ status: 'connected' });
    },
    
    //es6 shorthand of render function
    render() {
        return (
            <div>
                <Header title="New React Header" status={this.state.status} />
            </div>
        );
    }
});

module.exports = APP;
var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
    
    //React method for setting initial state, this is passed to Header component as a prop
    getInitialState() {
        return {
            status: 'disconnected',
            title: ''
        }
    },
    
    componentWillMount() {
        this.socket = io('https://react-live-poll-ossomepossum.c9users.io' || 'http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.welcome);
    },
    
    //setting a state with make render() fire again when connected.
    connect() {
        this.setState({ status: 'connected' });
    },
    
    //as with connect(), this is sent to Header when status becomes disconnected.
    disconnect() {
        this.setState({ status: 'disconnected' })
    },
    
    //when user is welcomed, they receive a state variable (serverState)
    welcome(serverState) {
        this.setState({ title: serverState.title})
    },
    
    //es6 shorthand of render function
    render() {
        return (
            <div>
                <Header title={this.state.title} status={this.state.status} />
            </div>
        );
    }
});

module.exports = APP;
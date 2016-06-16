var React = require('react');
var ReactDom = require('react-dom');
var io = require('socket.io-client');

var APP = React.createClass({
    
    componentWillMount() {
        this.socket = io('https://react-live-poll-ossomepossum.c9users.io' || 'http://localhost:3000');
        this.socket.on('connect', this.connect);
    },
    
    connect() {
        alert('Connected: ' + this.socket.id)
    },
    
    //es6 shorthand of render function
    render() {
        return(<h1>React is saying hi</h1>);
    }
});

module.exports = APP;
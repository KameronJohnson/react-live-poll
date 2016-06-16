var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

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
        return (
            <div>
                <Header title="New React Header" />
            </div>
        );
    }
});

module.exports = APP;
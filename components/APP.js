var React = require('react');
var Router = require('react-router');
//The Audience, Speaker or Board is RouteHandler
var RouteHandler = Router.RouteHandler;
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
    
    //React method for setting initial state, this is passed to Header component as a prop
    getInitialState() {
        return {
            status: 'disconnected',
            title: '',
            member: {},
            audience: [],
            speaker: '',
            questions: [],
            currentQuestion: false,
            results: {}
        }
    },
    
    //listening for events
    componentWillMount() {
        this.socket = io('https://react-live-poll-ossomepossum.c9users.io' || 'http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.updateState);
        this.socket.on('joined', this.joined);
        //when audience event occurs, updateAudience is the event handler
        this.socket.on('audience', this.updateAudience);
        this.socket.on('start', this.start);
        this.socket.on('end', this.updateState);
        this.socket.on('ask', this.ask)
        this.socket.on('results', this.updateResults);
    },
    
    //send data back to the server
    //eventName is join method and payload is the name from Join component
    emit(eventName, payload) {
      this.socket.emit(eventName, payload)  
    },
    
    //setting a state with make render() fire again when connected
    connect() {
        
        //if there is a member in sessionStorage, set the member to this value,
        //otherwise, set member value to null
        var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
        
        //if there is a member, automatically rejoin that member:
        if (member && member.type === 'audience') {
            this.emit('join', member);
        } else if (member && member.type === 'speaker') {
            this.emit('start', { name: member.name, title: sessionStorage.title });
        }
        
        this.setState({ status: 'connected' });
    },
    
    //as with connect(), this is sent to Header when status becomes disconnected
    disconnect() {
        this.setState({ status: 'disconnected',
                        title: 'disconnected',
                        speaker: ''
        });
    },
    
    //when user is welcomed, they receive a state variable (serverState)
    updateState(serverState) {
        this.setState(serverState);
    },
    
    //change member state when new audience member joins
    //save member in browser's session storage
    joined(member) {
        sessionStorage.member = JSON.stringify(member);
        this.setState({ member: member });
    },
    
    //change audience state when audience is updated
    updateAudience(newAudience) {
        this.setState({ audience: newAudience });
    },
    
    //save presentation title if socket is the speaker in sessionStorage
    start(presentation) {
        if (this.state.member.type === 'speaker') {
            sessionStorage.title = presentation.title;
        }
        this.setState(presentation);
    },
    
    ask(question) {
        sessionStorage.answer = ''; //clear answers for new question
        this.setState({ currentQuestion: question});  
    },
    
    updateResults(data) {
        this.setState({ results: data });
    },
    
    //es6 shorthand of render function
    // ... is JSX spread operator that passes all the states down as a property
    //emit function passed for Join component
    render() {
        return (
            <div>
                <Header {...this.state} />
                <RouteHandler emit={this.emit} {...this.state} />
            </div>
        );
    }
});

module.exports = APP;
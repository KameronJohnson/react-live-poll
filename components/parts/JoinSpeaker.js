var React = require('react');

var JoinSpeaker = React.createClass({
    
    start() {
        var speakerName = React.findDOMNode(this.refs.name).value;
        var title = React.findDOMNode(this.refs.title).value;
        
        //send data back to server.js
        this.props.emit('start', { name: speakerName, title: title });
    },
    
    //javascript:void(0) makes it so form doesn't submit
    //onSubmit fires join method above.
    render() {
        return (
            <form action="javascript:void(0)" onSubmit={this.start}>
                <label>Name</label>
                <input  ref="name"
                        className="form-control"
                        placeholder="Enter Name"
                        required />
                        
                <label>Presentation Title</label>
                <input  ref="title"
                        className="form-control"
                        placeholder="Enter Presentation Title"
                        required />                        
                <button className="btn btn-success">Join</button>
            </form>
        )
    }
    
});

module.exports = JoinSpeaker;
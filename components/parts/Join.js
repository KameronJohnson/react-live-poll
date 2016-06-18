//For people to join the presentation and be an audience member.

var React = require('react');
var Link = require('react-router').Link;

var Join = React.createClass({
    
    join() {
        var memberName = React.findDOMNode(this.refs.name).value;
        
        //send data back to server.js
        this.props.emit('join', { name: memberName});
    },
    
    //javascript:void(0) makes it so form doesn't submit
    //onSubmit fires join method above.
    render() {
        return (
            <form action="javascript:void(0)" onSubmit={this.join}>
                <label>Name</label>
                <input  ref="name"
                        className="form-control"
                        placeholder="Enter Name"
                        required />
                <button id="join" className="btn btn-success">Join</button>
                <Link to="/speaker">Join as Speaker</Link>
            </form>
        )
    }
    
});

module.exports = Join;
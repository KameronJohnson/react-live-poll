//For people to join the presentation and be an audience member.

var React = require('react');

var Join = React.createClass({
    
    join() {
        var memberName = React.findDOMNode(this.refs.name).value;
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
                <button className="btn btn-success">Join</button>
            </form>
        )
    }
    
});

module.exports = Join;
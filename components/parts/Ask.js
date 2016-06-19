var React = require('react');

var Ask = React.createClass({
    
    getInitialState() {
        return {
            choices: []    
        };
    },
    
    //lifecycle function to set up choices when component mounts and receives question
    componentWillMount() {
        this.setUpChoices();  
    },
    
    //lifecycle function to set up choices when properties change
    componentWillReceiveProps() {
        this.setUpChoices();    
    },
    
    //4 keys into array, shift question (q) out of array
    setUpChoices() {
        var choices = Object.keys(this.props.question);  
        choices.shift();
        this.setState({ choices: choices});
    },
    
    //for map function, index which question to display
    addChoiceButton(choice, i) {
        var buttonTypes = ['primary', 'success', 'warning', 'danger'];
        return (
            <button key={i} className={"col-xs-12 col-sm-6 col-md-3 btn btn-" + buttonTypes[i]}>
                {choice}: {this.props.question[choice]}
            </button>
        );
    },
    
    render() {
        return (
            <div id="currentQuestion">
                <h2>{this.props.question.q}</h2>
                <div className="row">
                    {this.state.choices.map(this.addChoiceButton)}
                </div>
            </div>
        )
    }
});

module.exports = Ask;
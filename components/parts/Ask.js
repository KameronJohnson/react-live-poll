var React = require('react');
var Display = require('./Display');

var Ask = React.createClass({
    
    getInitialState() {
        return {
            choices: [],
            answer: undefined
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
        this.setState({ 
            choices: choices,
            answer: sessionStorage.answer
        });
    },
    
    select(choice) {
        this.setState({ answer: choice });
        sessionStorage.answer = choice;
        this.props.emit('answer', {
           question: this.props.question,
           choice: choice
        });
    },
    
    //for map function, index which question to display
    addChoiceButton(choice, i) {
        var buttonTypes = ['primary', 'success', 'warning', 'danger'];
        return (
            <button key={i} 
                    className={"col-xs-12 col-sm-6 col-md-3 btn btn-" + buttonTypes[i]}
                    onClick={this.select.bind(null, choice)}>
                {choice}: {this.props.question[choice]}
            </button>
        );
    },
    
    render() {
        return (
            <div id="currentQuestion">
            
                <Display if={this.state.answer}>
                    <h3>You answered: {this.state.answer}</h3>
                    <p>{this.props.question[this.state.answer]}</p>
                </Display>
                <Display if={!this.state.answer}>
                    <h2>{this.props.question.q}</h2>
                    <div className="row">
                        {this.state.choices.map(this.addChoiceButton)}
                    </div>
                </Display>
                
                
            </div>
        )
    }
});

module.exports = Ask;
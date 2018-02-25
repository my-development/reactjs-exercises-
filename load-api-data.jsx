// Write JavaScript here and press Ctrl+Enter to execute
const Card = (props) => {
	return (
     <div style={{margin: '1em'}}>
        <img width='75' src={props.avatar_url} />
        <div style={{display: 'inline-block', marginLeft: 10}}>
          <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          	{props.name}
          </div>
          <div> 
          	{props.company}
          </div>
        </div>
      </div>
  );
};

const CardList = (props) => {
	return (
  	<div>
    	{props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
}

class Form extends React.Component {
	state = {useName: ''}
  
  handleSubmit = (event) => {
  	event.preventDefault();
   // console.log('Event: Form Submit', this.state.userName);
  
  //https://github.com/axios/axios
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then(resp=> {
      	this.props.onSubmit(resp.data);
       // console.log(resp);
        this.setState({ userName: ''});
      });
  
  };

	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
      	<input type="text" 
        	value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
        	placeholder="Github username" 
        />
        <button type="submit">Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
	
  state = {
  	cards: []
  }
	
  addNewCard = (cardInfo) => {
  	//console.log(cardInfo);
    this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  };
  
	render () {
  	return (
    	<div>
      	<Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  
  }

}
ReactDOM.render(<App />, mountNode);

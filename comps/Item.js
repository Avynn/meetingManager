import VotePanel from './VotePanel';

class Item extends React.Component {
    constructor(props){
        super(props);

        this.style = {
            margin : 20,
            padding : 20,
            border : '1px solid #DDD'
        }

        this.state = {
            editing: false,
            currTitle: this.props.Data.name,
            currDescription: this.props.Data.description,
            currAllottedTime: this.props.Data.timeAllotted,
            currVotableStatus: this.props.Data.votable,
        }

        this.changeToEditHanlder = this.changeToEditHanlder.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleVotableChange = this.handleVotableChange.bind(this);
    }

    changeToEditHanlder(){
        let newState = !this.state.editing;
        
        //if editing is true send patch request.

        this.setState({editing: newState});
    }

    handleTitleChange(event){
        this.setState({currTitle: event.target.value});
    }

    handleDescriptionChange(event){
        this.setState({currDescription: event.target.value});
    }

    handleVotableChange(event){
        console.log(event.target.checked);

        this.setState({currVotableStatus: event.target.checked});
    }

    render(){
        let options  = {hour:"numeric", minute: "numeric", timeStyle:"long", hour12: true}
        let voteData = this.props.Data.votable ? [{name: 'Aye', value: this.props.Data.usersAye.length},{name: 'Nay', value: this.props.Data.usersNay.length},{name:'Abstain', value: this.props.Data.usersAbstain.length}] : null; //Severely duct-taped, something is wrong with the model... sigh
        let editing = this.state.editing;

        let normalView = (<div style={this.style}>
            <div onClick={this.changeToEditHanlder}>
                <p>edit</p>
            </div>
            <h3>{this.props.Data.name}</h3>
            <h4>Description</h4>
            <p>{this.props.Data.description}</p>
            <h4>Start time</h4>
            <p>{new Date(this.props.Data.startTime).toLocaleTimeString("en-US", options)}</p>
            <h4>end time</h4>
            <p>{new Date(this.props.Data.endTime).toLocaleTimeString("en-US", options)}</p>
            {this.props.Data.votable? <VotePanel voteData={voteData} itemID={this.props.Data.id} meetingID={this.props.meetingID}/>:null}
        </div>)

        let editingView = (<div style={this.style}>
            <div onClick={this.changeToEditHanlder}>
                <p>done</p>
            </div>
            <form>
                <label>
                    title:<br />
                    <input type="text" onChange={this.handleTitleChange} placeholder={this.state.currTitle}/>
                    <br />
                </label>
                <label>
                    description:<br />
                    <textarea onChange={this.handleDescriptionChange} placeholder={this.state.currDescription}></textarea>
                    <br />
                </label>
                <label>
                    votable:
                    <input type="checkbox" onChange={this.handleVotableChange}/>
                    <br />
                </label>
            </form>
        </div>)

        var viewToDisplay = normalView;

        if(editing){
            viewToDisplay = editingView;
        }


        return viewToDisplay;
    }
}

export default Item;
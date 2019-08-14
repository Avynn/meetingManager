import VotePanel from './VotePanel';

class Item extends React.Component {
    constructor(props){
        super(props);

        this.style = {
            margin : 20,
            padding : 20,
            border : '1px solid #DDD'
        }
    }

    render(){
        let options  = {hour:"numeric", minute: "numeric", timeStyle:"long", hour12: true}

        let voteData = this.props.Data.votable ? [{name: 'Aye', value: this.props.Data.usersAye.length},{name: 'Nay', value: this.props.Data.usersNay.length},{name:'Abstain', value: this.props.Data.usersAbstain.length}] : null; //Severely duct-taped, something is wrong with the model... sigh

        return(
        <div style={this.style}>
            <h3>{this.props.Data.name}</h3>
            <h4>Description</h4>
            <p>{this.props.Data.description}</p>
            <h4>Start time</h4>
            <p>{new Date(this.props.Data.startTime).toLocaleTimeString("en-US", options)}</p>
            <h4>end time</h4>
            <p>{new Date(this.props.Data.endTime).toLocaleTimeString("en-US", options)}</p>
            {this.props.Data.votable? <VotePanel voteData={voteData} itemID={this.props.Data.id} meetingID={this.props.meetingID}/>:null}
        </div>
        )
    }
}

export default Item;
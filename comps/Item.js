import VotePanel from './VotePanel';
import fetch from 'isomorphic-unfetch';
import NumericInput from "react-numeric-input";

//import "react-number-picker/dist/style.css";

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
            currPos: this.props.pos
        }

        this.edit = {
            patch : {
                id : this.props.Data.id
            },
            pos : this.props.pos
        }

        this.changeToEditHanlder = this.changeToEditHanlder.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleVotableChange = this.handleVotableChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
    }

    changeToEditHanlder(){
        let newState = !this.state.editing;
        let propsRef = this.props;

        if(this.state.editing){
            fetch(`http://localhost:8080/meetings/${this.props.meetingID}/items/`, {
                method: 'PATCH',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(this.edit)
            }).then(async function(response){
                let body = await response.json();

                propsRef.refreshListCallback(body);
            });
        }


        this.edit = {
            patch : {
                id : this.props.Data.id
            },
            pos : this.props.pos
        }

        this.setState({editing: newState});
    }

    handleTitleChange(event){
        this.setState({currTitle: event.target.value});
        this.edit.patch.name = event.target.value;
    }

    handleDescriptionChange(event){
        this.setState({currDescription: event.target.value});
        this.edit.patch.description = event.target.value;
    }

    handleVotableChange(event){
        this.setState({currVotableStatus: event.target.checked});
        this.edit.patch.votable = event.target.checked;
    }

    handlePositionChange(newPos){
        //setState uneeded for this component...
        console.log(newPos);

        this.edit.pos = newPos - 1
    }

    render(){
        /*
        RENDER DESCRIPTION:

        This render method handles one of two possibilities inhertied from this.state, Either the current component is in editing
        mode allowing the user to change the details of the selected agenda item or its in display mode which allows users to vote
        and read the relevant data.
        */

        let options  = {hour:"numeric", minute: "numeric", timeStyle:"long", hour12: true} //Options parameter for date string

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
            {this.state.currVotableStatus? <VotePanel voteData={voteData} itemID={this.props.Data.id} meetingID={this.props.meetingID}/>:null}
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
                    <input type="checkbox" checked={this.state.currVotableStatus} onChange={this.handleVotableChange}/>
                    <br />
                </label>
                <label>
                    position:<br />
                    <NumericInput step={1} value={this.state.currPos + 1} min={1} max={this.props.maxPos} onChange={this.handlePositionChange} snap/>
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
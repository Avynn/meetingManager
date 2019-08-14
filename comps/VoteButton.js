class VoteButton extends React.Component {
    constructor(props){
        super(props);

        this.style = {
            margin : 5,
            padding : 20,
            border : '1px solid #DDD'
        }

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(){
        let label = this.props.label;
        var voteNum = 2;

        if(label == "Aye"){
            voteNum = 0;
        } else if(label == "Nay"){
            voteNum = 1;
        }

        let reqObject = {
            user : {
                name: "Avynn" //TODO: This needs to be retrieved from the authenticated user
            },
            vote: voteNum
        }

        console.log(`meetingID: ${this.props.meetingID}`);
        console.log(`itemID: ${this.props.itemID}`);

        //send JSON.stringify request to server.

        fetch(`http://localhost:8080/meetings/${this.props.meetingID}/items/${this.props.itemID}`, { //TODO: needs authentication header
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(reqObject)
        }).then(response => console.log(response));
    }

    render(){
        return(
            <div style = {this.style} onClick = {this.onClickHandler}>
                <p>{this.props.label}</p>
            </div>
        );
    }
}

export default VoteButton;
class VoteButton extends React.Component {
    constructor(props){
        super(props);

        this.style = {
            margin : 5,
            padding : 20,
            border : '1px solid #DDD'
        }

        this.onClickHandler = this.onClickHandler.bind(this);
        this.initGraphData = this.initGraphData.bind(this);
    }

    onClickHandler(){
        let thisRef = this;
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

        fetch(`http://localhost:8080/meetings/${this.props.meetingID}/items/${this.props.itemID}`, { //TODO: needs authentication header
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(reqObject)
        }).then(async function(response){
            //call this.props.updateGraph()
            let res = await response.json();
            let newData = thisRef.initGraphData(res);

            thisRef.props.updateGraph(newData);
        });
    }

    initGraphData(response){
        return [{name: 'Aye', value: response.usersAye.length},
        {name: 'Nay', value: response.usersNay.length},
        {name:'Abstain', value: response.usersAbstain.length}]
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
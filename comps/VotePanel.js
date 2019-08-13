import VoteButton from './VoteButton'

class VotePanel extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <VoteButton label={"Aye"} />
                <VoteButton label={"Nay"} />
                <VoteButton label={"Abstain"} />
            </div>  
        )
    }
}

export default VotePanel;
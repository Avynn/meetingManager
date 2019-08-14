import VoteButton from './VoteButton';
import { BarChart, XAxis, YAxis } from 'recharts';

class VotePanel extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <BarChart width={730} height={200} data={this.props.voteData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                </BarChart>
                <VoteButton label={"Aye"} meetingID={this.props.meetingID} itemID={this.props.itemID}/>
                <VoteButton label={"Nay"} meetingID={this.props.meetingID} itemID={this.props.itemID}/>
                <VoteButton label={"Abstain"} meetingID={this.props.meetingID} itemID={this.props.itemID}/>
            </div>  
        )
    }
}

export default VotePanel;
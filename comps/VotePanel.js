import VoteButton from './VoteButton';
import { BarChart, XAxis, YAxis, Bar } from 'recharts';

class VotePanel extends React.Component {
    constructor(props){
        super(props);

        this.state = {voteData: props.voteData};
        this.updateGraph = this.updateGraph.bind(this);
    }

    updateGraph(newData){
       this.setState({voteData: newData}); 
    }

    render(){
        return (
            <div>
                <BarChart width={730} height={200} data={this.state.voteData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="value" />
                </BarChart>
                <VoteButton label={"Aye"} meetingID={this.props.meetingID} itemID={this.props.itemID} updateGraph={this.updateGraph}/>
                <VoteButton label={"Nay"} meetingID={this.props.meetingID} itemID={this.props.itemID} updateGraph={this.updateGraph}/>
                <VoteButton label={"Abstain"} meetingID={this.props.meetingID} itemID={this.props.itemID} updateGraph={this.updateGraph}/>
            </div>  
        )
    }
}

export default VotePanel;
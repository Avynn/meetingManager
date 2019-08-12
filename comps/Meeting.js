class Meeting extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div>
            <h3>Start time:</h3>
            <p>{this.props.data.startTime}</p>
            <h3>End time: </h3>
            <p>{this.props.data.endTime}</p>            
        </div>
        )
    }
}


export default Meeting;
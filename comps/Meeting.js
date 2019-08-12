class Meeting extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div>
            <p>{this.props.data.startTime}</p>
        </div>
        )
    }
}


export default Meeting;
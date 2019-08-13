import ItemList from './ItemList';

class Meeting extends React.Component {
    constructor(props){
        super(props);

        this.items = props.data.items;
    }

    render() {
        let options  = {hour:"numeric", minute: "numeric", timeStyle:"long", hour12: true}

        return (
        <div>
            <h3>Start time:</h3>
            <p>{new Date(this.props.data.startTime).toLocaleDateString("en-US", options)}</p>
            <h3>End time: </h3>
            <p>{new Date(this.props.data.endTime).toLocaleDateString("en-US", options)}</p>
            <ItemList items = {this.props.data.items} />            
        </div>
        )
    }
}


export default Meeting;
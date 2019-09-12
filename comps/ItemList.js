import Item from './Item';

class ItemList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items : this.props.items
        }

        this.refreshList = this.refreshList.bind(this);
    }

    refreshList(newItems){
        console.log("Ping!");

        this.setState({items: newItems});
    }

    render(){
        var key = -1;

        return (
            <div>
                <h3>Items: </h3>
                {this.state.items.map((item) => {
                    key ++;
                    return <Item pos={key} Data={item} meetingID={this.props.meetingID} refreshListCallback={this.refreshList}/>
                })}
            </div>
        );
    }
}

export default ItemList;
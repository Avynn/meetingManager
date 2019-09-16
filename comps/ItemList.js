import Item from './Item';

class ItemList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items : this.props.items,
            addingItem: false
        }

        this.refreshList = this.refreshList.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    refreshList(newItems){
        this.setState({
            items: newItems,
            addingItem: false
        });
    }

    addItem(){
        this.setState({addingItem: true});
    }

    render(){
        var key = -1;
        let maxPos = this.state.items.length;

        let placeholderItem = {
            name: "new name",
            description: "new description",
            votable: false
        }

        let normalView = (
            <div>
                <h3>Items: </h3>
                <div onClick={this.addItem}>
                    <p>Add item</p>
                </div>
                {this.state.items.map((item) => {
                    key ++;
                    return <Item pos={key} Data={item} meetingID={this.props.meetingID} refreshListCallback={this.refreshList} maxPos={maxPos} editing={false} newItem={false}/>
                })}
            </div>
        );

        let addView = (
            <div>
                <h3>Items: </h3>
                <Item pos={0} Data={placeholderItem} meetingID={this.props.meetingID} refreshListCallback={this.refreshList} maxPos={maxPos + 1} editing={true} newItem={true} />
                {this.state.items.map((item) => {
                    key ++;
                    return <Item pos={key} Data={item} meetingID={this.props.meetingID} refreshListCallback={this.refreshList} maxPos={maxPos} editing={false} newItem={false}/>
                })}
            </div>
        );

        let view = this.state.addingItem ? addView : normalView;

        return view;
    }
}

export default ItemList;
import Item from './Item';

const ItemList = function(props){
    return (
    <div>
        <h3>Items: </h3>
        {props.items.map(item => (
            <Item Data={item} />
        ))}
    </div>
    );
}

export default ItemList;
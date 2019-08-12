const ItemList = function(props){
    return (
    <div>
        <h3>Items: </h3>
        {props.children}
    </div>
    );
}

export default ItemList;
import Header from './Header';

//const UserContext = React.createContext('Avynn'); //TODO: Should have a globally accessible variable for current authenticated user

const layoutStyle = {
    margin : 20,
    padding : 20,
    border : '1px solid #DDD'
}

const layout = function(props){
    return(<div style ={layoutStyle}>
        <Header />
        {props.children}
    </div>)
}

export default layout;
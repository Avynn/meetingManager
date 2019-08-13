class VoteButton extends React.Component {
    constructor(props){
        super(props);

        this.style = {
            margin : 5,
            padding : 20,
            border : '1px solid #DDD'
        }
    }

    render(){
        return(
            <div style = {this.style}>
                <p>{this.props.label}</p>
            </div>
        );
    }
}

export default VoteButton;
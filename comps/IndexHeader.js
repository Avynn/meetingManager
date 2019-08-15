import Link from 'next/link';

class IndexHeader extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return( //THIS IS THE ONLY WAY NEXT WILL LOAD THIS PAGE I HAVE NO IDEA WHY
            <div>
                <a href={"http://localhost:3000/newmeeting"}>add a meeting</a> 
            </div>
        );
    }
}

export default IndexHeader;
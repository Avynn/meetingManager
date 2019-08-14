import Link from 'next/link';

class IndexHeader extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Link href="/addMeeting">
                    <a>Add Meeting</a>
                </Link>
            </div>
        );
    }
}

export default IndexHeader;
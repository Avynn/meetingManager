import Layout from '../comps/Layout';
import Link from 'next/link';
import MeetingForm from '../comps/MeetingForm';

class addMeetingPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Layout>
                <h2>Add a meeting:</h2>
                <MeetingForm />
                <Link href="/">
                    <a>back</a>
                </Link>
            </Layout>
        );
    }
}

export default addMeetingPage;
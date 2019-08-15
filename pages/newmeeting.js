import Layout from '../comps/Layout';
import Link from 'next/link';
import MeetingForm from '../comps/MeetingForm';

const addMeetingPage = function(props){
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

export default addMeetingPage;
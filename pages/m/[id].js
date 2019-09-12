import { useRouter } from 'next/router';
import Layout from '../../comps/Layout';
import Meeting from '../../comps/Meeting';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const MeetingPage = function(props){
    const router = useRouter();

    return(<Layout>
        <Meeting data={props.data} />
        <Link href='/'>
            <a>back</a>
        </Link>
    </Layout>);
}

MeetingPage.getInitialProps = async function(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:8080/meetings/${id}`);
    const data = await res.json();
    
    return { data };
}

export default MeetingPage;
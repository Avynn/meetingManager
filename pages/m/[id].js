import { useRouter } from 'next/router';
import Layout from '../../comps/Layout';
import Meeting from '../../comps/Meeting';

const MeetingPage = function(props){
    const router = useRouter();

    console.log("PINGPINGPING");

    return(<Layout>
        <h1>{router.query.id}</h1>
        <Meeting data={props.data} />
    </Layout>);
}

MeetingPage.getInitialProps = async function(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:8080/meetings/${id}`);
    const data = res.json();

    return { data };
}

export default MeetingPage;
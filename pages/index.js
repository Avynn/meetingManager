import Layout from '../comps/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const serviceURL = 'localhost:8080/meetings'

const Index = function(props){
    return (
    <Layout>
      <ul>
        {props.meetings.map(meeting => (
          <li key={meeting.id}>
            <Link href="/p/[id]" as={`/p/${meeting.id}`}>
              <a>{meeting.startTime}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
    );
};

Index.getInitialProps = async function() {
    const res = await fetch('http://localhost:8080/meetings/');
    const data = await res.json();

    console.log(`fetched ${data.length} meetings`);

    return {
        meetings: data 
    };
}

export default Index;
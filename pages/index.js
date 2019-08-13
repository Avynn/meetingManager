import Layout from '../comps/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const serviceURL = 'http://localhost:8080/meetings'

const Index = function(props){
    //this needs to be declared somewhere more globally or so that every call to toLocaleDateString has these options
    let options  = {hour:"numeric", minute: "numeric", timeStyle:"long", hour12: true}
    return (
    <Layout>
      <ul>
        {props.meetings.map(meeting => (
          <li key={meeting.id}>
            <Link href="/m/[id]" as={`/m/${meeting.id}`}>
              <a>{new Date(meeting.startTime).toLocaleDateString("en-US", options)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
    );
};

Index.getInitialProps = async function() {
    const res = await fetch(serviceURL);
    const data = await res.json();

    console.log(`fetched ${data.length} meetings`);

    return {
        meetings: data 
    };
}

export default Index;
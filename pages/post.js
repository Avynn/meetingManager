import { useRouter } from 'next/router';
import Layout from '../comps/MyLayout';

const Page = function(){
    const router = useRouter();

    return(<Layout>
        <h1>{router.query.id}</h1>
        <p>This is blog post content</p>
    </Layout>);
}

export default Page;
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
export default function FirstPost() {
  return (
    <>
    <Layout>
            <Head>
      <title>Dashboard</title>

    </Head>
    
  
    <h1>DASHBOARD</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
  

      </Layout>
    </>
  );
}
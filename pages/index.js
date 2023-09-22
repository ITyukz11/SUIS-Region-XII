import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Login from './login';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SUIS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
       <Login/>
      </main>
    </div>
  );
}

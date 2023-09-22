import '../styles/globals.css'
import { MenuProvider } from './api/MenuContext'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Listen for route changes and set isLoading accordingly
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

    return (
      <MenuProvider>
          {isLoading && <Loading />}
      {/* Display the GIF image */}
        <Component {...pageProps} />
      </MenuProvider>
    )

  }
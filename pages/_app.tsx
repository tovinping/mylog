import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '@/components/layout';
import './_app.css'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <Layout  {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

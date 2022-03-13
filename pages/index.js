import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>エンジニアLv1</p>
        <p>
          Nextjs勉強中のぴよぴよエンジニアです。将来の夢は、コメダに住むことです。
        </p>
      </section>
    </Layout>
  );
}

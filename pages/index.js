import Link from 'next/link';
import Head from 'next/head';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps(){
  const allPostsData = getSortedPostsData();

  const res = await fetch('https://dummyjson.com/products?skip=0');
  const posts = await res.json();

  return {
    props: {
      allPostsData,
      posts
    }
  }
}

export default function Home({ allPostsData, posts }) {
  
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your self introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section>
        <h2 className='text-5xl font-semibold text-center mb-7'>Products</h2>
        <div className='flex flex-wrap space-y-3'>
          {
            posts?.products.map((product, key) => (
              <div key={key} className='basis-1/4 border rounded-sm p-5'>
                <img src="" alt="" />
                <div>
                  <span>{product?.title}</span>
                  <p></p>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {
            allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}

import Head from 'next/head';

const LayoutHead = ({ title = 'to be' }) => {
  return (
    <>
      <Head>
        <meta name="keywords" content="tobe, hookah-tobe" />
        <meta name="description" content="tobe descr" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Place the meta description text here."
        ></meta>
        <title>{title}</title>
      </Head>
    </>
  );
};

export default LayoutHead;

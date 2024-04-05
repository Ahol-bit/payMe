import Head from 'next/head';

const MetaHeader = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      {console.log(title)}
    </Head>
  );
}

export default MetaHeader;
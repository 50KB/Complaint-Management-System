import Head from 'next/head';

const HeadTags = () => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="UTF-8" />
      <link
        rel="icon"
        href="https://i.postimg.cc/j5PGNVxB/logo512.png"
        sizes="16*16"
        type="image/png"
      />

      <link rel="stylesheet" type="text/css" href="/listMessages.css" />

      <link rel="stylesheet" type="text/css" href="/styles.css" />
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      <link rel="stylesheet" type="text/css" href="custom.css" />

      <title>NSU Ovijog</title>
    </Head>
  </>
);
export default HeadTags;

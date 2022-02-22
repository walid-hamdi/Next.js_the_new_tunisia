import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <script src="http://d3js.org/topojson.v1.min.js"></script>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

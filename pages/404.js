import Head from "next/head";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

export default function Custom404() {
  return (
    <Layout>
      <div className="page-not-found">
        <Head>
          <title>Page Not Found | The New Tunisia</title>
          <meta
            name="description"
            content="Check out our community, the new tunisia developer community"
          />
        </Head>

        <Heading size={1}>Oops!! page not found!</Heading>
      </div>
    </Layout>
  );
}

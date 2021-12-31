import { Graph } from "../components/Shapes/Grahp";
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import PieChart from "../components/Shapes/PieChart";
import Head from "next/head";
export default function Tunisianow() {
  return (
    <Layout>
      <div className="tunisia-now">
        <Head>
          <title>Tunisia State | The New Tunisia</title>
          <meta
            name="description"
            content="Discover tunisia in our way, the new tunisia developer community"
          />
        </Head>

        <Heading size={1}>Tunisia Recent Data</Heading>
        <Heading size={2}>
          We are using and analysing data and for having clear idea of which
          path we go on.
        </Heading>
        <p>Knowing the issues inside sectors</p>

        <PieChart />

        <style jsx>
          {`
     .tunisia-now{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
      
       width:100vh
       height:100vh;
       
     }
     
     `}
        </style>
      </div>
    </Layout>
  );
}

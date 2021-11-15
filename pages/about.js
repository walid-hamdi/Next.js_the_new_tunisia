
import Heading from "../components/Heading"
import Layout from "../components/Layout"


export default function About() {
  return (
    <Layout>
      <div>
        <Heading size={1} >About Us</Heading>
        <p>We create this platform for collaboration and communication to come up with new ideas</p>
        <p>That could lead to small or even big changes (Impact) in the administrations and the digital economy overall</p>
        <Heading size={3} >For who?</Heading>
        <ul>
          <li><p>Developers</p>
          </li>
          <li><p>Designers</p>
          </li>
          <li> <p>Data scientist</p>
          </li>

          <li> <p>Interested in digital transformation</p></li>
        </ul>
      </div>
    </Layout >
  )
}
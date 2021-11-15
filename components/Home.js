import { useRouter } from "next/router";
import Button from "./Button";
import Heading from './Heading'


export default function Home() {
  const router = useRouter()

  return <div className="home-cover">
    <div className="home-content">
      <Heading size={1}>Digital Transformation Platform</Heading>
      <Heading size={2}>Voice Communication System</Heading>
      <Heading size={2}>Data visualization for Tunisian Economy</Heading>
      <div className="button">
        <Button outline='granted'
          big fullWidth onClick={() => router.push({
            pathname: '/debates',
          })}>Join Our Community</Button>

      </div>
    </div>
    <style jsx>{`


    .home-content{
      display:flex;
      align-items:center;
      justify-content:center;
      gap:1rem;
      flex-direction:column;
      width:100%;
      height:100vh;
      text-align:center;

      margin-top:-70px;
    }
    .home-content .button{
      width:fit-content;
      margin-top:20px;
    }

`}</style>

  </div >

}

/*

1- authentication
2- use id and name to create room or join
3- use id to create new ideas
4- add chart and visual data from firebase
5- change the look overall
6- write cover , dedication, general intro, chap1, chap2, chap3, chap4
7- make sure that there is no mistakes
8- send to the superviser

*/
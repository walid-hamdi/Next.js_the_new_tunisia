import Navbar from '../components/Navbar'

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="app">
          {children}
        </div>
      </div>
      <style jsx>{`



        .container {
          
          margin-left:250px;
          
          padding: 2em;
          // width: 100%;
          heigh: 100vh;
        }
        .app {
          padding:1rem;
         
        }




      `}</style>
      <style jsx global>{`
          :root {
            --active-color: #fefffe;
            --dark-bg: #14162b;
          }

          body {
            font-family: 'Poppins', sans-serif;
            background: #355c7d;
            background: -webkit-linear-gradient(to right, #020024, #406f79, #02002);
            background: linear-gradient(to right, #020024, #406f79, #02002);
            color: var(--active-color);
            margin:0;
            padding:0;
            overflow: hidden;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
    </div>
  )
}
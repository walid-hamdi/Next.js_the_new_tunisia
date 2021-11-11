import Loader from "react-loader-spinner"


export const Loading = () => {

  return (
    <div className="loading">
      <Loader type="ThreeDots" color="#14162b" height="80" width="80" />
      <style jsx>{`
        
        .loading{
          width:100%;
          height:100%;
          margin-top:2rem;
        }
        
      `}</style>

    </div>
  )

}
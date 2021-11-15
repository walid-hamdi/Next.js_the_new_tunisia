import * as React from 'react'
import * as d3 from "d3"

const Chart = () => {
  const ref = React.createRef()

  useEffect(() => {

    let svg = d3.select(this.ref.current)

    svg.style("background-color", "red")

  }, [])

  return (
    <div>
      <div ref={this.ref}>Testing</div>
    </div>
  )


}



export default Chart

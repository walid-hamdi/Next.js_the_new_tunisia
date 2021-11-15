import { PieChart } from 'react-minimal-pie-chart';


export const Graph = () => (
  <PieChart
    data={[
      { title: 'One', value: 10, color: '#E38627' },
      { title: 'Two', value: 15, color: '#C13C37' },
      { title: 'Three', value: 20, color: '#6A2135' },
      { title: 'One', value: 10, color: 'red' },
      { title: 'Two', value: 15, color: 'blue' },
      { title: 'Three', value: 20, color: 'orange' },

    ]}
  />
)
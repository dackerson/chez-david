import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { OrderItem } from './components/OrderItem'
import DrSodaItem from './components/DrSodaItem'
import AppleItem from './components/AppleItem'

import { Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const imageURLs = [
  'https://i.sstatic.net/2RAv2.png',
  'https://i.sstatic.net/Tq5DA.png',
  'https://i.sstatic.net/3KRtW.png',
  'https://i.sstatic.net/iLyVi.png'
];
const images = imageURLs.map(v => {
  var image = new Image();
  image.src = v;
  image.width = 250;
  image.height = 250;
  return image;
});

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const plugins = [{
    id: 'chart',
    width: 250,
    afterDatasetsDraw: (chart: Chart) => {
      var ctx = chart.ctx;
      ctx.save();
      var xCenter = chart.canvas.width / 2;
      var yCenter = chart.canvas.height / 2;
      var data = chart.config.data.datasets[0].data as number[];
      var vTotal = data.reduce((a, b) => a + b, 0);
      data.forEach((v, i) => {
        var vAngle = data.slice(0, i).reduce((a, b) => a + b, 0) + v / 2;
        var angle = 360 / vTotal * vAngle - 90;        
        var radians = angle * (Math.PI / 180);
        var r = yCenter;
        var x = xCenter + Math.cos(radians) * r / 2;
        var y = yCenter + Math.sin(radians) * r / 2;
        ctx.translate(x, y);
        var image = images[i];
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.translate(-x, -y);
      });
      ctx.restore();
    }
  }];

function App() {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])

  return (
    <>
      <div id='items-list'>
        <h2>Add to your order</h2>
        <div className="card">
          <DrSodaItem currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
          <AppleItem currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
        </div>
      </div>
      <div id='current-order'>
        <h2>Current order</h2>
        {currentOrder.length === 0 ? (
          <div>Empty</div>
        ) : (
          currentOrder.map(item => (
            <div key={item.name}>{item.name} — {item.quantity}</div>
          ))
        )}
      </div>
      <div>
        {/* <h2>Acquisitions Over Years</h2>
        <canvas id="chart" width={250}></canvas>
        <Pie data={data} 
          plugins={plugins}/> */}
      </div>
    </>
  )
}

export default App

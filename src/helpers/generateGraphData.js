function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const generateGraphData = (prices) => {
  return {
  labels: [
    new Date("2016-01-01").toDateString(),
    new Date("2017-01-01").toDateString(),
    new Date("2018-01-01").toDateString(),
    new Date("2019-01-01").toDateString(),
  ],
  options: {
    scales: {
      xAxes: [{
          type: 'time',
          time: {
              unit: 'month'
          }
      }]
    }
  },
  datasets: Object.keys(prices).map(countryIRI => {
    const country = prices[countryIRI]
    const color = getRandomColor();
    return {
      ...country,
      display: true,
      fill: false,
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: color,
      pointBackgroundColor: color,
      pointBorderWidth: 1,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: color,
      pointHoverBorderWidth: 2,
      pointRadius: 10,
      pointHitRadius: 10
    }
  }),
}}

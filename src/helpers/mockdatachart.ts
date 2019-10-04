export const mockdata = {
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
  datasets: [
    {
      label: 'Nederland',
      display: true,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        {x: new Date("2019-01-01").getTime(), y: 20},
        {x: new Date("2019-02-01").getTime(), y: 30},
        {x: new Date("2019-05-01").getTime(), y: 25},
        {x: new Date("2019-08-01").getTime(), y: 25},
      ]
    }
  ]
};

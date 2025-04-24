import Chart from 'chart.js/auto'
import * as prob from './probability.js'
import * as util from './util.js'

/*
* This was built using the example in "example.js" as a guide.
*/

(async function() {
  let outputs = prob.parseAndProcessInput("10d8");
  if (outputs == null) {
    return;
  }
  const data = util.distArrToGraphableArr(outputs);

  let chart = new Chart(
    document.getElementById('distribution'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.Result),
        datasets: [
          {
            label: 'Probability of Occurrence',
            data: data.map(row => row.Probability),
            backgroundColor: '#6F732F',
            borderColor: '#B38A58',
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#EDECDC' // <- if you want to style label text color
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#EDECDC'
            }
          },
          y: {
            ticks: {
              color: '#EDECDC'
            }
          }
        }
      },
    }
  );

})();
import Chart from 'chart.js/auto'
import * as prob from './probability.js'
import * as util from './util.js'

/*
* This was built using the example in "example.js" as a guide.
* There's a lot that transfers from JavaFX here, but the dynamic
* typing makes some things weird.
*/

let graph = [ 0, 1/6, 1/6, 1/6, 1/6, 1/6, 1/6 ]
let chart;

/* Triggers and HTML interaction */
let button = document.getElementById("roll");

let dialog = document.getElementById("dialog");
let dialogButton = document.getElementById("dialogButton");

/* Event listener that triggers the generation of a new chart */
button.addEventListener('click', function(event) {
    let raw = document.getElementById("entry");

    /* Perform operation and process */
    let processedInput = prob.parseAndProcessInput(raw.value);
    if (processedInput == null || processedInput == NaN) {
      /* Guide used: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog */
      console.log("ERROR: Invalid Input.");
      dialog.showModal();
      return; /* Break and do not process further */
    }
    else {
        graph = processedInput;
        const data = util.distArrToGraphableArr(graph);
        console.log(data);
        
        chart.destroy();

        chart = new Chart(
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

    }
});

/* Event listener for error dialog. */
dialogButton.addEventListener("click", () => {
  dialog.close();
});


/* Generates the initial chart */
(async function() {
  const data = util.distArrToGraphableArr(graph);

  chart = new Chart(
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
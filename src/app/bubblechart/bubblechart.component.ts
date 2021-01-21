import { Component, OnInit } from '@angular/core';
import { NodeApiService } from './../nodeApi/node-api.service';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-bubblechart',
  templateUrl: './bubblechart.component.html',
  styleUrls: ['./bubblechart.component.css'],
})
export class BubblechartComponent implements OnInit {
  constructor(private nodeApi: NodeApiService) {}

  topic: string;

  ngOnInit(): void {
    this.nodeApi.getTweetsByTopic('trump').subscribe((res) => {
      // transformation en array de tweets
      let tableauObjet: any = [];
      for (let r of [res]) {
        console.log(r);
        tableauObjet.push(r);
      }

      // formatter les dates

      let formattedDatesArray: any = [];
      for (let i in tableauObjet[0]) {
        let tweet = { x: '', y: '', r: 10 };
        let dateToParse = tableauObjet[0][i].created_at;
        let dateParsed = dateToParse.slice(0, 10);
        tweet.x = dateParsed;
        tweet.y = tableauObjet[0][i].score;

        formattedDatesArray.push(tweet);
      }
      console.log(formattedDatesArray);

      let tabSixAndMore = [];
      let tabTwoToSix = [];
      let tabMinusTwoToTwo = [];
      let tabMinusFourToMinusTwo = [];
      let tabMinusFourAndLess = [];

      for (let i in formattedDatesArray) {
        if (formattedDatesArray[i].y >= 6) {
          tabSixAndMore.push(formattedDatesArray[i]);
        }
        if (formattedDatesArray[i].y >= 2 && formattedDatesArray[i].y < 6) {
          tabTwoToSix.push(formattedDatesArray[i]);
        }
        if (formattedDatesArray[i].y > -2 && formattedDatesArray[i].y < 2) {
          tabMinusTwoToTwo.push(formattedDatesArray[i]);
        }
        if (formattedDatesArray[i].y > -4 && formattedDatesArray[i].y <= -2) {
          tabMinusFourToMinusTwo.push(formattedDatesArray[i]);
        }
        if (formattedDatesArray[i].y >= -4) {
          tabMinusFourAndLess.push(formattedDatesArray[i]);
        }
      }

      let chart = new Chart('bubbleChart', {
        type: 'bubble',
        data: {
          datasets: [
            {
              data: tabSixAndMore,
              backgroundColor: '#2b8026',
              label: 'scores supérieurs à 6',
            },
            {
              data: tabTwoToSix,
              backgroundColor: '#3dcc35',
              label: 'scores entre 2 et 6',
            },
            {
              data: tabMinusTwoToTwo,
              backgroundColor: '#d9eb3d',
              label: 'scores entre 2 et -2',
            },
            {
              data: tabMinusFourToMinusTwo,
              backgroundColor: 'orange',
              label: 'score entre -4 et -2',
            },
            {
              data: tabMinusFourAndLess,
              backgroundColor: '#f05429',
              label: 'scores inférieurs à -4',
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                type: 'time',
                distribution: 'series',
                time: {
                  displayFormats: {
                    day: 'MMM D',
                  },
                },
              },
            ],
          },
        },
      });
    });
  }

  groupByDate(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}

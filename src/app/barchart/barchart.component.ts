import { Component, OnInit, EventEmitter } from '@angular/core';
import { NodeApiService } from './../nodeApi/node-api.service';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  inputs: ['parentTopic'],
  outputs: ['barChartEvent'],
})
export class BarchartComponent implements OnInit {
  constructor(private nodeApi: NodeApiService) {}

  public parentTopic: string;

  ngOnInit(): void {}
  onSubmit() {
    this.nodeApi.getTweetsByTopic(this.parentTopic).subscribe((res) => {
      // transforme un objet en array de tweets

      let tableauObjet: any = [];
      for (let r of [res]) {
        console.log(r);
        tableauObjet.push(r);
      }

      //formatter les dates
      let formattedDatesArray = [];
      for (let i in tableauObjet[0]) {
        let tweet = { date: '', score: '' };
        let dateToParse = tableauObjet[0][i].created_at;
        let dateParsed = dateToParse.slice(0, 10);
        tweet.date = dateParsed;
        tweet.score = tableauObjet[0][i].score;
        formattedDatesArray.push(tweet);
      }

      //groupe les tweet par dates :)
      let groupedByDates = this.groupByDate(formattedDatesArray, 'date');

      //faire les moyennes par dates

      let tableauDates = [];
      let tableauScores = [];
      let tableauAverage = [];

      for (let item in groupedByDates) {
        for (let i in groupedByDates[item]) {
          let itemScore = groupedByDates[item][i].score;
          tableauScores.push(itemScore);
        }
        let itemDate = groupedByDates[item][0].date;
        tableauDates.push(itemDate);

        let sum = tableauScores.reduce(function (memo, val) {
          return memo + val;
        });

        let average = sum / tableauScores.length;
        tableauAverage.push(average);
        console.log('AVERAGE' + average);
      }

      let chart = new Chart('barChart', {
        type: 'line',
        data: {
          labels: tableauDates,
          datasets: [
            {
              data: tableauAverage,
              backgroundColor: 'red',
              fill: true,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Moyenne des scores / jour',
            fontSize: 22,
            fontFamily: 'Helvetica',
            padding: 10,
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

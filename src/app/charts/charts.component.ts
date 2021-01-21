import { Component, OnInit, ViewChild } from '@angular/core';
import { BarchartComponent } from '../barchart/barchart.component';
import { BubblechartComponent } from '../bubblechart/bubblechart.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @ViewChild(BarchartComponent) barchild: BarchartComponent;
  @ViewChild(BubblechartComponent) bubblechild: BubblechartComponent;
  constructor() {}

  ngOnInit(): void {}

  chartIt() {
    this.barchild.onSubmit();
    this.bubblechild.onSubmit();
  }
}

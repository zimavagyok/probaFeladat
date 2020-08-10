import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import { DateService } from 'src/app/service/dateService/date.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  categories: string[] = [];
  chartType: string;
  periodHun: string;
  currentDate: string;
  currentPeriodType: string;
  values: number[] = [];



  constructor(public datePipe: DatePipe, public dateService: DateService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dateService.currentPeriodType.subscribe(currPeriodType => {
      if (currPeriodType != null) {
        this.currentPeriodType = currPeriodType; if (currPeriodType == 'daily') {
        }
      } else {
        this.currentPeriodType = 'daily';
      }
    });
    this.dateService.currentChartType.subscribe(currChartType => { this.chartType = currChartType; this.DayChartPopulation(); });
    this.dateService.currentPeriodHun.subscribe(currPeriodHun => this.periodHun = currPeriodHun);
    this.dateService.currentDate.subscribe(currDate => { this.currentDate = currDate; this.DayChartPopulation(); });
  }

  randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  incrementDate() {
    if (this.currentPeriodType == 'daily') {
      this.dateService.changeDate(this.datePipe.transform(new Date(new Date(this.currentDate).getTime() + (1000 * 60 * 60 * 24)).toDateString(), 'yyyy.MM.dd'));
    }
    else if (this.currentPeriodType == 'monthly') {
      this.dateService.changeDate(this.datePipe.transform(new Date(new Date(this.currentDate).setMonth(new Date(this.currentDate).getMonth() + 1)).toDateString(), 'yyyy.LL'));
    }
    else if (this.currentPeriodType == 'annual') {
      this.dateService.changeDate((parseInt(this.currentDate) + 1).toString());
    }
  }

  decrementDate() {
    if (this.currentPeriodType == 'daily') {
      this.dateService.changeDate(this.datePipe.transform(new Date(new Date(this.currentDate).getTime() - (1000 * 60 * 60 * 24)).toDateString(), 'yyyy.MM.dd'));
    }
    else if (this.currentPeriodType == 'monthly') {
      this.dateService.changeDate(this.datePipe.transform(new Date(new Date(this.currentDate).setMonth(new Date(this.currentDate).getMonth() - 1)).toDateString(), 'yyyy.LL'));
    }
    else if (this.currentPeriodType == 'annual') {
      this.dateService.changeDate((parseInt(this.currentDate) - 1).toString());
    }
  }

  DayChartPopulation() {
    this.values = [];
    for (let i = 0; i < 23; i++) {
      this.values.push(this.randomGenerator(0, 200));
    }
    Highcharts.chart('container', {
      chart: {
        type: this.chartType
      },
      title: {
        text: null
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function () {
            return Highcharts.dateFormat('%H:%M', this.value);
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
      },
      series: [{
        type: undefined,
        name: '',
        data: this.values,
        pointStart: Number(new Date().setUTCHours(0, 0, 0, 0)),
        pointInterval: 3600000
      },]
    });
  }

}

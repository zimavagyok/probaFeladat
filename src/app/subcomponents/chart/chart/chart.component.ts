import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input, OnChanges, ComponentFactoryResolver } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import { DateService } from 'src/app/service/dateService/date.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {

  @Output() date = new EventEmitter();
  @Output() outFullDate = new EventEmitter();
  categories: string[] = [];
  @Input() chartType: string;
  @Input() periodHun: string;
  @Input() currentDate: string;
  @Input() currentPeriodType: string;
  @Input() inFullDate : string;
  values: number[] = [];



  constructor(public datePipe: DatePipe, public dateService: DateService, private cdr: ChangeDetectorRef) { }

  ngOnChanges(): void {
    if (this.currentPeriodType != null) {
      if (this.currentPeriodType == 'daily') {
      }
    }
    if (this.currentPeriodType == 'daily') {
      this.DayChartPopulation();
    }
    else if (this.currentPeriodType == 'monthly') {
      this.MonthChartPopulation();
    }
    else if (this.currentPeriodType == 'annual') {
      this.YearsChartPopulation();
    }
  }

  randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  incrementDate() {
    if (this.currentPeriodType == 'daily') {
      this.date.emit(this.datePipe.transform(new Date(new Date(this.currentDate).getTime() + (1000 * 60 * 60 * 24)).toDateString(), 'yyyy.MM.dd'));
      this.outFullDate.emit(this.datePipe.transform(new Date(new Date(this.inFullDate).getTime() + (1000 * 60 * 60 * 24)).toDateString(), 'yyyy.MM.dd'));
    }
    else if (this.currentPeriodType == 'monthly') {
      this.date.emit(this.datePipe.transform(new Date(new Date(this.currentDate).setMonth(new Date(this.currentDate).getMonth() + 1)).toDateString(), 'yyyy.LL'));
      this.outFullDate.emit(this.datePipe.transform(new Date(new Date(this.inFullDate).setMonth(new Date(this.inFullDate).getMonth() + 1)).toDateString(), 'yyyy.MM.dd'));
    }
    else if (this.currentPeriodType == 'annual') {
      this.date.emit((parseInt(this.currentDate) + 1).toString());
      this.outFullDate.emit(this.datePipe.transform(new Date(new Date(this.inFullDate).setFullYear(new Date(this.inFullDate).getFullYear() + 1)).toDateString(), 'yyyy.MM.dd'));
    }
  }

  decrementDate() {
    if (this.currentPeriodType == 'daily') {
      this.date.emit(this.datePipe.transform(new Date(new Date(this.currentDate).getTime() - (1000 * 60 * 60 * 24)).toDateString(), 'yyyy.MM.dd'));
      this.outFullDate.emit(this.datePipe.transform(new Date(new Date(this.inFullDate).getTime() - (1000 * 60 * 60 * 24)).toDateString(), 'yyyy.MM.dd'));
    }
    else if (this.currentPeriodType == 'monthly') {
      this.date.emit(this.datePipe.transform(new Date(new Date(this.currentDate).setMonth(new Date(this.currentDate).getMonth() - 1)).toDateString(), 'yyyy.LL'));
      this.outFullDate.emit(this.datePipe.transform(new Date(new Date(this.inFullDate).setMonth(new Date(this.inFullDate).getMonth() - 1)).toDateString(), 'yyyy.MM.dd'));
    }
    else if (this.currentPeriodType == 'annual') {
      this.date.emit((parseInt(this.currentDate) - 1).toString());
      this.outFullDate.emit(this.datePipe.transform(new Date(new Date(this.inFullDate).setFullYear(new Date(this.inFullDate).getFullYear() - 1)).toDateString(), 'yyyy.MM.dd'));
    }
  }

  daysRemainingInMonth(date: Date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    return parseInt(new Date(year, month, 0).getDate().toString());
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
        pointStart: Number(new Date(this.currentDate).setHours(0, 0, 0, 0)),
        pointInterval: 3600000
      },]
    });
  }

  MonthChartPopulation() {
    this.values = [];
    let days = [];
    for (let i = 0; i < this.daysRemainingInMonth(new Date(this.currentDate)); i++) {
      this.values.push(this.randomGenerator(0, 200));
      days.push((i + 1));
    }
    Highcharts.chart('container', {
      chart: {
        type: this.chartType
      },
      title: {
        text: null
      },
      xAxis: {
        categories: days
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
        data: this.values
      },]
    });
  }

  YearsChartPopulation() {
    this.values = [];
    for (let i = 0; i < 12; i++) {
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
        categories: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']
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
        data: this.values
      },]
    });
  }

}

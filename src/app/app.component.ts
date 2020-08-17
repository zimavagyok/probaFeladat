import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Solis ortus';

  currentDate : string = this.datePipe.transform(new Date(), 'yyyy.MM.dd');
  periodType : string = 'daily';
  chartType : string = 'line';
  periodHun : string ='Napi';
  fullDate : string = this.datePipe.transform(new Date(), 'yyyy.MM.dd');

  changeCurrentDate(p)
  {
    this.currentDate = p;
  }

  changePeriodType(p)
  {
    this.periodType = p;
  }

  changeChartType(p)
  {
    this.chartType = p;
  }

  changePeriodHun(p)
  {
    this.periodHun = p;
  }

  changeFullDate(p)
  {
    this.fullDate = p;
  }

  constructor(public datePipe: DatePipe) { }
}

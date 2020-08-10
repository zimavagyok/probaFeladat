import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DateService
{
    public selectedDate : string;
    public periodType : string;
    public chartType : string;
    public periodHun : string;

    private SelectedDate = new BehaviorSubject(this.selectedDate);
    private PeriodType = new BehaviorSubject(this.periodType);
    private ChartType = new BehaviorSubject(this.chartType);
    private PeriodHun = new BehaviorSubject(this.periodHun);

    currentDate = this.SelectedDate.asObservable();
    currentPeriodType = this.PeriodType.asObservable();
    currentChartType = this.ChartType.asObservable();
    currentPeriodHun = this.PeriodHun.asObservable();

    changeDate(date : string)
    {
        this.SelectedDate.next(date);
    }

    changePeriodType(periodType : string)
    {
        this.PeriodType.next(periodType);
    }

    changeChartType(chartType : string)
    {
        this.ChartType.next(chartType);
    }

    changePeriodHun(periodHun : string)
    {
        this.PeriodHun.next(periodHun);
    }
}
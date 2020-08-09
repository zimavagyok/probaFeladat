import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DateService
{
    public selectedDate : string;
    public periodType : string;
    public chartType : string;

    private SelectedDate = new BehaviorSubject(this.selectedDate);
    private PeriodType = new BehaviorSubject(this.periodType);
    private ChartType = new BehaviorSubject(this.chartType);

    currentDate = this.SelectedDate.asObservable();
    currentPeriodType = this.PeriodType.asObservable();
    currentChartType = this.ChartType.asObservable();

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
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DateService
{
    public selectedDate : string;
    public periodType : string;

    private SelectedDate = new BehaviorSubject(this.selectedDate);
    private PeriodType = new BehaviorSubject(this.periodType);

    currentDate = this.SelectedDate.asObservable();
    currentPeriodType = this.PeriodType.asObservable();

    changeDate(date : string)
    {
        this.SelectedDate.next(date);
    }

    changePeriodType(periodType : string)
    {
        this.PeriodType.next(periodType);
    }
}
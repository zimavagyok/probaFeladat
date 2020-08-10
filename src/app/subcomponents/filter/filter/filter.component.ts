import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateService } from '../../../service/dateService/date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  period = "daily";
  date: string = this.datePipe.transform(new Date(), 'yyyy.MM.dd');
  picker: Date;
  today: Date;
  currentYear: number;
  years: number[] = [];
  dateForm = new FormControl(new Date());

  addEvent(event: MatDatepickerInputEvent<Date>) {
    if (this.period == "daily") {
      this.dateService.changeDate(this.datePipe.transform(`${event.value}`, 'yyyy.MM.dd'));
      this.dateService.changeChartType('line');
      this.dateService.changePeriodHun('Napi');
    }
    else {
      this.dateService.changeDate(this.datePipe.transform(`${event.value}`, 'yyyy.LL'));
      this.dateService.changeChartType('bar');
      this.dateService.changePeriodHun('Havi');
    }

    this.dateService.changePeriodType(this.period);
  }

  selectEvent() {
    this.dateService.changePeriodType(this.period);
    this.dateService.changeDate(this.date);
    this.dateService.changeChartType('bar');
    this.dateService.changePeriodHun('Éves');
  }

  constructor(private dateService: DateService, public datePipe: DatePipe) { }


  ngOnInit(): void {
    this.dateService.currentDate.subscribe(currDate => {
      if (currDate != null) { this.date = currDate; this.dateForm = new FormControl(new Date(this.date)); } else {
        this.dateService.changeDate(this.datePipe.transform(new Date(), 'yyyy.MM.dd')); this.dateService.changeChartType('line');
        this.dateService.changePeriodHun('Napi');
      };
    });

    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    for (let year = this.currentYear; year > this.currentYear - 25; year--) {
      this.years.push(year);
    }
  }


}

import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateService } from '../../../service/dateService/date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit,OnChanges {
  @Output() period = new EventEmitter();
  @Output() date = new EventEmitter();
  @Output() chartType = new EventEmitter;
  @Output() periodHun = new EventEmitter();
  @Input() inPeriod : string;
  @Input() inDate : string;
  @Input() inChartType : string;
  @Input() inPeriodHun : string;
  picker: Date;
  today: Date;
  currentYear: number;
  years: number[] = [];
  dateForm = new FormControl(new Date());

  addEvent(event: MatDatepickerInputEvent<Date>) {
    if (this.inPeriod == "daily") {
      this.date.emit(this.datePipe.transform(`${event.value}`, 'yyyy.MM.dd'));
      this.chartType.emit('line');
      this.periodHun.emit('Napi');
    }
    else {
      this.date.emit(this.datePipe.transform(`${event.value}`, 'yyyy.LL'));
      this.chartType.emit('bar');
      this.periodHun.emit('Havi');
    }

    this.period.emit(this.inPeriod);
  }

  selectEvent() {
    this.period.emit(this.inPeriod);
    this.date.emit(this.inDate);
    this.chartType.emit('bar');
    this.periodHun.emit('Éves');
  }

  constructor(private dateService: DateService, public datePipe: DatePipe) { }


  ngOnInit(): void {
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    for (let year = this.currentYear; year > this.currentYear - 25; year--) {
      this.years.push(year);
    }
  }

  ngOnChanges():void{
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    for (let year = this.currentYear; year > this.currentYear - 25; year--) {
      this.years.push(year);
    }
    this.dateForm = new FormControl(new Date(this.inDate));
  }


}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  period = "daily";
  picker: Date;
  today: Date;
  date: string;
  currentYear : number;
  years : number[] = [];

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = (`${event.value}`);
  }

  constructor() { }
  

  ngOnInit(): void {
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    for(let year = this.currentYear;year>this.currentYear-25;year--)
    {
      this.years.push(year);
    }
  }


}

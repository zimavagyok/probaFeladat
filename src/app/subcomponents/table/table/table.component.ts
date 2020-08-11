import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateService } from 'src/app/service/dateService/date.service';
import { DatePipe } from '@angular/common';

export interface uzemoraEsFogyasztasAdatok {
  idoszak: string;
  fogyasztas: number;
  meddoEnergia: number;
  uzemOra: number;
  uzemszunet: number | string;
  maxTeljesitmeny: number;
  termeles: number;
  bevetel: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['idoszak', 'fogyasztas', 'meddoEnergia', 'uzemora', 'uzemszunet', 'maxTeljesitmeny', 'termeles', 'bevetel'];
  data: uzemoraEsFogyasztasAdatok[] = [];
  temp: uzemoraEsFogyasztasAdatok;
  currentDate: string;
  currentPeriodType: string;

  constructor(private _snackBar: MatSnackBar, public dateService: DateService, public datePipe: DatePipe) { }

  downloadStarted() {
    this._snackBar.open("A letöltés megkeződött!", "Rendben", {
      duration: 2000,
    });
  }

  randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateData() {
    this.data = [];
    if (this.currentPeriodType == 'daily') {
      for (let i = 0; i < 30; i++) {
        this.temp = {
          idoszak: this.datePipe.transform(new Date(new Date(this.currentDate).getTime() - (i * (1000 * 60 * 60 * 24))).toDateString(), 'yyyy.MM.dd'),
          fogyasztas: this.randomGenerator(0, 10),
          meddoEnergia: this.randomGenerator(10, 50),
          uzemOra: this.randomGenerator(4, 20),
          uzemszunet: '-',
          maxTeljesitmeny: this.randomGenerator(400, 500),
          termeles: this.randomGenerator(1300, 3000),
          bevetel: this.randomGenerator(40000, 90000)
        };
        this.data.push(this.temp);
      }
    }
    else if (this.currentPeriodType == 'monthly') {
      for (let i = 0; i < 30; i++) {
        this.temp = {
          idoszak: this.datePipe.transform(new Date(new Date(this.currentDate).setMonth(new Date(this.currentDate).getMonth() - (i*1))).toDateString(), 'yyyy.LL'),
          fogyasztas: this.randomGenerator(0, 10),
          meddoEnergia: this.randomGenerator(10, 50),
          uzemOra: this.randomGenerator(4, 20),
          uzemszunet: '-',
          maxTeljesitmeny: this.randomGenerator(400, 500),
          termeles: this.randomGenerator(1300, 3000),
          bevetel: this.randomGenerator(40000, 90000)
        };
        this.data.push(this.temp);
      }
    }
    else if (this.currentPeriodType == 'annual') {
      for (let i = 0; i < 5; i++) {
        this.temp = {
          idoszak: (parseInt(this.currentDate) - (i*1)).toString(),
          fogyasztas: this.randomGenerator(0, 10),
          meddoEnergia: this.randomGenerator(10, 50),
          uzemOra: this.randomGenerator(4, 20),
          uzemszunet: '-',
          maxTeljesitmeny: this.randomGenerator(400, 500),
          termeles: this.randomGenerator(1300, 3000),
          bevetel: this.randomGenerator(40000, 90000)
        };
        this.data.push(this.temp);
      }
    }

  }

  ngOnInit(): void {
    this.dateService.currentPeriodType.subscribe(currPeriodType => {
      if (currPeriodType != null) {
        this.currentPeriodType = currPeriodType; if (currPeriodType == 'daily') {
        }
      } else {
        this.currentPeriodType = 'daily';
      }
    });
    this.dateService.currentDate.subscribe(currDate => { if (currDate == null) { this.currentDate = this.datePipe.transform(new Date(), 'yyyy.MM.dd'); this.generateData(); } else { this.currentDate = currDate; this.generateData(); } });

  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './subcomponents/filter/filter/filter.component';
import { ChartComponent } from './subcomponents/chart/chart/chart.component';
import { TableComponent } from './subcomponents/table/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateService } from './service/dateService/date.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import {HighchartsChartModule} from 'highcharts-angular';
import {MatCardModule, MatCard} from '@angular/material/card';
import {MatGridListModule,MatGridTile} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu);






@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ChartComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule, MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    HighchartsChartModule
  ],
  providers: [MatDatepickerModule,DateService,DatePipe,{ provide: LOCALE_ID, useValue: 'hu-HU'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

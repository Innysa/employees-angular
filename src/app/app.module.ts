import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { JsonApiModule } from 'angular2-jsonapi';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadEmployeesComponent } from './employees/read-employees/read-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { GetEmployeeComponent } from './employees/get-employee/get-employee.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './employees/delete-employee/delete-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadEmployeesComponent,
    CreateEmployeeComponent,
    GetEmployeeComponent,
    UpdateEmployeeComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    JsonApiModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

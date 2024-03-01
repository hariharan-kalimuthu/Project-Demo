import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ModelComponent } from './model/model.component';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './department/department.component';
import { EmpCreateComponent } from './emp-create/emp-create.component';
import { DepCreateComponent } from './dep-create/dep-create.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ModelComponent,
    DepartmentComponent,
    EmpCreateComponent,
    DepCreateComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    HttpClientModule,ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

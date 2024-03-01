import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { EmpCreateComponent } from './emp-create/emp-create.component';
import { DepCreateComponent } from './dep-create/dep-create.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'apphome', component:AppComponent},
  {path:'employee', component:EmployeeComponent},
 
  {
    path:'department',component:DepartmentComponent
  },
  {
    path:'emp-create',component:EmpCreateComponent
  },
   {
    path:'dep-create',component:DepCreateComponent  },
  {
    path:'', pathMatch:'full', redirectTo:''
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

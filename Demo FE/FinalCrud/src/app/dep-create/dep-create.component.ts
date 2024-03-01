import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../model/department.model';
import { DepartmentService } from '../employee/employee-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dep-create',
  templateUrl: './dep-create.component.html',
  styleUrls: ['./dep-create.component.css']
})
export class DepCreateComponent implements OnInit {

  departments: Department[] = [];
  editingDepartment:boolean=false;
  formbuilds:FormGroup ;
   constructor(private depatmentService:DepartmentService,private fp:FormBuilder , private router:Router) { 
    this.formbuilds=this.fp.group(
      {
        departmentID: [0, Validators .required],
      departmentName:['',Validators.required],
      location:['',Validators.required],
      }     
    )
    console.log(this.formbuilds);
   }
  
  ngOnInit(): void {
  }
  createDepartment(): void {
    let dep: Department ={
      departmentID: this.formbuilds.get("departmentID")?.value,
      departmentName: this.formbuilds.get("departmentName")?.value,
      location: this.formbuilds.get("location")?.value,
    }
    console.log(dep);
    this.depatmentService.createDepartment(this.formbuilds.value).subscribe(Response=>{
      
      if(confirm(Response)){
        this.goto();
      } } ,
      err => {
        if(confirm(err.error)){
  
        }
      })
  }
   goto(){
    this.router.navigate(['/department']);
   }
}

   
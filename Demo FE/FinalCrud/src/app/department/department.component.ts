import { Component, OnInit } from '@angular/core';
import { Department } from '../model/department.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../employee/employee-service.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  editingDepartment:boolean=false;
  formbuilds:FormGroup;
   constructor(private depatmentService:DepartmentService,private fp:FormBuilder) { 
    this.formbuilds=this.fp.group(
      {
        departmentID: ['', Validators.required],
      departmentName:['',Validators.required],
      location:['',Validators.required],
      }     
    )
    console.log(this.formbuilds);
   }
   
  ngOnInit(): void {
    this.loadDepartment();
    
  }
  
  Edit():void{
    console.log(this.formbuilds.value);
    this.depatmentService.updateDepartment(this.formbuilds.value).subscribe(Response=>{
      if(confirm(Response)){
        this.loadDepartment();
      }
      this.loadDepartment();
    },
    err => {
      if(confirm(err.error)){

      }
    })
    
    this.editingDepartment=false;
  }

  loadDepartment(): void {
    this.depatmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }
  editDepartment(department: Department): void {
    this.editingDepartment=true;
    this.formbuilds.patchValue(department);
    this.loadDepartment();
  }

  cancelEdit(): void {
    this.editingDepartment=false;
   
  }
  createDepartment(): void {
    console.log(this.formbuilds.value);
    this.depatmentService.createDepartment(this.formbuilds.value).subscribe(Response=>{
      this.loadDepartment();
    })
   
  }
  deleteDepartment(departmentId: number): void {
   
      this.depatmentService.deleteDepartment(departmentId).subscribe({
        next:(data) => {
          if(confirm(data)){            
            this.editingDepartment=false;
            this.loadDepartment();
          }
        },
        error(err) {
          confirm(err.error);
        },
      });
    }

}

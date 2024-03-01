import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { DepartmentService, EmployeeService } from '../employee/employee-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../model/department.model';

@Component({
  selector: 'app-emp-create',
  templateUrl: './emp-create.component.html',
  styleUrls: ['./emp-create.component.css']
})

export class EmpCreateComponent implements OnInit {
  departments: Department[] = [];
  employees: Employee[] = [];
  formbuilds: FormGroup;

  constructor(private employeeService: EmployeeService, 
    private fp: FormBuilder, private router: Router,
    private departmentservices: DepartmentService) {
    this.formbuilds = this.fp.group({
      employeeId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      departmentId: [0, Validators.required],
      salary: ['0', Validators.required],
      dateOfBirth: [this.getCurrentDate(), Validators.required]
    });
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const day = today.getDate();

  
    const formattedMonth = month < 10 ? '0' + month : '' + month;
    const formattedDay = day < 10 ? '0' + day : '' + day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  ngOnInit(): void {
    this.loadDepartments();
  }

  
  loadDepartments(): void {
    this.departmentservices.getDepartments().subscribe({
      next : (data) => {
        this.departments = data;
      }
    });
  }
  createEmployee(): void {
    this.formbuilds.patchValue({
      departmentID: '',
    });
    let emp: Employee = {
      firstName: this.formbuilds.get("firstName")?.value,
      lastName: this.formbuilds.get("lastName")?.value,
      departmentId: this.formbuilds.get("departmentId")?.value,
      dateOfBirth: this.formbuilds.get("dateOfBirth")?.value,
      salary: this.formbuilds.get("salary")?.value,
    };
    
    this.employeeService.createEmployee(emp).subscribe(Response => {
      if (confirm(Response)) {
        this.goToEmployeePage();
      }
    },
    err => {
      if(confirm(err.error)){

      }
    });
  }

  goToEmployeePage() {
    this.router.navigate(['/employee']);
  }
}

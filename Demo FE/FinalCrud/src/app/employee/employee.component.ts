import { Component, OnInit } from '@angular/core';
import { DepartmentService, EmployeeService } from './employee-service.service';
import { Employee } from '../model/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../model/department.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})

export class EmployeeComponent implements OnInit {
  departments: Department[] = [];
  employees: Employee[] = [];
  editingEmployee: boolean = false;
  formbuilds: FormGroup;
  constructor(private employeeService: EmployeeService, private fp: FormBuilder, private departmentservices: DepartmentService) {
    this.formbuilds = this.fp.group({
      employeeId: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      departmentId: [0, Validators.required],
      salary: ['', Validators.required],
      dateOfBirth: [this.getCurrentDate(new Date), [Validators.required]]
    });
  }
  
  getCurrentDate(date: Date): string {
    const today = new Date(date);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const day = today.getDate();  
    const formattedMonth = month < 10 ? '0' + month : '' + month;
    const formattedDay = day < 10 ? '0' + day : '' + day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
  }

  Edit(): void {
    console.log(this.formbuilds.value);
    let salary = this.formbuilds.get('salary')?.value;
    console.log(salary);
    if(isNaN(salary)){
      if(confirm("Please enter valid salary")){
        return;
      }
      return;
    }
    this.employeeService.updateEmployee(this.formbuilds.value).subscribe(Response => {
      if(confirm(Response)){
        this.loadEmployees();
        this.editingEmployee = false;
      }
    }
    , 
    err => {
      if(confirm(err.error)){

      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  loadDepartments(): void {
    this.departmentservices.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = true;
    this.formbuilds.patchValue(employee);
    this.formbuilds.get('dateOfBirth')?.setValue(this.getCurrentDate(employee.dateOfBirth));
    console.log(this.formbuilds);
    this.loadEmployees();
  }

  cancelEdit(): void {
    this.editingEmployee = false;
    this.loadEmployees();
  }

  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (data) => {
        console.log(data);
        if (confirm(data)) {
          this.loadEmployees();
        }
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';
import { Department } from '../model/department.model';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  private apiUrl = 'https://localhost:7155/API/Employee';

  constructor(private http: HttpClient) {}
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/getemployee/${id}`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/getemployee`);
  }

  createEmployee(employee: Employee): Observable<any> {
    let data = this.http.post(`${this.apiUrl}/Post`, employee, {responseType: 'text'});
    console.log(data, 'Employee Add');
    return data;
  
  }

  updateEmployee(employee: Employee): Observable<any> {
     let data = this.http.put(`${this.apiUrl}/Update`, employee, {responseType: 'text'});
     console.log(data, 'Employee Update');
     return data;
  }

  deleteEmployee(id: number): Observable<any> {
    let data = this.http.delete(`${this.apiUrl}/Delete/${id}`, {responseType: 'text'});
    console.log(data, 'delete data');
    return data;
  }
}


@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'https://localhost:7155/API/Department';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/getDepartment`);
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/getdepartment/${id}`);
  }

  createDepartment(department: Department): Observable<any> {
    return this.http.post(`${this.apiUrl}/Post`, department,{responseType: 'text'});
  }

  updateDepartment(department: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/`, department, {responseType: 'text'});
  }

  deleteDepartment(id: number): Observable<any> {
    let data1 = this.http.delete(`${this.apiUrl}/Delete/${id}`, {responseType: 'text'});
    return data1;
  }
}

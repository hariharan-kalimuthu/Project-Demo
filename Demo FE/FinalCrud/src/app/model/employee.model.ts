export interface Employee {
  employeeId?: number;
  firstName: string;
  lastName: string;
  departmentId: number;
  departmentName?: string;
  location?: string;
  dateOfBirth:Date;
  salary:number;
}

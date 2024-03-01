using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.ApiModels;
using WebApplication1.Models;
namespace WebApplication1.Controllers
{
    [Route("API/[Controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext EmployeeDbContext;

        public EmployeeController(EmployeeDbContext employeeDbContext)
        {
            this.EmployeeDbContext = employeeDbContext;
        }
        [HttpGet]
        [Route("getemployee/{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employeeData = new EmployeeData();

            var employee = await EmployeeDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound("Employee Not Found"); 
            }

            employeeData.EmployeeId = employee.EmployeeID;
            employeeData.FirstName = employee.FirstName;
            employeeData.LastName = employee.LastName;
            employeeData.DepartmentId = employee.DepartmentId;

            var department = await EmployeeDbContext.Departments.FindAsync(employee.DepartmentId);

            if (department != null)
            {
                employeeData.DepartmentName = department.DepartmentName;
                employeeData.Location = department.Location;
            }

            return Ok(employeeData);
        }

        [HttpGet]
        [Route("getemployee")]
        public async Task<IActionResult> GetEmployee()

        {
            var Result = new List<EmployeeData>();
            var Employees = await EmployeeDbContext.Employees.ToListAsync();
            foreach (var Employee in Employees)
            {
                var datai = new EmployeeData();
                datai.EmployeeId = Employee.EmployeeID;
                datai.FirstName= Employee.FirstName;
                datai.LastName= Employee.LastName;
                datai.DepartmentId = Employee.DepartmentId;

                var departmentQuery = EmployeeDbContext.Departments.Where(x => x.DepartmentID == Employee.DepartmentId);
                var dep = await departmentQuery.FirstOrDefaultAsync();
                datai.DepartmentName = dep.DepartmentName;
                datai.Location = dep.Location;
                datai.DateOfBirth = Employee.DateOfBirth;
                datai.Salary=Employee.Salary;
                Result.Add(datai);
            }
            return Ok(Result);
        }

        [HttpPost]
        [Route("Post")]
        public async Task<IActionResult> CreateEmployee([FromBody] Employee emp)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(emp.FirstName))
                {
                    return BadRequest("FirstName cannot be null or consist of whitespaces only.");
                }

                if (string.IsNullOrWhiteSpace(emp.LastName))
                {
                    return BadRequest("LastName cannot be null or consist of whitespaces only.");
                }

                if (emp.DepartmentId <= 0)
                {
                    return BadRequest("Invalid DepartmentId. It must be a positive integer.");
                }

                if (DateTime.Now.Year - emp.DateOfBirth.Year < 18 )
                { 
                    return BadRequest("Age Should Above 18");
                }

                await EmployeeDbContext.Employees.AddAsync(emp);
                await EmployeeDbContext.SaveChangesAsync();

                return Ok("Employee Created Successfully. ");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await EmployeeDbContext.Employees.FirstOrDefaultAsync(a => a.EmployeeID == id);
            
            if (employee != null)
            {
                EmployeeDbContext.Employees.Remove(employee);
                await EmployeeDbContext.SaveChangesAsync();
                return Ok($"Employee Deleted Successfully");
            }
            else
            {
                return NotFound($"Employee with ID {id} not found");
            }
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employee emp)

         {  
                    if (string.IsNullOrWhiteSpace(emp.FirstName))
                    {
                        return BadRequest("FirstName cannot be null or consist of whitespaces only.");
                    }

                    if (string.IsNullOrWhiteSpace(emp.LastName))
                    {
                        return BadRequest("LastName cannot be null or consist of whitespaces only.");
                    }

                    if (emp.DepartmentId <= 0)
                    {
                        return BadRequest("Invalid DepartmentId. It must be a positive integer.");
                    }
                    if (emp.Salary < 0 || emp.Salary == null)
                    {
                         return BadRequest("Enter Valid Salary");

                    }
                  
                    if (DateTime.Now.Year - emp.DateOfBirth.Year < 18)
                    {
                        return BadRequest("Age Should Above 18");
                    }
                    var employee = await EmployeeDbContext.Employees.FirstOrDefaultAsync(a => a.EmployeeID == emp.EmployeeID);
                    if (employee != null)
                    {
                         employee.EmployeeID = emp.EmployeeID;
                         employee.FirstName = emp.FirstName;
                         employee.LastName = emp.LastName;
                         employee.DepartmentId = emp.DepartmentId;
                         employee.Salary = emp.Salary;
                         employee.DateOfBirth = emp.DateOfBirth;
                         await EmployeeDbContext.SaveChangesAsync();
                         return Ok("Employee Updated Successfully.");
                    }
                    else
                    {
                        return NotFound("Employee Not Found");
                    }
            
        }

    }
}
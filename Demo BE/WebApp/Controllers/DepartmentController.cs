using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;
using WebApplication1.Models;
namespace WebApplication1.Controllers
{
    [Route("API/[Controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly EmployeeDbContext DepartmentDbContext;
        public DepartmentController(EmployeeDbContext departmentDbContext)
        {
            this.DepartmentDbContext = departmentDbContext;
        }

        [HttpGet]
        [Route("getDepartment")]
        public async Task<IActionResult> GetDepartment()

        {
            var Departments = await DepartmentDbContext.Departments.ToListAsync();
            return Ok(Departments);
        }

        [HttpPost]
        [Route("Post")]
        public async Task<IActionResult> CreateDepartment(Department dep)
        {
            if (string.IsNullOrWhiteSpace(dep.DepartmentName) || string.IsNullOrWhiteSpace(dep.Location))
            {
                return BadRequest("DepartmentName and Location cannot be null or whitespaces.");
            }
            if (dep == null)
            {
                return NotFound("Department Not Found");
            }

            if (dep.DepartmentName.Length > 20 || dep.Location.Length > 20)
            {
                return BadRequest("DepartmentName and Location should be less than or equal to 20 characters.");
            }

            await DepartmentDbContext.Departments.AddAsync(dep);
            await DepartmentDbContext.SaveChangesAsync();

            return Ok("Department Created ");
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var employees = await DepartmentDbContext.Employees.Where(x => x.DepartmentId == id).ToListAsync();
            if(employees.Any())
            {
                return BadRequest(" Some Empoyeees are working. Can't delete this department.");
            }

            var department = await DepartmentDbContext.Departments.FirstOrDefaultAsync(a => a.DepartmentID == id);

            if (department != null)
            {
                DepartmentDbContext.Departments.Remove(department);
                await DepartmentDbContext.SaveChangesAsync();
                return Ok("Department deleted");
            }
            else
            {
                return NotFound("Department not found");
            }
        }

        [HttpPut]
        [Route("Update")]

        public async Task<IActionResult> UpdateDepartment([FromBody] Department dep)
        {
            if (string.IsNullOrWhiteSpace(dep.DepartmentName) || string.IsNullOrWhiteSpace(dep.Location))
            {
                return BadRequest("Enter Department Name");
            }

            if (dep.DepartmentName.Length > 20 || dep.Location.Length > 20)
            {
                return BadRequest("DepartmentName and Location should be less than or equal to 20 characters.");
            }

            var department = await DepartmentDbContext.Departments.FirstOrDefaultAsync(a => a.DepartmentID == dep.DepartmentID);
            if (department != null)
            {
                if (department == null)
                {
                    return NotFound("Department Not Found");
                }

                department.DepartmentName = dep.DepartmentName;
                department.Location = dep.Location;
                await DepartmentDbContext.SaveChangesAsync();
                return Ok("Department Updated SuccessFully");
            }
            else
            {
                return NotFound("Department Not Found");
            }

        }
    }
}

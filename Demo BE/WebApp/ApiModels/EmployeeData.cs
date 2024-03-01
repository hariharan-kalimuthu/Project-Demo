namespace WebApplication1.ApiModels
{
    public class EmployeeData
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string Location { get; set; }
        public DateTime DateOfBirth { get; set; }
        public double Salary { get; set; }
    }
}

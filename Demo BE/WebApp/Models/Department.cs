using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Department", Schema = "dbo")]
    public class Department
    {

        [Key]
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public string  Location { get; set;}
    }
}

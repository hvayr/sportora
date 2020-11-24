using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SportoraAPI.Models
{
    public class EmailUniqueAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(
        
            object value, ValidationContext validationContext)

        {
            var _context =
                (DatabaseContext) validationContext.GetService(typeof(DatabaseContext));
            var entity = _context.Users.SingleOrDefault(u => u.Email == value.ToString());

            if (entity != null)
            {
                return new ValidationResult(GetErrorMessage(value.ToString()));
            }
            
            return ValidationResult.Success;
            
        }
    
        public string GetErrorMessage(string email)
        {
            return $"Email {email} is already in use.";
        }
    }
    
    
}
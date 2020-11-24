using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace SportoraAPI.Models
{
    public class UsernameUniqueAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value,
            ValidationContext validationContext)

        {
            var _context =
                (DatabaseContext) validationContext.GetService(typeof(DatabaseContext));
            var entity = _context.Users.SingleOrDefault(u => u.UserName == value);
            

            if (entity != null)
            {
                return new ValidationResult(GetErrorMessage(value.ToString()));
            }

            return ValidationResult.Success;
        }

        public string GetErrorMessage(string username)
        {
            return $"Username {username} is already in use.";
        }
    }
}
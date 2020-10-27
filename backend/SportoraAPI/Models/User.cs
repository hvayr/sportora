
using System.ComponentModel.DataAnnotations;

namespace SportoraAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [EmailAddress]
        [EmailUnique]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        private string Password { get; set; }
        [Required]
        [UsernameUnique]
        public string UserName { get; set; }
        public string Gender { get; set; }
        public int[] GroupIds { get; set; }
        public string ImageUrl { get; set; }
        
    }
}
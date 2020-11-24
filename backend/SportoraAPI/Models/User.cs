
using System.ComponentModel.DataAnnotations;

namespace SportoraAPI.Models
{
    public class User
    {
        [Required]
        public string Id { get; set; }
        [Required]
        [EmailAddress]
        [EmailUnique]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        [UsernameUnique]
        public string UserName { get; set; }
        public string Gender { get; set; }
        public int[] GroupIds { get; set; }
        public string ImageUrl { get; set; }
        
    }
}
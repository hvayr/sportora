using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SportoraAPI.Models
{
    public class Business
    {
        public int Id { get; set; }
        [Required]
        public int[] AdminIds { get; set; }
        [Required]
        
        public string Name { get; set; }
        [Required]
        private string Password { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        public int[] GroupIds { get; set; }
        public string Location { get; set; }
        public string[] Premises { get; set; }
    }
}
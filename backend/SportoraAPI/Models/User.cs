
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;

namespace SportoraAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string AuthId { get; set; }

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
        //public int[] GroupIds { get; set; }
        //public virtual List<Group> Groups { get; set; }

        /// <summary>
        /// Use UserGroups property instead
        /// </summary>
        [Required]
        [Newtonsoft.Json.JsonIgnore]
        public virtual List<UserGroups> Groups { get; set; }
        /// <summary>
        /// Returns the Groups.Users list directly
        /// </summary>
        public List<Group> UserGroups => Groups.Select(r => r.Group).ToList();

        public string ImageUrl { get; set; }
        
    }
}
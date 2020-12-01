using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Newtonsoft.Json;

namespace SportoraAPI.Models
{
    public class Business
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Use AdminUsers property instead
        /// </summary>
        [Required]
        public virtual List<BusinessAdmins> Admins { get; set; }
        /// <summary>
        /// Returns the Admins.Users list directly
        /// </summary>
        public List<User> AdminUsers => Admins.Select(r => r.User).ToList();

        [Required]
        public string Name { get; set; }

        [Required]
        private string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Use GroupsGroups property instead
        /// </summary>
        public virtual List<BusinessGroups> Groups { get; set; }
        /// <summary>
        /// Returns the Groups.Groups list directly
        /// </summary>
        public List<Group> GroupsGroups => Groups.Select(r => r.Group).ToList();
        public string Location { get; set; }
        public string[] Premises { get; set; }
    }
}
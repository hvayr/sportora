using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace SportoraAPI.Models
{
    public class Group
    {
        [Key]
        public int Id { get; set; }

        [Required]
        /// <summary>
        /// Use AdminUsers property instead
        /// </summary>
        public virtual List<GroupAdmins> Admins { get; set; }
        /// <summary>
        /// Returns the Admin.Users list directly
        /// </summary>
        public List<User> AdminUsers => Admins.Select(r => r.User).ToList();

        [Required]
        public string Name { get; set; }
    }
}
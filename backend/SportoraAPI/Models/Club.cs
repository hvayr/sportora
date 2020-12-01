using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace SportoraAPI.Models
{
    public class Club
    {
        [Key]
        public int Id { get; set; }

        [Required]
        /// <summary>
        /// Use AdminUsers property instead
        /// </summary>
        public virtual List<ClubAdmins> Admins { get; set; }
        /// <summary>
        /// Returns the Admin.Users list directly
        /// </summary>
        public List<User> AdminUsers => Admins.Select(r => r.User).ToList();

        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Use GroupsGroups property instead
        /// </summary>
        public virtual List<ClubGroups> Groups { get; set; }
        /// <summary>
        /// Returns the Groups.Groups list directly
        /// </summary>
        public List<Group> GroupsGroups => Groups.Select(r => r.Group).ToList();

        public SkillLevel SkillLevel { get; set; }
    }
}
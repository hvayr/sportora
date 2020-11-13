using System.ComponentModel.DataAnnotations;

namespace SportoraAPI.Models
{
    public class Club
    {
        public int Id { get; set; }
        [Required]
        public int[] AdminIds { get; set; }
        [Required]
        public string Name { get; set; }
        public int[] GroupIds { get; set; }
        public SkillLevel SkillLevel { get; set; }
    }
}
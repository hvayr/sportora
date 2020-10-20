using System;

namespace SportoraAPI.Models
{
    public class Club
    {
        public int    Id       { get; set; }
        public String Name     { get; set; }
        public int[]  GroupIds { get; set; }
        public SkillLevel      SkillLevel        { get; set; }
    }
}
using System;
using System.ComponentModel.DataAnnotations;

namespace SportoraAPI.Models
{
    public class SportEvent
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int[] Participants { get; set; }
        public int MaxParticipants { get; set; }
        public bool ActiveStatus { get; set; }
        public DateTime EventStartTime { get; set; }
        public DateTime EventCreatedTime { get; set; }
        public int[] AutoInvite { get; set; }
    }
}
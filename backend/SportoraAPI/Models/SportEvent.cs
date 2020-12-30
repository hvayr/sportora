using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace SportoraAPI.Models
{
    public class SportEvent
    {
        [Key]
        public int Id { get; set; }
        public string Author { get; set; }

        public virtual List<SportEventAdmins> Admins { get; set; }
        /// <summary>
        /// Returns the Admins.Users list directly
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public List<User> AdminUsers => Admins?.Select(r => r.User)?.ToList();

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }


        public virtual List<SportEventParticipants> Participants { get; set; }

        /// <summary>
        /// Returns the Participants.Users list directly
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public List<User> ParticipantUsers => Participants?.Select(r => r.User)?.ToList();

        public int NumParticipants => ParticipantUsers?.Count ?? 0;

        public int MaxParticipants { get; set; }
        public bool ActiveStatus { get; set; }
        public DateTime EventStartTime { get; set; }
        public DateTime EventCreatedTime { get; set; }
        public int[] AutoInvite { get; set; } // What is this?
        
    }
}
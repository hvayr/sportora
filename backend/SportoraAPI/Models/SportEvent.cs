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

        /// <summary>
        /// Use AdminUsers property instead
        /// </summary>
        public virtual List<SportEventAdmins> Admins { get; set; }
        /// <summary>
        /// Returns the Admins.Users list directly
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public List<User> AdminUsers {

            get
            {
                if (Admins is null)
                    return null;

                return Admins.Select(r => r.User).ToList();
            }
        }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }

        /// <summary>
        /// Use ParticipantUsers property instead
        /// </summary>
        public virtual List<SportEventParticipants> Participants { get; set; }

        /// <summary>
        /// Returns the Participants.Users list directly
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public List<User> ParticipantUsers
        {
            get
            {
                if (Participants is null)
                    return null;

                return Participants.Select(r => r.User).ToList();
                
            }
        }

        public int NumParticipants
        {
            get
            {
                if (ParticipantUsers is null)
                    return 0;

                return ParticipantUsers.Count;
            }
        }

        public int MaxParticipants { get; set; }
        public bool ActiveStatus { get; set; }
        public DateTime EventStartTime { get; set; }
        public DateTime EventCreatedTime { get; set; }
        public int[] AutoInvite { get; set; } // What is this?
        
    }
}
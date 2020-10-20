using System;
using System.ComponentModel.DataAnnotations;

namespace SportoraAPI.Models
{
    public class Event
    {
        [Required] public int      Id               { get; set; }
        public            String   Name             { get; set; }
        public            String   Description      { get; set; }
        public            String   Location         { get; set; }
        public            int[]    Participants     { get; set; }
        public            int      MaxParticipants  { get; set; }
        public            bool     ActiveStatus     { get; set; }
        public            DateTime EventStartTime   { get; set; }
        public            DateTime EventCreatedTime { get; set; }
        public            int[]    AutoInvite       { get; set; }
    }
}
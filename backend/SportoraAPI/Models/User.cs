using System;
using System.ComponentModel.DataAnnotations;
using System.Net.Mime;

namespace SportoraAPI.Models
{
    public class User
    {
        public String Email    { get; set; }
        public String Name     { get; set; }
        public String Nickname { get; set; }
        public int    Id       { get; set; }
        public String Gender   { get; set; }
        public int[]  GroupIds { get; set; }
        public String ImageUrl { get; set; }
        private String Password { get; set; }
        
    }
}
﻿using System.ComponentModel.DataAnnotations;

namespace SportoraAPI.Models
{
    public class Group
    {
        public int Id { get; set; }
        [Required]
        public string[] AdminIds { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
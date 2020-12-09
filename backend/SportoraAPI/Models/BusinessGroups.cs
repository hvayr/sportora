﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SportoraAPI.Models
{
    public class BusinessGroups
    {
        [Key]
        public int Id { get; set; }

        public virtual Group Group { get; set; }
    }
}

﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Role { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Models
{
    public class Apartment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Address { get; set; }
        public string? ImageUrl { get; set; }
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}

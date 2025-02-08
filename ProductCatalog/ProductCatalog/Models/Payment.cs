using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace ProductCatalog.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public int ObjectId { get; set; }

        public Apartment Apartment { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }

        [Required]
        public string DetailsJson { get; set; } // Хранит платежи в JSON

        [NotMapped]
        public Dictionary<string, decimal> Details
        {
            get => JsonConvert.DeserializeObject<Dictionary<string, decimal>>(DetailsJson) ?? new Dictionary<string, decimal>();
            set => DetailsJson = JsonConvert.SerializeObject(value);
        }
    }
}
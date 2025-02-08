﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Models
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string GeneralNote { get; set; }
        public string SpecialNote { get; set; }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? GeneralNote { get; set; }
        public string? SpecialNote { get; set; }
        
    }
    public class CreateProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string GeneralNote { get; set; }
        public string SpecialNote { get; set; }

    }
}

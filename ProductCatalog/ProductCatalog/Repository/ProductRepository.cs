using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data;
using ProductCatalog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        //public async Task<PagedResult<Product>> GetProductsAsync(int page, int pageSize)
        //{
        //    var query = _context.Products.Include(p => p.Category).AsQueryable();
        //    var totalItems = await query.CountAsync();
        //    var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        //    return new PagedResult<Product>
        //    {
        //        Items = items,
        //        TotalCount = totalItems
        //    };
        //}

        public async Task<PaginatedList<ProductDto>> GetAllProductsAsync(int page, int pageSize, string searchTerm)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(p => p.Name.Contains(searchTerm));
            }

            var totalItems = await query.CountAsync();
            var products = await query.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    GeneralNote = p.GeneralNote,
                    SpecialNote = p.SpecialNote
                })
                .ToListAsync();
            return new PaginatedList<ProductDto>(products, totalItems, page, pageSize);

            ////var products = await _context.Products
            ////   .Include(p => p.Category)
            ////   .Select(p => new ProductDto
            ////   {
            ////       Id = p.Id,
            ////       Name = p.Name,
            ////       Description = p.Description,
            ////       Price = p.Price,
            ////       CategoryId = p.CategoryId,
            ////       CategoryName = p.Category.Name,
            ////       GeneralNote = p.GeneralNote,
            ////       SpecialNote = p.SpecialNote
            ////   })
            ////   .ToListAsync();

            ////return products;


            //return new PaginatedList<Product>(products, totalItems, page, pageSize);
            ////return await _context.Products.Include(p => p.Category).ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.Include(p => p.Category).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddProductAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}

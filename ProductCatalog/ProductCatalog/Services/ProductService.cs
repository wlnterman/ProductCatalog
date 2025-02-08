using System.Collections.Generic;
using System.Threading.Tasks;
using ProductCatalog.Data;
using ProductCatalog.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using ProductCatalog.Repository;
using ProductCatalog.Extensions;

public interface IProductService
{
    Task<PaginatedList<ProductDto>> GetProductsAsync(int page, int pageSize, string searchTerm);
    Task<Product> GetProductByIdAsync(int id);
    Task CreateProductAsync(CreateProductModel product);
    Task UpdateProductAsync(Product product);
    Task DeleteProductAsync(int id);
}

public class ProductService : IProductService
{
    private readonly ApplicationDbContext _context;
    private readonly IProductRepository _productRepository;

    public ProductService(ApplicationDbContext context, IProductRepository productRepository)   
    {
        
        _context = context;
        _productRepository = productRepository;
    }

    public async Task<PaginatedList<ProductDto>> GetProductsAsync(int pageNumber, int pageSize, string searchTerm) //int page, int pageSize, string searchTerm)
    {
        //return await _productRepository.GetAllProductsAsync(page, pageSize, searchTerm);

        var products = await _productRepository.GetAllProductsAsync();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            products = products.Where(p => p.Name.ContainsIgnoreCase(searchTerm));
        }

        var totalItems = products.Count();
        var items = products.Skip((pageNumber - 1) * pageSize).Take(pageSize);

        var productDtoList = new List<ProductDto>();

        foreach (var product in items)
        {
            productDtoList.Add(new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                GeneralNote = product.GeneralNote,
                SpecialNote = product.SpecialNote
            }); ;
        }
        return new PaginatedList<ProductDto>(productDtoList, totalItems, pageNumber, pageSize);
        //var products = await _context.Products
        //   .Include(p => p.Category)
        //   .Select(p => new ProductDto
        //   {
        //       Id = p.Id,
        //       Name = p.Name,
        //       Description = p.Description,
        //       Price = p.Price,
        //       CategoryId = p.CategoryId,
        //       CategoryName = p.Category.Name,
        //       GeneralNote = p.GeneralNote,
        //       SpecialNote = p.SpecialNote
        //   })
        //   .ToListAsync();

        //return products;




        //return await _context.Products.Include(p => p.Category).ToListAsync();
        //return await _context.Products.ToListAsync();
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
        return await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
        //return await _context.Products.FindAsync(id);
    }
    //good
    public async Task CreateProductAsync(CreateProductModel model)
    {

        var category = await _context.Categories.FindAsync(model.CategoryId);

        if (category == null)
        {
            throw new Exception($"Category with id {model.CategoryId} not found.");
        }

        var product = new Product
        {
            Name = model.Name,
            CategoryId = model.CategoryId,
            Description = model.Description,
            Price = model.Price,
            GeneralNote = model.GeneralNote,
            SpecialNote = model.SpecialNote

        };
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateProductAsync(Product product)
    {
        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
    }
}

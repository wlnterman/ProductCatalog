using System.Collections.Generic;
using System.Threading.Tasks;
using ProductCatalog.Data;
using ProductCatalog.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public interface ICategoryService
{
    Task<IEnumerable<Category>> GetCategoriesAsync();
    Task<Category> GetCategoryByIdAsync(int id);
    Task CreateCategoryAsync(Category category);
    Task UpdateCategoryAsync(Category category);
    Task DeleteCategoryAsync(int id);
}
public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UserService> _logger;

    public CategoryService(ApplicationDbContext context, ILogger<UserService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<Category>> GetCategoriesAsync()
    {
        _logger.LogInformation("Fetching all categories from database");
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category> GetCategoryByIdAsync(int id)
    {
        _logger.LogInformation($"Fetching category with ID: {id}");
        return await _context.Categories.FindAsync(id);
    }

    public async Task CreateCategoryAsync(Category category)
    {
        _logger.LogInformation($"Category {category.Name} created");
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateCategoryAsync(Category category)
    {
        _logger.LogWarning($"Category with ID: {category.Id} updated: {category.Name}");
        _context.Entry(category).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCategoryAsync(int id)
    {
        _logger.LogWarning($"Deleting Category with ID: {id}");
        var category = await _context.Categories.FindAsync(id);
        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
    }
}
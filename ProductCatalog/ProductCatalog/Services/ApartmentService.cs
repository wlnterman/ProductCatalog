//namespace ProductCatalog.Services
//{
//}
using System.Collections.Generic;
using System.Threading.Tasks;
using ProductCatalog.Data;
using ProductCatalog.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public interface IApartmentService
{
    Task<IEnumerable<Apartment>> GetApartmentsAsync();
    Task<Apartment> GetApartmentByIdAsync(int id);
    Task CreateApartmentAsync(Apartment apartment);
    Task UpdateApartmentAsync(Apartment apartment);
    Task DeleteApartmentAsync(int id);
}
public class ApartmentService : IApartmentService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UserService> _logger;

    public ApartmentService(ApplicationDbContext context, ILogger<UserService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<Apartment>> GetApartmentsAsync()
    {
        _logger.LogInformation("Fetching all categories from database");
        return await _context.Apartments.ToListAsync();
    }

    public async Task<Apartment> GetApartmentByIdAsync(int id)
    {
        _logger.LogInformation($"Fetching apartment with ID: {id}");
        return await _context.Apartments.FindAsync(id);
    }

    public async Task CreateApartmentAsync(Apartment apartment)
    {
        _logger.LogInformation($"Apartment {apartment.Name} created");
        _context.Apartments.Add(apartment);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateApartmentAsync(Apartment apartment)
    {
        _logger.LogWarning($"Apartment with ID: {apartment.Id} updated: {apartment.Name}");
        _context.Entry(apartment).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteApartmentAsync(int id)
    {
        _logger.LogWarning($"Deleting Apartment with ID: {id}");
        var apartment = await _context.Apartments.FindAsync(id);
        _context.Apartments.Remove(apartment);
        await _context.SaveChangesAsync();
    }
}
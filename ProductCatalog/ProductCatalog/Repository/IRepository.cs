using Microsoft.AspNetCore.Identity;
using ProductCatalog.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductCatalog.Repository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(int id);
    }

    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(int id);
    }

    public interface IUserRepository
    {
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
        Task<ApplicationUser> GetUserByIdAsync(string id);
        Task<ApplicationUser> GetUserByEmailAsync(string email);
        Task<IdentityResult> AddUserAsync(ApplicationUser user, string password);
        Task<IdentityResult> UpdateUserAsync(ApplicationUser user);
        Task<IdentityResult> DeleteUserAsync(string id);
        Task<IdentityResult> ChangePasswordAsync(string userId, ChangePasswordModel model);
        Task AddToRoleAsync(ApplicationUser user, string role);
        Task RemoveFromRoleAsync(ApplicationUser user, string role);
        Task<IList<string>> GetRolesAsync(ApplicationUser user);

    }

    public interface IRoleRepository
    {
        Task<IEnumerable<ApplicationRole>> GetAllRolesAsync();
        Task<ApplicationRole> GetRoleByIdAsync(string id);
        Task<ApplicationRole> GetRoleByNameAsync(string name);
        Task AddRoleAsync(ApplicationRole role);
        Task UpdateRoleAsync(ApplicationRole role);
        Task DeleteRoleAsync(string id);
    }

    public interface IPaymentRepository
    {
        Task<IEnumerable<Payment>> GetPaymentsByObjectIdAsync(int objectId);
        Task AddPaymentAsync(Payment payment);
        Task UpdatePaymentAsync(Payment payment);
        Task DeletePaymentAsync(int paymentId);
    }

    //interface IRepository<T> : IDisposable
    //    where T : class
    //{
    //    IEnumerable<T> GetItemList(); // получение всех объектов
    //    T GetItem(int id); // получение одного объекта по id
    //    void Create(T item); // создание объекта
    //    void Update(T item); // обновление объекта
    //    void Delete(int id); // удаление объекта по id
    //    void Save();  // сохранение изменений
    //}
}

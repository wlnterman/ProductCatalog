using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using ProductCatalog.Models;

public interface IUserService
{
    Task<IdentityResult> RegisterUserAsync(CreateUserModel model); //RegisterModel model);
    Task<IdentityResult> CreateUserAsync(CreateUserModel model);
    Task<IdentityResult> BlockUserAsync(string userId);
    Task<IdentityResult> UnblockUserAsync(string userId);
    Task<IdentityResult> DeleteUserAsync(string userId);
    Task<IdentityResult> ChangePasswordAsync(string userId, ChangePasswordModel model);
}
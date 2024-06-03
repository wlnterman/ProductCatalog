using System.Threading.Tasks;
using ProductCatalog.Models;
using Microsoft.AspNetCore.Identity;
using System;

public interface IUserService
{
    Task<IdentityResult> RegisterUserAsync(CreateUserModel model); //RegisterModel model);
    Task<IdentityResult> CreateUserAsync(CreateUserModel model);
    Task<IdentityResult> BlockUserAsync(string userId);
    Task<IdentityResult> UnblockUserAsync(string userId);
    Task<IdentityResult> DeleteUserAsync(string userId);
    Task<IdentityResult> ChangePasswordAsync(string userId, ChangePasswordModel model);
}

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IdentityResult> RegisterUserAsync(CreateUserModel model)
    {
        var user = new ApplicationUser { UserName = model.Username, Email = model.Email };
        //return await _userManager.CreateAsync(user, model.Password);
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded && !string.IsNullOrEmpty(model.Role))
        {
            await _userManager.AddToRoleAsync(user, UserRoles.Administrator.ToString());
        }

        return result;
    }

    public async Task<IdentityResult> CreateUserAsync(CreateUserModel model)
    {
        var user = new ApplicationUser { UserName = model.Username, Email = model.Email };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded && !string.IsNullOrEmpty(model.Role))
        {
            await _userManager.AddToRoleAsync(user, model.Role);
        }

        return result;
    }

    public async Task<IdentityResult> BlockUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return IdentityResult.Failed(new IdentityError { Description = $"User with ID {userId} not found." });

        user.LockoutEnd = DateTimeOffset.MaxValue;
        return await _userManager.UpdateAsync(user);
    }

    public async Task<IdentityResult> UnblockUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return IdentityResult.Failed(new IdentityError { Description = $"User with ID {userId} not found." });

        user.LockoutEnd = null;
        return await _userManager.UpdateAsync(user);
    }

    public async Task<IdentityResult> DeleteUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return IdentityResult.Failed(new IdentityError { Description = $"User with ID {userId} not found." });

        return await _userManager.DeleteAsync(user);
    }

    public async Task<IdentityResult> ChangePasswordAsync(string userId, ChangePasswordModel model)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return IdentityResult.Failed(new IdentityError { Description = $"User with ID {userId} not found." });

        return await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
    }
}
using System.Threading.Tasks;
using ProductCatalog.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Collections.Generic;
using ProductCatalog.Repository;

public interface IUserService
{
    //Task<IdentityResult> RegisterUserAsync(UserModelDto model); //RegisterModel model);
    Task<IdentityResult> CreateUserAsync(UserModelDto model);
    Task<IdentityResult> UpdateUserAsync(UserModelDto model);
    Task<IdentityResult> BlockUserAsync(string userId);
    Task<IdentityResult> UnblockUserAsync(string userId);
    Task<IdentityResult> DeleteUserAsync(string userId);
    Task<IdentityResult> ChangePasswordAsync(string userId, ChangePasswordModel model);
    Task<IEnumerable<UserModelDto>> GetAllUsersAsync();
}

public class UserService : IUserService
{

    //private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserRepository _userRepository;
    private readonly IRoleService _roleService;

    public UserService(
        //UserManager<ApplicationUser> userManager,
        IUserRepository userRepository, IRoleService roleService)
    {
        //_userManager = userManager;
        _userRepository = userRepository;
        _roleService = roleService;
    }

    public async Task<IEnumerable<UserModelDto>> GetAllUsersAsync()
    {
        var users = await Task.Run(() => _userRepository.GetAllUsersAsync());//_userManager.Users.ToList());
        var usersDtoList = new List<UserModelDto>();
        foreach (var user in users)
        {
            var roles = await _userRepository.GetRolesAsync(user); //await _userManager.GetRolesAsync(user);
            usersDtoList.Add(new UserModelDto
            {
                ID = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Role = roles.FirstOrDefault()
            });
            }
        return usersDtoList;
        //return await Task.Run(() => _userManager.Users.ToList());
    }

    public async Task<IdentityResult> CreateUserAsync(UserModelDto model)
    {
        var user = new ApplicationUser { UserName = model.Username, Email = model.Email };
        var result = await _userRepository.AddUserAsync(user, model.Password);//await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded && !string.IsNullOrEmpty(model.Role))
        {
            await _userRepository.AddToRoleAsync(user, model.Role); //await _userManager.AddToRoleAsync(user, model.Role);
        }

        return result;
    }

    public async Task<IdentityResult> UpdateUserAsync(UserModelDto model)
    {
        var user = await _userRepository.GetUserByIdAsync(model.ID); //await _userManager.FindByIdAsync(model.ID);
        user.Email = model.Email;
        user.UserName = model.Username;

        var roles = await _userRepository.GetRolesAsync(user);//await _userManager.GetRolesAsync(user);
        var result = await _userRepository.UpdateUserAsync(user); //await _userManager.UpdateAsync(user);

        if (result.Succeeded && !string.IsNullOrEmpty(model.Role))
        {
            if(roles.FirstOrDefault() != null)
            {
                await _userRepository.RemoveFromRoleAsync(user, roles.FirstOrDefault());//await _userManager.RemoveFromRoleAsync(user, roles.FirstOrDefault());
            }

            await _userRepository.AddToRoleAsync(user, model.Role);//await _userManager.AddToRoleAsync(user, model.Role);
        }

        return result;
    }

    public async Task<IdentityResult> BlockUserAsync(string userId)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);//await _userManager.FindByIdAsync(userId);
        if (user == null) return IdentityResult.Failed(new IdentityError { Description = $"User with ID {userId} not found." });

        user.LockoutEnd = DateTimeOffset.MaxValue;
        return await _userRepository.UpdateUserAsync(user); //await _userManager.UpdateAsync(user);
    }

    public async Task<IdentityResult> UnblockUserAsync(string userId)
    {
        var user = await _userRepository.GetUserByIdAsync(userId);//await _userManager.FindByIdAsync(userId);
        if (user == null) return IdentityResult.Failed(new IdentityError { Description = $"User with ID {userId} not found." });

        user.LockoutEnd = null;
        return await _userRepository.UpdateUserAsync(user); //await _userManager.UpdateAsync(user);
    }

    public async Task<IdentityResult> DeleteUserAsync(string userId)
    {
        return await _userRepository.DeleteUserAsync(userId);
        //var user = await _userManager.FindByIdAsync(userId);
        //if (user == null) return IdentityResult.Failed(new IdentityError { Description = $"User with ID {userId} not found." });

        //return await _userManager.DeleteAsync(user);
    }

    public async Task<IdentityResult> ChangePasswordAsync(string userId, ChangePasswordModel model)
    {
        return await _userRepository.ChangePasswordAsync(userId, model);
        //var user = await _userRepository.GetUserByIdAsync(userId); //await _userManager.FindByIdAsync(userId);
        //if (user == null) return IdentityResult.Failed(new IdentityError { Description = $"User with ID {userId} not found." });

        //return await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
    }
}
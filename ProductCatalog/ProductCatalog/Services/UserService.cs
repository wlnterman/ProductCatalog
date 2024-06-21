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
    Task<UserModelDto> GetUserByIdAsync(string userId);
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
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = roles.FirstOrDefault(),
                IsLocked = user.LockoutEnd != null
            }); ;
            }
        return usersDtoList;
        //return await Task.Run(() => _userManager.Users.ToList());
    }

    public async Task<UserModelDto> GetUserByIdAsync(string userId)
    {
        var users = await Task.Run(() => _userRepository.GetAllUsersAsync());//_userManager.Users.ToList());
        var user = users.FirstOrDefault(x => x.Id == userId);

        var roles = await _userRepository.GetRolesAsync(user); //await _userManager.GetRolesAsync(user);
        var userDto = new UserModelDto
        {
            ID = user.Id,
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = roles.FirstOrDefault()
        };
        
        return userDto;
        //return await Task.Run(() => _userManager.Users.ToList());
    }

    public async Task<IdentityResult> CreateUserAsync(UserModelDto model)
    {
        
        var user = new ApplicationUser { UserName = model.Email, Email = model.Email, FirstName = model.FirstName, LastName = model.LastName };
        var result = await _userRepository.AddUserAsync(user, model.Password);//await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded && !string.IsNullOrEmpty(model.Role))
        {
            await _roleService.AssignRoleToUserAsync(user, model.Role);//UserRoles.Administrator);
            //await _userRepository.AddToRoleAsync(user, model.Role); //await _userManager.AddToRoleAsync(user, model.Role);
        }

        return result;
    }

    public async Task<IdentityResult> UpdateUserAsync(UserModelDto model)
    {
        var user = await _userRepository.GetUserByIdAsync(model.ID); //await _userManager.FindByIdAsync(model.ID);
        user.Email = model.Email;
        user.UserName = model.UserName;
        user.FirstName = model.FirstName;
        user.LastName = model.LastName;

        var roles = await _userRepository.GetRolesAsync(user);//await _userManager.GetRolesAsync(user);
        var result = await _userRepository.UpdateUserAsync(user); //await _userManager.UpdateAsync(user);


        //перенести эту херню в рол сервис!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
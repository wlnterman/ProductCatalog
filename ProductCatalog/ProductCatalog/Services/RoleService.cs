using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using ProductCatalog.Models;

public interface IRoleService
{
    //Task EnsureRolesExist();
    Task AssignRoleToUserAsync(ApplicationUser user, UserRoles roleName);
}


public enum UserRoles
{
    Administrator,
    AdvancedUser,
    SimpleUser
}


public class RoleService : IRoleService
{
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly UserManager<ApplicationUser> _userManager;

    public RoleService(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    //// Получение всех ролей
    //public async Task GetRoles()
    //{
    //    var roles = await _roleManager.Roles.Select(x => x.Id).ToList();
    //    return Ok(roles);
    //}
    //public async Task<ApplicationRole> GetRoleId(ApplicationUser user, UserRoles role)
    //{
    //    var roleName = role.ToString();
    //    return await _roleManager.FindByNameAsync(roleName);
    //}

        public async Task AssignRoleToUserAsync(ApplicationUser user, UserRoles role)
    {
        var roleName = role.ToString();

        if (!await _roleManager.RoleExistsAsync(roleName))
        {
            throw new Exception($"Role {roleName} does not exist.");
        }

        //var user2 = await _userManager.FindByNameAsync(user.UserName);
        //if (user2 == null)
        //{
        //    throw new Exception($"Role {roleName} does not exist."); //return NotFound("User not found");
        //}

        var currentRoles = await _userManager.GetRolesAsync(user);
        if (currentRoles.Count > 0)
        {
            await _userManager.RemoveFromRolesAsync(user, currentRoles);
        }

        await _userManager.AddToRoleAsync(user, roleName);
    }

    //public async Task EnsureRolesExist()
    //{
    //    string[] roleNames = { UserRoles.Administrator, UserRoles.AdvancedUser, UserRoles.SimpleUser };

    //    foreach (var roleName in roleNames)
    //    {
    //        if (!await _roleManager.RoleExistsAsync(roleName))
    //        {
    //            await _roleManager.CreateAsync(new ApplicationRole { Name = roleName });
    //        }
    //    }
    //}
}

public class DataSeeder
{
    public static async Task SeedRolesAsync(RoleManager<ApplicationRole> roleManager)
    {
        string[] roleNames = { "Administrator", "AdvancedUser", "SimpleUser" };

        foreach (var roleName in roleNames)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new ApplicationRole { Name = roleName });
            }
        }
    }
}

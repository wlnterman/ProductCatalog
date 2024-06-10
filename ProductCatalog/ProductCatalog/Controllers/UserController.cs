using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ProductCatalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly IRoleService _roleService;

        public UserController(UserManager<ApplicationUser> userManager,  IUserService userService, IAuthService authService, IRoleService roleService)
        {
            _userManager = userManager;
            _userService = userService;
            _authService = authService;
            _roleService = roleService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserModelDto model)// RegisterModel model)
        {

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
            };

            //var result = await _userService.RegisterUserAsync(user, model.Password);
            var result = await _userManager.CreateAsync(user, model.Password);
            //var result = await _userService.RegisterUserAsync(model);



            //var user2 = await _userManager.FindByNameAsync(model.Username);
            await _roleService.AssignRoleToUserAsync(user, UserRoles.Administrator);
            //await _userManager.AddToRoleAsync(user, model.Role);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var result = await _authService.LoginUserAsync(model);

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            return Ok(new { Token = result.Token });
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult<IEnumerable<UserModelDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(UserModelDto model)
        {
            var result = await _userService.CreateUserAsync(model);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, UserModelDto model)
        {
            var result = await _userService.UpdateUserAsync(model);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("block/{id}")]
        public async Task<IActionResult> BlockUser(string id)
        {
            var result = await _userService.BlockUserAsync(id);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("unblock/{id}")]
        public async Task<IActionResult> UnblockUser(string id)
        {
            var result = await _userService.UnblockUserAsync(id);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await _userService.DeleteUserAsync(id);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(string id, ChangePasswordModel model)
        {
            var result = await _userService.ChangePasswordAsync(id, model);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }
    }
}
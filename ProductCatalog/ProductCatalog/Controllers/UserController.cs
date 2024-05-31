using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Models;
using System.Threading.Tasks;


namespace ProductCatalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public UserController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(CreateUserModel model)// RegisterModel model)
        {
            var result = await _userService.RegisterUserAsync(model);

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

        [Authorize(Roles = "Administrator")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(CreateUserModel model)
        {
            var result = await _userService.CreateUserAsync(model);

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
        [HttpPut("password/{id}")]
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
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

        public UserController(UserManager<ApplicationUser> userManager,  IUserService userService)
        {
            _userManager = userManager;
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult<IEnumerable<UserModelDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<UserModelDto>>> GetLoggedInUser(string id)
        {
            //var users = await _userService.GetAllUsersAsync();
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user);
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


        //[HttpPost("{id}/toggleLock")]
        //public async Task<IActionResult> ToggleUserLock(string id, [FromBody] ToggleLockDto toggleLockDto)
        //{
        //    var result = await _userService.ToggleUserLockAsync(id, toggleLockDto.IsLocked);
        //    if (result.Succeeded)
        //    {
        //        return NoContent();
        //    }

        //    return BadRequest(result.Errors);
        //}

        [Authorize(Roles = "Administrator")]
        [HttpPost("block/{id}")]
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
        [HttpPost("unblock/{id}")]
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
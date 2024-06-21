using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Models;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserService _userService;

    public AuthController(IAuthService authService, IUserService userService)
    {
        _authService = authService;
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserModelDto model)// RegisterModel model)
    {
        var result = await _userService.CreateUserAsync(model);//_authService.RegisterUserAsync(model);

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

        return Ok(new { Token = result.Token, RefreshToken = result.RefreshToken });
    }


    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenModel model)
    {
        var newToken = await _authService.RefreshToken(model.RefreshToken);
        if (newToken == null)
            return Unauthorized();

        return Ok(new { Token = newToken });
    }


}
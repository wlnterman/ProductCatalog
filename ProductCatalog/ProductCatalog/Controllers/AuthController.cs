using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ProductCatalog.Models;


[Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] ProductCatalog.Models.UserModelDto model)
        //{
        //    var user = new ApplicationUser { UserName = model.Email, Email = model.Email };//, Role = UserRoles.Administrator };
        //    var result = await _userManager.CreateAsync(user, model.Password);
        ////var result = await _userService.RegisterUserAsync(model);
        ////await _roleService.AssignRoleToUserAsync(user, UserRoles.Administrator);

        //if (result.Succeeded)
        //    {
        //        return Ok();
        //    }

        //    return BadRequest(result.Errors);
        //}

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] ProductCatalog.Models.LoginModel model)
        //{
        //    var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

        //    if (result.Succeeded)
        //    {
        //        var user = await _userManager.FindByEmailAsync(model.Email);
        //        var tokenString = GenerateJwtToken(user);
        //        return Ok(new { token = tokenString });
        //    }

        //    return Unauthorized();
        //}

    //private string GenerateJwtToken(ApplicationUser user)
    //{
    //    var claims = new[]
    //        {
    //            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
    //            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    //        };


    //    var jwtSettings = _configuration.GetSection("JwtSettings");

    //    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetValue<string>("SecretKey")));
    //    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

    //    var tokenOptions = new JwtSecurityToken(
    //        issuer: jwtSettings.GetValue<string>("Issuer"),
    //        audience: jwtSettings.GetValue<string>("Audience"),
    //        //claims: new List<Claim>(),
    //        claims,
    //        expires: DateTime.Now.AddMinutes(jwtSettings.GetValue<double>("TokenLifetimeMinutes")),
    //        signingCredentials: signinCredentials
    //    );

    //    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

    //    return tokenString;
    //}

    //private string GenerateJwtToken2(ApplicationUser user)
    //    {
    //        var claims = new[]
    //        {
    //            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
    //            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    //        };

    //        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
    //        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    //        var token = new JwtSecurityToken(
    //            _configuration["JwtIssuer"],
    //            _configuration["JwtIssuer"],
    //            claims,
    //            expires: DateTime.Now.AddDays(7),
    //            signingCredentials: creds
    //        );

    //        return new JwtSecurityTokenHandler().WriteToken(token);
    //    }
    //}
}
using System.Threading.Tasks;
using ProductCatalog.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Collections.Generic;
using ProductCatalog.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Linq;

public interface IAuthService
{
    Task<LoginResult> LoginUserAsync(LoginModel model);
    Task<string> RefreshToken(string token);
}

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ApplicationDbContext context, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginResult> LoginUserAsync(LoginModel model)
    {
        var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: false, lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            return new LoginResult { Succeeded = false };
        }

        var token = await GenerateJwtToken(model.Email);
        var refreshToken = await GenerateRefreshToken(model.Email);
        return new LoginResult { Succeeded = true, Token = token, RefreshToken = refreshToken };
    }

    private async Task<string> GenerateJwtToken(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        var userRoles = await _userManager.GetRolesAsync(user);
        var userRole = userRoles[0];
        var jwtSettings = _configuration.GetSection("JwtSettings");
        
        //var claims = new[]
        var authClaims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Role, userRole),
            new Claim("FirstName", user.FirstName),
            new Claim("LastName", user.LastName),
            new Claim("UserId", user.Id)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: authClaims,//   claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["TokenLifetimeMinutes"])),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<RefreshToken> GenerateRefreshToken(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        // Удаление старых токенов
        var oldTokens = _context.RefreshTokens.Where(rt => rt.UserId == user.Id);
        _context.RefreshTokens.RemoveRange(oldTokens);


        
        var randomNumber = new byte[64];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
        }
        var refreshToken = new RefreshToken
        {
            Token = Convert.ToBase64String(randomNumber),
            UserId = user.Id,
            Expires = DateTime.UtcNow.AddDays(7),
            Created = DateTime.UtcNow
        };
        await _context.RefreshTokens.AddAsync(refreshToken);
        await _context.SaveChangesAsync();
        return refreshToken;
    }

    public async Task<string> RefreshToken(string token)
    {
        var refreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(rt => rt.Token == token);
        if (refreshToken == null || refreshToken.IsExpired)
        {
            return null;
        }

        //var user = await _userManager.FindByIdAsync(refreshToken.UserId);
        var newJwtToken = await GenerateJwtToken(refreshToken.User.Email);
        return newJwtToken;
    }
}

public class LoginResult
{
    public bool Succeeded { get; set; }
    public string Token { get; set; }
    public RefreshToken RefreshToken { get; set; }
}
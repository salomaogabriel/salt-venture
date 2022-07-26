using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SaltVenture.API.Models;

namespace SaltVenture.API.Services;

public class JwtAuthenticationService : IJwtAuthenticationService
{
    private readonly string _tokenKey;
    private readonly IUsersRepository _usersRepository;
    public JwtAuthenticationService(string tokenKey, IUsersRepository usersRepository)
    {
        _tokenKey = tokenKey;
        _usersRepository = usersRepository;
    }

    public string Authenticate(User user)
    {

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_tokenKey);
        var role = user.Username == "admin" ? "admin" : "user";
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Email, user.Email!),
                    new Claim(ClaimTypes.Role, role),
                    new Claim(ClaimTypes.UserData, user.Id.ToString()),
            }),
            Expires = DateTime.UtcNow.AddHours(48),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

}
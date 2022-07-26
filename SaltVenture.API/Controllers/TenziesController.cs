using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using SaltVenture.API.Models;
using SaltVenture.API.Services;

namespace SaltVenture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TenziesController : ControllerBase
{
    private readonly IUsersRepository _usersRepository;
   
    

    public TenziesController(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }
    
    [HttpPost("getreward")]
    public async Task<IActionResult> getReward()
    {
        // SAMe as all the others
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        // Gets list of claims.
        IEnumerable<Claim> claim = identity!.Claims;

        // Gets name from claims. Generally it's an email address.
        var idClaim = claim
            .Where(x => x.Type == ClaimTypes.UserData)
            .FirstOrDefault()!.Value;

        if (!int.TryParse(idClaim, out var claimedId)) return Unauthorized();

        var user = await _usersRepository.GetUserWithId(claimedId);
        if (user == null) return NotFound();
       
        var newBalance = user.Balance + 10;
        System.Console.WriteLine(newBalance);
        
        user = await _usersRepository.UpdateBalance(newBalance, user);
        var response = new User(){
            Id = user.Id,
            Balance = user.Balance
        };
        return Ok(response);
    }

}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaltVenture.API.Services;

namespace SaltVenture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles ="admin")]
public class AdminController : ControllerBase
{

 private readonly IAdminRepository _adminRepository;
 private readonly IUsersRepository _usersRepository;
    public AdminController(IAdminRepository adminRepository, IUsersRepository usersRepository)
    {
        _adminRepository = adminRepository;
        _usersRepository = usersRepository;
    }
    [HttpGet]
    public async Task<IActionResult> GetStats()
    {
        var response = await _adminRepository.CalculateMoneyMadeByHouse();
        return Ok(response);
    }
     [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        await _usersRepository.DeactiveUser(id);
        return Ok();
    }
}

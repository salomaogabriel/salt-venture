using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaltVenture.API.Models.Request;
using SaltVenture.API.Services;
using SaltVenture.API.Models.Errors;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Responses;

namespace SaltVenture.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{

    private readonly IJwtAuthenticationService _authService;
    private readonly IUsersRepository _usersRepository;
    public UsersController(IJwtAuthenticationService authService, IUsersRepository usersRepository)
    {
        _authService = authService;
        _usersRepository = usersRepository;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(UserLoginRequest request)
    {
        var user = (await _usersRepository.GetUsersWithEmail(request.Email!)).FirstOrDefault(
                      u => UsersRepository.VerifyPassword(u.Password!, request.Password!));
        if (user == null) return NotFound("Email or password was wrong!");

        var token = _authService.Authenticate(user);
        if (token == null) return NotFound();
        var response = new UserAuthResponse()
        {
            Username = user.Username,
            Email = user.Email,
            Balance = user.Balance,
            Token = token,
            Id = user.Id


        };
        return Ok(response);
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> CreateUser(UserSignUpRequest request)
    {
        var errors = new SignUpError();

        if (_usersRepository.EmailExists(request.Email))
        {
            errors.AddEmailExistsError(request.Email);
        }
        if (_usersRepository.UsernameExists(request.Username))
        {
            errors.AddUsernameExistsError(request.Username);
        }
        if (errors.Errors.Any()) return BadRequest(errors.Errors);

        // Add user to db
        var user = await _usersRepository.AddToDb(request.Email, request.Username, request.Password);
        var token = _authService.Authenticate(user);
        if (token == null) return NotFound();
        var response = new UserAuthResponse()
        {
            Username = user.Username,
            Email = user.Email,
            Balance = user.Balance,
            Token = token,
            Id = user.Id

        };
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] string? username = "")
    {
        var users = await _usersRepository.GetAllWithUsername(username);
        // TODO: Users Response Model.
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _usersRepository.GetUserWithId(id);
        if(user == null) return NotFound();

        var response = new UserProfileResponse()
        {
            Id = user.Id,
            Email = user.Email,
            Username = user.Username,
            Balance = user.Balance,
            Bets = user.Bets,

        };

        return Ok(response);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(UserUpdateRequest request)
    {
        //TODO add update model
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUser()
    {
        return NoContent();
    }


}

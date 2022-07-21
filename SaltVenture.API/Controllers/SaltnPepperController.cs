using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;
using SaltVenture.API.Models.Request;
using SaltVenture.API.Services;

namespace SaltVenture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SaltnPepperController : ControllerBase
{

    private readonly ISaltnPepperRepository _saltnPepperRepository;
    private readonly IUsersRepository _usersRepository;

    public SaltnPepperController(ISaltnPepperRepository saltnPepperRepository, IUsersRepository usersRepository)
    {
        _saltnPepperRepository = saltnPepperRepository;
        _usersRepository = usersRepository;
    }
    [HttpGet]
    public async Task<IActionResult> GetCurrentGame()
    {
        // get user
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        // Gets list of claims.
        IEnumerable<Claim> claim = identity!.Claims;

        // Gets name from claims. Generally it's an email address.
        var idClaim = claim
            .Where(x => x.Type == ClaimTypes.UserData)
            .FirstOrDefault()!.Value;

        if (!int.TryParse(idClaim, out var claimedId)) return Unauthorized();

        var game = await _saltnPepperRepository.GetActiveGame(claimedId);
        if (game == null) return NotFound();
        // Cheeck if a game exists, return null if it doesn't
        // return Ok(await saltnPepperRepository.GetAllGames());
        var response = new SaltnPepperResponse(game);
        return Ok(response);

    }
    [HttpPost]
    public async Task<IActionResult> CreateGame(SaltnPepperNewGameRequest request)
    {
        // get user
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        // Gets list of claims.
        IEnumerable<Claim> claim = identity!.Claims;

        // Gets name from claims. Generally it's an email address.
        var idClaim = claim
            .Where(x => x.Type == ClaimTypes.UserData)
            .FirstOrDefault()!.Value;

        if (!int.TryParse(idClaim, out var claimedId)) return Unauthorized();
        var user = await _usersRepository.GetUserWithId(claimedId);

        if (user == null) return Unauthorized();

        // Change Balance
        user = await _usersRepository.UpdateBalance(user.Balance - request.BetAmount, user);

        var bet = new Bet()
        {
            Game = 0,
            Status = BetStatus.NotFinished,
            Amount = request.BetAmount,
            Multiplier = 0,
            Balance = user.Balance - request.BetAmount,
            Date = new DateTime(),
            User = user
        };
        var game = new SaltnPepper()
        {
            User = user,
            IsCompleted = false,
            Grid = SaltnPepperLogic.GridGenerator(request.PepperAmount),
            PepperNumbers = request.PepperAmount,
            NumberOfPicks = 0
        };
        game = await _saltnPepperRepository.CreateGame(game);
        var response = new SaltnPepperResponse(game);
        return Ok(response);

    }
    [HttpPost("pick")]
    public async Task<IActionResult> PickPosition()
    {
        // Picks a mine for the given name
        // return Ok(await saltnPepperRepository.GetAllGames());
        return Ok();

    }
    [HttpPost("cashout")]
    public async Task<IActionResult> CashOut()
    {
        // End Game
        return Ok();
        // return Ok(await saltnPepperRepository.GetAllGames());
    }

}

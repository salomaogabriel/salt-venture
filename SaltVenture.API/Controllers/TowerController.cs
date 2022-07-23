using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;
using SaltVenture.API.Models.Request;
using SaltVenture.API.Services;

namespace SaltVenture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TowerController : ControllerBase
{

    private readonly IUsersRepository _usersRepository;
    private readonly ITowerRepository _towersRepository;
    private readonly IBetsRepository _betsRepository;

    public TowerController(IUsersRepository usersRepository,
                           ITowerRepository towerRepository,
                           IBetsRepository betsRepository)
    {
        _usersRepository = usersRepository;
        _towersRepository = towerRepository;
        _betsRepository = betsRepository;
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

        var game = await _towersRepository.GetActiveGame(claimedId);
        if (game == null) return NotFound();
        var response = new TowerResponse(game);
        return Ok(response);

    }
    [HttpPost]
    public async Task<IActionResult> CreateGame(TowersNewGameRequest request)
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

        if (user.Balance - request.BetAmount < 0) return BadRequest("You Don't Have Enough Points!");
         var activeGame = await _towersRepository.GetActiveGame(claimedId);
        if (activeGame != null) {
            var responseActive = new TowerResponse(activeGame);
            return Ok(responseActive);

        }
        // Change Balance
        var oldBalance = user.Balance;
        user = await _usersRepository.UpdateBalance(user.Balance - request.BetAmount, user);

        var bet = new Bet()
        {
            Game = (int)GameList.Towers,
            Status = BetStatus.NotFinished,
            Amount = request.BetAmount,
            Multiplier = 1,
            Balance = oldBalance,
            Date = new DateTime(),
            User = user
        };
        bet = await _betsRepository.CreateBet(bet);

        var game = new Tower()
        {
            User = user,
            IsCompleted = false,
            Grid = TowerLogic.GridGenerator(request.Level, 9),
            Bet = bet,
            Floor = 0

        };
        game = await _towersRepository.CreateGame(game);
        var response = new TowerResponse(game);
        return Ok(response);

    }
    [HttpPost("pick/{position}")]
    public async Task<IActionResult> PickPosition(int position)
    {
        if (position < 0 || position > 24) return BadRequest("How did you get to here?");
        // get user
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        // Gets list of claims.
        IEnumerable<Claim> claim = identity!.Claims;

        // Gets name from claims. Generally it's an email address.
        var idClaim = claim
            .Where(x => x.Type == ClaimTypes.UserData)
            .FirstOrDefault()!.Value;

        if (!int.TryParse(idClaim, out var claimedId)) return Unauthorized();

        var game = await _towersRepository.GetActiveGame(claimedId);
        if (game == null) return NotFound();
        if(TowerLogic.IsGameOver(game.Grid!,position,game.Floor,TowerLogic.GetFloorSize(game.Level)))
        {
            game.IsCompleted = true;
            var bet = game.Bet;
            bet!.Status = BetStatus.Finished;
            bet.Multiplier = 0;
            game = await _towersRepository.UpdateGame(game);
            bet = await _betsRepository.UpdateBet(bet);

            var response = new TowerResponse(game);
            return Ok(response);

        }
        else
        {
            game.Grid = TowerLogic.PickPosition(game.Grid,position,game.Floor,TowerLogic.GetFloorSize(game.Level));
            game.Floor++;
            game = await _towersRepository.UpdateGame(game);
            var bet = game.Bet;
            bet!.Multiplier = TowerLogic.CalculateMultiplier(game);
            var response = new TowerResponse(game);
            return Ok(response);
        }

    }
    [HttpPost("cashout")]
    public async Task<IActionResult> CashOut()
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
        var game = await _towersRepository.GetActiveGame(claimedId);
        if (game == null) return NotFound();
        game.IsCompleted = true;
        var newBalance = user.Balance + (int)(game.Bet!.Amount * TowerLogic.CalculateMultiplier(game));
        game.Bet.Balance = newBalance;
        await _usersRepository.UpdateBalance(newBalance, user);
        await _towersRepository.UpdateGame(game);
        await _betsRepository.UpdateBet(game.Bet);
        
        var response = new TowerResponse(game);
        return Ok(response);
    }

}

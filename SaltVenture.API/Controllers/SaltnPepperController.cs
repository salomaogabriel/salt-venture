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
    private readonly IBetsRepository _betsRepository;
    

    public SaltnPepperController(ISaltnPepperRepository saltnPepperRepository, IUsersRepository usersRepository,
     IBetsRepository betsRepository)
    {
        _saltnPepperRepository = saltnPepperRepository;
        _usersRepository = usersRepository;
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

        if (user.Balance - request.BetAmount < 0) return BadRequest("You Don't Have Enough Points!");
         var activeGame = await _saltnPepperRepository.GetActiveGame(claimedId);
        if (activeGame != null) {
            var responseActive = new SaltnPepperResponse(activeGame);
            return Ok(responseActive);

        }
        // Change Balance
        var oldBalance = user.Balance;
        user = await _usersRepository.UpdateBalance(user.Balance - request.BetAmount, user);

        var bet = new Bet()
        {
            Game = 0,
            Status = BetStatus.NotFinished,
            Amount = request.BetAmount,
            Multiplier = 1,
            Balance = oldBalance,
            Date = new DateTime(),
            User = user
        };
        bet = await _betsRepository.CreateBet(bet);

        var game = new SaltnPepper()
        {
            User = user,
            IsCompleted = false,
            Grid = SaltnPepperLogic.GridGenerator(request.PepperAmount),
            PepperNumbers = request.PepperAmount,
            NumberOfPicks = 0,
            Bet = bet
        };
        game = await _saltnPepperRepository.CreateGame(game);
        var response = new SaltnPepperResponse(game);
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

        var game = await _saltnPepperRepository.GetActiveGame(claimedId);
        if (game == null) return NotFound();

        if (game.Grid[position] == 'x') return BadRequest("Stop Cheating! :)");
        if (SaltnPepperLogic.IsGameOver(game.Grid!, position))
        {
            //TODO: end game
            game.IsCompleted = true;
            var bet = game.Bet;
            bet!.Status = BetStatus.Finished;
            bet.Multiplier = 0;
            await _betsRepository.UpdateBet(bet);
            game = await _saltnPepperRepository.UpdateGame(game);
            var response = new SaltnPepperResponse(game);
            return Ok(response);
        }
        else
        {
            game.Grid = SaltnPepperLogic.PickPosition(game.Grid!, position);
            game.NumberOfPicks++;
            game = await _saltnPepperRepository.UpdateGame(game);
            var bet = game.Bet;
            bet!.Multiplier = SaltnPepperLogic.CalculateMultiplier(game);
            bet!.Status = BetStatus.Finished;

            await _betsRepository.UpdateBet(bet);

            var response = new SaltnPepperResponse(game);
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
        var game = await _saltnPepperRepository.GetActiveGame(claimedId);
        if (game == null) return NotFound();
        game.IsCompleted = true;
        var newBalance = user.Balance + (int)(game.Bet!.Amount * SaltnPepperLogic.CalculateMultiplier(game));
        System.Console.WriteLine(newBalance);
        game.Bet.Balance = newBalance;
        await _usersRepository.UpdateBalance(newBalance, user);
        await _saltnPepperRepository.UpdateGame(game);
        await _betsRepository.UpdateBet(game.Bet);
        
        var response = new SaltnPepperResponse(game);
        return Ok(response);
    }

}

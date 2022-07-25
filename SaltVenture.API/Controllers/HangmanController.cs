using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;
using SaltVenture.API.Models.Request;
using SaltVenture.API.Services;

namespace SaltVenture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HangmanController : ControllerBase
{

    private readonly IHangmanRepository _hangmanRepository;
    private readonly IUsersRepository _usersRepository;
    private readonly IBetsRepository _betsRepository;


    public HangmanController(IHangmanRepository hangmanRepository, IUsersRepository usersRepository,
     IBetsRepository betsRepository)
    {
        _hangmanRepository = hangmanRepository;
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

        var game = await _hangmanRepository.GetActiveGame(claimedId);
        if (game == null) return NotFound();
        // Cheeck if a game exists, return null if it doesn't
        // return Ok(await hangmanRepository.GetAllGames());
        var response = new HangmanResponse(game);
        return Ok(response);

    }

    [HttpGet("word")]
    public async Task<HangmanWordRequest> GetWord()
    {
        //Define your baseUrl
        string baseUrl = "https://random-words-api.vercel.app/word";
        //Have your using statements within a try/catch block
        try
        {
            //We will now define your HttpClient with your first using statement which will use a IDisposable.
            using (HttpClient client = new HttpClient())
            {
                //In the next using statement you will initiate the Get Request, use the await keyword so it will execute the using statement in order.
                //The HttpResponseMessage which contains status code, and data from response.
                using (var res = await client.GetAsync(baseUrl))
                {
                    Console.WriteLine(res);
                    return JsonConvert.DeserializeObject<HangmanWordRequest>(res.Content.ToString()!);
                    //Then get the data or content from the response in the next using statement, then within it you will get the data, and convert it to a c# object.
                }
            }
        }
        catch (Exception exception)
        {
            Console.WriteLine("Exception Hit------------");
            Console.WriteLine(exception);
            throw new ArgumentException("Failed to fetch");

        }
        throw new ArgumentException("Failed to fetch");
    }

    // [HttpPost]
    // public async Task<IActionResult> CreateGame(HangmanNewGameRequest request)
    // {
    //     // get user
    //     var identity = HttpContext.User.Identity as ClaimsIdentity;
    //     // Gets list of claims.
    //     IEnumerable<Claim> claim = identity!.Claims;

    //     // Gets name from claims. Generally it's an email address.
    //     var idClaim = claim
    //         .Where(x => x.Type == ClaimTypes.UserData)
    //         .FirstOrDefault()!.Value;

    //     if (!int.TryParse(idClaim, out var claimedId)) return Unauthorized();
    //     var user = await _usersRepository.GetUserWithId(claimedId);

    //     if (user == null) return Unauthorized();

    //     if (user.Balance - request.BetAmount < 0) return BadRequest("You Don't Have Enough Points!");
    //     var activeGame = await _hangmanRepository.GetActiveGame(claimedId);
    //     if (activeGame != null)
    //     {
    //         var responseActive = new HangmanResponse(activeGame);
    //         return Ok(responseActive);

    //     }
    //     // Change Balance
    //     var oldBalance = user.Balance;
    //     user = await _usersRepository.UpdateBalance(user.Balance - request.BetAmount, user);

    //     var bet = new Bet()
    //     {
    //         Game = 0,
    //         Status = BetStatus.NotFinished,
    //         Amount = request.BetAmount,
    //         Multiplier = 1,
    //         Balance = oldBalance,
    //         Date = new DateTime(),
    //         User = user
    //     };
    //     bet = await _betsRepository.CreateBet(bet);

    //     var game = new Hangman()
    //     {
    //         User = user,
    //         IsCompleted = false,
    //         WordLength = request.WordLength,
    //         WordPickAmount = 0,
    //         Bet = bet,
    //         Word =
    //     };
    //     game = await _hangmanRepository.CreateGame(game);
    //     var response = new HangmanResponse(game);
    //     return Ok(response);

    // }
    // [HttpPost("pick/{letter}")]
    // public async Task<IActionResult> PickLetter(string letter)
    // {
    //     if (letter == null || letter == "") return BadRequest("Empty Input! Try Again");
    //     // get user
    //     var identity = HttpContext.User.Identity as ClaimsIdentity;
    //     // Gets list of claims.
    //     IEnumerable<Claim> claim = identity!.Claims;

    //     // Gets name from claims. Generally it's an email address.
    //     var idClaim = claim
    //         .Where(x => x.Type == ClaimTypes.UserData)
    //         .FirstOrDefault()!.Value;

    //     if (!int.TryParse(idClaim, out var claimedId)) return Unauthorized();

    //     var game = await _hangmanRepository.GetActiveGame(claimedId);
    //     if (game == null) return NotFound();

    //     if (game.LetterPicks!.Contains(letter)) return BadRequest("You've already tried that letter!");
    //     if (HangmanLogic.IsGameOver(game.Grid!, position))
    //     {
    //         //TODO: end game
    //         game.IsCompleted = true;
    //         var bet = game.Bet;
    //         bet!.Status = BetStatus.Finished;
    //         bet.Multiplier = 0;
    //         await _betsRepository.UpdateBet(bet);
    //         game = await _hangmanRepository.UpdateGame(game);
    //         var response = new SaltnPepperResponse(game);
    //         return Ok(response);
    //     }
    //     else
    //     {
    //         game.Grid = SaltnPepperLogic.PickPosition(game.Grid!, position);
    //         game.NumberOfPicks++;
    //         game = await _hangmanRepository.UpdateGame(game);
    //         var bet = game.Bet;
    //         bet!.Multiplier = SaltnPepperLogic.CalculateMultiplier(game);
    //         await _betsRepository.UpdateBet(bet);

    //         var response = new SaltnPepperResponse(game);
    //         return Ok(response);
    //     }

    // }

}

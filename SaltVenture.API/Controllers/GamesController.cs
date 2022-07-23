using Microsoft.AspNetCore.Mvc;
using SaltVenture.API.Services;

namespace SaltVenture.API.Controllers;

public enum GameList {SaltnPepper, Towers, Tenzies}
[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{

 private readonly IGamesRepository _gamesRepository;
    public GamesController(IGamesRepository gamesRepository)
    {
        _gamesRepository = gamesRepository;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _gamesRepository.GetAllGames());
    }
}

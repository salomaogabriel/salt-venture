using SaltVenture.API.Models;

namespace SaltVenture.API.Services;

public interface IGamesRepository 
{
    Task<List<Game>> GetAllGames();
    Task<Game> GetSingleGame(int id);
}
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public interface ITowerRepository
{
    Task<Tower> GetActiveGame(int claimedId);
    Task<Tower> GetGame(int gameId);
    Task<Tower> CreateGame(Tower game);
    Task<Tower> UpdateGame(Tower game);

}
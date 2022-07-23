using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public interface ISaltnPepperRepository
{
    Task<SaltnPepper> GetActiveGame(int claimedId);
    Task<SaltnPepper> GetGame(int gameId);
    Task<SaltnPepper> CreateGame(SaltnPepper game);
    Task<SaltnPepper> UpdateGame(SaltnPepper game);

}
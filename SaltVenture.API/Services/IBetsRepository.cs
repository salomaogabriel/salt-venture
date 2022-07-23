using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public interface IBetsRepository
{
    Task<Bet> UpdateBet(Bet bet);
    Task<Bet> CreateBet(Bet bet);
}
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;
using SaltVenture.API.Models.Request;

namespace SaltVenture.API.Services;

public interface IHangmanRepository
{
    Task<Hangman> GetActiveGame(int claimedId);
    Task<Hangman> GetGame(int gameId);
    Task<Hangman> CreateGame(Hangman game);
    Task<Hangman> UpdateGame(Hangman game);

}
using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public class TowersRepository : ITowerRepository
{
    private readonly SaltVentureDbContext _context;

    public TowersRepository(SaltVentureDbContext context)
    {
        _context = context;
    }

    public async Task<Tower> CreateGame(Tower game)
    {
         _context.TowersGames!.Add(game);
        await _context.SaveChangesAsync();
        return game;
    }

    public async Task<Tower> GetActiveGame(int claimedId)
    {
          return await _context.TowersGames
            .Include(c => c.Bet.User)
            .OrderBy(c => c.Id).LastOrDefaultAsync(g => g.User.Id == claimedId && !g.IsCompleted);
    }

    public async Task<Tower> GetGame(int gameId)
    {
        return await _context.TowersGames.FirstOrDefaultAsync(g => g.Id == gameId);

    }

    public async Task<Tower> UpdateGame(Tower game)
    {
        var updateGame = _context.TowersGames?.Update(game);
        await _context.SaveChangesAsync();
        return updateGame!.Entity;
    }
}
using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public class SaltnPepperRepository : ISaltnPepperRepository
{
    private readonly SaltVentureDbContext _context;

    public SaltnPepperRepository(SaltVentureDbContext context)
    {
        _context = context;
    }

    public async Task<Bet> CreateBet(Bet bet)
    {
        _context.Bets!.Add(bet);
        await _context.SaveChangesAsync();
        return bet;
    }

    public async Task<SaltnPepper> CreateGame(SaltnPepper game)
    {
         _context.SaltnPeppersGames!.Add(game);
        await _context.SaveChangesAsync();
        return game;
    }

    public async Task<SaltnPepper> GetActiveGame(int claimedId)
    {
        return await _context.SaltnPeppersGames
            .Include(c => c.Bet)
            .OrderBy(c => c.Id).LastOrDefaultAsync(g => g.User.Id == claimedId && !g.IsCompleted);
    }

    public async Task<SaltnPepper> GetGame(int gameId)
    {
        return await _context.SaltnPeppersGames.FirstOrDefaultAsync(g => g.Id == gameId);
    }

    public async Task<Bet> LostBet(Bet bet)
    {   
       var updateBet = _context.Bets?.Update(bet);
        await _context.SaveChangesAsync();
        return updateBet!.Entity;
    }

    public async Task<SaltnPepper> UpdateGame(SaltnPepper game)
    {
           var updateGame = _context.SaltnPeppersGames?.Update(game);
        await _context.SaveChangesAsync();
        return updateGame!.Entity;
    }
}
using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public class BetsRepository : IBetsRepository
{
    private readonly SaltVentureDbContext _context;

    public BetsRepository(SaltVentureDbContext context)
    {
        _context = context;
    }

    public async Task<Bet> CreateBet(Bet bet)
    {
        _context.Bets!.Add(bet);
        await _context.SaveChangesAsync();
        return bet;
    }
    public async Task<Bet> UpdateBet(Bet bet)
    {   
       var updateBet = _context.Bets?.Update(bet);
        await _context.SaveChangesAsync();
        return updateBet!.Entity;
    }
}
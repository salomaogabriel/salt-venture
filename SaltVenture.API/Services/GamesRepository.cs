using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;

namespace SaltVenture.API.Services;

public class GamesRepository : IGamesRepository 
{
    private readonly SaltVentureDbContext _context;

    public GamesRepository(SaltVentureDbContext context)
    {
        _context = context;
    }
    public async Task<List<Game>> GetAllGames()
    {
        return await _context.Games!.ToListAsync();
    }

    public async Task<Game> GetSingleGame(int Id) => await _context.Games!.FirstOrDefaultAsync(g => g.Id == Id);
}
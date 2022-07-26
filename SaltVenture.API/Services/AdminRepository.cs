using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Responses;

namespace SaltVenture.API.Services;

public class AdminRepository : IAdminRepository
{
    private readonly SaltVentureDbContext _context;



    public AdminRepository(SaltVentureDbContext context)
    {
        _context = context;
    }

    public async Task<AdminStatsResponse> CalculateMoneyMadeByHouse()
    {
        var response = new AdminStatsResponse();
        var moneyMade = 0;
        // range, count
        var usersRange = new Dictionary<int, int>();
        var users = _context.Users!.ToList();

        foreach (var user in users)
        {
            moneyMade += (1000 - user.Balance);
        }
        foreach (var item in users.Where(u => u.IsActive).OrderBy(u => u.Balance).GroupBy(u => (int)Math.Ceiling((double)u.Balance / 100) * 100))
        {
            usersRange.Add(item.Key, item.Count());
        }
        // Should be doing for each game but meh
        var average = _context.Bets!.OrderBy(b => b.Multiplier)
            .Skip(1)
    .Take(_context.Bets!.Count() - 2).
        Average(b => b.Multiplier);
        var standardDeviation = _context.Bets!.OrderBy(b => b.Multiplier).Skip(1)
     .Take(_context.Bets!.Count() - 2).Sum(b => Math.Pow(b.Multiplier - average, 2)) / (_context.Bets!.Count() - 2);
        var limit = standardDeviation * 2 + average;
        System.Console.WriteLine(average);
        System.Console.WriteLine(standardDeviation);
        System.Console.WriteLine(limit);

        var PossibleFraudulentUsers = await _context.Users!
            .Where(u => u.Bets!.Average(b => b.Multiplier) > limit && u.IsActive).Select(u => new UserRankResponse(u)).ToListAsync();
        response.HouseWinnings = moneyMade;
        response.UsersMoneyRange = usersRange;
        response.PossibleFraudulentUSers = PossibleFraudulentUsers;
        response.UsersNo = users.Count();
        response.BetsMade = _context.Bets!.Count();
        response.ActiveUsersNo = users.Where(u => u.IsActive).Count();
        return response;
    }
}
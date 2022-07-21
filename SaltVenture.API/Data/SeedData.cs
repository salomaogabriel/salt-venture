using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;

namespace simpleAPI.Data;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        return;
        using (var context = new SaltVentureDbContext(
            serviceProvider.GetRequiredService<
            DbContextOptions<SaltVentureDbContext>>()))
        {
            // Look to the Games table to any games
            var game = context.Games.FirstOrDefault();
            var user = context.Users.FirstOrDefault( u => u.Username!.ToLower().Contains("nich"));
            var bets = new List<Bet>(){
                new Bet(){
                    Game = game.Id,
                    Status = BetStatus.Finished,
                    Amount = 200,
                    Multiplier = 2,
                    Balance = 1000,
                    Date = new DateTime(),
                    User = user
                },
                new Bet(){
                    Game = game.Id,
                    Status = BetStatus.Finished,
                    Amount = 200,
                    Multiplier = 0,
                    Balance = 1200,
                    Date = new DateTime(),
                    User = user
                },
                new Bet(){
                    Game = game.Id,
                    Status = BetStatus.Finished,
                    Amount = 100,
                    Multiplier = 1.5,
                    Balance = 1000,
                    Date = new DateTime(),
                    User = user
                },
                new Bet(){
                    Game = game.Id,
                    Status = BetStatus.Finished,
                    Amount = 200,
                    Multiplier = 2,
                    Balance = 1050,
                    Date = new DateTime(),
                    User = user
                },
                new Bet(){
                    Game = game.Id,
                    Status = BetStatus.Finished,
                    Amount = 500,
                    Multiplier = 0,
                    Balance = 1250,
                    Date = new DateTime(),
                    User = user
                },
                new Bet(){
                    Game = game.Id,
                    Status = BetStatus.Finished,
                    Amount = 250,
                    Multiplier = 2,
                    Balance = 750,
                    Date = new DateTime(),
                    User = user
                },
            };
            context.Bets.AddRange(bets);
            context.SaveChanges();
        }
    }
}
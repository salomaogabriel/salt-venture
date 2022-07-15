using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;

namespace simpleAPI.Data;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new SaltVentureDbContext(
            serviceProvider.GetRequiredService<
            DbContextOptions<SaltVentureDbContext>>()))
        {
            // Look to the Games table to any games
            context.Games.RemoveRange(context.Games);
            var crash = new Game()
            {
                Name = "Crash",
                Description = "it consists of a line that keeps going up and up, multiplying your bet — until it crashes. During this time period, you are free to cash out whenever you want, even automatically. If you cash out before the random crash, you keep your winnings — otherwise, you lose your whole bet until the next round.",
                TimesPlayed = 0,
                Exists = false,
            };
            context.Games!.Add(crash);
            context.SaveChanges();
        }
    }
}
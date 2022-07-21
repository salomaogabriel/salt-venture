using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public static class SaltnPepperLogic
{
    private static readonly double[][] _multipliers = new double[][]
    {
        new double[]{1.03, 1.08, 1.12, 1.18, 1.24, 1.3, 1.37, 1.46, 1.55, 1.65, 1.77, 1.9, 2.06, 2.25, 2.47, 2.75, 3.09,3.54,4.12,4.95,6.19,8.25,12.37,24.75},
        new double[] {1},
    };
    public static string GridGenerator(int pepperAmount)
    {
        var rnd = new Random();
        var counter = 0;
        var gameString = new List<char>("0000000000000000000000000");
        if (pepperAmount > 24) throw new ArgumentException("Pepper Amount Can't Exceed 24");
        if (pepperAmount < 1) throw new ArgumentException("Pepper Amount Has To Be Bigger Than 0");
        while (counter < pepperAmount)
        {
            counter = 0;
            for (var i = 0; i < 25; i++)
            {
                if (counter == pepperAmount) break;
                if (gameString[i] == '1') counter += 1;
                else
                {
                    if (rnd.Next(0, 100) < 4)
                    {
                        gameString[i] = '1';
                        counter++;
                    }
                }
            }
        }
        System.Console.WriteLine(new string(gameString.ToArray()));
        return new string(gameString.ToArray());
    }
    public static bool IsGameOver(string grid, int gridPosition)
    {
        return grid[gridPosition] == '1';
    }
    public static string PickPosition(string grid, int gridPosition)
    {
        var list = new List<char>(grid);
        list[gridPosition] = 'x';
        return new string(list.ToArray());
    }

    public static double CalculateMultiplier(SaltnPepper game)
    {
        if(game.NumberOfPicks == 0) return 0;
        var number = (game.PepperNumbers * 0.025) + 1;
        var multiplier = number * (game.NumberOfPicks + 0.3);
        return  multiplier;
    }
}
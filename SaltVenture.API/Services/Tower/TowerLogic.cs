using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public static class TowerLogic
{
    // the row is the level
    private static readonly double[][] _multipliers = new double[][]
    {
        // Easy
        new double[] {1.31,1.75, 2.33, 3.11,4.14, 5.52, 7.36,9.81,13.09},
        // Medium
        new double[] {1.47, 2.23,3.31,4.96,7.44,11.16,16.74,25.12,37.67},
        // Hard
        new double[] {1.96, 3.92, 7.84, 15.68, 31.36, 62.72,125.44,250.88,501.76},
        // Expert
        new double[] {2.94, 8.82, 26.46, 79.38,238.14, 714.42,2143.26,6429.78,19289.34},
        // Master
        new double[] {3.92,15.68,62.72,250.88,1003.52,4014.08,16058.32,64224.28,256901.12}
    };
    public static string GridGenerator(TowerLevels level, int floorsMax)
    {
        if (floorsMax < 0) throw new ArgumentException("Number of floors must be bigger than 0!");
        var rnd = new Random();
        string initialString;
        int maxRandom;
        char replacementChar;
        switch (level)
        {
            case TowerLevels.Easy:
                initialString = "1111";
                maxRandom = 4;
                replacementChar = '0';
                break;
            case TowerLevels.Medium:
                initialString = "111";
                maxRandom = 3;
                replacementChar = '0';
                break;
            case TowerLevels.Hard:
                initialString = "11";
                maxRandom = 2;
                replacementChar = '0';
                break;
            case TowerLevels.Master:
                initialString = "000";
                maxRandom = 3;
                replacementChar = '1';
                break;
            case TowerLevels.Expert:
                initialString = "0000";
                maxRandom = 4;
                replacementChar = '1';
                break;
            default:
                throw new ArgumentException("You must specify a Tower Level!");
        }

        var gameString = new List<char>();
        for (int i = 0; i < floorsMax; i++)
        {
            gameString.AddRange(initialString);
            gameString[rnd.Next(0, maxRandom) + maxRandom * i] = replacementChar;
        }
        return new string(gameString.ToArray());

    }

    public static bool IsGameOver(string grid, int pick, int currentFloor, int floorSize)
    {

        if (pick < 0) throw new ArgumentException("You must pick a number bigger than 0");
        if (pick >= floorSize) throw new ArgumentException("You must pick a number smaller than " + floorSize);
        return grid[pick + floorSize * currentFloor] == '0';
    }
    public static string PickPosition(string grid, int pick, int currentFloor, int floorSize)
    {
        if (pick < 0) throw new ArgumentException("You must pick a number bigger than 0");
        if (pick >= floorSize) throw new ArgumentException("You must pick a number smaller than " + floorSize);
        if (currentFloor < 0) throw new ArgumentException("Current floor must be bigger than 0");
        if (grid.Length / floorSize <= currentFloor) throw new ArgumentException("The current Floor is bigger than the number of floors!");
        var list = new List<char>(grid);
        list[pick + floorSize * currentFloor] = 'x';
        return new string(list.ToArray());
    }

    public static double CalculateMultiplier(Tower game)
    {
        if (game.Floor == 0) return 1;
        try
        {

            return _multipliers[(int)game.Level][game.Floor - 1];
        }
        catch (Exception e)
        {
            return 1;
        }
    }

    public static int GetFloorSize(TowerLevels level)
    {
        switch (level)
        {
            case TowerLevels.Easy:
                return 4;
            case TowerLevels.Medium:
                return 3;

            case TowerLevels.Hard:
                return 2;

            case TowerLevels.Master:
                return 3;

            case TowerLevels.Expert:
                return 4;
            default:
                return 0;
        }
    }
}
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Services;

public static class SaltnPepperLogic
{
    public static string GridGenerator(int pepperAmount)
    {
        var rnd = new Random();
        var counter = 0;
        var gameString = new List<char>("0000000000000000000000000");
        if(pepperAmount > 24) throw new ArgumentException("Pepper Amount Can't Exceed 24");
        if(pepperAmount < 1) throw new ArgumentException("Pepper Amount Has To Be Bigger Than 0");
        while (counter < pepperAmount)
        {
            counter = 0;
            for (var i = 0; i < 25; i++)
            {
                if(counter == pepperAmount) break;
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

}
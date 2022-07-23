namespace SaltVenture.API.Models.Games;

public class SaltnPepperResponse
{
    public int Id { get; set; }
    public bool IsCompleted {get; set;}
    public string? GridResponse {get; set;}
    public int PepperNumbers {get; set;}
    public int NumberOfPicks {get; set;}
    public Bet Bet {get; set;}

    public SaltnPepperResponse(SaltnPepper game)
    {
        Id = game.Id;
        IsCompleted = game.IsCompleted;
        PepperNumbers = game.PepperNumbers;
        NumberOfPicks = game.NumberOfPicks;
        GridResponse = IsCompleted ? game.Grid:
        HidePeppers(game.Grid!);

        Bet = game.Bet!;
        Bet.User = new User(){Balance = Bet.User!.Balance};
    }
    public string HidePeppers(string grid)
    {
        return grid.Replace('1','0');
    }
}

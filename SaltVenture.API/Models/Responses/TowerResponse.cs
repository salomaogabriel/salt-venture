namespace SaltVenture.API.Models.Games;



public class TowerResponse
{
    private readonly int[] _boxesPerFloorPerLevel = new int[] {4,3,2,3,4};
    public int Id { get; set; }
    public Bet? Bet {get; set;}
    public bool IsCompleted {get; set;}
    public string? GridResponse {get; set;}
    public int Floor {get; set;}
    public TowerLevels Level {get; set;}

     public TowerResponse(Tower game)
    {
        Id = game.Id;
        IsCompleted = game.IsCompleted;
        Floor = game.Floor;
        Level = game.Level;
        GridResponse = IsCompleted ? game.Grid:
        HideEggs(game.Grid!, game.Floor, game.Level
        );

        Bet = game.Bet!;
        Bet.User = new User(){Balance = Bet.User!.Balance};

    }
    public string HideEggs(string grid, int floor, TowerLevels level)
    {
        var newGrid = new List<char>();
        var floorSize = _boxesPerFloorPerLevel[(int)level];
        for (int i = 0; i < grid.Length; i ++)
        {
            if(i < floorSize * floor) newGrid.Add(grid[i]);
            else newGrid.Add('2');
            
        }
        return new string(newGrid.ToArray());
    }

}

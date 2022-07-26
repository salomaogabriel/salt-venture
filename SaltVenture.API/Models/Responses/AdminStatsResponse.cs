using SaltVenture.API.Models.Responses;

namespace SaltVenture.API.Models;

public class AdminStatsResponse
{
    public int HouseWinnings {get; set;}
    public int UsersNo {get; set;}
    public int BetsMade {get; set;}
    public int ActiveUsersNo {get; set;}
    public Dictionary<string,int>? GamesPlayedCount {get; set;}
    public Dictionary<int,int>? UsersMoneyRange {get; set;}
    public List<UserRankResponse>? PossibleFraudulentUSers {get; set;} 

}

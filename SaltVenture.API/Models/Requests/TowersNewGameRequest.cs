using System.ComponentModel.DataAnnotations;
using SaltVenture.API.Models.Games;

namespace SaltVenture.API.Models.Request;

public class TowersNewGameRequest
{
    public int BetAmount { get; set; }
    public TowerLevels Level { get; set; }
}

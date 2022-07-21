using System.ComponentModel.DataAnnotations;

namespace SaltVenture.API.Models.Request;

public class SaltnPepperNewGameRequest
{
    public int BetAmount { get; set; }
    public int PepperAmount { get; set; }
}

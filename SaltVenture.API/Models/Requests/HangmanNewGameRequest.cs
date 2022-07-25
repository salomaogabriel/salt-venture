using System.ComponentModel.DataAnnotations;

namespace SaltVenture.API.Models.Request;

public class HangmanNewGameRequest
{
    public int BetAmount { get; set; }
    public int WordLength { get; set; }
}
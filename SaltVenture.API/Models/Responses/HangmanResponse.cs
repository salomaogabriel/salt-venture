namespace SaltVenture.API.Models.Games;

public class HangmanResponse
{
    public int Id { get; set; }
    public bool IsCompleted { get; set; }
    public string? WordResponse { get; set; }
    public List<LetterPick>? Letters { get; set; }
    public int WordLength { get; set; }
    public int WordPickAmount { get; set; }
    public Bet Bet { get; set; }

    public HangmanResponse(Hangman game)
    {
        Id = game.Id;
        IsCompleted = game.IsCompleted;
        WordLength = game.WordLength;
        WordPickAmount = game.WordPickAmount;
        WordResponse = IsCompleted ? game.Word : Letters!.ToString();

        Bet = game.Bet!;
        Bet.User = new User() { Balance = Bet.User!.Balance };
    }
}

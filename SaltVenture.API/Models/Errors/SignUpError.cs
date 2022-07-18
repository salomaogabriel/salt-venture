namespace SaltVenture.API.Models.Errors;

public class SignUpError 
{
    public int Id { get; set; }
    public int? Status { get; set; } = 200;
    public string? Title { get; set; } 
    public Dictionary<string, List<string>> Errors = new Dictionary<string, List<string>>();
    public void AddEmailExistsError(string? email)
    {
        Status = 400;
        Title = "One or more validation errors occurred.";
        var msg = $"{email} is being used by another user!";
        Errors["Email"] = new List<string>(){msg};
    }

    public void AddUsernameExistsError(string? username)
    {
         Status = 400;
        Title = "One or more validation errors occurred.";
        var msg = $"{username} is being used by another user!";
        Errors["Username"] = new List<string>(){msg};
    }
}

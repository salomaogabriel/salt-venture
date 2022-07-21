using SaltVenture.API.Models;
using SaltVenture.API.Models.Request;

namespace SaltVenture.API.Services;

public interface IUsersRepository
{
    bool EmailExists(string? email);
    bool UsernameExists(string? username);
    Task<List<User>> GetAllWithUsername(string? username);
    Task<User> AddToDb(string? email, string? username, string? password);
    Task<List<User>> GetUsersWithEmail(string email);
    Task<User> GetUserWithId(int id);
    Task<User> UpdateUser(User user, UserUpdateRequest request);
    Task DeactiveUser(int id);
    Task<User> UpdateBalance(int newBalance, User user);
}
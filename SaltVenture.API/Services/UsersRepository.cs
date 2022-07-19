using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;
using System.Security.Cryptography;

namespace SaltVenture.API.Services;

public class UsersRepository : IUsersRepository
{
    private readonly SaltVentureDbContext _context;

    public UsersRepository(SaltVentureDbContext context)
    {
        _context = context;
    }

    public bool EmailExists(string? email)
    {
        // TODO: Check if user exists in db
        return _context.Users!.Any(u => u.Email == email);
    }

    public bool UsernameExists(string? username)
    {
        return _context.Users!.Any(u => u.Username == username);

    }
    public async Task<List<User>> GetAllWithUsername(string? username)
    {
        return await _context.Users!
            .Where(u => u.Username.Contains(username))
            .OrderByDescending(u => u.Balance)
            .ToListAsync();
    }

    public async Task<User> AddToDb(string? email, string? username, string? password)
    {
        var user = new User()
        {
            Username = username,
            Email = email,
            Balance = 1000,
            Password = HashPassword(password!)
        };
        _context.Users!.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
    private static string HashPassword(string password, byte[] salt = null, bool needsOnlyHash = false)
    {
        if (salt == null || salt.Length != 16)
        {
            // generate a 128-bit salt using a secure PRNG
            salt = new byte[128 / 8];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(salt);
        }

        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));

        if (needsOnlyHash) return hashed;
        // password will be concatenated with salt using ':'
        return $"{hashed}:{Convert.ToBase64String(salt)}";
    }

    public async Task<List<User>> GetUsersWithEmail(string email)
    {
        return await _context.Users!.Where(u => u.Email == email).ToListAsync();
    }
    public static bool VerifyPassword(string hashedPasswordWithSalt, string passwordToCheck)
        {
            // retrieve both salt and password from 'hashedPasswordWithSalt'
            var passwordAndHash = hashedPasswordWithSalt.Split(':');
            if (passwordAndHash == null || passwordAndHash.Length != 2)
                return false;
            var salt = Convert.FromBase64String(passwordAndHash[1]);
            if (salt == null)
                return false;
            // hash the given password
            var hashOfpasswordToCheck = HashPassword(passwordToCheck, salt, true);
            // compare both hashes
            return String.CompareOrdinal(passwordAndHash[0], hashOfpasswordToCheck) == 0;
        }

    public async Task<User> GetUserWithId(int id)
    {
        return await _context.Users
        .Include(u => u.Bets)
        .FirstOrDefaultAsync(u => u.Id == id);
    }
}
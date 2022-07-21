
using SaltVenture.API.Models;

namespace SaltVenture.API.Services;

public interface IJwtAuthenticationService
{
    string Authenticate(User user);
}
using SaltVenture.API.Models;

namespace SaltVenture.API.Services;

public interface IAdminRepository 
{
    Task<AdminStatsResponse> CalculateMoneyMadeByHouse();
}
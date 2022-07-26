using System;
using SaltVenture.API.Data;
using Microsoft.EntityFrameworkCore;

namespace SaltVenture.Tests;

public static class MockDbContext
{
     public static SaltVentureDbContext GetEmptyDbContext()
    {
        var options = new DbContextOptionsBuilder<SaltVentureDbContext>()
            .UseInMemoryDatabase("InMemoryDb"+DateTime.Now.ToFileTimeUtc())
            .Options;
        return new SaltVentureDbContext(options);
    }
}
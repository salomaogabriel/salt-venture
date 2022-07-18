using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Models;

namespace SaltVenture.API.Data;

public class SaltVentureDbContext : DbContext 
{
      // Create a Table:
        public DbSet<Game>? Games { get; set; }
        public DbSet<User>? Users { get; set; }
          public SaltVentureDbContext(DbContextOptions<SaltVentureDbContext> options)
      : base(options)
  {
  }
}
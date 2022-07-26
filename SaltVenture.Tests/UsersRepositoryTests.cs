using Xunit;
using FluentAssertions;
using SaltVenture.API.Services;
using SaltVenture.API.Models.Games;
using System.Linq;
using System;
using SaltVenture.API.Models;
using SaltVenture.API.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace SaltVenture.Tests;

public class UsersRepositoryTests
{
    [Fact]
    public void should_return_false_when_email_isnt_on_database()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            var repo = new UsersRepository(context);
            var result = repo.EmailExists("thisEmailDOesnntExist");

            result.Should().Be(false);
        }
    }

     [Fact]
    public void should_return_true_when_email_exists_on_database()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Email="s", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = repo.EmailExists("s");

            result.Should().Be(true);
        }
    }
}
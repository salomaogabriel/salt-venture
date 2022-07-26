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
using SaltVenture.API.Models.Request;

namespace SaltVenture.Tests;

public class UsersRepositoryTests
{
    #region Email Exists Method TEsts
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
    #endregion
    #region Username Exists Method Tests
     [Fact]
    public void should_return_false_when_username_isnt_on_database()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            var repo = new UsersRepository(context);
            var result = repo.UsernameExists("username");

            result.Should().Be(false);
        }
    }

     [Fact]
    public void should_return_true_when_username_exists_on_database()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Username="s", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = repo.UsernameExists("s");

            result.Should().Be(true);
        }
    }
    #endregion
    #region Get All With Username Method Tests
    [Fact]
    public async Task should_get_empty_list_when_there_is_no_users()
    {
         using(var context = MockDbContext.GetEmptyDbContext())
        {
            var repo = new UsersRepository(context);
            var result = await repo.GetAllWithUsername("");

            result.Count().Should().Be(0);
        }
    }
    [Fact]
    public async Task should_get_one_list_when_there_is_one_users()
    {
         using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Username="s", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetAllWithUsername("");

            result.Count().Should().Be(1);
        }
    }
     [Fact]
    public async Task should_get_right_user_when_searching_for_all()
    {
         using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Username="saaaaaaad", IsActive=true});
            context.Users!.Add(new User(){Username="lookForThis", IsActive=true});
            context.Users!.Add(new User(){Username="saaaaaaa", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetAllWithUsername("look");

            result.Count().Should().Be(1);
            result.FirstOrDefault()!.Username.Should().Be("lookForThis");
        }
    }
     [Fact]
    public async Task should_get_all_user_when_searching_for_all()
    {
         using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Username="saaaaaaad", IsActive=true});
            context.Users!.Add(new User(){Username="lookForThis", IsActive=true});
            context.Users!.Add(new User(){Username="saaaaaaa", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetAllWithUsername("");

            result.Count().Should().Be(3);
        }
    }
    #endregion
    #region Add User To Database Method Tests
    [Fact]
    public async Task should_add_user_to_database()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            var repo = new UsersRepository(context);
             await repo.AddToDb("email@email.com","username2","reallystrongpassword");

            var result = context.Users!.FirstOrDefault();
            result!.Email.Should().Be("email@email.com");
            result!.Username.Should().Be("username2");

        }
    }
     [Fact]
    public async Task should_get_user_back_with_id_when_adding_to_database()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            var repo = new UsersRepository(context);
            var result = await repo.AddToDb("email@email.com","username2","reallystrongpassword");

            result.Id.Should().Be(1);

        }
    }
    #endregion
    #region Get User With Email Method Tests
    [Fact]
    public async Task should_return_empty_when_there_is_not_an_user_with_the_email_in_database()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            var repo = new UsersRepository(context);
            var result = await repo.GetUsersWithEmail("email");

            result.Should().BeEmpty();
        }
    }
    [Fact]
    public async Task should_get_user_when_gettingUsersWithEmail()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Email="lookForThis", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetUsersWithEmail("lookForThis");

            result.Count().Should().Be(1);
        }
    }
    [Fact]
    public async Task should_get_all_users_when_gettingUsersWithEmail()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Email="saaaaaaa", IsActive=true});
            context.Users!.Add(new User(){Email="lookForThis", IsActive=true});
            context.Users!.Add(new User(){Email="saaaaaaa", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetUsersWithEmail("saaaaaaa");

            result.Count().Should().Be(2);
        }
    }
    [Fact]
    public async Task should_get_empty_when_users_with_the_specified_email_dont_exist()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Email="saaaaaaa", IsActive=true});
            context.Users!.Add(new User(){Email="lookForThis", IsActive=true});
            context.Users!.Add(new User(){Email="saaaaaaa", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetUsersWithEmail("empty");

            result.Should().BeEmpty();
        }
    }
    #endregion
    #region Get User With Id Method Tests
    [Fact]
    public async Task should_return_empty_when_there_is_not_an_user_with_the_id_in_database()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            var repo = new UsersRepository(context);
            var result = await repo.GetUserWithId(2);

            result.Should().BeNull();
        }
    }
    [Fact]
    public async Task should_get_user()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Email="lookForThis", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetUserWithId(1);

            result.Should().NotBeNull();
        }
    }
    [Fact]
    public async Task should_get_right_user_when_Searching_by_id()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Email="saaaaaaa", IsActive=true});
            context.Users!.Add(new User(){Email="lookForThis", IsActive=true});
            context.Users!.Add(new User(){Email="saaaaaaa", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetUserWithId(2);

            result.Should().NotBeNull();
            result.Email.Should().Be("lookForThis");
        }
    }
    [Fact]
    public async Task should_get_null_when_user_is_not_found()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            context.Users!.Add(new User(){Email="saaaaaaa", IsActive=true});
            context.Users!.Add(new User(){Email="lookForThis", IsActive=true});
            context.Users!.Add(new User(){Email="saaaaaaa", IsActive=true});
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.GetUserWithId(4);

            result.Should().BeNull();
        }
    }
    #endregion
    #region Update User Method Tests
    [Fact]
    public async Task should_update_user()
    {
          using(var context = MockDbContext.GetEmptyDbContext())
        {
            var user = new User(){Username="old",IsActive=true};
            var request = new UserUpdateRequest(){Username="new"};
            context.Users!.Add(user);
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.UpdateUser(user,request);
            result.Username.Should().Be("new");
        }
    }
    [Fact]
    public async Task should_not_update_user_if_request_is_empty()
    {
          using(var context = MockDbContext.GetEmptyDbContext())
        {
            var user = new User(){Username="username",Password="password",Email="email",IsActive=true};
            var request = new UserUpdateRequest(){};
            context.Users!.Add(user);
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.UpdateUser(user,request);
            result.Username.Should().Be("username");
            result.Password.Should().Be("password");
            result.Email.Should().Be("email");
        }
    }
    #endregion
    #region Deactivate User Method Tests
    [Fact]
    public async Task should_just_return_when_user_doesnt_exist()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            
            var repo = new UsersRepository(context);
            var act = async () => await repo.DeactiveUser(39);
            await act.Should().NotThrowAsync();
        }
    }
    [Fact]
    public async Task should_set_is_active_to_requested_user()
    {
        using(var context = MockDbContext.GetEmptyDbContext())
        {
            var user = new User(){Username="username",Password="password",Email="email",IsActive=true};
            context.Users!.Add(user);
            context.SaveChanges();
            var repo = new UsersRepository(context);
            await repo.DeactiveUser(1);

            context.Users.FirstOrDefault()!.IsActive.Should().Be(false);
        }
    }

    #endregion
    #region Update Balance Method Tests
    [Fact]
    public async void should_return_user__with_updated_balance()
    {
          using(var context = MockDbContext.GetEmptyDbContext())
        {
            var user = new User(){Username="user", Balance=100, IsActive=true};
            context.Add(user);
            context.SaveChanges();
            var repo = new UsersRepository(context);
            var result = await repo.UpdateBalance(10,user);

            result.Balance.Should().Be(10);
        }
        
    }
    [Fact]
    public async void should_Update_user_balance_in_the_Database()
    {
          using(var context = MockDbContext.GetEmptyDbContext())
        {
            var user = new User(){Username="user", Balance=100, IsActive=true};
            context.Add(user);
            context.SaveChanges();
            var repo = new UsersRepository(context);
            await repo.UpdateBalance(10,user);
            context.Users!.FirstOrDefault()!.Balance.Should().Be(10);
        }
        
    }
    #endregion

}
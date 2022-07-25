using Xunit;
using FluentAssertions;
using SaltVenture.API.Services;
using SaltVenture.API.Models.Games;
using System.Linq;
using System;
using SaltVenture.API.Models;

namespace SaltVenture.Tests;

public class TowerTests
{
    #region Grid Generator Tests
    [Fact]
    public void should_create_grid()
    {
        var result = TowerLogic.GridGenerator(TowerLevels.Easy, 9);

        result.Length.Should().Be(36);
    }
      [Fact]
    public void should_create_empty_grid()
    {
        var result = TowerLogic.GridGenerator(TowerLevels.Easy, 0);

        result.Length.Should().Be(0);
    }
     [Fact]
    public void easy_level_should_contain_27_ones()
    {
        var result = TowerLogic.GridGenerator(TowerLevels.Easy, 9);
        result.Where(c => c == '1').Count().Should().Be(27);
    }
    [Fact]
    public void medium_level_should_contain_18_ones()
    {
        var result = TowerLogic.GridGenerator(TowerLevels.Medium, 9);
        result.Where(c => c == '1').Count().Should().Be(18);
    }
     [Fact]
    public void hard_level_should_contain_9_ones()
    {
        var result = TowerLogic.GridGenerator(TowerLevels.Hard, 9);
        result.Where(c => c == '1').Count().Should().Be(9);
    }
      [Fact]
    public void master_level_should_contain_9_ones()
    {
        var result = TowerLogic.GridGenerator(TowerLevels.Master, 9);
        result.Where(c => c == '1').Count().Should().Be(9);
    }
      [Fact]
    public void expeert_level_should_contain_9_ones()
    {
        var result = TowerLogic.GridGenerator(TowerLevels.Expert, 9);
        result.Where(c => c == '1').Count().Should().Be(9);
    }
       [Fact]
    public void should_throw_error_when_floor_number_smaller_than_0()
    {
        var act = () => TowerLogic.GridGenerator(TowerLevels.Expert, -2);
        act.Should().Throw<ArgumentException>().WithMessage("Number of floors must be bigger than 0!");
    }
    #endregion

    #region Is Game Over Tests
    [Theory]
    [InlineData(0,0,false)]
    [InlineData(0,1,false)]
    [InlineData(0,2,false)]
    [InlineData(0,3,false)]
    [InlineData(3,0,true)]
    [InlineData(3,1,true)]
    [InlineData(3,2,true)]
    [InlineData(3,3,true)]
    public void TestGameOver(int pick, int currentFloor,bool expected)
    {
        var gameGrid = "1110111011101110";
        var result = TowerLogic.IsGameOver(gameGrid,pick,currentFloor,4);

        result.Should().Be(expected);
    }
    [Fact]
    public void gameOver_should_throw_if_pick_is_smaller_than_0()
    {
        var act = () => TowerLogic.IsGameOver("",-1,2,4);
        act.Should().Throw<ArgumentException>().WithMessage("You must pick a number bigger than 0");
    }
     [Fact]
    public void gameOver_should_throw_if_pick_is_bigger_than_floorSize()
    {
        var act = () => TowerLogic.IsGameOver("",7,2,4);
        act.Should().Throw<ArgumentException>().WithMessage("You must pick a number smaller than 4");
    }

    [Fact]
    public void gameOver_should_throw_if_pick_is_equal_to_floorSize()
    {
        var act = () => TowerLogic.IsGameOver("",4,2,4);
        act.Should().Throw<ArgumentException>().WithMessage("You must pick a number smaller than 4");
    }
    #endregion

    #region Pick Tests
    
    [Theory]
    [InlineData(0,0,0,'x')]
    [InlineData(0,1,4,'x')]
    [InlineData(1,1,5,'x')]
    [InlineData(0,0,1,'1')]
    public void should_pick_righ_position(int pick,int currentFloor,int expectedPosition,char expectedValue)
    {
        var grid = "1110111011101110";
        var result = TowerLogic.PickPosition(grid,pick, currentFloor,4);


        result[expectedPosition].Should().Be(expectedValue);
    }
 [Fact]
    public void pick_should_throw_if_pick_is_smaller_than_0()
    {
        var act = () => TowerLogic.PickPosition("",-1,2,4);
        act.Should().Throw<ArgumentException>().WithMessage("You must pick a number bigger than 0");
    }
     [Fact]
    public void pick_should_throw_if_pick_is_bigger_than_floorSize()
    {
        var act = () => TowerLogic.PickPosition("",7,2,4);
        act.Should().Throw<ArgumentException>().WithMessage("You must pick a number smaller than 4");
    }

    [Fact]
    public void pick_should_throw_if_pick_is_equal_to_floorSize()
    {
        var act = () => TowerLogic.PickPosition("",4,2,4);
        act.Should().Throw<ArgumentException>().WithMessage("You must pick a number smaller than 4");
    }
    [Fact]
    public void pick_should_throw_if_current_floor_is_smaller_than_0()
    {
        var grid = "1110111011101110";

        var act = () => TowerLogic.PickPosition(grid, 0, -1, 4);
        act.Should().Throw<ArgumentException>().WithMessage("Current floor must be bigger than 0");
    }
    [Theory]
    [InlineData("1110111011101110",5)]
    [InlineData("1110111011101110",4)]
    [InlineData("",0)]
    public void pick_should_throw_if_current_floor_is_bigger_than_the_number_of_floors(string grid, int errorFloor)
    {

        var act = () => TowerLogic.PickPosition(grid, 0, errorFloor, 4);
        act.Should().Throw<ArgumentException>().WithMessage("The current Floor is bigger than the number of floors!");
    }
    #endregion

    #region Calculate Multiplier Tests
    [Theory]
    [InlineData(TowerLevels.Easy, 0, 1.0)]
    [InlineData(TowerLevels.Easy, 1, 1.31)]
    [InlineData(TowerLevels.Easy, 9, 13.09)]
    [InlineData(TowerLevels.Medium, 0, 1.0)]
    [InlineData(TowerLevels.Medium, 1, 1.47)]
    [InlineData(TowerLevels.Medium, 9, 37.67)]
    [InlineData(TowerLevels.Hard, 0, 1.0)]
    [InlineData(TowerLevels.Hard, 1, 1.96)]
    [InlineData(TowerLevels.Hard, 9, 501.76)]
    [InlineData(TowerLevels.Master, 0, 1.0)]
    [InlineData(TowerLevels.Master, 1, 2.94)]
    [InlineData(TowerLevels.Master, 9, 19289.34)]
    [InlineData(TowerLevels.Expert, 0, 1.0)]
    [InlineData(TowerLevels.Expert, 1, 3.92)]
    [InlineData(TowerLevels.Expert, 9, 256901.12)]
    public void CalculateMultiplierTests(TowerLevels level, int floor, double expected)
    {
        var game = new Tower()
        {
            Level = level,
            Floor = floor
        };
        var result = TowerLogic.CalculateMultiplier(game);

        result.Should().Be(expected);
    }
    #endregion

    #region Tower Response
    [Fact]
    public void should_show_grid_when_the_game_is_completed()
    {
        var grid = "1110111011101110";

        var game = new Tower()
        {
            Grid = grid,
            Bet = new Bet() {User = new User()},

            IsCompleted = true
        };
        var result = new TowerResponse(game);
        result.GridResponse.Should().Be(grid);
    }
    [Theory]
    [InlineData("",0,"")]
    [InlineData("1110",0,"2222")]
    [InlineData("11101110",0,"22222222")]
    [InlineData("11101110",1,"11102222")]
    [InlineData("11101110",2,"11101110")]
    [InlineData("11101110",3,"11101110")]
    [InlineData("111x1110",1,"111x2222")]
    public void should_show_right_grid(string grid,int floor, string expectedGrid )
    {
        var game = new Tower()
        {
            Level = TowerLevels.Easy,
            Grid = grid,
            IsCompleted = false,
            Floor = floor,
            Bet = new Bet() {User = new User()}
        };
        var result = new TowerResponse(game);
        result.GridResponse.Should().Be(expectedGrid);

    }
    #endregion
}
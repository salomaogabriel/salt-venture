using Xunit;
using FluentAssertions;
using SaltVenture.API.Services;
using SaltVenture.API.Models.Games;
using System.Linq;
using System;

namespace SaltVenture.Tests;

public class SaltnPepperTests
{
    #region Grid Generator Tests
    [Theory]
    [InlineData(1,1)]
    [InlineData(2,2)]
    [InlineData(3,3)]
    [InlineData(4,4)]
    [InlineData(5,5)]
    [InlineData(6,6)]
    [InlineData(7,7)]
    [InlineData(8,8)]
    [InlineData(9,9)]
    [InlineData(10,10)]
    [InlineData(11,11)]
    [InlineData(12,12)]
    [InlineData(13,13)]
    [InlineData(14,14)]
    [InlineData(15,15)]
    [InlineData(16,16)]
    [InlineData(17,17)]
    [InlineData(18,18)]
    [InlineData(19,19)]
    [InlineData(20,20)]
    [InlineData(21,21)]
    [InlineData(22,22)]
    [InlineData(23,23)]
    [InlineData(24,24)]
    public void should_create_grid_with_predefined_number_of_peppers(int peppers, int expected)
    {
        var result = SaltnPepperLogic.GridGenerator(peppers);

        result.Where(c => c == '1').Count().Should().Be(expected);
    }
    [Fact]
    public void should_throw_when_pepper_amount_smaller_than_0()
    {
        var act = () => SaltnPepperLogic.GridGenerator(-5);

        act.Should().Throw<ArgumentException>().WithMessage("Pepper Amount Has To Be Bigger Than 0");

    }
       [Fact]
    public void should_throw_when_pepper_amount_equals_to_0()
    {
        var act = () => SaltnPepperLogic.GridGenerator(0);

        act.Should().Throw<ArgumentException>().WithMessage("Pepper Amount Has To Be Bigger Than 0");

    }
           [Fact]
    public void should_throw_when_pepper_amount_bigger_than_24()
    {
        var act = () => SaltnPepperLogic.GridGenerator(25);

        act.Should().Throw<ArgumentException>().WithMessage("Pepper Amount Can't Exceed 24");

    }
    #endregion

   #region Is Game Over Tests
   [Theory]
    [InlineData("0000",0,false)]
    [InlineData("1000",0,true)]
    [InlineData("1000",1,false)]
   public void TestGameOver(string grid, int position, bool expected)
   {
        var result = SaltnPepperLogic.IsGameOver(grid,position);
        result.Should().Be(expected);
   }
   [Fact]
   public void should_throw_when_picked_position_smaller_than_0()
   {
        var act = () => SaltnPepperLogic.IsGameOver("1111",-2);
        act.Should().Throw<ArgumentException>().WithMessage("The position must be bigger than 0!");
   }

   [Theory]
   [InlineData("1111",4,true)]
   [InlineData("1111",5,true)]
   [InlineData("1111",3,false)]
   [InlineData("",0,true)]
   [InlineData("1",0,false)]
   public void should_throw_when_picked_position_is_bigger_than_the_grid_length(string grid, int gridPos, bool shouldThrow)
   {
        var act = () => SaltnPepperLogic.IsGameOver(grid,gridPos);
        if(shouldThrow)
        {
            act.Should().Throw<ArgumentException>().WithMessage("The position must be smaller than the grid length!");
        }
        else
        {
            act.Should().NotThrow<ArgumentException>();

        }
   }
   #endregion
  
    #region Pick Position Tests
    [Theory]
    [InlineData("0000",2,"00x0")]
    [InlineData("0010",1,"0x10")]
    [InlineData("0000",0,"x000")]
    [InlineData("0000",3,"000x")]
    [InlineData("1111",2,"11x1")]
    public void TestPickPositionsTest(string grid, int pos, string newGrid)
    {
        var result = SaltnPepperLogic.PickPosition(grid,pos);

        result.Should().Be(newGrid);
    }

    [Fact]
    public void should_throw_when_picked_pos_smaller_than_0()
    {
        var act = () => SaltnPepperLogic.PickPosition("1111",-2);
        act.Should().Throw<ArgumentException>().WithMessage("Picked position should be biggeer than 0!");
    }
    [Fact]
    public void should_throw_when_picked_pos_bigger_than_grid_size()
    {
        var act = () => SaltnPepperLogic.PickPosition("1111",4);
        act.Should().Throw<ArgumentException>().WithMessage("Picked position should be smaller than the grid size!");
    }
    #endregion

    #region Multiplier Test
    [Theory]
    [InlineData(0,0,1)]
    [InlineData(1,0,1)]
    [InlineData(24,0,1)]
    [InlineData(25,0,1)]
    [InlineData(1,1,1.03)]
    [InlineData(24,2,1)]
    // CHecking if the multipliers are rigth (Helped on 16,9)
    [InlineData(24,1,24.75)]
    [InlineData(23,2,297)]
    [InlineData(22,3,2277)]
    [InlineData(21,4,12523.5)]
    [InlineData(20,5,52598.7)]
    [InlineData(19,6,175329)]
    [InlineData(18,7,475893)]
    [InlineData(17,8,1070759.25)]
    [InlineData(16,9,2022545.25)]
    [InlineData(15,10,3236072.4)]
    [InlineData(14,11,4412826)]
    [InlineData(13,12,5148297)]
    [InlineData(12,13,5148297)]
    [InlineData(11,14,4412826)]
    [InlineData(10,15,3236072.4)]
    [InlineData(9,16,2022545.25)]
    [InlineData(8,17,1070759.25)]
    [InlineData(7,18,475893)]
    [InlineData(6,19,175328)]
    [InlineData(5,20,52598.7)]
    [InlineData(4,21,12523.5)]
    [InlineData(3,22,2277)]
    [InlineData(2,23,297)]
    [InlineData(1,24,24.75)]

    public void CheckMultipliers(int numberOfPeppers,int pickRound, double expected)
    {
        var game = new SaltnPepper()
        {
            NumberOfPicks = pickRound,
            PepperNumbers = numberOfPeppers
        };
        var result = SaltnPepperLogic.CalculateMultiplier(game);
        result.Should().Be(expected);
    }
    #endregion
}
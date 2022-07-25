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
    #endregion
}
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaltVenture.API.Migrations
{
    public partial class balanceToBets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Balance",
                table: "Bets",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                table: "Bets");
        }
    }
}

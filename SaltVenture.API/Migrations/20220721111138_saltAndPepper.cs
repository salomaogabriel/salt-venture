using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaltVenture.API.Migrations
{
    public partial class saltAndPepper : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bets_Games_GameId",
                table: "Bets");

            migrationBuilder.DropIndex(
                name: "IX_Bets_GameId",
                table: "Bets");

            migrationBuilder.DropColumn(
                name: "GameId",
                table: "Bets");

            migrationBuilder.AddColumn<int>(
                name: "Game",
                table: "Bets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SaltnPeppersGames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    BetId = table.Column<int>(type: "int", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    Grid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PepperNumbers = table.Column<int>(type: "int", nullable: false),
                    NumberOfPicks = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaltnPeppersGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SaltnPeppersGames_Bets_BetId",
                        column: x => x.BetId,
                        principalTable: "Bets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SaltnPeppersGames_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SaltnPeppersGames_BetId",
                table: "SaltnPeppersGames",
                column: "BetId");

            migrationBuilder.CreateIndex(
                name: "IX_SaltnPeppersGames_UserId",
                table: "SaltnPeppersGames",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SaltnPeppersGames");

            migrationBuilder.DropColumn(
                name: "Game",
                table: "Bets");

            migrationBuilder.AddColumn<int>(
                name: "GameId",
                table: "Bets",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bets_GameId",
                table: "Bets",
                column: "GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bets_Games_GameId",
                table: "Bets",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id");
        }
    }
}

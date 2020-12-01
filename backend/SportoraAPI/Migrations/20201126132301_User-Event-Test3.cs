using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace SportoraAPI.Migrations
{
    public partial class UserEventTest3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_SportEvents_SportEventId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_SportEvents_SportEventId1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_SportEventId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_SportEventId1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SportEventId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SportEventId1",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "SportEventAdmins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    SportEventId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SportEventAdmins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SportEventAdmins_SportEvents_SportEventId",
                        column: x => x.SportEventId,
                        principalTable: "SportEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SportEventAdmins_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SportEventParticipants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    SportEventId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SportEventParticipants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SportEventParticipants_SportEvents_SportEventId",
                        column: x => x.SportEventId,
                        principalTable: "SportEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SportEventParticipants_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SportEventAdmins_SportEventId",
                table: "SportEventAdmins",
                column: "SportEventId");

            migrationBuilder.CreateIndex(
                name: "IX_SportEventAdmins_UserId",
                table: "SportEventAdmins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SportEventParticipants_SportEventId",
                table: "SportEventParticipants",
                column: "SportEventId");

            migrationBuilder.CreateIndex(
                name: "IX_SportEventParticipants_UserId",
                table: "SportEventParticipants",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SportEventAdmins");

            migrationBuilder.DropTable(
                name: "SportEventParticipants");

            migrationBuilder.AddColumn<int>(
                name: "SportEventId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SportEventId1",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SportEventId",
                table: "Users",
                column: "SportEventId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SportEventId1",
                table: "Users",
                column: "SportEventId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_SportEvents_SportEventId",
                table: "Users",
                column: "SportEventId",
                principalTable: "SportEvents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_SportEvents_SportEventId1",
                table: "Users",
                column: "SportEventId1",
                principalTable: "SportEvents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace SportoraAPI.Migrations
{
    public partial class SportEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DeleteData(
                table: "Businesses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Businesses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.CreateTable(
                name: "SportEvents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Location = table.Column<string>(type: "text", nullable: true),
                    Participants = table.Column<int[]>(type: "integer[]", nullable: true),
                    MaxParticipants = table.Column<int>(type: "integer", nullable: false),
                    ActiveStatus = table.Column<bool>(type: "boolean", nullable: false),
                    EventStartTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EventCreatedTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AutoInvite = table.Column<int[]>(type: "integer[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SportEvents", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SportEvents");

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ActiveStatus = table.Column<bool>(type: "boolean", nullable: false),
                    AutoInvite = table.Column<int[]>(type: "integer[]", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    EventCreatedTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EventStartTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: true),
                    MaxParticipants = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Participants = table.Column<int[]>(type: "integer[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Businesses",
                columns: new[] { "Id", "GroupIds", "Location", "Name", "PhoneNumber", "Premises" },
                values: new object[,]
                {
                    { 1, new[] { 1, 2 }, "Katu666", "Harrin Sali", "112", new[] { "Kuntosali", "Uimahalli" } },
                    { 2, new[] { 1, 2 }, "Testaajakatu 3", "Tero Testaajan Kuntosali", "040 123 4567", new[] { "Kuntosali", "Uimahalli" } }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Gender", "GroupIds", "ImageUrl", "Name", "Nickname" },
                values: new object[] { 1, "hvayr@hotmail.com", "Male", new[] { 1 }, "www", "Harri V", "Harma" });
        }
    }
}

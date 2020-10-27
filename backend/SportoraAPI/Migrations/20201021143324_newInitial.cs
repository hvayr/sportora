using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace SportoraAPI.Migrations
{
    public partial class newInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable("Businesses",
                table => new
                {
                    Id = table.Column<int>("integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy",
                            NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>("text", nullable: true),
                    PhoneNumber = table.Column<string>("text", nullable: true),
                    GroupIds = table.Column<int[]>("integer[]", nullable: true),
                    Location = table.Column<string>("text", nullable: true),
                    Premises = table.Column<string[]>("text[]", nullable: true)
                },
                constraints: table => { table.PrimaryKey("PK_Businesses", x => x.Id); });

            migrationBuilder.CreateTable("Clubs",
                table => new
                {
                    Id = table.Column<int>("integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy",
                            NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>("text", nullable: true),
                    GroupIds = table.Column<int[]>("integer[]", nullable: true),
                    SkillLevel = table.Column<int>("integer", nullable: false)
                }, constraints: table => { table.PrimaryKey("PK_Clubs", x => x.Id); });

            migrationBuilder.CreateTable("Events",
                table => new
                {
                    Id =
                        table.Column<int>("integer", nullable: false)
                            .Annotation("Npgsql:ValueGenerationStrategy",
                                NpgsqlValueGenerationStrategy
                                    .IdentityByDefaultColumn),
                    Name = table.Column<string>("text", nullable: true),
                    Description = table.Column<string>("text", nullable: true),
                    Location = table.Column<string>("text", nullable: true),
                    Participants = table.Column<int[]>("integer[]", nullable: true),
                    MaxParticipants = table.Column<int>("integer", nullable: false),
                    ActiveStatus = table.Column<bool>("boolean", nullable: false),
                    EventStartTime =
                        table.Column<DateTime>("timestamp without time zone",
                            nullable: false),
                    EventCreatedTime =
                        table.Column<DateTime>("timestamp without time zone",
                            nullable: false),
                    AutoInvite = table.Column<int[]>("integer[]", nullable: true)
                },
                constraints: table => { table.PrimaryKey("PK_Events", x => x.Id); });

            migrationBuilder.CreateTable("Groups",
                table => new
                {
                    Id = table.Column<int>("integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy",
                            NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>("text", nullable: true)
                },
                constraints: table => { table.PrimaryKey("PK_Groups", x => x.Id); });

            migrationBuilder.CreateTable("Users",
                table => new
                {
                    Id = table.Column<int>("integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy",
                            NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>("text", nullable: true),
                    Name = table.Column<string>("text", nullable: true),
                    Nickname = table.Column<string>("text", nullable: true),
                    Gender = table.Column<string>("text", nullable: true),
                    GroupIds = table.Column<int[]>("integer[]", nullable: true),
                    ImageUrl = table.Column<string>("text", nullable: true)
                }, constraints: table => { table.PrimaryKey("PK_Users", x => x.Id); });

            migrationBuilder.InsertData("Businesses",
                new[] {"Id", "GroupIds", "Location", "Name", "PhoneNumber", "Premises"},
                new object[,]
                {
                    {
                        1, new[] {1, 2}, "Katu666", "Harrin Sali", "112",
                        new[] {"Kuntosali", "Uimahalli"}
                    },
                    {
                        2, new[] {1, 2}, "Testaajakatu 3", "Tero Testaajan Kuntosali",
                        "040 123 4567", new[] {"Kuntosali", "Uimahalli"}
                    }
                });

            migrationBuilder.InsertData("Users",
                new[]
                {
                    "Id", "Email", "Gender", "GroupIds", "ImageUrl", "Name",
                    "Nickname"
                },
                new object[]
                {
                    1, "hvayr@hotmail.com", "Male", new[] {1}, "www", "Harri V",
                    "Harma"
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("Businesses");

            migrationBuilder.DropTable("Clubs");

            migrationBuilder.DropTable("Events");

            migrationBuilder.DropTable("Groups");

            migrationBuilder.DropTable("Users");
        }
    }
}
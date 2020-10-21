using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SportoraAPI.Migrations
{
    public partial class MockDataForBusinessTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Businesses",
                columns: new[] { "Id", "GroupIds", "Location", "Name", "PhoneNumber", "Premises", "Prices" },
                values: new object[] { 1, new[] { 1, 2 }, "Testaajakatu 3", "Tero Testaajan Kuntosali", "040 123 4567", new[] { "Kuntosali", "Uimahalli" }, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Businesses",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}

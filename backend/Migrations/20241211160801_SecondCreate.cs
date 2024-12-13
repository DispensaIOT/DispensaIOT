using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispensa.Migrations
{
    /// <inheritdoc />
    public partial class SecondCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nome",
                table: "Sensor");

            migrationBuilder.RenameColumn(
                name: "Tipo",
                table: "Sensor",
                newName: "Produto");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataHora",
                table: "Lista",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataHora",
                table: "Lista");

            migrationBuilder.RenameColumn(
                name: "Produto",
                table: "Sensor",
                newName: "Tipo");

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "Sensor",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}

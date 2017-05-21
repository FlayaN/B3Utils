using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Api.Migrations
{
    public partial class UpdatedModelAfterGoogle2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Activities");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastRecordedDate",
                table: "Users",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Activities",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Activities");

            migrationBuilder.AlterColumn<string>(
                name: "LastRecordedDate",
                table: "Users",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<string>(
                name: "EndDate",
                table: "Activities",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StartDate",
                table: "Activities",
                nullable: true);
        }
    }
}

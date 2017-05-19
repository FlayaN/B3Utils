using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Api.Migrations
{
    public partial class ImprovedModelAfterGoogle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastTimeStamp",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TimeStamp",
                table: "Activities");

            migrationBuilder.AddColumn<string>(
                name: "LastRecordedDate",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndDate",
                table: "Activities",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StartDate",
                table: "Activities",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastRecordedDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Activities");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastTimeStamp",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeStamp",
                table: "Activities",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}

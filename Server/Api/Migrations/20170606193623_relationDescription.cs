using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Api.Migrations
{
    public partial class relationDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CompanyReferences",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CompanyPersonReferences",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "CompanyReferences");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "CompanyPersonReferences");
        }
    }
}

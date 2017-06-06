using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Api.Migrations
{
    public partial class ReferenceCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompanyReferences",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyReferences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompanyPersonReferences",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CompanyId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Position = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyPersonReferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyPersonReferences_CompanyReferences_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "CompanyReferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserPersonMaps",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    ReferencePersonId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPersonMaps", x => new { x.UserId, x.ReferencePersonId });
                    table.ForeignKey(
                        name: "FK_UserPersonMaps_CompanyPersonReferences_ReferencePersonId",
                        column: x => x.ReferencePersonId,
                        principalTable: "CompanyPersonReferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserPersonMaps_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanyPersonReferences_CompanyId",
                table: "CompanyPersonReferences",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPersonMaps_ReferencePersonId",
                table: "UserPersonMaps",
                column: "ReferencePersonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPersonMaps");

            migrationBuilder.DropTable(
                name: "CompanyPersonReferences");

            migrationBuilder.DropTable(
                name: "CompanyReferences");
        }
    }
}

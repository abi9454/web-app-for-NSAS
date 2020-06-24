using Microsoft.EntityFrameworkCore.Migrations;

namespace NSAS.Migrations
{
    public partial class EventXuserOrganizer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOrganizer",
                table: "EventXUser",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOrganizer",
                table: "EventXUser");
        }
    }
}

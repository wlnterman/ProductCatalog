using Microsoft.EntityFrameworkCore.Migrations;

namespace ProductCatalog.Data.Migrations
{
    public partial class AddApartment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApartmentId",
                table: "Payments",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Apartments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apartments", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_ApartmentId",
                table: "Payments",
                column: "ApartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Apartments_ApartmentId",
                table: "Payments",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Apartments_ApartmentId",
                table: "Payments");

            migrationBuilder.DropTable(
                name: "Apartments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_ApartmentId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "ApartmentId",
                table: "Payments");
        }
    }
}

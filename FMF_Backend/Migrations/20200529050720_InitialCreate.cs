using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FMF_Backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "productModel",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    productName = table.Column<string>(nullable: true),
                    picture = table.Column<string>(nullable: true),
                    barScan = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Rating = table.Column<int>(nullable: false),
                    Vehicle = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    Shopper = table.Column<bool>(nullable: false),
                    Driver = table.Column<bool>(nullable: false),
                    GoogleId = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Store1s",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductName = table.Column<string>(nullable: true),
                    Supplier = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    Quantity = table.Column<double>(nullable: false),
                    ProdId = table.Column<long>(nullable: false),
                    Weight = table.Column<double>(nullable: false),
                    Barcode = table.Column<long>(nullable: false),
                    Picture = table.Column<string>(nullable: true),
                    productModelId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Store1s", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Store1s_productModel_productModelId",
                        column: x => x.productModelId,
                        principalTable: "productModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Store2s",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductName = table.Column<string>(nullable: true),
                    Supplier = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    ProdId = table.Column<long>(nullable: false),
                    Quantity = table.Column<double>(nullable: false),
                    Weight = table.Column<double>(nullable: false),
                    Barcode = table.Column<long>(nullable: false),
                    Picture = table.Column<string>(nullable: true),
                    productModelId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Store2s", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Store2s_productModel_productModelId",
                        column: x => x.productModelId,
                        principalTable: "productModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Store3s",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductName = table.Column<string>(nullable: true),
                    Supplier = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    ProdId = table.Column<long>(nullable: false),
                    Quantity = table.Column<double>(nullable: false),
                    Weight = table.Column<double>(nullable: false),
                    Barcode = table.Column<long>(nullable: false),
                    Picture = table.Column<string>(nullable: true),
                    productModelId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Store3s", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Store3s_productModel_productModelId",
                        column: x => x.productModelId,
                        principalTable: "productModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderLists",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ShopperId = table.Column<long>(nullable: true),
                    OrderTime = table.Column<string>(nullable: true),
                    RequestedTime = table.Column<string>(nullable: true),
                    TotalPrice = table.Column<double>(nullable: false),
                    TotalWeight = table.Column<double>(nullable: false),
                    Available = table.Column<bool>(nullable: false),
                    DriverName = table.Column<string>(nullable: true),
                    DriverNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderLists_Profiles_ShopperId",
                        column: x => x.ShopperId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DriverId = table.Column<long>(nullable: true),
                    DeliveryTime = table.Column<DateTime>(nullable: false),
                    OrderListId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Profiles_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_OrderLists_OrderListId",
                        column: x => x.OrderListId,
                        principalTable: "OrderLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductName = table.Column<string>(nullable: true),
                    Supplier = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    Quantity = table.Column<double>(nullable: false),
                    Weight = table.Column<double>(nullable: false),
                    Barcode = table.Column<long>(nullable: false),
                    ProdId = table.Column<long>(nullable: false),
                    Picture = table.Column<string>(nullable: true),
                    productModelId = table.Column<long>(nullable: true),
                    OrderListId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_OrderLists_OrderListId",
                        column: x => x.OrderListId,
                        principalTable: "OrderLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Products_productModel_productModelId",
                        column: x => x.productModelId,
                        principalTable: "productModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderLists_ShopperId",
                table: "OrderLists",
                column: "ShopperId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DriverId",
                table: "Orders",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderListId",
                table: "Orders",
                column: "OrderListId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_OrderListId",
                table: "Products",
                column: "OrderListId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_productModelId",
                table: "Products",
                column: "productModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Store1s_productModelId",
                table: "Store1s",
                column: "productModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Store2s_productModelId",
                table: "Store2s",
                column: "productModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Store3s_productModelId",
                table: "Store3s",
                column: "productModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Store1s");

            migrationBuilder.DropTable(
                name: "Store2s");

            migrationBuilder.DropTable(
                name: "Store3s");

            migrationBuilder.DropTable(
                name: "OrderLists");

            migrationBuilder.DropTable(
                name: "productModel");

            migrationBuilder.DropTable(
                name: "Profiles");
        }
    }
}

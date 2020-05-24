﻿// <auto-generated />
using System;
using FMF_Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FMF_Backend.Migrations
{
    [DbContext(typeof(FMFDbContext))]
    [Migration("20200526194755_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("FMF_Backend.Models.Order", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DeliveryTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long?>("DriverId")
                        .HasColumnType("bigint");

                    b.Property<int?>("OrderListId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DriverId");

                    b.HasIndex("OrderListId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("FMF_Backend.Models.OrderList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("OrderTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("RequestedTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long?>("ShopperId")
                        .HasColumnType("bigint");

                    b.Property<double>("TotalPrice")
                        .HasColumnType("double precision");

                    b.Property<double>("TotalWeight")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("ShopperId");

                    b.ToTable("OrderLists");
                });

            modelBuilder.Entity("FMF_Backend.Models.Product", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("OrderListId")
                        .HasColumnType("integer");

                    b.Property<double>("PriceFMF")
                        .HasColumnType("double precision");

                    b.Property<string>("ProductName")
                        .HasColumnType("text");

                    b.Property<double>("Quantity")
                        .HasColumnType("double precision");

                    b.Property<string>("Supplier")
                        .HasColumnType("text");

                    b.Property<double>("Weight")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("OrderListId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("FMF_Backend.Models.Profile", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<bool>("Driver")
                        .HasColumnType("boolean");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<long>("GoogleId")
                        .HasColumnType("bigint");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("Notes")
                        .HasColumnType("text");

                    b.Property<int>("Phone")
                        .HasColumnType("integer");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<bool>("Shopper")
                        .HasColumnType("boolean");

                    b.Property<string>("Vehicle")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("FMF_Backend.Models.Store1", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<string>("ProductName")
                        .HasColumnType("text");

                    b.Property<string>("Supplier")
                        .HasColumnType("text");

                    b.Property<double>("Weight")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.ToTable("Store1s");
                });

            modelBuilder.Entity("FMF_Backend.Models.Store2", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<string>("ProductName")
                        .HasColumnType("text");

                    b.Property<string>("Supplier")
                        .HasColumnType("text");

                    b.Property<double>("Weight")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.ToTable("Store2s");
                });

            modelBuilder.Entity("FMF_Backend.Models.Order", b =>
                {
                    b.HasOne("FMF_Backend.Models.Profile", "Driver")
                        .WithMany()
                        .HasForeignKey("DriverId");

                    b.HasOne("FMF_Backend.Models.OrderList", "OrderList")
                        .WithMany()
                        .HasForeignKey("OrderListId");
                });

            modelBuilder.Entity("FMF_Backend.Models.OrderList", b =>
                {
                    b.HasOne("FMF_Backend.Models.Profile", "Shopper")
                        .WithMany()
                        .HasForeignKey("ShopperId");
                });

            modelBuilder.Entity("FMF_Backend.Models.Product", b =>
                {
                    b.HasOne("FMF_Backend.Models.OrderList", null)
                        .WithMany("Products")
                        .HasForeignKey("OrderListId");
                });
#pragma warning restore 612, 618
        }
    }
}
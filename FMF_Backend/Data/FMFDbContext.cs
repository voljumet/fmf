using Microsoft.EntityFrameworkCore;
using FMF_Backend.Models;

namespace FMF_Backend.Data {
    public class FMFDbContext : DbContext {
        public FMFDbContext(DbContextOptions<FMFDbContext> options) : base(options){}
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Product> CheckOne { get; set; }
        public DbSet<Product> CheckTwo { get; set; }
        public DbSet<Product> CheckThree { get; set; }

        public DbSet<OrderList> OrderLists { get; set; }
        public DbSet<Store1> Store1s { get; set; }
        public DbSet<Store2> Store2s { get; set; }

    }
}
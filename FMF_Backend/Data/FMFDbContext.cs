using Microsoft.EntityFrameworkCore;
using FMF_Backend.Models;

namespace FMF_Backend.Data {
    public class FMFDbContext : DbContext {
        public FMFDbContext(DbContextOptions<FMFDbContext> options) : base(options){}

        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Customer> Customers { get; set; }

        public DbSet<GroceryList> GroceryLists { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<OrderLine> OrderLines { get; set; }

        public DbSet<Store1> Store1s { get; set; }

        public DbSet<Store2> Store2s { get; set; }
    }
}
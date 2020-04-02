using Microsoft.EntityFrameworkCore;

namespace FMF_Backend.Models {
    public class FMFContext : DbContext {
        public FMFContext(DbContextOptions<FMFContext> options) : base(options){}

        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Customer> Customer { get; set; }

        public DbSet<GroceryList> GroceryLists { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<OrderLine> OrderLines { get; set; }

        public DbSet<Store1> Store1s { get; set; }

        public DbSet<Store2> Store2s { get; set; }
    }
}
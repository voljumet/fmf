using System;
using System.Collections.Generic;
using FMF_Backend.Models;

namespace FMF_Backend.Data{
    public static class FMFDbInitializer{
        public static void Initialize(FMFDbContext context){
            // Delete the database before we initialize it.
            // This is common to do during development.
            context.Database.EnsureDeleted();

            // Make sure the database and tables exist
            context.Database.EnsureCreated();

            context.Customers.AddRange(new List<Customer>{
                new Customer("Rune","Laursen","Juice veien 69")
            });

            context.Products.AddRange(new List<Product>{
                new Product("Melkesjokolade","Freia", 42,29,0)
            });

        }

        internal static void initialize(FMFDbContext context)
        {
            throw new NotImplementedException();
        }
    }
}
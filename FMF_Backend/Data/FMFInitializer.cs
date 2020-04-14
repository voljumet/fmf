using System;
using System.Collections.Generic;
using System.Linq;
using FMF_Backend.Models;

namespace FMF_Backend.Data{
    public static class DbInitializer{
        public static void Initialize(FMFDbContext context){
            // Delete the database before we initialize it.
            // This is common to do during development.
            context.Database.EnsureDeleted();

            // Make sure the database and tables exist
            context.Database.EnsureCreated();

            context.Customers.AddRange(new List<Customer>{
                new Customer("Rune Alexander","Laursen","Juice veien 69"),
                new Customer("Ole","Gunvaldsen","Appveien 420"),
                new Customer("Anne Lise","Skjæveland","UiA gate 42"),
                new Customer("Peshang","Alo","Gullveien 1337"),
                new Customer("Morteza","Haidari","Klepp 3")
            });

            context.Drivers.AddRange(new List<Driver>{
                new Driver("Rune Alexander","Laursen",12345678,"Ryggsekk"),
                new Driver("Ole","Gunvaldsen",78945612,"Personbil"),
                new Driver("Anne Lise","Skjæveland",65412398,"Kassebil"),
                new Driver("Peshang","Alo",46827913,"Sykkel"),
                new Driver("Morteza","Haidari",96325874,"Motorsykkel")
            });

            context.Store1s.AddRange(new List<Store1>{
                new Store1("Melkesjokolade","Freia", 42),
                new Store1("Lett Melk","Q-Meieriene", 23),
                new Store1("Lett Melk","Tine", 24),
                new Store1("Pilsner","CB", 34),
                new Store1("Lyspære 10W","Osram", 23),
                new Store1("Grandiosa","Stabburet", 45)
            });

            context.Store2s.AddRange(new List<Store2>{
                new Store2("Melkesjokolade","Freia", 39),
                new Store2("Lett Melk","Q-Meieriene", 24),
                new Store2("Lett Melk","Tine", 25),
                new Store2("Pilsner","CB", 32),
                new Store2("Lyspære 10W","Osram", 25),
                new Store2("Grandiosa","Stabburet", 49)
            });

            context.SaveChanges();
            
            var store1s = context.Store1s.ToList();
            var store2s = context.Store2s.ToList();


        }

        internal static void initialize(FMFDbContext context)
        {
            throw new NotImplementedException();
        }
    }
}
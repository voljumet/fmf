using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using FMF_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace FMF_Backend.Data{
    public static class DbInitializer{
        public static void Initialize(FMFDbContext context, bool development){

            if (!development){
                context.Database.Migrate();
                return;
            }


            // Delete the database before we initialize it.
            // This is common to do during development.
            context.Database.EnsureDeleted();

            // Make sure the database and tables exist
            context.Database.EnsureCreated();

            context.Profiles.AddRange(new List<Profile>{
                new Profile("Rune Alexander","Laursen","Kristian IVs gate 17, 4612 Kristiansand", "93598", 7, "blablabla", "105797538915471218890", "email1"),
                new Profile("Ole","Gunvaldsen","Jon Lilletuns Vei 17, 4879 Grimstad", "93598", 7, "blablabla", "1234567890", "email2"),
                new Profile("Anne Lise","Skjæveland","Lagerveien 12, 3030 Stavanger", "93598", 7, "blablabla", "33333333333", "email3"),
                new Profile("Peshang","Alo","Venneslaveien 7, 4688 Vennesla", "93598", 7, "blablabla", "113995679151429881", "email4"),
                new Profile("Morteza","Haidari","Tønnevoldsgate 44b, 4879 Grimstad", "93598", 7, "blablabla", "555555555", "email5")
            });

            string store1 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            List<Store1> store1Items = JsonConvert.DeserializeObject<List<Store1>>(store1);

            foreach (var item in store1Items){
                context.Store1s.AddRange(new List<Store1>{
                    new Store1(item.ProductName,item.Supplier, item.Price, item.Weight)
                });
            }

            string store2 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store2");
            List<Store2> store2Items = JsonConvert.DeserializeObject<List<Store2>>(store2);

            foreach (var item in store2Items){
                context.Store2s.AddRange(new List<Store2>{
                    new Store2(item.ProductName,item.Supplier, item.Price, item.Weight)
                });
            }

            context.SaveChanges();

            var profiles = context.Profiles.ToList();

            var store1s = context.Store1s.ToList();
            var store2s = context.Store2s.ToList();

            foreach (var item1 in store2s){
                foreach (var item2 in store1s){
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier){
                        if(item1.Price <= item2.Price){
                            context.Products.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        } else {
                            context.Products.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }       
                    }
                }
            }
            context.SaveChanges();

            var products = context.Products.ToList();

            List<Product> produkter = new List<Product>();

            produkter.Add(products[0]);
            produkter.Add(products[2]);
            produkter.Add(products[5]);


            context.OrderLists.AddRange(new List<OrderList>{
                new OrderList(produkter[0], profiles[0], DateTime.Now, DateTime.UtcNow, 123, 6, true, null, null),
                new OrderList(produkter[0], profiles[1], DateTime.Now, DateTime.UtcNow, 1337, 55, true, null,null),
                new OrderList(produkter[0], profiles[2], DateTime.Now, DateTime.UtcNow, 420, 69, true,null,null),
                new OrderList(produkter[0], profiles[3], DateTime.Now, DateTime.UtcNow, 20, 0.5, true,null,null),
                new OrderList(produkter[0], profiles[4], DateTime.Now, DateTime.UtcNow, 101, 1, true,null,null)
            });


            context.SaveChanges();
            var orderList = context.OrderLists.ToList();



            context.Orders.AddRange(new List<Order>{
                new Order(profiles[0], orderList[2], DateTime.UtcNow),
                new Order(profiles[1], orderList[2], DateTime.UtcNow),
                new Order(profiles[2], orderList[3], DateTime.UtcNow),
                new Order(profiles[3], orderList[0], DateTime.UtcNow),
                new Order(profiles[4], orderList[1], DateTime.UtcNow)
            });

            context.SaveChanges();
            
            var order = context.Orders.ToList();            

        }

        internal static void initialize(FMFDbContext context)
        {
            throw new NotImplementedException();
        }
    }
}
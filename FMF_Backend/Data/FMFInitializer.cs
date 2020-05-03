using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using FMF_Backend.Models;
using Newtonsoft.Json;

namespace FMF_Backend.Data{
    public static class DbInitializer{

        public static void Initialize(FMFDbContext context){
            // Delete the database before we initialize it.
            // This is common to do during development.
            context.Database.EnsureDeleted();

            // Make sure the database and tables exist
            context.Database.EnsureCreated();

            context.Profiles.AddRange(new List<Profile>{
                new Profile("Rune Alexander","Laursen","Juice veien 69"),
                new Profile("Ole","Gunvaldsen","Appveien 420"),
                new Profile("Anne Lise","Skjæveland","UiA gate 42"),
                new Profile("Peshang","Alo","Gullveien 1337"),
                new Profile("Morteza","Haidari","Klepp 3")
            });

            string store1 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            List<Store1> store1Items = JsonConvert.DeserializeObject<List<Store1>>(store1);

            foreach (var item in store1Items){
                context.Store1s.AddRange(new List<Store1>{
                    new Store1(item.ProductName,item.Supplier, item.Price)
                });
            }

            string store2 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store2");
            List<Store2> store2Items = JsonConvert.DeserializeObject<List<Store2>>(store2);

            foreach (var item in store2Items){
                context.Store2s.AddRange(new List<Store2>{
                    new Store2(item.ProductName,item.Supplier, item.Price)
                });
            }

            context.SaveChanges();
            
            var store1s = context.Store1s.ToList();
            var store2s = context.Store2s.ToList();

            foreach (var item1 in store2s){
                foreach (var item2 in store1s){
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier){
                        if(item1.Price <= item2.Price){
                            context.Products.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item2.Price)
                            });
                        } else {
                            context.Products.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item1.Price)
                            });
                        }       
                    }
                }
            }
            context.SaveChanges();

            var profiles = context.Profiles.ToList();
            var products = context.Products.ToList();


            context.OrderLists.AddRange(new List<OrderList>{
                new OrderList(products[1], 3),
                new OrderList(products[2], 10),
                new OrderList(products[4], 6),
                new OrderList(products[3], 1)

            });

            context.SaveChanges();

            double total1 = 
            products[0].PriceFMF*3 +
            products[2].PriceFMF*10 +
            products[4].PriceFMF*6 +
            products[3].PriceFMF*1;

            
            var orderList = context.OrderLists.ToList();
            
            context.SaveChanges();

            context.Orders.AddRange(new List<Order>{
                new Order(profiles[1], DateTime.UtcNow, orderList[0],total1)
            });

            context.SaveChanges();

        }

        internal static void initialize(FMFDbContext context)
        {
            throw new NotImplementedException();
        }
    }
}
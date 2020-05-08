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
                new Profile("Rune Alexander","Laursen","Kristian IVs gate 17, 4612 Kristiansand"),
                new Profile("Ole","Gunvaldsen","Jon Lilletuns Vei 17, 4879 Grimstad"),
                new Profile("Anne Lise","Skjæveland","Lagerveien 12, 3030 Stavanger"),
                new Profile("Peshang","Alo","Venneslaveien 7, 4688 Vennesla"),
                new Profile("Morteza","Haidari","Tønnevoldsgate 44b, 4879 Grimstad")
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
            var orderList = context.OrderLists.ToList();
            var order = context.Orders.ToList();

            var profiles = context.Profiles.ToList();

            var order1 = new Order();
            var orderList1 = new OrderList();

            order1.Driver = profiles[0];
            orderList1.Shopper = profiles[1];
            // orderList1.Products = products[0];


            orderList.AddRange(new List<OrderList>{
                new OrderList(products[1], 3, profiles[2], DateTime.UtcNow, 1337,55),
            });


           
            
            context.SaveChanges();

            context.Orders.AddRange(new List<Order>{
                new Order(profiles[1], orderList[0], DateTime.UtcNow)
            });
            
            context.Orders.Add(order1);

            context.SaveChanges();

        }

        internal static void initialize(FMFDbContext context)
        {
            throw new NotImplementedException();
        }
    }
}
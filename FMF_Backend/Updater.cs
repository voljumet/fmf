using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using FMF_Backend.Models;
using Newtonsoft.Json;
using FMF_Backend.Data;
namespace FMF_Backend{
    public static class Updater{
                public static void Update(FMFDbContext context){
            // Delete the database before we initialize it.
            // This is common to do during development.
        
// store 1
/* Må kjøres en gang om dagen */
            string store1 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            List<Store1> store1Items = JsonConvert.DeserializeObject<List<Store1>>(store1);

            foreach (var item in store1Items){
                context.Store1s.AddRange(new List<Store1>{
                    new Store1(item.ProductName,item.Supplier, item.Price, item.Weight)
                });
            }

            /* Hente updater inni backgroundtasks 
            * teste the shit.
            */

            context.SaveChanges();

            var store1s = context.Store1s.ToList();
            var store2s = context.Store2s.ToList();
            var store3s = context.Store1s.ToList();
            var store4s = context.Store2s.ToList();
            var store5s = context.Store1s.ToList();

            /* Change item prices */
            Console.WriteLine($"Store item price before: ", store1s[1].Price);
            foreach (var item in store1s){
                item.Price = item.Price * 0.01;
            }
            Console.WriteLine($"Store item price change: ", store1s[1].Price);

            // sammenligner store 1 og store 2 si pris.
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
            /*  Slutt på blokken som må kjøres en gang om dagen. */

        }
    }
}
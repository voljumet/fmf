using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using FMF_Backend.Models;
using Newtonsoft.Json;
using FMF_Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace FMF_Backend{

    public static class Updater{

        
    
        public static void Update(FMFDbContext context){
            // Delete the database before we initialize it.
            // This is common to do during development.

            context.Store1s.RemoveRange(context.Store1s);



            // context.Database.ExecuteStoreCommand("DBCC CHECKIDENT('BibContents',RESEED,1);");

            context.Database.ExecuteSqlCommand("DBCC CHECKIDENT('Store1s',RESEED,1)");



            // context.delete(Store1, null, null);

            // Funker, men id vokser
            // var all = from c in context.Store1s select c;
            // context.Store1s.RemoveRange(all);
            context.SaveChanges();
        
        
// store 1
/* Må kjøres en gang om dagen */
            string store1 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            List<Store1> store1Items = JsonConvert.DeserializeObject<List<Store1>>(store1);

            foreach (var item in store1Items){
                context.Store1s.AddRange(new List<Store1>{
                    new Store1(item.ProductName,item.Supplier, item.Price, item.Weight)
                });
            }


            context.SaveChanges();

            var store1s = context.Store1s.ToList();
            var store2s = context.Store1s.ToList();
            var store3s = context.Store1s.ToList();
            var store4s = context.Store1s.ToList();
            var store5s = context.Store1s.ToList();

            /* Change item prices */
            Console.WriteLine("Store item price before: {0:C}\n", store1s[1].Price);
            foreach (var item in store1s){
                item.Price = item.Price * 1.02;
            }
            foreach (var item in store3s){
                item.Price = item.Price * 1.01;
            }
            foreach (var item in store4s){
                item.Price = item.Price * 0.98;
            }

            foreach (var item in store5s){ item.Price = item.Price * 0.99; }
/* Here comes the changes */

            // sammenligner store 1 og store 2 si pris.
            foreach (var item1 in store2s){
                foreach (var item2 in store1s){
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier){
                        if(item1.Price <= item2.Price){
                            context.CheckOne.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        } else {
                            context.CheckOne.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }       
                    }
                }
            }
            context.SaveChanges();
            /*  Slutt på blokken som må kjøres en gang om dagen. */



            var CheckOne = context.CheckOne.ToList();
            var CheckTwo = context.CheckTwo.ToList();


            foreach (var item1 in store3s)
            {
                foreach (var item2 in CheckOne)
                {
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier)
                    {
                        if (item1.Price <= item2.Price)
                        {
                            context.CheckTwo.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        }
                        else
                        {
                            context.CheckTwo.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }
                    }
                }
            }
            context.CheckOne.RemoveRange();
            context.SaveChanges();

            foreach (var item1 in store4s)
            {
                foreach (var item2 in CheckTwo)
                {
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier)
                    {
                        if (item1.Price <= item2.Price)
                        {
                            context.CheckOne.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        }
                        else
                        {
                            context.CheckOne.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }
                    }
                }
            }

            context.Products.RemoveRange();
            context.SaveChanges();

            foreach (var item1 in store5s)
            {
                foreach (var item2 in CheckOne)
                {
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier)
                    {
                        if (item1.Price <= item2.Price)
                        {
                            context.Products.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        }
                        else
                        {
                            context.Products.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }
                    }
                }
            }
            context.SaveChanges();

        }
    }
}
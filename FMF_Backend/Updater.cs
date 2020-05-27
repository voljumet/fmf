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
            context.Store2s.RemoveRange(context.Store2s);           
            context.Store3s.RemoveRange(context.Store3s);           
            context.Products.RemoveRange(context.Products);           
        
            context.SaveChanges();
        
        
            // Fech til liste 1 
            string store1 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            List<Store1> store1Items = JsonConvert.DeserializeObject<List<Store1>>(store1);

            foreach (var item in store1Items){
                context.Store1s.AddRange(new List<Store1>{
                    new Store1(item.ProductName,item.Supplier, item.Price, item.Weight)
                });
            }

            string store2 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            List<Store2> store2Items = JsonConvert.DeserializeObject<List<Store2>>(store2);

            foreach (var item in store2Items){
                context.Store2s.AddRange(new List<Store2>{
                    new Store2(item.ProductName,item.Supplier, item.Price+1, item.Weight)
                });
            }
            
            // string store3 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            // List<Store3> store3Items = JsonConvert.DeserializeObject<List<Store3>>(store3);

            // foreach (var item in store3Items){
            //     context.Store3s.AddRange(new List<Store3>{
            //         new Store3(item.ProductName,item.Supplier, item.Price, item.Weight)
            //     });
            // }

            context.SaveChanges();

            var storeOne = context.Store1s.ToList();
            var storeTwo = context.Store2s.ToList();
            var storeThree = context.Store3s.ToList();
            var products = context.Products.ToList();

            context.SaveChanges();
            
            // sammenligner store 1 og store 2 si pris.
            foreach (var item1 in storeOne){
                foreach (var item2 in storeTwo){
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier){
                        if(item1.Price <= item2.Price){
                            storeThree.AddRange(new List<Store3>{
                                new Store3(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        } else {
                            storeThree.AddRange(new List<Store3>{
                                new Store3(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }       
                    }
                }
            }

            context.Store2s.RemoveRange(context.Store2s);
            storeTwo.Clear();
            foreach (var item in storeOne){ item.Price = item.Price +2; }
            context.SaveChanges();
            
            /*  Slutt på blokken som må kjøres en gang om dagen. */

            foreach (var item1 in storeThree){
                foreach (var item2 in storeOne){
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier){
                        if (item1.Price <= item2.Price){
                            storeTwo.AddRange(new List<Store2>{
                                new Store2(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        }else{
                            storeTwo.AddRange(new List<Store2>{
                                new Store2(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }
                    }
                }
            }

            context.Store1s.RemoveRange(context.Store1s);
            context.Store3s.RemoveRange(context.Store3s);
            storeOne.Clear();
            storeThree.Clear();

            /* stores in store 4, but add the real deal in store1 */
            // Fech til liste 1 
            string store4 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            List<Store1> store4Items = JsonConvert.DeserializeObject<List<Store1>>(store4);

            foreach (var item in store4Items){
                context.Store1s.AddRange(new List<Store1>{
                    new Store1(item.ProductName,item.Supplier, item.Price-2, item.Weight)
                });
            }
            // Fetch ----------------

            context.SaveChanges();
            storeOne = context.Store1s.ToList();
            context.SaveChanges();

            foreach (var item1 in storeTwo){
                foreach (var item2 in storeOne){
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier){
                        if (item1.Price <= item2.Price){
                            storeThree.AddRange(new List<Store3>{
                                new Store3(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        }else{
                            storeThree.AddRange(new List<Store3>{
                                new Store3(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }
                    }
                }
            }

            context.Store1s.RemoveRange(context.Store1s);
            context.Store2s.RemoveRange(context.Store2s);
            storeOne.Clear();
            storeTwo.Clear();

            string store5 = new WebClient().DownloadString("https://my-json-server.typicode.com/voljumet/demo/Store1");
            List<Store1> store5Items = JsonConvert.DeserializeObject<List<Store1>>(store5);

            foreach (var item in store5Items){
                context.Store1s.AddRange(new List<Store1>{
                    new Store1(item.ProductName,item.Supplier, item.Price-3, item.Weight)
                });
            }

            context.SaveChanges();
            storeOne = context.Store1s.ToList();
            context.SaveChanges();

            foreach (var item1 in storeThree){
                foreach (var item2 in storeOne){
                    if (item2.ProductName == item1.ProductName && item2.Supplier == item1.Supplier){
                        if (item1.Price <= item2.Price){
                            context.Products.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item2.Price, item1.Weight)
                            });
                        }else{
                            context.Products.AddRange(new List<Product>{
                                new Product(item1.ProductName, item1.Supplier, item1.Price, item1.Weight)
                            });
                        }
                    }
                }
            }

            context.Store1s.RemoveRange(context.Store1s);                 
            context.Store3s.RemoveRange(context.Store3s);
            storeThree.Clear();
            storeOne.Clear();
            context.SaveChanges();

        }
    }
}
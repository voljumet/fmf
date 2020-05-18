using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models{
    public class OrderList{
        public OrderList() {}
        public OrderList(Product product, Profile shopper, DateTime orderTime, 
        DateTime requestedTime, double totalPrice, double totalWeight){

            // Products = new List<Product>();
            Product = product;
            Shopper = shopper;
            OrderTime = DateTime.UtcNow;
            RequestedTime = DateTime.UtcNow;
            TotalPrice = totalPrice;
            TotalWeight = totalWeight;
        }

        public int Id { get; set; }
        public Profile Shopper { get; set; }
        public Product Product { get; set; }
        // public List<Product> Products { get; set; }

        [DataType(DataType.Date)]
        public DateTime OrderTime { get; set; }

        [DataType(DataType.Date)]
        public DateTime RequestedTime { get; set; }

        [DataType(DataType.Currency)]
        public double TotalPrice { get; set; }
        public double TotalWeight { get; set; }



    }
}

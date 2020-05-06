using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models{
    public class OrderList{
        public OrderList() {}
        public OrderList(Product product, double quantity, Profile shopper, 
        DateTime orderTime, double totalPrice, double totalWeight){

            Products = new List<Product>();
            OrderTime = DateTime.UtcNow;
            totalPrice = TotalPrice;
            totalWeight = TotalWeight;
        }

        public int Id { get; set; }
        public Profile Shopper { get; set; }
        public List<Product> Products { get; set; }

        [DataType(DataType.Date)]
        public DateTime OrderTime { get; set; }

        [DataType(DataType.Date)]
        public DateTime RequestedTime { get; set; }

        [DataType(DataType.Currency)]
        public double TotalPrice { get; set; }
        public double TotalWeight { get; set; }



    }
}

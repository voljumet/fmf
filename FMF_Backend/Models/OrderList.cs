using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models{
    public class OrderList{
        public OrderList() {}
        public OrderList(Product product, Profile shopper, DateTime orderTime, 
        DateTime requestedTime, double totalPrice, double totalWeight, Boolean available){

           Products = new List<Product>();
           // Product = product;
            Shopper = shopper;
            TotalPrice = totalPrice;
            TotalWeight = totalWeight;
            Available = available;
        }

        public int Id { get; set; }
      
        public Profile Shopper { get; set; }
        
        //public Product Product { get; set; }
        
         public List<Product> Products { get; set; }
     
        public String OrderTime { get; set; }
        
        public String RequestedTime { get; set; }

        [DataType(DataType.Currency)]
       
        public double TotalPrice { get; set; }
        
        public double TotalWeight { get; set; }

        public Boolean Available{ get; set; }



    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models {

    public class Order {

        public Order(){}

        public Order(Profile profile, DateTime orderTime, OrderList orderList, double finalCheck){

            Profile = profile;
            OrderTime = DateTime.UtcNow;
            OrderLists = new List<OrderList>();
            finalCheck = FinalCheck;
        }

        public long Id { get; set; }
        public Profile Profile { get; set; }
        
        public double FinalCheck { get; set; }

        [DataType(DataType.Date)]
        public DateTime OrderTime { get; set; }
        public List<OrderList> OrderLists { get; set; }
        
    }
}
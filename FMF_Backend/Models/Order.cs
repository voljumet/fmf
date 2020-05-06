using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace FMF_Backend.Models {
    public class Order {
        public Order(){}
        public Order(Profile driver, OrderList orderList, DateTime deliveryTime){
            Driver = driver;
            OrderList = orderList;
            DeliveryTime = deliveryTime;

        }

        public long Id { get; set; }
        public Profile Driver { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime DeliveryTime { get; set; }
        public OrderList OrderList { get; set; }
    
    }
}
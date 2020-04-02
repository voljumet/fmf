using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models {

public class Order {

    public Order(){}

    public Order(GroceryList groceryList, Driver driver, decimal finalCheck){

        groceryList = GroceryList;
        driver = Driver;
        OrderTime = DateTime.UtcNow;
        OrderLines = new List<OrderLine>();
        finalCheck = FinalCheck;
    }

    public long Id { get; set; }
    public Driver Driver { get; set; }
    public GroceryList GroceryList { get; set; }
    public Customer Customer { get; set; }
    public decimal FinalCheck { get; set; }
    
    [DataType(DataType.Date)]
    public DateTime OrderTime { get; set; }

    public List<OrderLine> OrderLines { get; set; }
    
    
}
}
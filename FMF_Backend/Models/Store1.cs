using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models{
public class Store1 {
    public Store1(string productName, string supplier, double price, double weight ){
            ProductName = productName;
            Supplier = supplier;
            Price = price;
            Weight = weight;
            Quantity = 0;
        }
        
        public long Id { get; set;}
        public string ProductName { get; set;}
        public string Supplier { get; set;}
        [DataType(DataType.Currency)]
        public double Price { get; set; }
        public double Quantity { get; set;}
        public double Weight { get; set;}
}
}
namespace FMF_Backend.Models{
public class Store1 {
        public Store1(string productName, string supplier, double price){
                        ProductName = productName;
                        Supplier = supplier;
                        Price = price;
                        
        }

        public long Id { get; set; }
        public string ProductName { get; set; }
        public string Supplier { get; set; }
        public double Price { get; set; }

}
}
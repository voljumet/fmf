namespace FMF_Backend.Models{
    public class OrderLine{
        public OrderLine() {}

        public OrderLine(Product product, double amount){
            Product = product;
            Amount = amount;
        }

        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public double Amount { get; set; }
    }
}

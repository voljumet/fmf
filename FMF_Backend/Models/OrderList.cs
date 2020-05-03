namespace FMF_Backend.Models{
    public class OrderList{
        public OrderList() {}

        public OrderList(Product product, double quantity){
            Product = product;
            Quantity = quantity;
        }

        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public double Quantity { get; set; }
    }
}

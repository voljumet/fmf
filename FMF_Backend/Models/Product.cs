using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models {
    public class Product {
        public Product() {}
        public Product(string productName, string supplier, float price, double weight, long barcode, string picture, long prodId ){
            ProductName = productName;
            Supplier = supplier;
            Price = price;
            Weight = weight;
            Quantity = 0;
            Barcode = barcode;
            Picture = picture;
            ProdId = prodId;
        }
        
        public long Id { get; set;}
        public string ProductName { get; set;}
        public string Supplier { get; set;}
        public float Price { get; set; }
        public double Quantity { get; set; }
        public double Weight { get; set; }
        public long Barcode { get; set; }
        public long ProdId { get; set; }
        public string Picture { get; set; }
        public productModel productModel { get; set; }

    }
    public class productModel{
        public long Id { get; set; }
        public string productName { set; get; }
        public string picture { set; get; }
        public long barScan { set; get; }
    }

}
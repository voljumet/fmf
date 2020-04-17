using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models {

public class Product {

    public Product() {}

    public Product(string productName, string supplier, double priceFMF){
        ProductName = productName;
        Supplier = supplier;
        PriceFMF = priceFMF;
    }
    
    public long Id { get; set; }

    public string ProductName { get; set; }
    public string Supplier { get; set; }

    [DataType(DataType.Currency)]
    public double PriceFMF { get; set; }

    
}
}
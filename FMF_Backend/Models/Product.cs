using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models {

public class Product {

    public Product() {}

    public Product(string productName, string supplier, 
    double priceStore1, double priceStore2, double priceFMF){
        productName = ProductName;
        supplier = Supplier;
        priceStore1 = PriceStore1;
        priceStore2 = PriceStore2;
        PriceFMF = PriceFMF;
    }
    
    public long Id { get; set; }

    public string ProductName { get; set; }

    [DataType(DataType.Currency)]
    public double PriceStore1 { get; set; }

    [DataType(DataType.Currency)]   
    public double PriceStore2 { get; set; }

    [DataType(DataType.Currency)]
    public double PriceFMF { get; set; }

    public string Supplier { get; set; }
    
}
}
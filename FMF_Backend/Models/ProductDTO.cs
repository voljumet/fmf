using System.ComponentModel.DataAnnotations;

namespace FMF_Backend.Models {

public class ProductDTO {

    public ProductDTO() {}

    public ProductDTO(string productName, string supplier, double priceFMF){
        productName = ProductName;
        supplier = Supplier;
        PriceFMF = PriceFMF;
    }
    
    public long Id { get; set; }
    public string ProductName { get; set; }
    [DataType(DataType.Currency)]
    public double PriceFMF { get; set; }
    public string Supplier { get; set; }
    
}
}
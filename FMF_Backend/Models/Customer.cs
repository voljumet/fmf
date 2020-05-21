namespace FMF_Backend.Models{
   public class Customer {
      public Customer( string firstName, string lastName, string address, int phone, int rating, string notes){
                        FirstName = firstName;
                        LastName = lastName;
                        Address = address;
                        Phone = phone;
                        Rating = rating;
                        notes = Notes;
                        
                }
                public long Id { get; set; }
                public string FirstName { get; set; }
                public string LastName { get; set; }
                public string Address { get; set; }
                public int Phone { get; set; }
                public int Rating { get; set; }
                public string Notes { get; set; }
        }
}
namespace FMF_Backend{

        public class Customer {

                public Customer(){}

                public Customer(string firstName, string lastName, string Address){}
                public long Id { get; set; }
                public string FirstName { get; set; }
                public string LastName { get; set; }
                public string Address { get; set; }
                public int Phone { get; set; }
                public int Rating { get; set; }
                public string Notes { get; set; }
        }
}
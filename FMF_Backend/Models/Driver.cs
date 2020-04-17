namespace FMF_Backend.Models{
    public class Driver {
        public Driver(string firstName, string lastName, int phone, string vehicle){
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            Vehicle = vehicle;
        }
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public int Phone { get; set; }
        public int Rating { get; set; }
        public string Vehicle { get; set; }
        public string Notes { get; set; }
    }
}
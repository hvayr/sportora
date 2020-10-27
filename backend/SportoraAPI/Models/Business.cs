namespace SportoraAPI.Models
{
    public class Business
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public int[] GroupIds { get; set; }
        public string Location { get; set; }
        public string[] Premises { get; set; }
        private string Password { get; set; }
    }
}
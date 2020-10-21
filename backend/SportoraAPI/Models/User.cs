namespace SportoraAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Nickname { get; set; }
        public string Gender { get; set; }
        public int[] GroupIds { get; set; }
        public string ImageUrl { get; set; }
        private string Password { get; set; }
    }
}
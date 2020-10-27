using Microsoft.EntityFrameworkCore;
using SportoraAPI.Models;

namespace SportoraAPI
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<SportEvent> SportEvents { get; set; }
        
    }
}
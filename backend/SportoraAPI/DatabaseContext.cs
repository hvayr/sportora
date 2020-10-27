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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.UserName).IsUnique();
            modelBuilder.Entity<Business>().HasIndex(b => b.Name).IsUnique();
            modelBuilder.Entity<Business>().HasIndex(b => b.Email).IsUnique();
            modelBuilder.Entity<Club>().HasIndex(c => c.Name).IsUnique();
            modelBuilder.Entity<Group>().HasIndex(g => g.Name).IsUnique();
        }
    }
}
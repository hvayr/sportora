using Microsoft.EntityFrameworkCore;
using SportoraAPI.Models;

namespace SportoraAPI
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User>     Users      { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Club>     Clubs      { get; set; }
        public DbSet<Group>    Groups     { get; set; }
        public DbSet<Event>    Events     { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User
                                                {
                                                    Id       = 1,
                                                    Email    = $"hvayr@hotmail.com",
                                                    Gender   = "Male",
                                                    Name     = "Harri V",
                                                    Nickname = "Harma",
                                                    GroupIds = new []{0, 1},
                                                    ImageUrl = $"www"
                                                });
        }
    }
}
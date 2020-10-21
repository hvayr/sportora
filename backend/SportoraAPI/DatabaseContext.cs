using System.Collections.Generic;
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
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Email = "hvayr@hotmail.com",
                Gender = "Male",
                Name = "Harri V",
                Nickname = "Harma",
                GroupIds = new[] {1},
                ImageUrl = "www"
            });
            modelBuilder.Entity<Business>().HasData(new Business
            {
                Id = 1,
                Name = "Harrin Sali",
                GroupIds = new[] {1, 2},
                Location = "Katu666",
                PhoneNumber = "112",
                Premises = new[] {"Kuntosali", "Uimahalli"},
            });

        }
    }
}
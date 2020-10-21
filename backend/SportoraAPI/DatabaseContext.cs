using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SportoraAPI.Models;
using System.Collections.Generic;

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
            modelBuilder.Entity<Business>().HasData(new Business
                                                {
                                                    Id          = 1,
                                                    Name        = "Tero Testaajan Kuntosali",
                                                    GroupIds    = new []{1, 2},
                                                    Location    = "Testaajakatu 3",
                                                    PhoneNumber = "040 123 4567",
                                                    Premises    = new []{"Kuntosali", "Uimahalli"}
                                                });
        }
    }
}
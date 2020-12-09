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
            modelBuilder.Entity<User>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<User>().Ignore(p => p.UserGroups);

            modelBuilder.Entity<Business>().HasIndex(b => b.Name).IsUnique();
            modelBuilder.Entity<Business>().HasIndex(b => b.Email).IsUnique();
            modelBuilder.Entity<Business>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Business>().Ignore(p => p.AdminUsers);
            modelBuilder.Entity<Business>().Ignore(p => p.GroupsGroups);

            modelBuilder.Entity<Club>().HasIndex(c => c.Name).IsUnique();
            modelBuilder.Entity<Club>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Club>().Ignore(p => p.AdminUsers);
            modelBuilder.Entity<Club>().Ignore(p => p.GroupsGroups);

            modelBuilder.Entity<Group>().HasIndex(g => g.Name).IsUnique();
            modelBuilder.Entity<Group>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Group>().Ignore(p => p.AdminUsers);

            modelBuilder.Entity<SportEvent>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<SportEvent>().Ignore(p => p.AdminUsers);
            modelBuilder.Entity<SportEvent>().Ignore(p => p.ParticipantUsers);
            modelBuilder.Entity<SportEvent>().Ignore(p => p.NumParticipants);

            modelBuilder.Entity<GroupAdmins>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<UserGroups>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<SportEventAdmins>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<SportEventParticipants>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<ClubAdmins>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<ClubGroups>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<BusinessAdmins>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<BusinessGroups>().Property(p => p.Id).ValueGeneratedOnAdd();
        }
    }
}
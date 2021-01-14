﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SportoraAPI;

namespace SportoraAPI.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("SportoraAPI.Models.Business", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Location")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<string[]>("Premises")
                        .HasColumnType("text[]");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Businesses");
                });

            modelBuilder.Entity("SportoraAPI.Models.BusinessAdmins", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("BusinessId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("BusinessId");

                    b.HasIndex("UserId");

                    b.ToTable("BusinessAdmins");
                });

            modelBuilder.Entity("SportoraAPI.Models.BusinessGroups", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("BusinessId")
                        .HasColumnType("integer");

                    b.Property<int?>("GroupId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("BusinessId");

                    b.HasIndex("GroupId");

                    b.ToTable("BusinessGroups");
                });

            modelBuilder.Entity("SportoraAPI.Models.Club", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("SkillLevel")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Clubs");
                });

            modelBuilder.Entity("SportoraAPI.Models.ClubAdmins", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("ClubId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ClubId");

                    b.HasIndex("UserId");

                    b.ToTable("ClubAdmins");
                });

            modelBuilder.Entity("SportoraAPI.Models.ClubGroups", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("ClubId")
                        .HasColumnType("integer");

                    b.Property<int?>("GroupId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ClubId");

                    b.HasIndex("GroupId");

                    b.ToTable("ClubGroups");
                });

            modelBuilder.Entity("SportoraAPI.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("SportoraAPI.Models.GroupAdmins", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("GroupId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("GroupAdmins");
                });

            modelBuilder.Entity("SportoraAPI.Models.SportEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<bool>("ActiveStatus")
                        .HasColumnType("boolean");

                    b.Property<string>("Author")
                        .HasColumnType("text");

                    b.Property<int[]>("AutoInvite")
                        .HasColumnType("integer[]");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("EventCreatedTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EventStartTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Location")
                        .HasColumnType("text");

                    b.Property<int>("MaxParticipants")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SportEvents");
                });

            modelBuilder.Entity("SportoraAPI.Models.SportEventAdmins", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("SportEventId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SportEventId");

                    b.HasIndex("UserId");

                    b.ToTable("SportEventAdmins");
                });

            modelBuilder.Entity("SportoraAPI.Models.SportEventParticipants", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("SportEventId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SportEventId");

                    b.HasIndex("UserId");

                    b.ToTable("SportEventParticipants");
                });

            modelBuilder.Entity("SportoraAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("AuthId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("Gender")
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("NickName")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SportoraAPI.Models.UserGroups", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("GroupId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("SportoraAPI.Models.BusinessAdmins", b =>
                {
                    b.HasOne("SportoraAPI.Models.Business", null)
                        .WithMany("Admins")
                        .HasForeignKey("BusinessId");

                    b.HasOne("SportoraAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SportoraAPI.Models.BusinessGroups", b =>
                {
                    b.HasOne("SportoraAPI.Models.Business", null)
                        .WithMany("Groups")
                        .HasForeignKey("BusinessId");

                    b.HasOne("SportoraAPI.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("SportoraAPI.Models.ClubAdmins", b =>
                {
                    b.HasOne("SportoraAPI.Models.Club", null)
                        .WithMany("Admins")
                        .HasForeignKey("ClubId");

                    b.HasOne("SportoraAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SportoraAPI.Models.ClubGroups", b =>
                {
                    b.HasOne("SportoraAPI.Models.Club", null)
                        .WithMany("Groups")
                        .HasForeignKey("ClubId");

                    b.HasOne("SportoraAPI.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("SportoraAPI.Models.GroupAdmins", b =>
                {
                    b.HasOne("SportoraAPI.Models.Group", null)
                        .WithMany("Admins")
                        .HasForeignKey("GroupId");

                    b.HasOne("SportoraAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SportoraAPI.Models.SportEventAdmins", b =>
                {
                    b.HasOne("SportoraAPI.Models.SportEvent", null)
                        .WithMany("Admins")
                        .HasForeignKey("SportEventId");

                    b.HasOne("SportoraAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SportoraAPI.Models.SportEventParticipants", b =>
                {
                    b.HasOne("SportoraAPI.Models.SportEvent", null)
                        .WithMany("Participants")
                        .HasForeignKey("SportEventId");

                    b.HasOne("SportoraAPI.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SportoraAPI.Models.UserGroups", b =>
                {
                    b.HasOne("SportoraAPI.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("SportoraAPI.Models.User", null)
                        .WithMany("Groups")
                        .HasForeignKey("UserId");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("SportoraAPI.Models.Business", b =>
                {
                    b.Navigation("Admins");

                    b.Navigation("Groups");
                });

            modelBuilder.Entity("SportoraAPI.Models.Club", b =>
                {
                    b.Navigation("Admins");

                    b.Navigation("Groups");
                });

            modelBuilder.Entity("SportoraAPI.Models.Group", b =>
                {
                    b.Navigation("Admins");
                });

            modelBuilder.Entity("SportoraAPI.Models.SportEvent", b =>
                {
                    b.Navigation("Admins");

                    b.Navigation("Participants");
                });

            modelBuilder.Entity("SportoraAPI.Models.User", b =>
                {
                    b.Navigation("Groups");
                });
#pragma warning restore 612, 618
        }
    }
}

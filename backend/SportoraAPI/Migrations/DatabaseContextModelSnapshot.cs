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
                .HasAnnotation("ProductVersion", "5.0.0-rc.2.20475.6");

            modelBuilder.Entity("SportoraAPI.Models.Business", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int[]>("GroupIds")
                        .HasColumnType("integer[]");

                    b.Property<string>("Location")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<string[]>("Premises")
                        .HasColumnType("text[]");

                    b.HasKey("Id");

                    b.ToTable("Businesses");
                });

            modelBuilder.Entity("SportoraAPI.Models.Club", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int[]>("GroupIds")
                        .HasColumnType("integer[]");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("SkillLevel")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Clubs");
                });

            modelBuilder.Entity("SportoraAPI.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("SportoraAPI.Models.SportEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<bool>("ActiveStatus")
                        .HasColumnType("boolean");

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
                        .HasColumnType("text");

                    b.Property<int[]>("Participants")
                        .HasColumnType("integer[]");

                    b.HasKey("Id");

                    b.ToTable("SportEvents");
                });

            modelBuilder.Entity("SportoraAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Gender")
                        .HasColumnType("text");

                    b.Property<int[]>("GroupIds")
                        .HasColumnType("integer[]");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Nickname")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}

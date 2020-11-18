﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SportoraAPI;

namespace SportoraAPI.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20201113172036_author")]
    partial class author
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<int[]>("AdminIds")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int[]>("GroupIds")
                        .HasColumnType("integer[]");

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

            modelBuilder.Entity("SportoraAPI.Models.Club", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int[]>("AdminIds")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int[]>("GroupIds")
                        .HasColumnType("integer[]");

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

            modelBuilder.Entity("SportoraAPI.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int[]>("AdminIds")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

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

                    b.Property<int[]>("AdminIds")
                        .IsRequired()
                        .HasColumnType("integer[]");

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
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Gender")
                        .HasColumnType("text");

                    b.Property<int[]>("GroupIds")
                        .HasColumnType("integer[]");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
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
#pragma warning restore 612, 618
        }
    }
}
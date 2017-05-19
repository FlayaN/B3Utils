﻿// <auto-generated />
using Api.Models.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20170518205920_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-preview1-24937")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Api.Models.Database.Activity", b =>
                {
                    b.Property<Guid>("ActivityId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Amount");

                    b.Property<DateTime>("TimeStamp");

                    b.Property<string>("Type");

                    b.Property<string>("UserId");

                    b.HasKey("ActivityId");

                    b.HasIndex("UserId");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("Api.Models.Database.User", b =>
                {
                    b.Property<string>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AvatarUrl");

                    b.Property<DateTime>("LastTimeStamp");

                    b.Property<string>("Name");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Api.Models.Database.Activity", b =>
                {
                    b.HasOne("Api.Models.Database.User", "User")
                        .WithMany("Activities")
                        .HasForeignKey("UserId")
                        .HasConstraintName("ForeignKey_Activity_User");
                });
        }
    }
}
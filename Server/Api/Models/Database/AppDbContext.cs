﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=tcp:b3utils.database.windows.net,1433;Initial Catalog=b3utils;Persist Security Info=False;User ID=b3admin;Password=b3hejsan489#;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        //}

        public DbSet<User> Users { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Idea> Ideas { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User
            modelBuilder.Entity<Activity>()
                .HasOne(p => p.User)
                .WithMany(b => b.Activities)
                .HasForeignKey(p => p.UserId)
                .HasConstraintName("ForeignKey_Activity_User");
            modelBuilder.Entity<Idea>()
                .HasOne(p => p.User)
                .WithMany(b => b.Ideas)
                .HasForeignKey(p => p.UserId)
                .HasConstraintName("ForeignKey_Idea_User");
            modelBuilder.Entity<Message>()
                .HasOne(p => p.User)
                .WithMany(b => b.Messages)
                .HasForeignKey(p => p.UserId)
                .HasConstraintName("ForeignKey_Message_User");

            // Idea
            modelBuilder.Entity<Message>()
                .HasOne(p => p.Idea)
                .WithMany(b => b.Messages)
                .HasForeignKey(p => p.IdeaId)
                .HasConstraintName("ForeignKey_Message_Idea");
        }
    }

    public class User
    {
        public User()
        {
            Activities = new List<Activity>();
            Ideas = new List<Idea>();
            Messages = new List<Message>();
        }

        [Key]
        public string UserId { get; set; }
        public string Name { get; set; }
        [DataType(DataType.Date)]
        public DateTime LastRecordedDate { get; set; }
        public string AvatarUrl { get; set; }
        public double TotalDistance { get; set; }
        public double TotalSteps { get; set; }
        public List<Activity> Activities { get; set; }
        public List<Idea> Ideas { get; set; }
        public List<Message> Messages { get; set; }
    }

    public class Activity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ActivityId { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Type { get; set; }
        public double Amount { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }

    public class Idea
    {
        public Idea()
        {
            Messages = new List<Message>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Header { get; set; }
        public string Detail { get; set; }
        public DateTimeOffset TimeStamp { get; set; }
        public List<Message> Messages { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }

    public class Message
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTimeOffset TimeStamp { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid IdeaId { get; set; }
        public Idea Idea { get; set; }
    }
}

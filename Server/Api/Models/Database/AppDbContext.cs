using Microsoft.EntityFrameworkCore;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>()
                .HasOne(p => p.User)
                .WithMany(b => b.Activities)
                .HasForeignKey(p => p.UserId)
                .HasConstraintName("ForeignKey_Activity_User");
        }
    }

    public class User
    {
        [Key]
        public string UserId { get; set; }
        public string Name { get; set; }
        public DateTime LastRecordedDate { get; set; }
        public string AvatarUrl { get; set; }
        public double TotalDistance { get; set; }

        public List<Activity> Activities { get; set; }
    }

    public class Activity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ActivityId { get; set; }

        public DateTime Date { get; set; }

        public string Type { get; set; }
        public double Amount { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }
}

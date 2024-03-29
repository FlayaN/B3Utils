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
    [Migration("20170525212028_AddedIdeaWithMessages")]
    partial class AddedIdeaWithMessages
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

                    b.Property<DateTime>("Date");

                    b.Property<string>("Type");

                    b.Property<string>("UserId");

                    b.HasKey("ActivityId");

                    b.HasIndex("UserId");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("Api.Models.Database.Idea", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Detail");

                    b.Property<string>("Header");

                    b.Property<DateTime>("TimeStamp");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Ideas");
                });

            modelBuilder.Entity("Api.Models.Database.Message", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("IdeaId");

                    b.Property<string>("Text");

                    b.Property<DateTime>("TimeStamp");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("IdeaId");

                    b.HasIndex("UserId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("Api.Models.Database.User", b =>
                {
                    b.Property<string>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AvatarUrl");

                    b.Property<DateTime>("LastRecordedDate");

                    b.Property<string>("Name");

                    b.Property<double>("TotalDistance");

                    b.Property<double>("TotalSteps");

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

            modelBuilder.Entity("Api.Models.Database.Idea", b =>
                {
                    b.HasOne("Api.Models.Database.User", "User")
                        .WithMany("Ideas")
                        .HasForeignKey("UserId")
                        .HasConstraintName("ForeignKey_Idea_User");
                });

            modelBuilder.Entity("Api.Models.Database.Message", b =>
                {
                    b.HasOne("Api.Models.Database.Idea", "Idea")
                        .WithMany("Messages")
                        .HasForeignKey("IdeaId")
                        .HasConstraintName("ForeignKey_Message_Idea")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Api.Models.Database.User", "User")
                        .WithMany("Messages")
                        .HasForeignKey("UserId")
                        .HasConstraintName("ForeignKey_Message_User");
                });
        }
    }
}

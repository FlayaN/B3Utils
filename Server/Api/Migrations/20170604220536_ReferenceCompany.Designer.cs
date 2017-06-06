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
    [Migration("20170604220536_ReferenceCompany")]
    partial class ReferenceCompany
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

                    b.Property<DateTimeOffset>("Date");

                    b.Property<int>("Type");

                    b.Property<string>("UserId");

                    b.HasKey("ActivityId");

                    b.HasIndex("UserId");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("Api.Models.Database.CompanyPersonReference", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CompanyId");

                    b.Property<string>("Name");

                    b.Property<string>("Position");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("CompanyPersonReferences");
                });

            modelBuilder.Entity("Api.Models.Database.CompanyReference", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("CompanyReferences");
                });

            modelBuilder.Entity("Api.Models.Database.Idea", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Detail");

                    b.Property<string>("Header");

                    b.Property<DateTimeOffset>("TimeStamp");

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

                    b.Property<DateTimeOffset>("TimeStamp");

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

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Api.Models.Database.UserPersonMap", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<Guid>("ReferencePersonId");

                    b.HasKey("UserId", "ReferencePersonId");

                    b.HasIndex("ReferencePersonId");

                    b.ToTable("UserPersonMaps");
                });

            modelBuilder.Entity("Api.Models.Database.Activity", b =>
                {
                    b.HasOne("Api.Models.Database.User", "User")
                        .WithMany("Activities")
                        .HasForeignKey("UserId")
                        .HasConstraintName("ForeignKey_Activity_User");
                });

            modelBuilder.Entity("Api.Models.Database.CompanyPersonReference", b =>
                {
                    b.HasOne("Api.Models.Database.CompanyReference", "Company")
                        .WithMany("Persons")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);
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

            modelBuilder.Entity("Api.Models.Database.UserPersonMap", b =>
                {
                    b.HasOne("Api.Models.Database.CompanyPersonReference", "ReferencePerson")
                        .WithMany("UserPersonMaps")
                        .HasForeignKey("ReferencePersonId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Api.Models.Database.User", "User")
                        .WithMany("UserPersonMaps")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}

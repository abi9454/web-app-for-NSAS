using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NSAS.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<file> files { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EventXUser>()
                .HasKey(eu => new {eu.EventId, eu.UserId});

            modelBuilder.Entity<EventXUser>()
                .HasOne(eu => eu.Event)
                .WithMany(e => e.User)
                .HasForeignKey(eu => eu.EventId);

            modelBuilder.Entity<EventXUser>()
                .HasOne(u => u.User)
                .WithMany(eu => eu.Event)
                .HasForeignKey(u => u.UserId);
        }
    }

    public class Event
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Venue { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }

//        public int EventOrganizerUserId { get; set; }
//        public User EventOrganizer { get; set; }

        public List<EventXUser> User{ get; set; }
    }

    public class EventXUser
    {
        public int EventId { get; set; }
        public Event Event { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public bool IsOrganizer { get; set; }
    }

    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Sex { get; set; }
        public string Token { get; set; }
        public DateTime TokenExpiresIn { get; set; }

//        [ForeignKey("EventOrganizerUserId")]
//        public ICollection<Event> Events
//        { get; set; }

        public List<EventXUser> Event { get; set; }
    }

    public class file
    {
        [Key]
        public int Id { get; set; }
        public string FileName { get; set; }
    }
}
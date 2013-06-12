using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using Models;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Diagnostics;
//using GenericRepository.EntityFramework;

namespace Models
{
    public class AccountingContext :DbContext // EntitiesContext 
    {
        public AccountingContext()
            : base("AccountingContext2")
        {
            Debug.Write(Database.Connection.ConnectionString);
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceLine> InvoiceLines { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Models.Freightage> Freightage { get; set; }
        public DbSet<Models.File> Files { get; set; }
        public DbSet<Models.Remittance> Remittances { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();   

            modelBuilder.Entity<Invoice>()
                .HasRequired(i => i.DebitAccount)
                .WithMany(d => d.DebitInvoices)
                .HasForeignKey(a => a.DebitAccountId).WillCascadeOnDelete(false);
            modelBuilder.Entity<Invoice>()
                .HasRequired(i => i.CreditAccount)
                .WithMany(d => d.CreditInvoices)
                .HasForeignKey(a => a.CreditAccountId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Remittance>()
                .HasRequired(i => i.FromAccount)
                .WithMany()
                .HasForeignKey(a => a.FromAccountId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Remittance>()
                .HasRequired(i => i.ToAccount)
                .WithMany()
                .HasForeignKey(a => a.ToAccountId).WillCascadeOnDelete(false);

        }

    }
}

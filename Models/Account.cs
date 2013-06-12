

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using GenericRepository;

namespace  Models
{
    [DisplayColumn("Name")]
    public class Account : Entity
    {
        //public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Type { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name="Parent Account")]
        [UIHint("AccountSelect")]
        public int? ParentAccountId { get; set; }

        [System.ComponentModel.DataAnnotations.ScaffoldColumn(false)]
        public virtual Account ParentAccount { get; set; }

        [InverseProperty("CreditAccount")]
        
        public virtual List<Invoice> CreditInvoices { get; set; }

        [InverseProperty("DebitAccount")]
        public virtual List<Invoice> DebitInvoices { get; set; }


        [InverseProperty("FromAccount")]
        public virtual List<Remittance> FromRimmetances { get; set; }

        [InverseProperty("ToAccount")]
        public virtual List<Remittance> ToRemittances { get; set; }



        public Account()
        {
            CreditInvoices = new List<Invoice>();
            DebitInvoices = new List<Invoice>();
        }

    }
}
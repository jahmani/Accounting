using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace  Models
{
    public class InvoiceLine : Entity
    {
        //public int Id { get; set; }

        public string Description { get; set; }

        
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public int? AccountTransactionId { get; set; }

        public int InvoiceId { get; set; }
        public virtual Invoice Invoice { get; set; }

        public decimal LineToatal { get { return Quantity * Price; } }

    }

    public class Freightage : Entity
    {
        //public int Id { get; set; }

        public string ReferenceNumber { get; set; }

        public DateTime DateTime { get; set; }

        public decimal Ammount { get; set; }



    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

namespace  Models
{
    public class Invoice : Entity
    {
        //public int Id { get; set; }

        public string Description { get; set; }

        [UIHint("AccountSelect")]
        public int CreditAccountId { get; set; }

        public virtual Account CreditAccount { get; set; }

        [UIHint("AccountSelect")]
        public int DebitAccountId { get; set; }

        public virtual Account DebitAccount { get; set; }

        public decimal Ammount { get; set; }

        public int CurrencyId { get; set; }

        public virtual Currency Currency { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateTime { get; set; }

        public InvoiceType InvoiceType { get; set; }
        public List<InvoiceLine> InvoiceLines { get; set; }
        public List<File> Pictures { get; set; }
        public File DefaultPicture
        {
            get
            {
                return Pictures.FirstOrDefault(p => p.IsTheDefault);
            }
        }

        public Invoice()
        {
            InvoiceLines = new List<InvoiceLine>();
            Pictures = new List<File>();
        }

    }
    public enum InvoiceType
    {
        SalesInvoice,
        SalesReturnInvoice,
        PurchaseInvoice,
        PurchaseReturnInvoice,
        Payment,
        Receipt,
        Remittance,
        Others
    }


    public class Currency : Entity
    {
        //public int Id { get; set; }

        public string Name { get; set; }

        public string Sympol { get; set; }
        
    }

    public class Remittance : Entity
    {
        //public int Id { get; set; }

        public string Description { get; set; }

        public int FromAccountId { get; set; }

        [System.ComponentModel.DataAnnotations.Schema.ForeignKey("FromAccountId")]
        public virtual Account FromAccount { get; set; }

        public int FromCurrencyId { get; set; }

        public virtual Currency FromCurrency { get; set; }

        public int ToAccountId { get; set; }
        [System.ComponentModel.DataAnnotations.Schema.ForeignKey("ToAccountId")]
        public virtual Account ToAccount { get; set; }

        public decimal Ammount { get; set; }

        public int ToCurrencyId { get; set; }

        public virtual Currency ToCurrency { get; set; }

        public decimal ExchangeRate { get; set; }
        

        public DateTime DateTime { get; set; }

    }

}
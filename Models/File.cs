using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace  Models
{
    public class File
    {
        public int Id { get; set; }

        public byte[] FileBinary { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string Uri { get; set; }

        public string Description { get; set; }


        // Invoice Link
        public int? InvoiceID { get; set; }
        public Invoice Invoice { get; set; }


        //Product Link
        public int? ProductID { get; set; }
        public virtual Product Product { get; set; }


        //Freightage Link
        public int? FreightageID { get; set; }
        public Freightage Freightage { get; set; }

        public bool IsTheDefault { get; set; }    

    }
}
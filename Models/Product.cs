using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//using System.ComponentModel.DataAnnotations.Schema;

namespace  Models
{
    public class Product : Entity
    {
        //public int Id { get; set; }

        [Required]
        [StringLength(65,MinimumLength=4,ErrorMessage="Product Name Must be between 4 & 65")]
        public string Name { get; set; }

        [StringLength(10, MinimumLength = 4, ErrorMessage = "Product Name Must be between 4 & 65")]
        public string StyleNo { get; set; }

        [DisplayFormat(DataFormatString = "{0:F2}", ApplyFormatInEditMode = true)]
        [UIHint("Currency")]
        public decimal Price { get; set; }
        [DisplayFormat(DataFormatString = "{0:F2}", ApplyFormatInEditMode = true)]
        [UIHint("Currency")]
        public decimal? PurchasedPrice { get; set; }
        [DisplayFormat(DataFormatString = "{0:F2}", ApplyFormatInEditMode = true)]
        [UIHint("Currency")]
        public decimal? Cost { get; set; }

        public int? PictureId { get; set; }
        [ForeignKey("PictureId")]
        public virtual File Picture { get; set; }

        public virtual List<InvoiceLine> InvoiceLines { get; set; }

        public virtual List<File> Files { get; set; }
    }
}
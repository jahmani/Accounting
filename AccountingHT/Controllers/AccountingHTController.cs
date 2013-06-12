using AccountingTH.Services;
using Breeze.WebApi;
using Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AccountingHT.Controllers
{
    [Breeze.WebApi.BreezeController]
    public class AccountingHTController : ApiController
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();


        [HttpGet]
        public string Metadata()
        {
            return new EFContextProvider<AccountingContext>().Metadata();
        }

        // ~/breeze/resourcemgt/StaffingResources
        [HttpGet]
        public IQueryable<Account> Accounts()
        {
            //Account acc = new Account(){Name ="acc name", City="dww" ,Type="dsdwsd"};
            //var ctx = new AccountingContext();
            //ctx.Accounts.Add(acc);
            //ctx.SaveChanges();
            //var arr = ctx.Accounts.ToArray();
            return _unitOfWork.Accounts.All();
        }

        [HttpGet]
        public IQueryable<Product> Products()
        {
            return _unitOfWork.Products.All();
        }

        [HttpGet]
        public IQueryable<Invoice> Invoices()
        {
            return _unitOfWork.Invoices.All();
        }


        [HttpGet]
        public IQueryable<InvoiceLine> InvoiceLines()
        {
            return _unitOfWork.InvoiceLines.All();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _unitOfWork.Commit(saveBundle);
        }


    }
}

﻿using System.Web.Http;
using Breeze.WebApi;
using Models;

namespace TempHire.Controllers
{
    [BreezeController]
    [Authorize]
    public class DefaultController : ApiController
    {
        // ~/breeze/Metadata
        [HttpGet]
        public string Metadata()
        {
            return new EFContextProvider<AccountingContext>().Metadata();
        }
    }
}
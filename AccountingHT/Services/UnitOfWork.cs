using AccountingTH.Services;
using Breeze.WebApi;
using Models;
using Newtonsoft.Json.Linq;

namespace AccountingTH.Services
{
    public class UnitOfWork
    {
        private readonly EFContextProvider<AccountingContext> _contextProvider;

        private Repository<Account> _Accounts;

        public UnitOfWork()
        {
            _contextProvider = new EFContextProvider<AccountingContext>();
            _contextProvider.BeforeSaveEntityDelegate += BefoueSaveEntity;
             
 //           _contextProvider.Context.Currencies.Add(new Currency(){Name="Jordan Dinar",Sympol="JOD"});
            //Accounts = new Repository<Account>(_contextProvider.Context);
            Files = new Repository<File>(_contextProvider.Context);
            Invoices = new Repository<Invoice>(_contextProvider.Context);
            InvoiceLines = new Repository<InvoiceLine>(_contextProvider.Context);
            Products = new Repository<Product>(_contextProvider.Context);
            Currencies = new Repository<Models.Currency>(_contextProvider.Context);
            Remittances = new Repository<Models.Remittance>(_contextProvider.Context);
            Freightages = new Repository<Models.Freightage>(_contextProvider.Context);
        }

        private bool BefoueSaveEntity(EntityInfo arg)
        {
            var entity = arg.Entity;
            //var type = arg.

            return true;
        }

        public IRepository<Account> Accounts { 
            get{
                if (_Accounts == null)
                {
                    _Accounts = new Repository<Account>(_contextProvider.Context);
                }
            return _Accounts;
            }
        }
        public IRepository<File> Files { get; private set; }
        public IRepository<Invoice> Invoices { get; private set; }
        public IRepository<InvoiceLine> InvoiceLines { get; private set; }
        public IRepository<Product> Products { get; private set; }
        public IRepository<Currency> Currencies { get; private set; }
        public IRepository<Remittance> Remittances { get; private set; }
        public IRepository<Freightage> Freightages { get; private set; }

        public SaveResult Commit(JObject changeSet)
        {
            return _contextProvider.SaveChanges(changeSet);
        }
    }
}
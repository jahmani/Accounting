using System.Linq;

namespace AccountingTH.Services
{
    public interface IRepository<out T>
    {
        IQueryable<T> All();
    }
}
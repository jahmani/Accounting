using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public static class ModelExtensions
    {
        public static PropertyInfo[] VisibleProperties(this Account model)
        {
            Type modelType = model.GetType();
           PropertyInfo[] allProperties ;//= model.GetType().GetProperties().ToArray();
           allProperties = new PropertyInfo[]{
                modelType.GetProperty("Name"),
                modelType.GetProperty("City"),
                modelType.GetProperty("Address"),
                modelType.GetProperty("Type"),
                modelType.GetProperty("ParentAccountId"),
                modelType.GetProperty("ParentAccount")};

           return allProperties;
        }
    }
}

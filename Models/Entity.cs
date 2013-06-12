//using GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Entity//: IEntity
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }

        //int IEntity<int>.Id
        //{
        //    get
        //    {
        //        return this.Id;
        //    }
        //    set
        //    {
        //        this.Id = value;
        //    }
        //}
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Tameenk.Core.Infrastructure;

namespace Tameenk.Testing.Core
{
    public class BaseTestClass
    {
        public BaseTestClass()
        {
            EngineContext.InitializeWebApi(false, new HttpConfiguration());
        }
    }
}

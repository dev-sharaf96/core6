﻿using Tameenk.Core.Configuration;
using Tameenk.Core.Infrastructure;
using TameenkDAL;

namespace Tameenk.Services.Capcha.API.Infrastructure
{
    public class DependencyRegistrar : IDependencyRegistrar
    {
        public int Order => 0;

        public void Register(/*ContainerBuilder builder, ITypeFinder typeFinder, TameenkConfig config*/IServiceCollection services, ITypeFinder typeFinder, YourDbContext config)
        {
            //builder.RegisterApiControllers(typeFinder.GetAssemblies().ToArray());
            var controllerAssemblies = typeFinder.GetAssemblies().ToArray();
            services.AddControllers().AddControllersAsServices()
                    .AddApplicationPart(controllerAssemblies.First())
                    .AddControllersAsServices();
        }
    }
}
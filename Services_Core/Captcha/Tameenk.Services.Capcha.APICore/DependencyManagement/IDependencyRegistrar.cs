using Tameenk.Core.Configuration;
using Tameenk.Core.Infrastructure;
using TameenkDAL;

namespace Tameenk.Services.Capcha.API.Infrastructure
{
    public interface IDependencyRegistrar
    {
        public void Register(/*ContainerBuilder builder, ITypeFinder typeFinder, TameenkConfig config*/IServiceCollection services, ITypeFinder typeFinder, YourDbContext config)
        {
            var controllerAssemblies = typeFinder.GetAssemblies().ToArray();
            services.AddControllers().AddControllersAsServices()
                    .AddApplicationPart(controllerAssemblies.First())
                    .AddControllersAsServices();
        }
    }
}

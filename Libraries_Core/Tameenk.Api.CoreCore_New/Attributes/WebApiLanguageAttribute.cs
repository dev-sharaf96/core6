using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System;
using Tameenk.Api.Core.Context;
using Tameenk.Core.Infrastructure;

namespace Tameenk.Api.Core.Attributes
{
    public class WebApiLanguageAttribute : ActionFilterAttribute
    {
        private readonly IServiceProvider _serviceProvider;
        public WebApiLanguageAttribute(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            var webApiContext = _serviceProvider.GetRequiredService<IWebApiContext>();
            // Get the curren language to set the culture.
            var currentLanguage = webApiContext.CurrentLanguage;
            var culture = new System.Globalization.CultureInfo(currentLanguage.ToString());
            System.Threading.Thread.CurrentThread.CurrentCulture = culture;
            System.Threading.Thread.CurrentThread.CurrentUICulture = culture;
            base.OnActionExecuting(actionContext);
        }
    }
}

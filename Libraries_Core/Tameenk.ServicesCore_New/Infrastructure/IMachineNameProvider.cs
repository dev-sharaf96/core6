﻿//Contribution: Orchard project (http://www.orchardproject.net/)
namespace Tameenk.Services.Infrastructure
{
    /// <summary>
    /// Describes a service which the name of the machine (instance) running the application.
    /// </summary>
    public interface IMachineNameProvider
    {
        /// <summary>
        /// Returns the name of the machine (instance) running the application.
        /// </summary>
        string GetMachineName();
    }
}

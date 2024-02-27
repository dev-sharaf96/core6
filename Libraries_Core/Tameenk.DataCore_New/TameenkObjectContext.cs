// using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data
{
    /// <summary>
    /// Object context
    /// </summary>
    public class TameenkObjectContext : /*IdentityDbContext<AspNetUser> ,*/DbContext
    {
        #region Ctor

        public TameenkObjectContext(DbContextOptions<TameenkObjectContext> options)
            : base(options)
        {
           
        }

        #endregion

        //#region Utilities

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Dynamically load all configuration classes in the assembly
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                .Where(type => !String.IsNullOrEmpty(type.Namespace))
                .Where(type => type.BaseType != null && type.BaseType.IsGenericType &&
                    type.BaseType.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>));

            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                builder.ApplyConfiguration(configurationInstance);
            }
        }

        ///Already handling with Core but if we need to add manual configurations
    }
}
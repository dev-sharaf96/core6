
using log4net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using NLog;
using System;
using Tameenk.Loggin.DAL;
using Tameenk.Services.QuotationNew.ApiCore.DependancyInjection;
using Tameenk.Services.QuotationNew.Components;

var builder = WebApplication.CreateBuilder(args);

var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
var configuration = new ConfigurationBuilder()
         .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
         .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
         .AddJsonFile($"appsettings.{environmentName}.json", optional: true, reloadOnChange: true)
         .AddEnvironmentVariables()
         .Build();

builder.Services.AddCustomServicesInjection(configuration);

builder.Services.AddSystemWebAdapters();
//////builder.Services.AddHttpForwarder();

// Add services to the container.

builder.Services.AddMvc();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();


//builder.Services.AddDbContext<TameenkLog>(options =>
//options.UseSqlServer(
//    builder.Configuration.GetConnectionString("DefaultConnection")));


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseSystemWebAdapters();

app.UseEndpoints(endpoints =>
{
    //endpoints.MapControllerRoute
    //(
    //    name: "GetQuotation",
    //    pattern: "api/quote",
    //    defaults: new { controller = "Quotation", action = "GetQuote" }
    // );

    endpoints.MapControllerRoute("Default", "{controller=Home}/{action=Index}/{id?}");

    endpoints.MapControllers();
});

AutoMapperConfiguration.Init();

app.Run();

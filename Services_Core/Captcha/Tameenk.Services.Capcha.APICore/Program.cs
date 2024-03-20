using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Tameenk.Services.Capcha;

//ConfigureServices(builder.Services);

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
//builder.Services.AddHttpForwarder();

// Add services to the container.
builder.Services.AddMvc();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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

app.MapControllers();
//////////app.MapForwarder("/{**catch-all}", app.Configuration["ProxyTo"]).Add(static builder => ((RouteEndpointBuilder)builder).Order = int.MaxValue);
//app.UseEndpoints(endpoints =>
//{
//    //endpoints.MapControllerRoute(
//    //  name: "Capcha",
//    //  pattern: "api/Capcha",
//    //  defaults: new { controller = "Capcha", action = "GetCapcha" });

//    endpoints.MapControllerRoute("Default", "{controller=Home}/{action=Index}/{id?}");

//    endpoints.MapControllers();
//});


app.Run();

//services.AddControllersWithViews(options =>
//{
//    // Register global filter for handling errors
//    options.Filters.Add(new Microsoft.AspNetCore.Mvc.Filters.HandleErrorAttribute());
//});
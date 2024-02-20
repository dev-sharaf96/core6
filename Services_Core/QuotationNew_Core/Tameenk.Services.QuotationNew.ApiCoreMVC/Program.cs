
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Tameenk.Services.QuotationNew.ApiCore;

Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            }).Build().Run();


//var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddSystemWebAdapters();
//builder.Services.AddHttpForwarder();

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();
//app.UseSystemWebAdapters();

//app.MapControllers();
//app.MapForwarder("/{**catch-all}", app.Configuration["ProxyTo"]).Add(static builder => ((RouteEndpointBuilder)builder).Order = int.MaxValue);

//app.MapControllerRoute("Default", "{controller=Home}/{action=Index}/{id?}");

//app.Run();

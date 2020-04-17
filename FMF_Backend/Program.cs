using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using FMF_Backend.Data;
using Microsoft.Extensions.DependencyInjection;
using FMF_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace FMF_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope()){
                var services = scope.ServiceProvider;

                try
                {
                    using (var context = new FMFDbContext(
                        services.GetRequiredService<
                            DbContextOptions<FMFDbContext>>())){
                                DbInitializer.Initialize(context);
                            }
                }
                catch(Exception ex){
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occoured seeding the Db.");
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

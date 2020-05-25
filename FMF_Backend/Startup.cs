using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using FMF_Backend.Data;

namespace FMF_Backend{
    public class Startup{
        public Startup(IConfiguration configuration, IHostEnvironment environment){
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services){

            // Database used during development
            if (Environment.IsDevelopment()) {
                // Register the database context as a service. Use the SQLite for this
                services.AddDbContext<FMFDbContext>(options =>
                    options.UseSqlite("Filename=FMF_Db.db"));
                    services
                        .AddControllers()
                        .AddJsonOptions(options =>{
                            options.JsonSerializerOptions.WriteIndented = true;
                        });
            }
            // Database used in all other environments (production etc)
            else {
                // Register the database context as a service. Use PostgreSQL server for this
                services.AddDbContext<FMFDbContext>(options =>
                    options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            }
            
            // services.AddDbContext<FMFDbContext>(opt =>
            //    opt.UseSqlite("Filename=FMF_Db.db"));
            // services
            //     .AddControllers()
            //     .AddJsonOptions(options =>{
            //         options.JsonSerializerOptions.WriteIndented = true;
            // });
         }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env){
            if (env.IsDevelopment()){
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>{
                endpoints.MapControllers();
            });
        }
        
    }
}

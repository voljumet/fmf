
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using FMF_Backend.Data;
using Microsoft.Extensions.DependencyInjection;

namespace FMF_Backend {
    /* This class must have the same name with ... */
    public class BackgroundTask : IHostedService, IDisposable
    {
        // private int executionCount = 0;
        private readonly ILogger<BackgroundTask> _logger;
        private Timer _timer;
        // private FMFDbContext _context;

        private readonly IServiceScopeFactory scopeFactory;
        public BackgroundTask( IServiceScopeFactory scopeFactory, ILogger <BackgroundTask> logger)
        {
            _logger = logger;
            this.scopeFactory = scopeFactory;
            
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero, 
                TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        /* Here we add code work background work */
        private void DoWork(object state)
        {
           using (var scope = scopeFactory.CreateScope()){
                var dbContext = scope.ServiceProvider.GetRequiredService<FMFDbContext>();
                Updater.Update(dbContext);
            }
        }
        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
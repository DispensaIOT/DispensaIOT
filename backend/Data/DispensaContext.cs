using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DispensaInteligente;

namespace Dispensa.Data
{
    public class DispensaContext : DbContext
    {
        public DispensaContext (DbContextOptions<DispensaContext> options)
            : base(options)
        {
        }

        public DbSet<DispensaInteligente.Login> Login { get; set; } = default!;
        public DbSet<DispensaInteligente.Sensor> Sensor { get; set; } = default!;
        public DbSet<Lista> Lista { get; set; } = default!;
        public DbSet<DispensaInteligente.Historico> Historico { get; set; } = default!;
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Dispensa.Data;

var builder = WebApplication.CreateBuilder(args);

// Configurar DbContext com SQLite
builder.Services.AddDbContext<DispensaContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DispensaContext") 
    ?? throw new InvalidOperationException("Connection string 'DispensaContext' not found.")));

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // URL do frontend React
              .AllowAnyHeader()                    // Permitir qualquer cabeçalho
              .AllowAnyMethod();                   // Permitir qualquer método (GET, POST, etc.)
    });
});

// Adicionar serviços ao container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuração do pipeline de requisições HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Aplicar política de CORS
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();

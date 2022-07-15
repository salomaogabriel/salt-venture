using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Services;
using simpleAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connString = builder.Configuration.GetConnectionString("SaltVentureContext");
connString = connString.Replace("<username>",builder.Configuration["DB_USERNAME"]);
connString = connString.Replace("<password>",builder.Configuration["DB_PASSWORD"]);
System.Console.WriteLine(connString);
builder.Services.AddDbContext<SaltVentureDbContext>(options =>
    options.UseSqlServer(connString));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IGamesRepository, GamesRepository>();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;

  SeedData.Initialize(services);
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
//      .WithOrigins(
//     "https://salomaogabriel.github.io",
//     "https://nicholasizosimov.github.io",
//     "https://qaisarm.github.io",
//     "https://localhost:3000"
//     ));
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

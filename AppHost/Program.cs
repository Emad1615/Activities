var builder = DistributedApplication.CreateBuilder(args);


// Add your services
var api = builder.AddProject("api", "../API/API.csproj");
var client = builder.AddProject("client", "../Client/Client.csproj");

// Add infrastructure if it's a hosted service (optional)
var db = builder.AddProject("Persistence", "../Persistence/Persistence.csproj");

builder.Build().Run();

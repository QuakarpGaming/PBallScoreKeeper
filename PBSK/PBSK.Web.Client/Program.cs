using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using PBSK.Shared.Services;
using PBSK.Web.Client.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Add device-specific services used by the PBSK.Shared project
builder.Services.AddSingleton<IFormFactor, FormFactor>();

await builder.Build().RunAsync();

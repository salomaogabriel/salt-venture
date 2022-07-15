using Microsoft.AspNetCore.Mvc;

namespace SaltVenture.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SampleController : ControllerBase
{

    [HttpGet]
    public IActionResult SampleEndpoint()
    {
        return Ok("API Working!");
    }
}

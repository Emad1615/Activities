using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {

        [HttpGet("notFound")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("badRequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest();
        }
        [HttpGet("ServerError")]
        public ActionResult GetServerError()
        {
            throw new Exception("Server Error");
        }
        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }
    }
}

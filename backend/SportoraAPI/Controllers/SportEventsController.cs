using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;

namespace SportoraAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SportEventsController : Controller
    {
        private readonly ISportEventRepository _sportEventRepository;

        public SportEventsController(ISportEventRepository sportEventRepository)
        {
            _sportEventRepository = sportEventRepository;
        }

        [HttpGet]
        public IActionResult GetSportEvents() => Ok(_sportEventRepository.GetSportEvents());

        [HttpGet("{id}")]
        public IActionResult GetSportEventById(int id)
        {
            SportEvent sportEvent = _sportEventRepository.GetSportEventById(id);

            if (sportEvent == null)
            {
                return NotFound();
            }

            return Ok(sportEvent);
        }

        [HttpPost]
        public IActionResult AddSportEvent([FromBody] SportEvent sportEvent)
        {
            if (!TryValidateModel(sportEvent))
            {
                return BadRequest(ModelState);
            }

            _sportEventRepository.AddSportEvent(sportEvent);
            return Created(Request.Path, sportEvent);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSportEvent(int id)
        {
            SportEvent sportEvent = _sportEventRepository.GetSportEventById(id);
            if (sportEvent == null)
            {
                return NotFound();
            }

            _sportEventRepository.RemoveSportEvent(id);
            return Ok(sportEvent);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateSportEvent(int id, [FromBody] JsonPatchDocument<SportEvent> patchDocument)
        {
            SportEvent sportEventToUpdate = _sportEventRepository.GetSportEventById(id);

            if (sportEventToUpdate == null)
            {
                return NotFound();
            }
            
            _sportEventRepository.UpdateSportEvent(patchDocument, sportEventToUpdate);
            
            return NoContent();
        }

    }
}
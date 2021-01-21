using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Collections.Generic;

namespace SportoraAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SportEventsController : Controller
    {
        private readonly ISportEventRepository _sportEventRepository;
        private readonly IHttpClientFactory _clientFactory;
        private readonly string _auth0UserInfo;

        public SportEventsController(ISportEventRepository sportEventRepository,
            IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _sportEventRepository = sportEventRepository;
            _clientFactory = clientFactory;
            _auth0UserInfo = $"{configuration["Auth0:Authority"]}userinfo";
        }

        [Authorize]
        [HttpGet("protected")]
        public async Task<IActionResult> GetProtectedSportEvents()
        {
            var result = await _sportEventRepository.GetSportEventsAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetSportEvents()
        {
            var result = await _sportEventRepository.GetSportEventsAsync();

            return Ok(result);
        }

        // TODO: Paging
        [HttpGet("search&{location}&{type}&{date}&{page}")]
        public async Task<IActionResult> SearchSportEvents(string location, string type, DateTime dateTime, int page)
        {
            var result = await _sportEventRepository.SearchSportEventsAsync(location, type, dateTime, page);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSportEventById(int id)
        {
            SportEvent sportEvent = await _sportEventRepository.GetSportEventByIdAsync(id);

            if (sportEvent == null)
            {
                return NotFound();
            }

            return Ok(sportEvent);
        }

        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpGet("participatingevents")]
        public async Task<IActionResult> GetUserParticipatingEvents()
        {
            var authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            IEnumerable<SportEvent> participatingEvents = await _sportEventRepository.GetUserParticipatingEvents(authId);

            return Ok(participatingEvents);
        }

        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpGet("adminevents")]
        public async Task<IActionResult> GetUserAdminEvents()
        {
            var authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            IEnumerable<SportEvent> adminEvents = await _sportEventRepository.GetUserAdminEvents(authId);

            return Ok(adminEvents);
        }

        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpPost]
        public async Task<IActionResult> AddSportEvent([FromBody] SportEvent sportEvent)
        {
            if (!TryValidateModel(sportEvent))
            {
                return BadRequest(ModelState);
            }

            SportEvent sportEventToAdd = sportEvent;
            var authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            User loggedInUser = await _sportEventRepository.GetUserFromAuthId(authId);

            sportEventToAdd.Admins = new List<SportEventAdmins>();
            sportEventToAdd.Admins.Add(new SportEventAdmins { User = loggedInUser });

            _sportEventRepository.AddSportEvent(sportEventToAdd);

            return Created(Request.Path, sportEvent);
        }

        [Authorize(Policy = "MustBeEventAdmin")]
        [HttpGet("setactive/{id}/{activeState}")]
        public async Task<IActionResult> SetSportEventActiveState(int id, bool activeState)
        {
            SportEvent sportEvent = await _sportEventRepository.GetSportEventById(id);
            if (sportEvent == null)
            {
                return NotFound();
            }

            await _sportEventRepository.SetEventActiveStatusAsync(id, activeState);
            return Ok(sportEvent);
        }

        [Authorize(Policy = "MustBeEventAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSportEvent(int id)
        {
            SportEvent sportEvent = await _sportEventRepository.GetSportEventById(id);

            if (sportEvent.NumParticipants != 0)
            {
                return Forbid();
            }

            _sportEventRepository.RemoveSportEvent(id);
            return Ok(sportEvent);
        }

        [Authorize(Policy = "MustBeEventAdmin")]
        [HttpPatch("id/{id}")]
        public async Task<IActionResult> UpdateSportEvent(int id,
            [FromBody] JsonPatchDocument<SportEvent> patchDocument)
        {
            SportEvent sportEventToUpdate = await _sportEventRepository.GetSportEventById(id);

            if (sportEventToUpdate == null)
            {
                return NotFound();
            }

            await _sportEventRepository.UpdateSportEvent(patchDocument, sportEventToUpdate);

            return NoContent();
        }

        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpPost("addUser/id/{eventId}")]
        public async Task<IActionResult> AddUserToEvent(int eventId)
        {
            string authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            SportEvent sportEvent = await _sportEventRepository.GetSportEventById(eventId);

            if ((authId == null) || (sportEvent == null))
            {
                return NotFound();
            }
            
            _sportEventRepository.AddUserToEvent(eventId, authId);

            return Ok(sportEvent);
        }
        
        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpDelete("removeUser/id/{eventId}")]
        public async Task<IActionResult> RemoveUserFromEvent(int eventId)
        {
            string authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            SportEvent sportEvent = await _sportEventRepository.GetSportEventById(eventId);

            if ((authId == null) || (sportEvent == null))
            {
                return NotFound();
            }
            
            _sportEventRepository.RemoveUserFromEvent(eventId, authId);

            return Ok(sportEvent);
        }
    }
}
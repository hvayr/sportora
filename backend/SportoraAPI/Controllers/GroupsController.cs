using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;

namespace SportoraAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;

        public GroupsController(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        [HttpGet]
        public IActionResult GetGroups() => Ok(_groupRepository.GetAllGroups());

        [HttpGet("id/{id}")]
        public IActionResult GetGroupById(int id)
        {
            Group group = _groupRepository.GetGroupById(id);

            if (group == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult AddGroup([FromBody] Group group)
        {
            if (!TryValidateModel(group))
            {
                return BadRequest(ModelState);
            }

            _groupRepository.AddGroup(group);
            return Created(Request.Path, group);
        }

        [HttpDelete("id/{id}")]
        public IActionResult DeleteGroup(int id)
        {
            Group group = _groupRepository.GetGroupById(id);
            if (group == null)
            {
                return NotFound();
            }

            _groupRepository.RemoveGroup(id);
            return Ok(group);
        }

        [HttpPatch("id/{id}")]
        public IActionResult UpdateGroup(int id, [FromBody] JsonPatchDocument<Group> patchDocument)
        {
            Group groupToUpdate = _groupRepository.GetGroupById(id);

            if (groupToUpdate == null)
            {
                return NotFound();
            }
            
            _groupRepository.UpdateGroup(patchDocument, groupToUpdate);
            return NoContent();
        }
    }
}
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;

namespace SportoraAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetUsers() => Ok(_userRepository.GetUsers());

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            User user = _userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("name/{search?}")]
        public IActionResult GetUsersByName(string search)
        {
            /*if (search == null || search == "")
            {
                return Ok(_userRepository.GetUsers());
            } */
            
            return Ok(_userRepository.GetUsersByName(search));
        }
        

        [HttpPost]
        public IActionResult AddUser([FromBody] User user)
        {
            if (!TryValidateModel(user))
            {
                return BadRequest(ModelState);
            }

            _userRepository.AddUser(user);
            return Created(Request.Path, user);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            User user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _userRepository.RemoveUser(id);
            return Ok(user);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] JsonPatchDocument<User> patchDocument)
        {
            User userToUpdate = _userRepository.GetUserById(id);

            if (userToUpdate == null)
            {
                return NotFound();
            }
            
            _userRepository.UpdateUser(id, patchDocument);
            

            return NoContent();
        }
    }
}
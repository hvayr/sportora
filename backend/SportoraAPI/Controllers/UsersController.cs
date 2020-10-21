using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;

namespace SportoraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            if (_userRepository.GetUsers().ToList().Count == 0)
            {
                return NotFound();
            }

            return Ok(_userRepository.GetUsers());
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserById(int userId)
        {
            User user = _userRepository.GetUser(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
            
        [HttpPost]
        public IActionResult AddUser([FromBody] User user)
        {
            _userRepository.AddUser(user);
            return Created(Request.Path, user);
        }
    }
}
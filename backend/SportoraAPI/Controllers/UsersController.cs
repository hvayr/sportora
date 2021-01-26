using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

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

        [HttpGet("id/{id}")]
        public IActionResult GetUserById(string id)
        {
            User user = _userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("name/{search?}")]
        public async Task<IActionResult> GetUsersWhereUsernameContains(string search)
        {
            var result = await _userRepository.GetUsersWhereUsernameContains(search);

            return Ok(result);
        }

        [HttpGet("exactName/{search?}")]
        public async Task<IActionResult> GetUsersByExactName(string search)
        {
            var result = await _userRepository.GetUsersByExactUsername(search);

            return Ok(result);
        }

        [HttpGet("email/{search?}")]
        public async Task<IActionResult> GetUsersByExactEmail(string search)
        {
            var result = await _userRepository.GetUsersByExactEmail(search);

            return Ok(result);
        }

        [HttpGet("usergroups/{id}")]
        public IActionResult GetUserGroupsById(int id)
        {
            User userGroups = _userRepository.GetUserGroupsById(id);

            if (userGroups == null)
            {
                return NotFound();
            }
           
            return Ok(userGroups);
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

        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpDelete]
        public IActionResult DeleteUser()
        {
            string authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            if (authId is null)
            {
                return Problem(detail: "AuthId not found");
            }

            User userToDelete = _userRepository.GetUserById(authId);

            if (userToDelete == null)
            {
                return NotFound();
            }

            _userRepository.RemoveUser(authId);
            return Ok(userToDelete);
        }


        [HttpPatch("id/{id}")]
        public IActionResult UpdateUser(string id, [FromBody] JsonPatchDocument<User> patchDocument)
        {
            User userToUpdate = _userRepository.GetUserById(id);

            if (userToUpdate == null)
            {
                return NotFound();
            }

            _userRepository.UpdateUser(id, patchDocument);


            return NoContent();
        }

        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpPatch]
        public IActionResult UpdateAuthorizedUser([FromBody] JsonPatchDocument<User> patchDocument)
        {
            string authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            if (authId is null)
            {
                return Problem(detail: "AuthId not found");
            }

            User userToUpdate = _userRepository.GetUserById(authId);

            if (userToUpdate == null)
            {
                return NotFound();
            }

            _userRepository.UpdateUser(authId, patchDocument);


            return NoContent();
        }

        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpGet("checkNickName")]
        public async Task<IActionResult> CheckIfNickNameIsSet()
        {
            string authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            if (authId is null)
            {
                return Problem(detail: "AuthId not found");
            }

            User user = _userRepository.GetUserById(authId);

            if (user == null)
            {
                return NotFound();
            }

            string nickName = await _userRepository.GetNickName(authId);

            if (nickName is null)
            {
                return Ok(false);
            }

            return Ok(true);
        }

        [Authorize(Policy = "MustBeLoggedIn")]
        [HttpGet("loggedUserNickName")]
        public async Task<IActionResult> GetNickName()
        {
            string authId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            if (authId is null)
            {
                return Problem(detail: "AuthId not found");
            }

            string nickName = await _userRepository.GetNickName(authId);

            return Ok(nickName);
        }
        
        [HttpGet("nickNameByAuthId/id/{authId}")]
        public async Task<IActionResult> GetAuthorNickNameByAuthId(string authId)
        {

            string nickName = await _userRepository.GetNickName(authId);

            if (nickName is null)
            {
                return NotFound();
            }

            return Ok(nickName);
            
        }
    }
}
﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;
using Microsoft.AspNetCore.Authorization;

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

        [HttpDelete("id/{id}")]
        public IActionResult DeleteUser(string id)
        {
            User user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _userRepository.RemoveUser(id);
            return Ok(user);
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
    }
}
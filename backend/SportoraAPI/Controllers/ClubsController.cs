﻿using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;

namespace SportoraAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClubsController : ControllerBase
    {
        private readonly IClubRepository _clubRepository;

        public ClubsController(IClubRepository clubRepository)
        {
            _clubRepository = clubRepository;
        }

        [HttpGet]
        public IActionResult GetAllClubs() => Ok(_clubRepository.GetAllClubs());

        [HttpGet("{id}")]
        public IActionResult GetClubById(int id)
        {
            Club club = _clubRepository.GetClubById(id);
            if (club == null)
            {
                return NotFound();
            }

            return Ok(club);
        }

        [HttpPost]
        public IActionResult AddNewClub([FromBody] Club newClub)
        {
            if (!TryValidateModel(newClub))
            {
                return BadRequest(ModelState);
            }

            _clubRepository.AddClub(newClub);
            return Created(Request.Path, newClub);
        }
        
        [HttpDelete("{id}")]
        public IActionResult RemoveClub(int id)
        {
            Club club = _clubRepository.GetClubById(id); 
            if (club == null)
            {
                return NotFound();
            }

            _clubRepository.GetClubById(id);
            return Ok(club);

        }
    }
}
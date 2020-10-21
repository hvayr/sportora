using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;

namespace SportoraAPI.Controllers
{
    [Route("business")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        private readonly IBusinessRepository _businessRepository;

        public BusinessController(IBusinessRepository businessRepository)
        {
            _businessRepository = businessRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetSingleBusiness(int id)
        {
            Business business = _businessRepository.GetSingleBusiness(id);
            if (business == null)
                return NotFound();
            
            return Ok(business);
        }

        [HttpGet]
        public IActionResult GetAllBusiness() =>
            Ok(_businessRepository.GetAllBusinesses());

        [HttpPost]
        public IActionResult AddNewBusiness([FromBody] Business newBusiness)
        {
            if (!TryValidateModel(newBusiness))
                return BadRequest(ModelState);

            _businessRepository.AddBusiness(newBusiness);
            return Created(Request.Path, newBusiness);
        }
    }
}

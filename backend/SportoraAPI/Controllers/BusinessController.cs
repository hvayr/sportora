using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Models;
using SportoraAPI.Repositories;

namespace SportoraAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        private readonly IBusinessRepository _businessRepository;

        public BusinessController(IBusinessRepository businessRepository)
        {
            _businessRepository = businessRepository;
        }

        [HttpGet("id/{id}")]
        public IActionResult GetSingleBusiness(int id)
        {
            Business business = _businessRepository.GetBusinessById(id);
            if (business == null)
            {
                return NotFound();
            }

            return Ok(business);
        }

        [HttpGet]
        public IActionResult GetAllBusiness() =>
            Ok(_businessRepository.GetAllBusinesses());

        [HttpPost]
        public IActionResult AddNewBusiness([FromBody] Business newBusiness)
        {
            if (!TryValidateModel(newBusiness))
            {
                return BadRequest(ModelState);
            }

            _businessRepository.AddBusiness(newBusiness);
            return Created(Request.Path, newBusiness);
        }
        
        [HttpDelete("id/{id}")]
        public IActionResult DeleteBusiness(int id)
        {
            Business businessToDelete = _businessRepository.GetBusinessById(id);
            if (businessToDelete == null)
            {
                return NotFound();
            }

            _businessRepository.RemoveBusiness(id);
            return Ok(businessToDelete);
        }
        
        [HttpPatch("id/{id}")]
        public IActionResult UpdateBusiness(int id, [FromBody] JsonPatchDocument<Business> patchDocument)
        {
            Business businessToUpdate = _businessRepository.GetBusinessById(id);

            if (businessToUpdate == null)
            {
                return NotFound();
            }
            
            _businessRepository.UpdateBusiness(patchDocument, businessToUpdate);
            return NoContent();
        }


    }
}
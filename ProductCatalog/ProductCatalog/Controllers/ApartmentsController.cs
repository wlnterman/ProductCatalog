
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProductCatalog.Models;

namespace ProductCatalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentsController : ControllerBase
    {
        private readonly IApartmentService _apartmentService;

        public ApartmentsController(IApartmentService apartmentService)
        {
            _apartmentService = apartmentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Apartment>>> GetApartments()
        {
            return Ok(await _apartmentService.GetApartmentsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Apartment>> GetApartment(int id)
        {
            var apartment = await _apartmentService.GetApartmentByIdAsync(id);

            if (apartment == null)
            {
                return NotFound();
            }

            return Ok(apartment);
        }

        [Authorize(Roles = "AdvancedUser, Administrator")]
        [HttpPost]//("add")]
        public async Task<ActionResult<Apartment>> CreateApartment(Apartment apartment)
        {
            await _apartmentService.CreateApartmentAsync(apartment);
            return CreatedAtAction(nameof(GetApartment), new { id = apartment.Id }, apartment);
        }

        [Authorize(Roles = "AdvancedUser, Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApartment(int id, Apartment apartment)
        {
            if (id != apartment.Id)
            {
                return BadRequest();
            }

            await _apartmentService.UpdateApartmentAsync(apartment);
            return NoContent();
        }

        [Authorize(Roles = "AdvancedUser, Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApartment(int id)
        {
            await _apartmentService.DeleteApartmentAsync(id);
            return NoContent();
        }
    }
}
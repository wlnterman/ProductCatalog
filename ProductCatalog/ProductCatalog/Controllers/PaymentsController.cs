using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Services;
using ProductCatalog.Models;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace ProductCatalog.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly PaymentService _paymentService;

        public PaymentsController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet("{userId}/{objectId}")]
        public async Task<IActionResult> GetPayments(int userId, int objectId, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var payments = await _paymentService.GetPayments(userId, objectId, startDate, endDate);
            return Ok(payments);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] Payment payment)
        {
            if (payment == null || payment.Details == null || !payment.Details.Any())
                return BadRequest("Некорректные данные");

            var createdPayment = await _paymentService.CreatePayment(payment);
            return CreatedAtAction(nameof(GetPayments), new { userId = createdPayment.UserId, objectId = createdPayment.ObjectId }, createdPayment);
        }
    }
}
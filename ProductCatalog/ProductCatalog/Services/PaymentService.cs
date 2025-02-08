using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data;
using ProductCatalog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Services
{
    public class PaymentService
    {
        private readonly ApplicationDbContext _context;

        public PaymentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Payment>> GetPayments(int userId, int objectId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.Payments.Where(p => p.UserId == userId && p.ObjectId == objectId);

            if (startDate.HasValue)
                query = query.Where(p => p.Date >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(p => p.Date <= endDate.Value);

            return await query.ToListAsync();
        }

        public async Task<Payment> CreatePayment(Payment payment)
        {
            payment.TotalAmount = payment.Details.Values.Sum(); // Подсчитываем сумму всех платежей
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }
    }
}
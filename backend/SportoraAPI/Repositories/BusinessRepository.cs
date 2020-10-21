using SportoraAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportoraAPI.Repositories
{
    public class BusinessRepository : IBusinessRepository
    {
        private readonly DatabaseContext _context;

        public BusinessRepository(DatabaseContext context)
        {
            _context = context;
        }

        public Business GetSingleBusiness(int id) =>
            _context.Businesses.FirstOrDefault(b => b.Id == id);

        public List<Business> GetAllBusinesses() => _context.Businesses.ToList();

        public void AddBusiness(Business business)
        {
            Business newBusiness = new Business
            {
                Id = business.Id,
                Name = business.Name,
                GroupIds = business.GroupIds,
                Location = business.Location,
                PhoneNumber = business.PhoneNumber,
                Premises = business.Premises,
                Prices = business.Prices
            };

            _context.Businesses.Add(newBusiness);
            _context.SaveChanges();
        }
    }
}

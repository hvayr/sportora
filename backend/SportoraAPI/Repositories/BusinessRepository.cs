using System.Collections.Generic;
using System.Linq;
using SportoraAPI.Models;

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
            _context.Businesses.Add(business);
            _context.SaveChanges();
        }

        public void UpdateBusiness(Business newBusiness)
        {
            Business businessToUpdate =
                _context.Businesses.FirstOrDefault(b => b.Id == newBusiness.Id);

            businessToUpdate.Id = newBusiness.Id;
            businessToUpdate.Location = newBusiness.Location;
            businessToUpdate.Name = newBusiness.Name;
            businessToUpdate.GroupIds = newBusiness.GroupIds;
            businessToUpdate.PhoneNumber = newBusiness.PhoneNumber;
            businessToUpdate.Premises = newBusiness.Premises;
        }

        public void RemoveBusiness(int id)
        {
            Business businessToRemove =
                _context.Businesses.FirstOrDefault(b => b.Id == id);
            _context.Remove(businessToRemove);
            _context.SaveChanges();
        }
    }
}
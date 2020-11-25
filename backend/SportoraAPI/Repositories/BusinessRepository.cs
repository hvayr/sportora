using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public class BusinessRepository : IBusinessRepository
    {
        private readonly DatabaseContext _context;
        private IBusinessRepository _businessRepositoryImplementation;

        public BusinessRepository(DatabaseContext context)
        {
            _context = context;
        }

        public Business GetBusinessById(int id) =>
            _context.Businesses.FirstOrDefault(b => b.Id == id);

        public List<Business> GetAllBusinesses() => _context.Businesses.ToList();

        public void AddBusiness(Business business)
        {
            _context.Businesses.Add(business);
            _context.SaveChanges();
        }


        public void RemoveBusiness(int id)
        {
            Business businessToRemove =
                _context.Businesses.FirstOrDefault(b => b.Id == id);
            _context.Remove(businessToRemove);
            _context.SaveChanges();
        }

        public void UpdateBusiness(JsonPatchDocument<Business> patchDocument, Business businessToUpdate)
        {
            patchDocument.ApplyTo(businessToUpdate);
            
            _context.SaveChanges();
        }

        /*
        public void UpdateBusiness(int id, Business newBusiness)         //Put update
        {
            Business businessToUpdate =
                _context.Businesses.FirstOrDefault(b => b.Id == id);

            businessToUpdate.Id = id;
            businessToUpdate.Location = newBusiness.Location;
            businessToUpdate.Name = newBusiness.Name;
            businessToUpdate.GroupIds = newBusiness.GroupIds;
            businessToUpdate.PhoneNumber = newBusiness.PhoneNumber;
            businessToUpdate.Premises = newBusiness.Premises;
        }
        */
    }
    
    
    
}

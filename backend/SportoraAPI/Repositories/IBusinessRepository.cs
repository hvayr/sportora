using System.Collections.Generic;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IBusinessRepository
    {
        void AddBusiness(Business business);
        List<Business> GetAllBusinesses();
        Business GetBusinessById(int id);

        void RemoveBusiness(int id);
        void UpdateBusiness(Business newBusiness);
    }
}
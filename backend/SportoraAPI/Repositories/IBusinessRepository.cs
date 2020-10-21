using SportoraAPI.Models;
using System.Collections.Generic;

namespace SportoraAPI.Repositories
{
    public interface IBusinessRepository
    {
        void AddBusiness(Business business);
        List<Business> GetAllBusinesses();
        Business GetSingleBusiness(int id);
    }
}
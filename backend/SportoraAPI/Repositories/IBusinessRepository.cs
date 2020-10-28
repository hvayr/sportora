using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IBusinessRepository
    {
        void AddBusiness(Business business);
        List<Business> GetAllBusinesses();
        Business GetBusinessById(int id);

        void RemoveBusiness(int id);
        void UpdateBusiness(JsonPatchDocument<Business> patchDocument, Business businessToUpdate);
    }
}
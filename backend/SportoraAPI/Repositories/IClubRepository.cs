using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IClubRepository
    {
        Club GetClubById(int id);
        IEnumerable<Club> GetAllClubs();
        void AddClub(Club club);
        void UpdateClub(JsonPatchDocument<Club> patchDocument, Club clubToUpdate);
        void RemoveClub(int id);
    }
}
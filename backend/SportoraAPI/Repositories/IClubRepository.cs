using System.Collections.Generic;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IClubRepository
    {
        Club GetClubById(int id);
        IEnumerable<Club> GetAllClubs();
        void AddClub(Club club);
        void UpdateClub(int id, Club newClub);
        void RemoveClub(int id);
    }
}
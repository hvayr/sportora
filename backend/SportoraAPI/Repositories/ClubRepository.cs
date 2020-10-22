using System.Collections.Generic;
using System.Linq;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public class ClubRepository : IClubRepository
    {
        private readonly DatabaseContext _context;

        public ClubRepository(DatabaseContext context)
        {
            _context = context;
        }

        public Club GetClubById(int id) => _context.Clubs.FirstOrDefault(c => c.Id == id);

        public IEnumerable<Club> GetAllClubs() => _context.Clubs;

        public void AddClub(Club club)
        {
            _context.Clubs.Add(club);
            _context.SaveChanges();
        }

        public void UpdateClub(Club newClub)
        {
            Club clubToUpdate = _context.Clubs.FirstOrDefault(c => c.Id == newClub.Id);

            clubToUpdate.Id = newClub.Id;
            clubToUpdate.Name = newClub.Name;
            clubToUpdate.GroupIds = newClub.GroupIds;
            clubToUpdate.SkillLevel = newClub.SkillLevel;
            _context.SaveChanges();
        }
        public void RemoveClub(int id)
        {
            Club clubToRemove = _context.Clubs.FirstOrDefault(c => c.Id == id);
            _context.Remove(clubToRemove);
            _context.SaveChanges();
        }
    }
}
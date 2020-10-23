using System.Collections.Generic;
using System.Linq;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public class SportEventRepository : ISportEventRepository
    {
        private readonly DatabaseContext _context;

        public SportEventRepository(DatabaseContext context)
        {
            _context = context;
        }

        public void AddSportEvent(SportEvent sportEvent)
        {
            _context.Add(sportEvent);
            _context.SaveChanges();
        }

        public IEnumerable<SportEvent> GetSportEvents() => _context.SportEvents.ToList();

        public SportEvent GetSportEventById(int eventId) =>
            _context.SportEvents.FirstOrDefault(u => u.Id == eventId);

        public void UpdateSportEvent(int id, SportEvent newSportEvent)
        {
            SportEvent sportEventToUpdate =
                _context.SportEvents.FirstOrDefault(u => u.Id == id);

            sportEventToUpdate.Id = id;
            sportEventToUpdate.Description = newSportEvent.Description;
            sportEventToUpdate.Name = newSportEvent.Name;
            sportEventToUpdate.Location = newSportEvent.Location;
            sportEventToUpdate.Participants = newSportEvent.Participants;
            sportEventToUpdate.MaxParticipants = newSportEvent.MaxParticipants;
            sportEventToUpdate.ActiveStatus = newSportEvent.ActiveStatus;
            sportEventToUpdate.AutoInvite = newSportEvent.AutoInvite;
            sportEventToUpdate.EventCreatedTime = newSportEvent.EventCreatedTime;
            sportEventToUpdate.EventStartTime = newSportEvent.EventStartTime;
            
            _context.Update(sportEventToUpdate);
            _context.SaveChanges();
        }
        
        public void RemoveSportEvent(int id)
        {
            SportEvent sportEventToDelete = _context.SportEvents.FirstOrDefault(u => u.Id.Equals(id));
            _context.SportEvents.Remove(sportEventToDelete);
            _context.SaveChanges();
        }

    }
}
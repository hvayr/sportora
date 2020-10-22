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

        public IEnumerable<SportEvent> GetSportEvents() => _context.Events.ToList();

        public SportEvent GetSportEventById(int eventId) =>
            _context.Events.FirstOrDefault(u => u.Id == eventId);

        public void UpdateSportEvent(SportEvent newSportEvent)
        {
            SportEvent sportEventToUpdate =
                _context.Events.FirstOrDefault(u => u.Id == newSportEvent.Id);

            sportEventToUpdate.Description = newSportEvent.Description;
            sportEventToUpdate.Id = newSportEvent.Id;
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
        
        public void RemoveSportEvent(int eventId)
        {
            SportEvent sportEventToDelete = _context.Events.FirstOrDefault(u => u.Id.Equals(eventId));
            _context.Events.Remove(sportEventToDelete);
            _context.SaveChanges();
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
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
            sportEvent.EventCreatedTime = DateTime.Now;
            _context.Add(sportEvent);
            _context.SaveChanges();
        }

        public IEnumerable<SportEvent> GetSportEvents() => _context.SportEvents.ToList();

        public SportEvent GetSportEventById(int eventId) =>
            _context.SportEvents.FirstOrDefault(u => u.Id == eventId);

        public void UpdateSportEvent(JsonPatchDocument<SportEvent> patchDocument, SportEvent sportEvent)
        {
            patchDocument.ApplyTo(sportEvent);
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
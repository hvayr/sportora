using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<SportEvent>> GetSportEventsAsync()
        {
            return await _context.SportEvents.ToListAsync();
        }

        public SportEvent GetSportEventById(int eventId) =>
            _context.SportEvents.FirstOrDefault(u => u.Id == eventId);

        public async Task<SportEvent> GetSportEventByIdAsync(int eventId)
        {
            return await _context.SportEvents.FirstOrDefaultAsync(u => u.Id == eventId);
        }

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
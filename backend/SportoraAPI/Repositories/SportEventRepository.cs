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
            return await _context.SportEvents
                .Include(p => p.Admins).ThenInclude(p => p.User)
                .Include(p => p.Participants).ThenInclude(p => p.User)
                .ToListAsync();
        }

        public async Task<SportEvent> GetSportEventById(int eventId)
        {
            return await _context.SportEvents
                .Include(p => p.Admins).ThenInclude(p => p.User)
                .Include(p => p.Participants).ThenInclude(p => p.User)
                .FirstOrDefaultAsync(u => u.Id == eventId);
        }

        public async Task<SportEvent> GetSportEventByIdAsync(int eventId)
        {
            return await _context.SportEvents
                .Include(p => p.Admins).ThenInclude(p => p.User)
                .Include(p => p.Participants).ThenInclude(p => p.User)
                .FirstOrDefaultAsync(u => u.Id == eventId);
        }

        public async Task<SportEvent> UpdateSportEvent(
            JsonPatchDocument<SportEvent> patchDocument, SportEvent sportEvent)
        {
            patchDocument.ApplyTo(sportEvent);
            await _context.SaveChangesAsync();
            return sportEvent;
        }
        

        public void RemoveSportEvent(int id)
        {
            SportEvent sportEventToDelete =
                _context.SportEvents.FirstOrDefault(u => u.Id.Equals(id));
            _context.SportEvents.Remove(sportEventToDelete);
            _context.SaveChanges();
        }

        public async Task<User> GetUserFromAuthId(string authId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.AuthId == authId);
        }

        public async Task SetEventActiveStatusAsync(int id, bool activeState)
        {
            SportEvent sportEventToDisable =
                await _context.SportEvents.FirstOrDefaultAsync(p => p.Id == id);
            sportEventToDisable.ActiveStatus = activeState;
            _context.SaveChanges();
        }

        public async Task<IEnumerable<SportEvent>> SearchSportEventsAsync(string location, string type, DateTime date, int page)
        {
            const int PAGE_SIZE = 10;

            IQueryable<SportEvent> outEvents = from e in _context.SportEvents select e;

            if (!String.IsNullOrEmpty(location) && location != "null")
                outEvents = outEvents.Where(l => l.Location.ToLower().Contains(location.ToLower()));

            if (!String.IsNullOrEmpty(type) && type != "null")
                outEvents = (outEvents.Where(t => t.Name.ToLower().Contains(type.ToLower())));

            if (date != DateTime.MinValue)
                outEvents = outEvents.Where(d => d.EventStartTime.Date >= date.Date);

            return await outEvents
                    .Include(p => p.Admins).ThenInclude(p => p.User)
                    .Include(p => p.Participants).ThenInclude(p => p.User)
                    .OrderBy(p => p.EventStartTime)
                    .Skip(page * PAGE_SIZE)
                    .Take(PAGE_SIZE)
                    .ToListAsync();
        }

        public async Task<IEnumerable<SportEvent>> GetUserParticipatingEvents(string authId)
        {
            User user = await GetUserFromAuthId(authId);

            if (user is null)
                return null;

            IEnumerable<SportEvent> events = await _context.SportEvents
                                            .Include(p => p.Admins).ThenInclude(p => p.User)
                                            .Include(p => p.Participants).ThenInclude(p => p.User)
                                            .ToListAsync();

            return events.Where(p => p.ParticipantUsers.Contains(user));

            //return _context.SportEvents.Where(p => p.ParticipantUsers.Where(p => p.AuthId == authId).Any());
        }

        public async Task<IEnumerable<SportEvent>> GetUserAdminEvents(string authId)
        {
            User user = await GetUserFromAuthId(authId);

            if (user is null)
                return null;

            IEnumerable<SportEvent> events = await _context.SportEvents
                                            .Include(p => p.Admins).ThenInclude(p => p.User)
                                            .Include(p => p.Participants).ThenInclude(p => p.User)
                                            .ToListAsync();

            return events.Where(p => p.AdminUsers.Contains(user));
        }
    }
}
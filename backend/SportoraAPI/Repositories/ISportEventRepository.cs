using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface ISportEventRepository
    {
        void AddSportEvent(SportEvent sportEvent);
        IEnumerable<SportEvent> GetSportEvents();
        Task<IEnumerable<SportEvent>> GetSportEventsAsync();
        Task<IEnumerable<SportEvent>> SearchSportEventsAsync(string location, string type, DateTime date, int page);

        Task<SportEvent> GetSportEventById(int eventId);
        Task<SportEvent> GetSportEventByIdAsync(int eventId);
        Task<SportEvent> UpdateSportEvent(JsonPatchDocument<SportEvent> patchDocument,
            SportEvent sportEvent);
        void RemoveSportEvent(int eventId);
        public Task<User> GetUserFromAuthId(string authId);
        Task SetEventActiveStatusAsync(int id, bool activeState);
    }
}
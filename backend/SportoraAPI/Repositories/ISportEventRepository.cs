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
        Task<IEnumerable<SportEvent>> GetUserParticipatingEvents(string authId);
        Task<IEnumerable<SportEvent>> GetUserAdminEvents(string authId);
        void AddUserToEvent(int eventId, string authId);
        void RemoveUserFromEvent(int eventId, string authId);
        Task CheckActiveStateOfAllEvents();
        void SetActiveState(SportEvent s);

    }
}
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
        
        Task<SportEvent> GetSportEventById(int eventId);
        Task<SportEvent> GetSportEventByIdAsync(int eventId);
        Task<SportEvent> UpdateSportEvent(JsonPatchDocument<SportEvent> patchDocument,
            SportEvent sportEvent);
        void RemoveSportEvent(int eventId);
    }
}
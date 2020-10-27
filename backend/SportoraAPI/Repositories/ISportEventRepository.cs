using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface ISportEventRepository
    {
        void AddSportEvent(SportEvent sportEvent);
        IEnumerable<SportEvent> GetSportEvents();
        SportEvent GetSportEventById(int eventId);
        void UpdateSportEvent(JsonPatchDocument<SportEvent> patchDocument, SportEvent sportEvent);
        void RemoveSportEvent(int eventId);
    }
}
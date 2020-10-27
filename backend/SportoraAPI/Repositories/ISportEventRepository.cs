using System.Collections.Generic;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface ISportEventRepository
    {
        void AddSportEvent(SportEvent sportEvent);
        IEnumerable<SportEvent> GetSportEvents();
        SportEvent GetSportEventById(int eventId);
        void UpdateSportEvent(int id, SportEvent newSportEvent);
        void RemoveSportEvent(int eventId);
    }
}
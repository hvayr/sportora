using System.Collections.Generic;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IGroupRepository
    {
        Group GetGroupById(int id);
        IEnumerable<Group> GetAllGroups();
        void AddGroup(Group club);
        void UpdateGroup(Group newGroup);
        void RemoveGroup(int id);
    }
}
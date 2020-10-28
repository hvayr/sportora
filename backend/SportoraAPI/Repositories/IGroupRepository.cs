using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IGroupRepository
    {
        Group GetGroupById(int id);
        IEnumerable<Group> GetAllGroups();
        void AddGroup(Group club);
        void UpdateGroup(JsonPatchDocument<Group> patchDocument, Group groupToUpdate);
        void RemoveGroup(int id);
    }
}
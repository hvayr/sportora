using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly DatabaseContext _context;

        public GroupRepository(DatabaseContext context)
        {
            _context = context;
        }

        public Group GetGroupById(int id) =>
            _context.Groups.FirstOrDefault(g => g.Id == id);

        public IEnumerable<Group> GetAllGroups() => _context.Groups;

        public void AddGroup(Group club)
        {
            _context.Groups.Add(club);
            _context.SaveChanges();
        }

        public void UpdateGroup(JsonPatchDocument<Group> patchDocument, Group groupToUpdate)
        { ;
            patchDocument.ApplyTo(groupToUpdate);
        }

        public void RemoveGroup(int id)
        {
            Group GroupToRemove = _context.Groups.FirstOrDefault(g => g.Id == id);
            _context.Remove(GroupToRemove);
            _context.SaveChanges();
        }
    }
}
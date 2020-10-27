using System.Collections.Generic;
using System.Linq;
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

        public void UpdateGroup(int id, Group newGroup)
        {
            Group groupToUpdate =
                _context.Groups.FirstOrDefault(g => g.Id == id);

            groupToUpdate.Id = id;
            groupToUpdate.Name = newGroup.Name;
            _context.Update(groupToUpdate);
            _context.SaveChanges();
        }

        public void RemoveGroup(int id)
        {
            Group GroupToRemove = _context.Groups.FirstOrDefault(g => g.Id == id);
            _context.Remove(GroupToRemove);
            _context.SaveChanges();
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public void AddUser(User user)
        {
            user.Id = 0; // Allow the DB provider to generate the ID on add
            _context.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        public User GetUserById(string userId) =>
            _context.Users.FirstOrDefault(u => u.AuthId == userId);

        public void UpdateUser(string id, JsonPatchDocument<User> patchDocument)
        {
            User userToUpdate = _context.Users.FirstOrDefault(u => u.AuthId == id);

            patchDocument.ApplyTo(userToUpdate);
            _context.SaveChanges();
        }

        public async Task<List<User>> GetUsersWhereUsernameContains(string name)
        {
            return await _context.Users.Where(u => u.UserName.Contains(name)).ToListAsync();
        }

        public async Task<List<User>> GetUsersByExactUsername(string name)
        {
            return await _context.Users.Where(u => u.UserName.Equals(name)).ToListAsync();
        }

        public async Task<List<User>> GetUsersByExactEmail(string email)
        {
            return await _context.Users.Where(u => u.Email.Equals(email)).ToListAsync();
        }

        public void RemoveUser(string authId)
        {
            User userToDelete =
                _context.Users.FirstOrDefault(u => u.AuthId == authId);
            _context.Users.Remove(userToDelete);
            _context.SaveChanges();
        }

        public User GetUserGroupsById(int id)
        {
            User user = _context.Users
                .Include(p => p.Groups)
                .ThenInclude(p => p.Group).FirstOrDefault(u => u.Id == id);

            if (user is null)
                return null;

            return user;
        }

        public string GetUserNickName(string authId)
        {
            User user = _context.Users.FirstOrDefault(u => u.AuthId == authId);

            if (user is null)
                return null;

            return user.NickName;
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;
        private IUserRepository _userRepositoryImplementation;

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public void AddUser(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetUsers() => _context.Users.ToList();

        public User GetUserById(int userId) =>
            _context.Users.FirstOrDefault(u => u.Id == userId);

        public void UpdateUser(int id, JsonPatchDocument<User> patchDocument)
        {
            User userToUpdate = _context.Users.FirstOrDefault(u => u.Id == id);

            patchDocument.ApplyTo(userToUpdate);
            _context.SaveChanges();
        }

        public List<User> GetUsersByName(string name)
        {
            return _context.Users.Where(u => u.UserName.Contains(name)).ToList();
        }

        public void RemoveUser(int userId)
            {
                User userToDelete =
                    _context.Users.FirstOrDefault(u => u.Id.Equals(userId));
                _context.Users.Remove(userToDelete);
                _context.SaveChanges();
            }
        }
    }
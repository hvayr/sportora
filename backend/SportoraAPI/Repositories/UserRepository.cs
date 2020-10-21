using System;
using System.Collections.Generic;
using System.Linq;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public class UserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public void AddUser(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User GetUser(int userId)
        {
            return _context.Users.FirstOrDefault(u => u.Id.Equals(userId));
        }

        public void UpdateUser(User updatedUser)
        {
            User userToUpdate =
                _context.Users.FirstOrDefault(u => u.Id == updatedUser.Id);
            _context.Users.Remove(userToUpdate);

            _context.Users.Add(updatedUser);
            _context.SaveChanges();
        }

        public int GenerateUniqueId()
        {
            Random r = new Random();
            int id;
            User foundUser;
            
            do
            {
                id = r.Next(1, 9999);
                foundUser = _context.Users.FirstOrDefault(u => u.Id == id);
            } while (foundUser != null);

            return id;
        }

        public void RemoveUser(int userId)
        {
            User userToDelete = _context.Users.FirstOrDefault(u => u.Id.Equals(userId));
            _context.Users.Remove(userToDelete);
            _context.SaveChanges();
        }
    }
}
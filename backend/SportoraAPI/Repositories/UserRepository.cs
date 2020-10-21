using System;
using System.Collections.Generic;
using System.Linq;
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
            user.Id = GenerateUniqueId();

            _context.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetUsers() => _context.Users.ToList();

        public User GetUser(int userId) =>
            _context.Users.FirstOrDefault(u => u.Id == userId);

        public void UpdateUser(User newUser)
        {
            User userToUpdate =
                _context.Users.FirstOrDefault(u => u.Id == newUser.Id);

            userToUpdate.Id = newUser.Id;
            userToUpdate.Name = newUser.Name;
            userToUpdate.Nickname = newUser.Nickname;
            userToUpdate.Email = newUser.Email;
            userToUpdate.Gender = newUser.Gender;
            userToUpdate.GroupIds = newUser.GroupIds;
            userToUpdate.ImageUrl = newUser.ImageUrl;

            _context.SaveChanges();
        }

        public int GenerateUniqueId()
        {
            Random r = new Random();
            int id;
            User foundUser = new User();

            do
            {
                id = r.Next(1, 999);
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
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
            _context.Users.FirstOrDefault(u => u.Id.Equals(userId));

        public void UpdateUser(User updatedUser)
        {
            User userToUpdate =
                _context.Users.FirstOrDefault(u => u.Id == updatedUser.Id);

            userToUpdate.Id = updatedUser.Id;
            userToUpdate.Name = updatedUser.Name;
            userToUpdate.Nickname = updatedUser.Nickname;
            userToUpdate.Email = updatedUser.Email;
            userToUpdate.Gender = updatedUser.Gender;
            userToUpdate.GroupIds = updatedUser.GroupIds;
            userToUpdate.ImageUrl = updatedUser.ImageUrl;

            _context.SaveChanges();
        }

        public int GenerateUniqueId()
        {
            Random r = new Random();
            int id;
            User foundUser;

            do
            {
                id = r.Next(1, 10);
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
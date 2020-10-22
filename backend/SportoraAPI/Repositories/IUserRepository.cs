using System.Collections.Generic;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        IEnumerable<User> GetUsers();
        User GetUserById(int userId);
        void UpdateUser(User newUser);
        void RemoveUser(int userId);
    }
}
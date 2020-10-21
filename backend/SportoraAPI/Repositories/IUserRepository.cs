using System.Collections.Generic;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        IEnumerable<User> GetUsers();
        User GetUser(int userId);
        void UpdateUser(User updatedUser);
        int GenerateUniqueId();
        void RemoveUser(int userId);
    }
}
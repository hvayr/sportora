using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        IEnumerable<User> GetUsers();
        User GetUserById(int userId);
        void RemoveUser(int userId);
        void UpdateUser(int id, JsonPatchDocument<User> patchDocument);
        List<User> GetUsersByName(string name);


    }
}
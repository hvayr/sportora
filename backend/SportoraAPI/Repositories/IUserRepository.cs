using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using SportoraAPI.Models;

namespace SportoraAPI.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        IEnumerable<User> GetUsers();
        User GetUserById(string userId);
        void RemoveUser(string userId);
        void UpdateUser(string id, JsonPatchDocument<User> patchDocument);
        Task<List<User>> GetUsersWhereUsernameContains(string name);
        Task<List<User>> GetUsersByExactUsername(string name);
        Task<List<User>> GetUsersByExactEmail(string email);
        User GetUserGroupsById(int id);
    }
}
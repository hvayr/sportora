using Microsoft.AspNetCore.Authorization;

namespace SportoraAPI.Authorization
{
    public class MustBeEventAdminRequirement : IAuthorizationRequirement
    {
        public MustBeEventAdminRequirement()
        {
            
        }
    }
}
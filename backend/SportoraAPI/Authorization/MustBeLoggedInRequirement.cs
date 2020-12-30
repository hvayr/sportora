using Microsoft.AspNetCore.Authorization;

namespace SportoraAPI.Authorization
{
    public class MustBeLoggedInRequirement : IAuthorizationRequirement
    {
        public MustBeLoggedInRequirement()
        {
            
        }
    }
}
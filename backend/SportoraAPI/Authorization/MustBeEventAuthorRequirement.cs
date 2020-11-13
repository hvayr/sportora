using Microsoft.AspNetCore.Authorization;

namespace SportoraAPI.Authorization
{
    public class MustBeEventAuthorRequirement : IAuthorizationRequirement
    {
        public MustBeEventAuthorRequirement()
        {
            
        }
    }
}
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SportoraAPI.Repositories;

namespace SportoraAPI.Authorization
{
    public class
        MustBeLoggedInHandler : AuthorizationHandler<MustBeLoggedInRequirement>
    {
        private readonly ISportEventRepository _repository;
        private readonly IHttpContextAccessor _contextAccessor;

        public MustBeLoggedInHandler(ISportEventRepository repository,
            IHttpContextAccessor contextAccessor)
        {
            _repository = repository;
            _contextAccessor = contextAccessor;
        }

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context, MustBeLoggedInRequirement requirement)
        {
            if (!context.User.Identity.IsAuthenticated)
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }
    }
}
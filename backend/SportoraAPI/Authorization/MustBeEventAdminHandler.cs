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
        MustBeEventAdminHandler : AuthorizationHandler<MustBeEventAdminRequirement>
    {
        private readonly ISportEventRepository _repository;
        private readonly IHttpContextAccessor _contextAccessor;
        
                

        public MustBeEventAdminHandler(ISportEventRepository repository,
            IHttpContextAccessor contextAccessor)
        {
            _repository = repository;
            _contextAccessor = contextAccessor;
        }

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context, MustBeEventAdminRequirement requirement)
        {
            if (!context.User.Identity.IsAuthenticated)
            {
                context.Fail();
                return;
            }

            var sportEventId =
                _contextAccessor.HttpContext.Request.RouteValues["id"];
            int sportEventIdAsInt = Convert.ToInt32(sportEventId);

            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var sportEvent = await _repository.GetSportEventByIdAsync(sportEventIdAsInt);

            if (sportEvent == null)
            {
                context.Succeed(requirement);
                return;
            }

            if (!(sportEvent.Admins.FirstOrDefault(a => a.User.AuthId == userId) is null))
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }
    }
}
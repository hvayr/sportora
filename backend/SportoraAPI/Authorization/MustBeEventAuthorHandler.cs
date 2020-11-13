using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using SportoraAPI.Repositories;

namespace SportoraAPI.Authorization
{
    public class
        MustBeEventAuthorHandler : AuthorizationHandler<MustBeEventAuthorRequirement>
    {
        private readonly ISportEventRepository _repository;
        private readonly IHttpContextAccessor _contextAccessor;

        public MustBeEventAuthorHandler(ISportEventRepository repository,
            IHttpContextAccessor contextAccessor)
        {
            _repository = repository;
            _contextAccessor = contextAccessor;
        }

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context, MustBeEventAuthorRequirement requirement)
        {
            if (!context.User.Identity.IsAuthenticated)
            {
                context.Fail();
                return;
            }

            var sportEventId =
                _contextAccessor.HttpContext.Request.RouteValues["sportEventId"];
            int sportEventIdAsInt = Convert.ToInt32(sportEventId);

            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var sportEvent = await _repository.GetSportEventByIdAsync(sportEventIdAsInt);
            if (sportEvent == null)
            {
                context.Succeed(requirement);
                return;
            }

            if (!sportEvent.AdminIds.Contains(Int32.Parse(userId)))
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }
    }
}
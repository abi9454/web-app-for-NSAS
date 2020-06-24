using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSAS.Context;
using NSAS.Services;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace NSAS.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : ApiController
    {
        private UserService _userService;

        public AuthenticationController(ApplicationContext context)
        {
            this._userService = new UserService(context);
        }

        [HttpPost("login")]
        public User Login([FromBody] User user)
        {
            if (!_userService.ExistsInDb(user)) return null;
            return _userService.UpdateToken(user);
        }

        [HttpPost("register")]
        public HttpResponseMessage Register([FromBody]User user)
        {
            var response = new HttpResponseMessage(HttpStatusCode.InternalServerError);

            if (!_userService.ExistsInDb(user))
            {
                if (_userService.AddUser(user))
                {
                    response.StatusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Content = new StringContent("Error adding the user");
                }
            }
            else
            {
                response.Content = new StringContent("This user already exists in the database");
            }
            return response;
        }

        [HttpPost("userExists")]
        public bool CheckIfUserExists([FromBody] User user)
        {
            return _userService.ExistsInDb(user);
        }
    }
}
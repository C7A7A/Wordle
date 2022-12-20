using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wordle.Data;
using Wordle.Data.UserDTO;
using Wordle.Models;
using Wordle.Services;

namespace Wordle.Controllers {
    [Route("api/v1/[controller]")]
    public class UsersController : Controller {

        private readonly IAuthService _authenticationService;

        public UsersController(IAuthService authenticationService) {
            this._authenticationService = authenticationService;
        }

        [HttpPost]
        public ActionResult<UserDTO> Register(RegisterDTO registerDTO) {
            UserDTO user = _authenticationService.RegisterUser(registerDTO);

            return Ok(user);
        }

        [HttpGet]
        public ActionResult<string> Login(LoginDTO loginDTO) {
            string token = _authenticationService.LoginUser(loginDTO);

            return Ok(token);
        }

        [HttpGet("test"), Authorize]
        public string Test() {
            return "test";
        }

        [HttpGet("currentUser"), Authorize]
        public UserDTO GetUser() {
            return _authenticationService.GetUser();
        }
    }
}

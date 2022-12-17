using Microsoft.AspNetCore.Authentication;
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
            UserDTO user = _authenticationService.registerUser(registerDTO);

            return Ok(user);
        }

        [HttpGet]
        public ActionResult<string> Login(LoginDTO loginDTO) {
            string token = _authenticationService.loginUser(loginDTO);

            return Ok(token);
        }
    }
}

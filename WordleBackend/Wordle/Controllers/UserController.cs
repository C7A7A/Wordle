using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Wordle.Data.UserDTO;
using Wordle.Services;

namespace Wordle.Controllers {
    [Route("api/v1/[controller]")]
    public class UserController : Controller {

        private readonly IAuthService _authenticationService;

        public UserController(IAuthService authenticationService) {
            this._authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public ActionResult<UserDTO> Register([FromBody] RegisterDTO registerDTO) {
            UserDTO user = _authenticationService.RegisterUser(registerDTO);

            if (user.Email.IsNullOrEmpty()) {
                return BadRequest(string.Empty);
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public ActionResult<string> Login([FromBody] LoginDTO loginDTO) {
            string token = _authenticationService.LoginUser(loginDTO);

            if (token.IsNullOrEmpty()) {
                return BadRequest(string.Empty);
            }

            return Ok(token);
        }

        [HttpGet("currentUser"), Authorize]
        public ActionResult<UserDTO> GetUser() {
            UserDTO user = _authenticationService.GetUser();

            if (user.Email.IsNullOrEmpty()) {
                return BadRequest(string.Empty);
            }

            return Ok(user);
        }
    }
}

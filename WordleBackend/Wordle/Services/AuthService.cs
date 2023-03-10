using System.Security.Cryptography;
using Wordle.Data.UserDTO;
using Wordle.Models;
using System.Text;
using Wordle.Data;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Wordle.Services {
    public class AuthService : IAuthService {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(ApplicationDBContext context, IConfiguration configuration, IHttpContextAccessor httpContextAccessor) {
            _context = context;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public UserDTO RegisterUser(RegisterDTO registerDTO) {
            string password = registerDTO.Password;

            if (IsDataValid(registerDTO.Email, registerDTO.Password, registerDTO.PasswordConfirmation) == false) {
                return new UserDTO();
            } 

            CreatePasswordHash(password, out string passwordHash, out string passwordSalt);

            User user = new(registerDTO.Email, passwordHash, passwordSalt, registerDTO.Name);

            _context.Users.Add(user);
            _context.SaveChanges();

            return new UserDTO(user.Email, user.Name);
        }

        public string LoginUser(LoginDTO loginDTO) {
            var user = _context.Users.FirstOrDefault(u => u.Email == loginDTO.Email);

            if (user == null) {
                return "";
            }

            if (VerifyPasswordHash(loginDTO.Password, user.Password, user.PasswordSalt) == false) {
                return "";
            }

            string token = CreateToken(user);
            return token;
        }

        public UserDTO GetUser() {
            UserDTO userDTO = new();

            if (_httpContextAccessor != null) {
                string loggedUserEmail = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
                User? user = _context.Users.FirstOrDefault(u => u.Email == loggedUserEmail);
                if (user != null) {
                    userDTO = MaptoDTO(user);
                }
            }

            return userDTO;
        }

        private static UserDTO MaptoDTO(User user) {
            return new UserDTO(user.Email, user.Name);
        }

        private string CreateToken(User user) {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private bool IsDataValid(string email, string password, string passwordConfirmation) {
            if (password != passwordConfirmation) {
                return false;
            }

            if (IsEmailUnique(email) == false) {
                return false;
            }

            if (isValidEmail(email) == false) {
                return false;
            }

            return true;
        }

        private bool VerifyPasswordHash(string password, string passwordHash, string passwordSalt) {
            using HMACSHA512 hmac = new(Convert.FromBase64String(passwordSalt));

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return computedHash.SequenceEqual(Convert.FromBase64String(passwordHash));
        }

        private static void CreatePasswordHash(string password, out string passwordHash, out string passwordSalt) {
            using HMACSHA512 hmac = new();

            byte[] salt = hmac.Key;
            byte[] passwordHashed = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            passwordHash = Convert.ToBase64String(passwordHashed);
            passwordSalt = Convert.ToBase64String(salt);
        }

        private bool IsEmailUnique(string email) {
            return !_context.Users.Any(u => u.Email == email);
        }

        private bool isValidEmail(string email) {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith(".")) {
                return false;
            }
            try {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch {
                return false;
            }
        }
    }
}

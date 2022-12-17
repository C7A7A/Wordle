using Wordle.Data.UserDTO;
using Wordle.Models;

namespace Wordle.Services {
    public interface IAuthService {
        string loginUser(LoginDTO loginDTO);
        UserDTO registerUser(RegisterDTO registerDTO);
    }
}

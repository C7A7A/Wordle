using Wordle.Data.UserDTO;
using Wordle.Models;

namespace Wordle.Services {
    public interface IAuthService {
        string LoginUser(LoginDTO loginDTO);
        UserDTO RegisterUser(RegisterDTO registerDTO);
        UserDTO GetUser();
    }
}

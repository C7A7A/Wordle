namespace Wordle.Data.UserDTO {
    public class UserDTO {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        public UserDTO() {
        }

        public UserDTO(string email, string name) {
            Email = email;
            Name = name;
        }
    }
}

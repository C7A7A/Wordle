namespace Wordle.Data.UserDTO {
    public class UserDTO {
        public UserDTO() {
        }

        public UserDTO(string email, string firstName, string lastName) {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
        }

        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}

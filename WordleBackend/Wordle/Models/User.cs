using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Wordle.Models {
    public class User {
        [Key]
        public int Id { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string PasswordSalt { get; set; } = string.Empty;
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;

        public User(string email, string password, string passwordSalt, string firstName, string lastName) {
            Email = email;
            Password = password;
            PasswordSalt = passwordSalt;
            FirstName = firstName;
            LastName = lastName;
        }

        public User() {

        }
    }
}

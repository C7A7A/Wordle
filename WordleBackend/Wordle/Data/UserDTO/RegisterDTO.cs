﻿using System.ComponentModel.DataAnnotations;

namespace Wordle.Data.UserDTO {
    public class RegisterDTO {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string PasswordConfirmation { get; set; } = string.Empty;
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}

using Microsoft.EntityFrameworkCore;
using Wordle.Models;

namespace Wordle.Data {
    public class ApplicationDBContext : DbContext {
        public DbSet<User> Users { get; set; }

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) {

        }
    }
}

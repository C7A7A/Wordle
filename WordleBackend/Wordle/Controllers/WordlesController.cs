using Microsoft.AspNetCore.Mvc;

namespace Wordle.Controllers {
    [Route("api/v1/[controller]")]
    public class WordlesController : Controller {

        [HttpGet]
        public string[] GetWords() {
            string fileName = "sgb-words.txt";
            string path = Path.Combine(Environment.CurrentDirectory, @"Data\FiveLetterWords", fileName);
            string[] words = System.IO.File.ReadAllText(path)
                .Split(
                    new[] {' ', '\n', '\r', ','},
                    StringSplitOptions.RemoveEmptyEntries
                );

            return words;
        }
    }
}

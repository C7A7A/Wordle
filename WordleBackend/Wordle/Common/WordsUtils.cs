namespace Wordle.Common {
    public class WordsUtils {

        private static readonly string fileName = "sgb-words.txt";
        private static readonly string path = Path.Combine(Environment.CurrentDirectory, @"Data\FiveLetterWords", fileName);
        public static readonly string[] words = GetWords();

        private static string[] GetWords() {
            return System.IO.File.ReadAllText(path)
                .Split(
                    new[] { ' ', '\n', '\r', ',' },
                    StringSplitOptions.RemoveEmptyEntries
                );
        }

        public static string GetRandomWord() {
            return RandomUtils.GetRandomElement(words);
        }
    }
}

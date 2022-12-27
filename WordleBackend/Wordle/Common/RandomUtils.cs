namespace Wordle.Common {
    public class RandomUtils {

        public static string GenerateRandomString(int length) {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            char[] stringChars = new char[length];
            Random random = new();

            for (int i = 0; i < length; i++) {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new string(stringChars);
        }

        public static string GetRandomElement(string[] array) {
            Random rand = new();
            int index = rand.Next(array.Length);
            return array[index];
        }
    }
}

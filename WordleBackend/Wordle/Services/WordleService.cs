using Wordle.Common;

namespace Wordle.Services {
    public class WordleService : IWordleService {

        private const int ROOM_ID_SIZE = 8;
        private const int WORDLE_SIZE = 5;

        public string[] checkAnswer(string wordle, string answer) {
            string[] response = new string[WORDLE_SIZE];

            for (int i = 0; i < WORDLE_SIZE; i++) {
                char letter = answer[i];

                if (wordle[i].Equals(letter)) {
                    response[i] = "CORRECT";
                } else if (wordle.Contains(letter)) {
                    response[i] = "EXIST";
                } else {
                    response[i] = "NOT EXIST";
                }
            }

            return response;
        }

        public string getRoom() {
            return RandomUtils.GenerateRandomString(ROOM_ID_SIZE);
        }
    }
}

namespace Wordle.Services {
    public interface IWordleService {
        string[] checkAnswer(string wordle, string answer);
        string getRoom();
    }
}
